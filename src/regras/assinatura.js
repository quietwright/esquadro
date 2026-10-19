// Certificado e assinatura digital (grupos E e F do MOC): o que dá para conferir sem a SEFAZ.
// Ficam de fora a cadeia até a raiz ICP-Brasil e a revogação (E04 a E07), que dependem do
// cadastro de ACs e das LCRs do autorizador.
//
// A assinatura é conferida como a SEFAZ confere: hash SHA-1 da forma canônica de <infNFe>
// contra o DigestValue, e RSA-SHA1 da forma canônica de <SignedInfo> contra o SignatureValue,
// com a chave pública do certificado que vai na própria nota.

import { canonizar } from '../c14n.js'
import { lerCertificado } from '../certificado.js'
import { el, val } from '../consulta.js'
import { deBase64, paraBase64, rsaSha1Confere, sha1 } from '../cripto.js'
import { atributo, texto } from '../xml.js'

const NS_DS = 'http://www.w3.org/2000/09/xmldsig#'
const utf8 = new TextEncoder()
const calculadas = new WeakMap()

// Tudo que as regras precisam, calculado uma vez por nota. null se a nota não tem assinatura.
function assinatura(ctx) {
  if (calculadas.has(ctx)) return calculadas.get(ctx)
  const sig = ctx.nfe.filhos.find((f) => f.nome === 'Signature' && f.ns === NS_DS) ?? null
  let dados = null
  if (sig) {
    const signedInfo = el(sig, 'SignedInfo')
    const referencia = el(signedInfo, 'Reference')
    const noCertificado = el(sig, 'KeyInfo/X509Data/X509Certificate')
    dados = {
      signedInfo,
      referencia,
      noDigest: el(referencia, 'DigestValue'),
      noValor: el(sig, 'SignatureValue'),
      noCertificado,
      certificado: lerCertificado(texto(noCertificado)),
    }
  }
  calculadas.set(ctx, dados)
  return dados
}

const data = (d) => d.toISOString().slice(0, 10)

export default [
  {
    id: 'E01',
    verificar(ctx, falhar) {
      const a = assinatura(ctx)
      if (!a) return
      const c = a.certificado
      if (!c) return falhar(a.noCertificado, 'o conteúdo de <X509Certificate> não é um certificado X.509 legível')
      if (c.versao !== 3) falhar(a.noCertificado, `certificado na versão ${c.versao}; exigida a 3`)
      if (c.ac) falhar(a.noCertificado, `"${c.titular}" é certificado de autoridade certificadora (basicConstraints cA=true)`)
      const uso = c.usoDaChave
      if (!uso?.assinaturaDigital || !uso?.naoRepudio) {
        const faltam = [!uso?.assinaturaDigital && 'digitalSignature', !uso?.naoRepudio && 'nonRepudiation'].filter(Boolean)
        falhar(a.noCertificado, `keyUsage do certificado não inclui ${faltam.join(' e ')}`)
      }
    },
  },
  {
    id: 'E02',
    verificar(ctx, falhar) {
      const c = assinatura(ctx)?.certificado
      if (!c) return
      const no = assinatura(ctx).noCertificado
      if (ctx.agora < c.inicio) falhar(no, `certificado válido só a partir de ${data(c.inicio)}`)
      else if (ctx.agora > c.fim) falhar(no, `certificado venceu em ${data(c.fim)}`)
    },
  },
  {
    id: 'E03',
    verificar(ctx, falhar) {
      const c = assinatura(ctx)?.certificado
      if (c && !c.cnpj && !c.cpf) falhar(assinatura(ctx).noCertificado, `"${c.titular}" não traz CNPJ (OID 2.16.76.1.3.3) nem CPF (OID 2.16.76.1.3.1)`)
    },
  },
  {
    id: 'F01',
    verificar(ctx, falhar) {
      const a = assinatura(ctx)
      if (!a) return
      const uri = atributo(a.referencia, 'URI')
      const id = atributo(ctx.inf, 'Id')
      if (uri !== `#${id}`) falhar(a.referencia, `Reference URI="${uri}"; a assinatura precisa referenciar o Id de <infNFe> ("#${id}")`)
    },
  },
  {
    id: 'F02',
    verificar(ctx, falhar) {
      const a = assinatura(ctx)
      if (!a) return
      const digest = paraBase64(sha1(utf8.encode(canonizar(ctx.inf, ctx.nfe))))
      if (texto(a.noDigest).trim() !== digest) {
        falhar(a.noDigest, `o hash de <infNFe> é ${digest}, não o DigestValue informado: a nota mudou depois de assinada (até espaço e quebra de linha contam)`)
        return
      }
      const chave = a.certificado?.chave
      const valor = deBase64(texto(a.noValor))
      if (!chave || !valor) return
      if (!rsaSha1Confere(chave, valor, sha1(utf8.encode(canonizar(a.signedInfo, ctx.nfe))))) {
        falhar(a.noValor, 'o SignatureValue não confere com <SignedInfo> e a chave pública do certificado')
      }
    },
  },
  {
    id: 'F03',
    verificar(ctx, falhar) {
      const c = assinatura(ctx)?.certificado
      const cnpj = val(ctx.emit, 'CNPJ')
      if (!c?.cnpj || !cnpj) return
      // NFF usa o certificado da SVRS; PAA assina com o do provedor; emissão pelo fisco, com o da SEFAZ.
      if (val(ctx.ide, 'tpEmis') === '3' || el(ctx.inf, 'infPAA') || ['1', '2'].includes(val(ctx.ide, 'procEmi'))) return
      if (c.cnpj.slice(0, 8) !== cnpj.slice(0, 8)) {
        falhar(assinatura(ctx).noCertificado, `certificado de ${c.cnpj} (raiz ${c.cnpj.slice(0, 8)}); emitente ${cnpj} (raiz ${cnpj.slice(0, 8)})`)
      }
    },
  },
]
