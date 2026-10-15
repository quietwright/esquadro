import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { validarEsquema } from '../src/esquema.js'
import modelo from '../src/esquema/nfe.js'
import { lerXml } from '../src/xml.js'

const base = readFileSync(new URL('./fixtures/nfe-55.xml', import.meta.url), 'utf8').trimEnd()

function problemas(xml) {
  return validarEsquema(modelo, lerXml(xml).raiz)
}

function trocar(de, para, xml = base) {
  assert.ok(xml.includes(de), `fixture não contém ${de}`)
  return xml.replace(de, para)
}

test('a fixture de NF-e modelo 55 passa no schema', () => {
  assert.deepEqual(problemas(base), [])
})

test('aponta caractere fora do Latin-1 imprimível', () => {
  const [p] = problemas(trocar('EMPRESA DE TESTE LTDA', 'EMPRESA “TESTE” LTDA'))
  assert.equal(p.caminho, 'NFe/infNFe/emit/xNome')
  assert.match(p.detalhe, /U\+201C/)
})

test('espaço no fim de campo texto quebra o padrão', () => {
  const [p] = problemas(trocar('<xBairro>CENTRO</xBairro>', '<xBairro>CENTRO </xBairro>'))
  assert.equal(p.caminho, 'NFe/infNFe/emit/enderEmit/xBairro')
})

test('elemento obrigatório ausente', () => {
  const [p] = problemas(trocar('<cEAN>SEM GTIN</cEAN>', ''))
  assert.equal(p.detalhe, 'falta <cEAN> antes de <xProd> em <prod>')
})

test('elemento obrigatório ausente no fim do grupo', () => {
  const [p] = problemas(trocar('<vNF>100.00</vNF>', ''))
  assert.equal(p.detalhe, '<ICMSTot> incompleto: falta <vNF>')
})

test('elemento que não existe no grupo', () => {
  const [p] = problemas(trocar('<CFOP>5102</CFOP>', '<CFOP>5102</CFOP><Foo>1</Foo>'))
  assert.match(p.detalhe, /^elemento <Foo> não existe em <prod>/)
})

test('elementos fora de ordem', () => {
  const [p] = problemas(trocar('<uCom>UN</uCom><qCom>2.0000</qCom>', '<qCom>2.0000</qCom><uCom>UN</uCom>'))
  assert.match(p.detalhe, /<qCom>/)
})

test('valor fora da enumeração', () => {
  const [p] = problemas(trocar('<tpNF>1</tpNF>', '<tpNF>2</tpNF>'))
  assert.match(p.detalhe, /valor "2" não permitido; aceitos: 0, 1/)
})

test('tamanho máximo', () => {
  const [p] = problemas(trocar('<uCom>UN</uCom>', '<uCom>UNIDADE</uCom>'))
  assert.match(p.detalhe, /tamanho 7, máximo 6/)
})

test('decimal com casas erradas', () => {
  const [p] = problemas(trocar('<vProd>100.00</vProd><cEANTrib>', '<vProd>100.0</vProd><cEANTrib>'))
  assert.equal(p.caminho, 'NFe/infNFe/det/prod/vProd')
})

test('escolha entre CNPJ e CPF', () => {
  assert.deepEqual(problemas(trocar('<CNPJ>11222333000181</CNPJ>', '<CPF>12345678909</CPF>')), [])
  const [p] = problemas(trocar('<CNPJ>11222333000181</CNPJ>', ''))
  assert.match(p.detalhe, /falta um de <CNPJ>, <CPF> antes de <xNome>/)
})

test('atributo obrigatório, desconhecido e fixo', () => {
  assert.match(problemas(trocar(' versao="4.00"', ''))[0].detalhe, /sem o atributo obrigatório "versao"/)
  assert.match(problemas(trocar('<det nItem="1">', '<det nItem="1" x="2">'))[0].detalhe, /atributo "x" não permitido/)
  assert.match(problemas(trocar('xmldsig#rsa-sha1', 'xmldsig#rsa-sha256'))[0].detalhe, /deve ser "http:\/\/www.w3.org\/2000\/09\/xmldsig#rsa-sha1"/)
})

test('nItem repetido', () => {
  const det = base.match(/<det nItem="1">.*<\/det>/)[0]
  const [p] = problemas(trocar(det, det + det))
  assert.match(p.detalhe, /"nItem"="1" repetido/)
})

test('texto solto dentro de grupo', () => {
  const [p] = problemas(trocar('<ide><cUF>', '<ide>x<cUF>'))
  assert.match(p.detalhe, /<ide> não aceita texto direto/)
})

test('raiz errada', () => {
  assert.match(problemas('<nfeProc xmlns="http://www.portalfiscal.inf.br/nfe"/>')[0].detalhe, /raiz <nfeProc> não existe/)
})
