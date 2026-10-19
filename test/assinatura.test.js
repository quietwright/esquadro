import assert from 'node:assert/strict'
import { createHash, randomBytes } from 'node:crypto'
import { test } from 'node:test'
import { canonizar } from '../src/c14n.js'
import { lerCertificado } from '../src/certificado.js'
import { deBase64, paraBase64, sha1 } from '../src/cripto.js'
import { validar } from '../src/index.js'
import { lerXml } from '../src/xml.js'
import { AGORA, NFE_55, assinar, certificado, nota } from './ajuda.js'

const regras = (xml, opcoes = {}) => validar(xml, { agora: AGORA, ...opcoes }).problemas.map((p) => p.regra)
const deAssinatura = (xml, opcoes) => regras(xml, opcoes).filter((r) => /^[EF]0\d$/.test(r))

test('SHA-1 e base64 batem com o node:crypto', () => {
  for (const tamanho of [0, 1, 55, 56, 63, 64, 65, 1000, 100_000]) {
    const bytes = randomBytes(tamanho)
    assert.equal(paraBase64(sha1(bytes)), createHash('sha1').update(bytes).digest('base64'), `tamanho ${tamanho}`)
    assert.deepEqual(deBase64(bytes.toString('base64')), new Uint8Array(bytes))
  }
  assert.equal(deBase64('não é base64'), null)
})

test('C14N: atributos em ordem, aspas duplas, tag vazia aberta, entidades e namespaces', () => {
  const doc = lerXml(`<a xmlns="urn:x" xmlns:p="urn:p"><b z='1' a="&lt;&quot;&#9;"/><p:c>x &amp; y &gt; &#13;</p:c><![CDATA[<d>]]><!-- fora --></a>`)
  assert.equal(
    canonizar(doc.raiz),
    '<a xmlns="urn:x" xmlns:p="urn:p"><b a="&lt;&quot;&#x9;" z="1"></b><p:c>x &amp; y &gt; &#xD;</p:c>&lt;d&gt;</a>',
  )
  // Subconjunto: o elemento de topo recebe os namespaces herdados; os filhos não repetem.
  assert.equal(canonizar(doc.raiz.filhos[1]), '<p:c xmlns="urn:x" xmlns:p="urn:p">x &amp; y &gt; &#xD;</p:c>')
})

test('C14N: dentro de nfeProc, só o namespace padrão do invólucro conta', () => {
  const doc = lerXml('<nfeProc xmlns="urn:nfe" xmlns:xsi="urn:xsi"><NFe><infNFe Id="1"/></NFe></nfeProc>')
  const nfe = doc.raiz.filhos[0]
  assert.equal(canonizar(nfe.filhos[0], nfe), '<infNFe xmlns="urn:nfe" Id="1"></infNFe>')
})

test('certificado de teste: campos lidos', () => {
  const c = lerCertificado(certificado('teste'))
  assert.equal(c.versao, 3)
  assert.equal(c.cnpj, '11222333000181')
  assert.equal(c.ac, false)
  assert.deepEqual(c.usoDaChave, { assinaturaDigital: true, naoRepudio: true })
  assert.equal(c.inicio.toISOString(), '2026-01-01T00:00:00.000Z')
  assert.equal(lerCertificado(certificado('cpf')).cpf, '12345678909')
  assert.equal(lerCertificado('AAAA'), null)
})

test('a fixture assinada não acusa nada de certificado nem de assinatura', () => {
  assert.deepEqual(deAssinatura(NFE_55), [])
})

test('nota dentro de nfeProc, com a NFe herdando o namespace do invólucro', () => {
  const semXmlns = NFE_55.replace('<NFe xmlns="http://www.portalfiscal.inf.br/nfe">', '<NFe>').replace(/^<\?xml[^>]*>/, '')
  const proc = `<nfeProc versao="4.00" xmlns="http://www.portalfiscal.inf.br/nfe">${semXmlns}<protNFe versao="4.00"/></nfeProc>`
  assert.deepEqual(deAssinatura(proc), [])
})

const casos = [
  ['E01', 'certificado ilegível', () => NFE_55.replace(/<X509Certificate>[^<]*/, '<X509Certificate>AAAA')],
  ['E01', 'certificado de AC', () => assinar(NFE_55, 'ac')],
  ['E01', 'keyUsage sem não-repúdio', () => assinar(NFE_55, 'sem-nao-repudio')],
  ['E02', 'certificado vencido', () => assinar(NFE_55, 'vencido')],
  ['E03', 'certificado sem CNPJ nem CPF', () => assinar(NFE_55, 'sem-documento')],
  ['F01', 'referência a outro Id', () => NFE_55.replace(/URI="#NFe\d+"/, 'URI="#NFe0"')],
  ['F02', 'nota alterada depois de assinada', () => NFE_55.replace('<natOp>VENDA DE MERCADORIA', '<natOp>VENDA DE MERCADORIAS')],
  ['F02', 'quebra de linha acrescentada depois de assinada', () => NFE_55.replace('<ide>', '<ide>\n')],
  ['F02', 'SignatureValue de outra nota', () => NFE_55.replace(/<SignatureValue>[^<]*/, `<SignatureValue>${'A'.repeat(342)}==`)],
  ['F03', 'certificado de outra empresa', () => assinar(NFE_55, 'outra-empresa')],
]

for (const [regra, descricao, montar] of casos) {
  test(`${regra}: ${descricao}`, () => {
    const r = regras(montar())
    assert.ok(r.includes(regra), `esperava ${regra}; veio ${r.join(', ') || 'nada'}`)
  })
}

test('E02: certificado ainda não válido no instante da emissão', () => {
  assert.ok(regras(NFE_55, { agora: new Date('2025-12-31T12:00:00Z') }).includes('E02'))
})

test('F02 não acusa espaço fora do elemento raiz nem mudança de aspas ou de ordem de atributos', () => {
  const xml = NFE_55.replace('<infNFe versao="4.00" Id="', "<infNFe  Id='").replace(/(Id='NFe\d+)"/, `$1' versao="4.00"`)
  assert.notEqual(xml, NFE_55)
  assert.deepEqual(deAssinatura(xml + '\n'), [])
})

test('F03 não se aplica a filial, nem a emitente pessoa física', () => {
  const filial = nota([['<CNPJ>11222333000181</CNPJ>', '<CNPJ>11222333000262</CNPJ>']])
  assert.ok(!regras(assinar(filial, 'teste')).includes('F03'))
  const pf = nota([['<CNPJ>11222333000181</CNPJ><xNome>EMPRESA', '<CPF>12345678909</CPF><xNome>EMPRESA']])
  assert.ok(!regras(assinar(pf, 'outra-empresa')).includes('F03'))
  assert.ok(!regras(assinar(pf, 'cpf')).includes('E03'))
})
