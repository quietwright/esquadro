// Lê planilhas XLSX e ODS (as tabelas de apoio do Portal da NF-e) sem dependências: as duas
// são zip de XML. O zip é aberto com `unzip -p` e o XML, com o parser do próprio esquadro.

import { execFileSync } from 'node:child_process'
import { atributo, elementos, lerXml, texto } from '../src/xml.js'

function membro(arquivo, caminho) {
  try {
    return execFileSync('unzip', ['-p', arquivo, caminho], { encoding: 'utf8', maxBuffer: 256 << 20 })
  } catch {
    return null
  }
}

const desce = (no, nome) => elementos(no).filter((e) => e.nome === nome)

function textoProfundo(no) {
  let s = ''
  for (const f of no.filhos) {
    if (f.tipo === 'texto') s += f.valor
    else if (f.tipo === 'elemento') {
      if (f.nome === 'rPh') continue // leitura fonética (furigana), não é conteúdo
      s += textoProfundo(f)
    }
  }
  return s
}

// Coluna "AB" -> 27 (base 1).
const indiceDaColuna = (ref) => [...ref.replace(/\d+$/, '')].reduce((n, c) => n * 26 + c.charCodeAt(0) - 64, 0)

/** Linhas da planilha (lista de listas de texto). `aba` é o índice (0) ou o nome. */
export function lerXlsx(arquivo, aba = 0) {
  const compartilhadas = []
  const sst = membro(arquivo, 'xl/sharedStrings.xml')
  if (sst) for (const si of desce(lerXml(sst).raiz, 'si')) compartilhadas.push(textoProfundo(si))

  const livro = lerXml(membro(arquivo, 'xl/workbook.xml')).raiz
  const abas = desce(desce(livro, 'sheets')[0], 'sheet')
  const escolhida = typeof aba === 'number' ? abas[aba] : abas.find((a) => atributo(a, 'name') === aba)
  const rid = escolhida.atributos.find((a) => a.nome === 'id')?.valor
  const rels = lerXml(membro(arquivo, 'xl/_rels/workbook.xml.rels')).raiz
  const alvo = desce(rels, 'Relationship').find((r) => atributo(r, 'Id') === rid)
  const caminho = 'xl/' + atributo(alvo, 'Target').replace(/^\/?xl\//, '')

  const folha = lerXml(membro(arquivo, caminho)).raiz
  const linhas = []
  for (const row of desce(desce(folha, 'sheetData')[0], 'row')) {
    const linha = []
    for (const c of desce(row, 'c')) {
      const col = indiceDaColuna(atributo(c, 'r')) - 1
      const tipo = atributo(c, 't')
      const v = desce(c, 'v')[0]
      let valor = ''
      if (tipo === 's') valor = compartilhadas[Number(texto(v))] ?? ''
      else if (tipo === 'inlineStr') valor = textoProfundo(desce(c, 'is')[0])
      else if (v) valor = texto(v)
      linha[col] = valor.trim()
    }
    linhas.push(Array.from(linha, (x) => x ?? ''))
  }
  return linhas
}

/** Linhas da primeira tabela de uma planilha ODS. */
export function lerOds(arquivo) {
  const conteudo = lerXml(membro(arquivo, 'content.xml')).raiz
  const tabelas = []
  const procurar = (no) => {
    for (const f of elementos(no)) {
      if (f.nome === 'table') tabelas.push(f)
      else procurar(f)
    }
  }
  procurar(conteudo)
  const linhas = []
  for (const row of desce(tabelas[0], 'table-row')) {
    const linha = []
    for (const cel of elementos(row).filter((e) => e.nome === 'table-cell' || e.nome === 'covered-table-cell')) {
      const repete = Number(cel.atributos.find((a) => a.nome === 'number-columns-repeated')?.valor ?? 1)
      const valor = desce(cel, 'p').map(textoProfundo).join('\n').trim()
      for (let i = 0; i < Math.min(repete, 50); i++) linha.push(valor)
    }
    const repeteLinha = Number(row.atributos.find((a) => a.nome === 'number-rows-repeated')?.valor ?? 1)
    if (linha.some(Boolean)) for (let i = 0; i < Math.min(repeteLinha, 1); i++) linhas.push(linha)
  }
  return linhas
}
