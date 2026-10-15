#!/usr/bin/env node
// esquadro: valida NF-e e NFC-e offline e aponta a rejeição que a SEFAZ daria.

import { readFileSync } from 'node:fs'
import { validar } from '../src/index.js'

const AJUDA = `uso: esquadro [opções] <nota.xml> [mais.xml ...]
       cat nota.xml | esquadro -

Valida NF-e e NFC-e (modelo 55 e 65, leiaute 4.00) com o schema oficial e as regras de
validação do MOC e das Notas Técnicas, sem acessar a SEFAZ.

opções:
  --json           saída em JSON (uma lista, um resultado por arquivo)
  --agora <data>   instante de recebimento simulado (ISO 8601); padrão: agora
  --ajuda          esta mensagem

Sai com código 1 se alguma nota tiver rejeição obrigatória, 2 em erro de uso.`

const args = process.argv.slice(2)
const opcoes = {}
const arquivos = []
let json = false
for (let i = 0; i < args.length; i++) {
  const a = args[i]
  if (a === '--ajuda' || a === '-h' || a === '--help') {
    console.log(AJUDA)
    process.exit(0)
  } else if (a === '--json') json = true
  else if (a === '--agora') {
    const d = new Date(args[++i])
    if (Number.isNaN(d.getTime())) sair(`data inválida em --agora: ${args[i]}`)
    opcoes.agora = d
  } else if (a.startsWith('--')) sair(`opção desconhecida: ${a}`)
  else arquivos.push(a)
}
if (!arquivos.length) sair(AJUDA)

function sair(mensagem) {
  console.error(mensagem)
  process.exit(2)
}

const cor = process.stdout.isTTY && !process.env.NO_COLOR
const pintar = (codigo, s) => (cor ? `\x1b[${codigo}m${s}\x1b[0m` : s)
const vermelho = (s) => pintar(31, s)
const amarelo = (s) => pintar(33, s)
const verde = (s) => pintar(32, s)
const cinza = (s) => pintar(90, s)

const resultados = []
for (const arquivo of arquivos) {
  let conteudo
  try {
    conteudo = readFileSync(arquivo === '-' ? 0 : arquivo)
  } catch (e) {
    sair(`não foi possível ler ${arquivo}: ${e.message}`)
  }
  resultados.push({ arquivo, ...validar(conteudo, opcoes) })
}

if (json) {
  console.log(JSON.stringify(resultados, null, 2))
} else {
  for (const r of resultados) {
    const tipo = r.modelo ? (r.modelo === '65' ? 'NFC-e' : 'NF-e') : 'documento'
    const obrigatorias = r.problemas.filter((p) => p.aplicacao === 'obrigatoria' && p.efeito !== 'alerta').length
    const resumo = r.valida
      ? verde(r.problemas.length ? `passa (${r.problemas.length} ressalva${r.problemas.length > 1 ? 's' : ''} a critério da UF)` : 'passa')
      : vermelho(`${obrigatorias} rejeiç${obrigatorias > 1 ? 'ões' : 'ão'}`)
    console.log(`${r.arquivo}  ${tipo}${r.chave ? ` ${cinza(r.chave)}` : ''}  ${resumo}`)
    for (const p of r.problemas) {
      const marca = p.aplicacao === 'obrigatoria' ? vermelho(String(p.cStat).padStart(4)) : amarelo(String(p.cStat).padStart(4))
      console.log(`  ${marca}  ${p.mensagem}${p.aplicacao === 'facultativa' ? amarelo(' (a critério da UF)') : ''}`)
      if (p.detalhe) console.log(`        ${p.detalhe}`)
      const onde = [p.caminho, p.linha ? `linha ${p.linha}, coluna ${p.coluna}` : null].filter(Boolean).join(' · ')
      if (onde) console.log(cinza(`        ${onde}`))
      console.log(cinza(`        regra ${p.regra} · ${p.fonte}`))
    }
    if (r.etapa !== 'negocio' && r.problemas.length) {
      console.log(cinza(`  (as regras de negócio só rodam depois que a nota passa no schema, como na SEFAZ)`))
    }
  }
}

process.exit(resultados.every((r) => r.valida) ? 0 : 1)
