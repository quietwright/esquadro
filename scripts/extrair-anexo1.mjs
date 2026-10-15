// Extrai as tabelas de regras de validação do MOC 7.0, Anexo I (seção 4), para JSON.
//
// Entrada: o texto de `pdftotext -layout` das páginas de regras.
// Saída: uma lista de regras { secao, id, modelo, regra, aplicacao, cStat, efeito, mensagem, pagina }.
//
// O PDF não tem estrutura de tabela, só texto alinhado. Cada regra começa numa linha que
// traz, nessa ordem: id, modelo (às vezes), texto da regra, Obrig./Facul., cStat, efeito e
// a mensagem. As linhas seguintes continuam a regra (à esquerda) ou a mensagem (à direita
// da coluna onde a mensagem começou).

import { readFileSync, writeFileSync } from 'node:fs'

const [entrada, saida, primeiraPagina = '71'] = process.argv.slice(2)
if (!entrada || !saida) {
  console.error('uso: node extrair-anexo1.mjs regras.txt anexo1.json [primeira-pagina]')
  process.exit(2)
}

const linhaDeRegra =
  /^(\s*)(\d?[A-Z][A-Za-z0-9]*(?:-\d+[a-z]?)?)\s+(?:(55\/65|55|65)\s+)?(.*?)\s+(Obrig|Facul)\.?\s+(\d{3})\s+(Rej|Den|Alerta)[.,]?\s+(.*)$/
const cabecalhoDeSecao = /^\s*(\d+\.\d+(?:\.\d+)*)\.\s+(.+?)\s*$/
const ruido = [
  /^Nota Fiscal Eletrônica\s*$/,
  /^MOC 7\.0 – Anexo I/,
  /^\s*(#|Campo-Seq)\s+.*Regra de Valida/,
  /Página \d+ \/ \d+\s*$/,
]

const linhas = readFileSync(entrada, 'utf8').split('\n')
const regras = []
let pagina = Number(primeiraPagina)
let secao = null
let atual = null
let colunaMensagem = 0

for (const linha of linhas) {
  if (linha.includes('\f')) pagina += linha.split('\f').length - 1
  const texto = linha.replaceAll('\f', '')
  if (!texto.trim()) continue
  if (ruido.some((r) => r.test(texto))) continue

  const s = texto.match(cabecalhoDeSecao)
  if (s && !linhaDeRegra.test(texto) && s[1].startsWith('4')) {
    secao = `${s[1]} ${s[2]}`
    atual = null
    continue
  }

  const m = texto.match(linhaDeRegra)
  if (m) {
    const [, , id, modelo, regra, aplicacao, cStat, efeito, mensagem] = m
    colunaMensagem = texto.length - mensagem.length
    atual = {
      secao,
      id,
      modelo: modelo ?? null,
      regra: [regra.trim()],
      aplicacao: aplicacao === 'Obrig' ? 'obrigatoria' : 'facultativa',
      cStat: Number(cStat),
      efeito: { Rej: 'rejeicao', Den: 'denegacao', Alerta: 'alerta' }[efeito],
      mensagem: [mensagem.trim()],
      pagina,
    }
    regras.push(atual)
    continue
  }

  if (!atual) continue
  // Continuação: o que está à direita da coluna da mensagem é mensagem; o resto é regra.
  const corte = colunaMensagem - 2
  const esquerda = texto.slice(0, corte).trim()
  const direita = texto.slice(corte).trim()
  if (esquerda) atual.regra.push(esquerda)
  if (direita) atual.mensagem.push(direita)
}

const juntar = (partes) =>
  partes
    .join(' ')
    .replace(/\s+/g, ' ')
    .replace(/(\w)- (\w)/g, '$1-$2')
    .trim()

for (const r of regras) {
  r.regra = juntar(r.regra)
  r.mensagem = juntar(r.mensagem)
  r.referencias = [...new Set(r.regra.match(/NT ?\d{4}[./]\d{3}(?: v ?\d\.\d+)?/g) ?? [])]
}

writeFileSync(saida, JSON.stringify(regras, null, 1) + '\n')
console.error(`${regras.length} regras`)
