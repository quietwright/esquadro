import assert from 'node:assert/strict'
import { test } from 'node:test'
import { ErroXml, atributo, caminho, elementos, lerXml, texto } from '../src/xml.js'

const NS = 'http://www.portalfiscal.inf.br/nfe'

test('lê elementos, atributos, texto e namespace padrão', () => {
  const doc = lerXml(`<?xml version="1.0" encoding="UTF-8"?><NFe xmlns="${NS}"><infNFe versao="4.00" Id="NFe1"><ide><cUF>35</cUF></ide></infNFe></NFe>`)
  assert.equal(doc.declaracao.codificacao, 'UTF-8')
  assert.equal(doc.raiz.nome, 'NFe')
  assert.equal(doc.raiz.ns, NS)
  const inf = elementos(doc.raiz)[0]
  assert.equal(atributo(inf, 'versao'), '4.00')
  const cUF = elementos(elementos(inf)[0])[0]
  assert.equal(cUF.ns, NS)
  assert.equal(texto(cUF), '35')
  assert.equal(caminho(cUF), 'NFe/infNFe/ide/cUF')
})

test('guarda linha e coluna de cada elemento', () => {
  const doc = lerXml('<a>\n  <b/>\n  <c>x</c>\n</a>')
  const [b, c] = elementos(doc.raiz)
  assert.deepEqual([b.linha, b.coluna], [2, 3])
  assert.deepEqual([c.linha, c.coluna], [3, 3])
})

test('guarda o texto de edição entre as tags', () => {
  const doc = lerXml('<a>\n  <b/>\n</a>')
  const textos = doc.raiz.filhos.filter((f) => f.tipo === 'texto').map((f) => f.valor)
  assert.deepEqual(textos, ['\n  ', '\n'])
})

test('offsets de início e fim cobrem o elemento inteiro no texto original', () => {
  const fonte = '<a><b x="1">y</b></a>'
  const b = elementos(lerXml(fonte).raiz)[0]
  assert.equal(fonte.slice(b.inicio, b.fim), '<b x="1">y</b>')
})

test('resolve entidades predefinidas e referências numéricas', () => {
  const doc = lerXml('<a t="&quot;x&quot;&#10;">&lt;M&amp;M&gt; &#x41;&#66;</a>')
  assert.equal(texto(doc.raiz), '<M&M> AB')
  assert.equal(atributo(doc.raiz, 't'), '"x"\n')
})

test('normaliza espaços literais em atributo e quebras de linha no texto', () => {
  const doc = lerXml('<a t="x\ty\r\nz">1\r\n2\r3</a>')
  assert.equal(atributo(doc.raiz, 't'), 'x y z')
  assert.equal(texto(doc.raiz), '1\n2\n3')
})

test('CDATA vira texto sem resolver entidades', () => {
  assert.equal(texto(lerXml('<a><![CDATA[<b>&amp;</b>]]></a>').raiz), '<b>&amp;</b>')
})

test('prefixos de namespace são resolvidos e registrados', () => {
  const doc = lerXml('<n:NFe xmlns:n="urn:x" xmlns:ds="urn:ds"><ds:Signature/></n:NFe>')
  assert.equal(doc.raiz.prefixo, 'n')
  assert.equal(doc.raiz.ns, 'urn:x')
  assert.deepEqual([...doc.raiz.namespaces.keys()], ['n', 'ds'])
  assert.equal(elementos(doc.raiz)[0].ns, 'urn:ds')
})

test('caminho numera irmãos repetidos', () => {
  const doc = lerXml('<NFe><det/><det><prod/></det></NFe>')
  assert.equal(caminho(elementos(elementos(doc.raiz)[1])[0]), 'NFe/det[2]/prod')
})

const malformados = [
  ['', 'documento vazio'],
  ['<a>', 'sem fechamento'],
  ['<a></b>', 'não corresponde'],
  ['<a x="1" x="2"/>', 'repetido'],
  ['<a x=1/>', 'sem aspas'],
  ['<a>&nbsp;</a>', 'entidade desconhecida'],
  ['<a>AT&T</a>', 'sem ";"'],
  ['<a/><b/>', 'depois do elemento raiz'],
  ['texto<a/>', 'antes do elemento raiz'],
  ['<!DOCTYPE a><a/>', 'DTD'],
  ['<p:a/>', 'não declarado'],
  ['<a>\u0001</a>', 'U+0001'],
  ['<a>&#0;</a>', 'caractere inválido'],
  ['<a t="<"/>', '"<" dentro'],
  ['<a>]]></a>', 'fora de seção CDATA'],
  ['<a><!-- a -- b --></a>', '"--"'],
  [' <?xml version="1.0"?><a/>', 'declaração XML fora'],
]

for (const [fonte, trecho] of malformados) {
  test(`rejeita XML malformado: ${JSON.stringify(fonte)}`, () => {
    assert.throws(
      () => lerXml(fonte),
      (e) => e instanceof ErroXml && e.message.includes(trecho) && e.linha >= 1 && e.coluna >= 1,
    )
  })
}

test('BOM no início é aceito e sinalizado', () => {
  const doc = lerXml('﻿<a/>')
  assert.equal(doc.bom, true)
})
