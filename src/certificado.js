// Leitura do certificado X.509 que vai em <X509Certificate>: só os campos que as regras E01 a
// E03 e F03 do MOC olham. DER lido à mão (ITU-T X.690), sem dependências.

import { deBase64, paraBigInt } from './cripto.js'

const OID = {
  rsa: '1.2.840.113549.1.1.1',
  restricoesBasicas: '2.5.29.19',
  usoDaChave: '2.5.29.15',
  nomeAlternativo: '2.5.29.17',
  nomeComum: '2.5.4.3',
  // Campos otherName da ICP-Brasil (DOC-ICP-04): CNPJ da pessoa jurídica e dados da pessoa física.
  cnpj: '2.16.76.1.3.3',
  pessoaFisica: '2.16.76.1.3.1',
}

class ErroDer extends Error {}

function lerNo(bytes, pos) {
  if (pos + 2 > bytes.length) throw new ErroDer('fim inesperado')
  const tag = bytes[pos]
  if ((tag & 0x1f) === 0x1f) throw new ErroDer('tag longa não suportada')
  let tamanho = bytes[pos + 1]
  let inicio = pos + 2
  if (tamanho & 0x80) {
    const n = tamanho & 0x7f
    if (n === 0 || n > 4) throw new ErroDer('tamanho indefinido ou grande demais')
    tamanho = 0
    for (let i = 0; i < n; i++) tamanho = tamanho * 256 + bytes[inicio + i]
    inicio += n
  }
  const fim = inicio + tamanho
  if (fim > bytes.length) throw new ErroDer('tamanho passa do fim')
  return { tag, inicio, fim, construido: (tag & 0x20) !== 0, bytes }
}

function filhos(no) {
  const lista = []
  for (let pos = no.inicio; pos < no.fim; ) {
    const f = lerNo(no.bytes, pos)
    lista.push(f)
    pos = f.fim
  }
  return lista
}

const conteudo = (no) => no.bytes.subarray(no.inicio, no.fim)
// BMPString é UTF-16; T61String, na prática, Latin-1; os demais tipos de texto cabem em UTF-8.
const textoDe = (no) => new TextDecoder(no.tag === 0x1e ? 'utf-16be' : no.tag === 0x14 ? 'latin1' : 'utf-8').decode(conteudo(no))

function oid(no) {
  const b = conteudo(no)
  const partes = [Math.floor(b[0] / 40), b[0] % 40]
  let v = 0
  for (let i = 1; i < b.length; i++) {
    v = v * 128 + (b[i] & 0x7f)
    if (!(b[i] & 0x80)) {
      partes.push(v)
      v = 0
    }
  }
  return partes.join('.')
}

// UTCTime (YYMMDDHHMMSSZ, ano 50-99 é 19xx) ou GeneralizedTime (YYYYMMDDHHMMSSZ).
function instante(no) {
  const s = textoDe(no)
  const m = no.tag === 0x17 ? /^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})?Z$/.exec(s) : /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})?Z$/.exec(s)
  if (!m) throw new ErroDer(`data "${s}" fora do formato`)
  let ano = Number(m[1])
  if (no.tag === 0x17) ano += ano >= 50 ? 1900 : 2000
  return new Date(Date.UTC(ano, Number(m[2]) - 1, Number(m[3]), Number(m[4]), Number(m[5]), Number(m[6] ?? 0)))
}

function nomeComum(nome) {
  for (const rdn of filhos(nome)) {
    for (const atv of filhos(rdn)) {
      const [tipo, valor] = filhos(atv)
      if (oid(tipo) === OID.nomeComum) return textoDe(valor)
    }
  }
  return null
}

/**
 * @typedef {object} Certificado
 * @property {number} versao          1, 2 ou 3.
 * @property {Date} inicio
 * @property {Date} fim
 * @property {string|null} titular    CN do titular.
 * @property {string|null} emissor    CN da AC emissora.
 * @property {boolean|null} ac        basicConstraints.cA; null se a extensão não veio.
 * @property {{assinaturaDigital: boolean, naoRepudio: boolean}|null} usoDaChave
 * @property {string|null} cnpj       Do otherName 2.16.76.1.3.3.
 * @property {string|null} cpf        Do otherName 2.16.76.1.3.1 (posições 9 a 19).
 * @property {{n: bigint, e: bigint}|null} chave  Chave pública, se RSA.
 */

/**
 * Lê um certificado em base64, como vem em <X509Certificate>.
 * @returns {Certificado|null}  null se não for um certificado X.509 legível.
 */
export function lerCertificado(base64) {
  const bytes = deBase64(base64)
  if (!bytes || !bytes.length) return null
  try {
    const raiz = lerNo(bytes, 0)
    if (raiz.tag !== 0x30 || raiz.fim !== bytes.length) return null
    const [tbs] = filhos(raiz)
    const campos = filhos(tbs)
    let i = 0
    let versao = 1
    if (campos[0].tag === 0xa0) {
      versao = Number(paraBigInt(conteudo(filhos(campos[0])[0]))) + 1
      i = 1
    }
    const emissor = campos[i + 2]
    const [inicio, fim] = filhos(campos[i + 3]).map(instante)
    const titular = campos[i + 4]
    const cert = {
      versao,
      inicio,
      fim,
      titular: nomeComum(titular),
      emissor: nomeComum(emissor),
      ac: null,
      usoDaChave: null,
      cnpj: null,
      cpf: null,
      chave: chavePublica(campos[i + 5]),
    }
    const extensoes = campos.slice(i + 6).find((c) => c.tag === 0xa3)
    if (extensoes) for (const ext of filhos(filhos(extensoes)[0])) lerExtensao(ext, cert)
    return cert
  } catch (e) {
    if (e instanceof ErroDer || e instanceof TypeError) return null
    throw e
  }
}

function chavePublica(spki) {
  const [algoritmo, bits] = filhos(spki)
  if (oid(filhos(algoritmo)[0]) !== OID.rsa) return null
  // BIT STRING: o primeiro byte é a contagem de bits não usados; o resto é o RSAPublicKey.
  const rsa = lerNo(bits.bytes, bits.inicio + 1)
  const [n, e] = filhos(rsa)
  return { n: paraBigInt(conteudo(n)), e: paraBigInt(conteudo(e)) }
}

function lerExtensao(ext, cert) {
  const partes = filhos(ext)
  const id = oid(partes[0])
  const valor = lerNo(partes.at(-1).bytes, partes.at(-1).inicio)
  if (id === OID.restricoesBasicas) {
    const [ca] = filhos(valor)
    cert.ac = ca?.tag === 0x01 ? conteudo(ca)[0] !== 0 : false
  } else if (id === OID.usoDaChave) {
    const b = conteudo(valor)
    const primeiro = b[1] ?? 0
    cert.usoDaChave = { assinaturaDigital: (primeiro & 0x80) !== 0, naoRepudio: (primeiro & 0x40) !== 0 }
  } else if (id === OID.nomeAlternativo) {
    for (const nome of filhos(valor)) {
      // otherName é [0] construído: { type-id OID, [0] EXPLICIT valor }.
      if (nome.tag !== 0xa0) continue
      const [tipo, explicito] = filhos(nome)
      const dado = textoDe(filhos(explicito)[0]).trim()
      const t = oid(tipo)
      if (t === OID.cnpj) cert.cnpj = dado
      else if (t === OID.pessoaFisica) cert.cpf = dado.slice(8, 19)
    }
  }
}
