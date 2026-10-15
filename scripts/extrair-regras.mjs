// Extrai as tabelas de regras de validação de um PDF da NF-e (MOC Anexo I ou Nota Técnica).
//
//   node scripts/extrair-regras.mjs <pdf> <paginas> <documento> <saida.json>
//   node scripts/extrair-regras.mjs fontes/moc-anexo1.pdf 71-153 "MOC 7.0 Anexo I" catalogo/moc-anexo1.json
//
// O PDF não tem estrutura de tabela, só texto alinhado (lido com `pdftotext -layout`). Cada regra
// começa numa linha com, nessa ordem: id, modelo (às vezes), texto da regra, Obrig./Facul.,
// cStat, efeito (só no MOC) e a mensagem. As linhas seguintes continuam a regra (à esquerda) ou a
// mensagem (à direita da coluna onde a mensagem começou).

import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export const linhaDeRegra =
  /^(\s*)(\d{0,2}[A-Z][A-Za-z0-9.]*-\d+[a-z]?|[A-Z]\d{2}[a-z]?)\s+(?:(55\/65|55|65)\s+)?(.*?)\s+(Obrig|Facul)\.?\s+(\d{3,4})\s+(?:(Rej|Den|Alerta)[.,]?\s+)?(.*)$/
const cabecalhoNumerado = /^\s*(\d+(?:\.\d+)+)\.?\s+(\S.+?)\s*$/
const cabecalhoDeTopo = /^\s*(\d+)\.\s+([A-ZÀ-Ú][^.]{2,80}?)\s*$/
const cabecalhoDeGrupo = /^\s*Grupo ([0-9A-Z]+[a-z]?)[.:]\s+(\S.+?)\s*$/
const ruido = [
  /^\s*Nota Fiscal Eletrônica/,
  /^\s*MOC 7\.0 – Anexo I/,
  /^\s*Reforma Tributária – Lei Complementar/,
  /^\s*NT \d{4}\.\d{3}/,
  /^\s*(#|Campo(-Seq)?)\s+.*Regra de Valida/,
  /Página \d+ \/ \d+\s*$/,
]

// Serviço do webservice a que a seção se refere; null quando o título não diz.
function servico(titulo) {
  if (/Evento/i.test(titulo)) return 'evento'
  if (/Inutiliza/i.test(titulo)) return 'inutilizacao'
  if (/Consulta|Status do Servi|Distribui/i.test(titulo)) return 'consulta'
  if (/Autoriza|Regras de Valida/i.test(titulo)) return 'autorizacao'
  return null
}

export function extrair(pdf, documento, primeira = 1, ultima = null) {
  const args = ['-layout', '-f', String(primeira)]
  if (ultima) args.push('-l', String(ultima))
  const texto = execFileSync('pdftotext', [...args, pdf, '-'], { encoding: 'utf8', maxBuffer: 64 << 20 })
  const regras = []
  let pagina = primeira
  let secao = null
  let grupo = null
  let atual = null
  let servicoAtual = 'autorizacao'
  let colunaMensagem = 0

  for (const bruta of texto.split('\n')) {
    if (bruta.includes('\f')) pagina += bruta.split('\f').length - 1
    const linha = bruta.replaceAll('\f', '')
    if (!linha.trim() || ruido.some((r) => r.test(linha))) continue

    const m = linha.match(linhaDeRegra)
    if (!m) {
      const t = linha.match(cabecalhoDeTopo)
      const n = linha.match(cabecalhoNumerado)
      const g = linha.match(cabecalhoDeGrupo)
      if (t && !/\s{3}/.test(t[2])) {
        // No MOC, os grupos de regras que consultam bases da SEFAZ vêm numerados ("1. Banco de
        // Dados: Emitente") como se fossem seções.
        if (/^Banco de Dados/.test(t[2])) grupo = `${t[1]}. ${t[2]}`
        else {
          secao = `${t[1]} ${t[2]}`
          servicoAtual = servico(t[2]) ?? 'autorizacao'
          grupo = null
        }
        atual = null
        continue
      }
      if (n && /^[A-ZÀ-Ú][^\s]*(?: \S+)*$/.test(n[2]) && !/\.{4}/.test(n[2])) {
        secao = `${n[1]} ${n[2]}`
        servicoAtual = servico(n[2]) ?? servicoAtual
        grupo = null
        atual = null
        continue
      }
      if (g && linha.trimStart().startsWith('Grupo')) {
        grupo = `${g[1]}. ${g[2]}`
        atual = null
        continue
      }
    }

    if (m) {
      const [, , id, modelo, regra, aplicacao, cStat, efeito, mensagem] = m
      colunaMensagem = linha.length - mensagem.length
      atual = {
        id,
        documento,
        secao,
        grupo,
        modelos: modelo ? modelo.split('/') : null,
        aplicacao: aplicacao === 'Obrig' ? 'obrigatoria' : 'facultativa',
        cStat: Number(cStat),
        efeito: efeito ? { Rej: 'rejeicao', Den: 'denegacao', Alerta: 'alerta' }[efeito] : null,
        regra: [regra.trim()],
        mensagem: [mensagem.trim()],
        pagina,
        servico: servicoAtual,
      }
      regras.push(atual)
      continue
    }

    if (!atual) continue
    // Continuação: o que está à direita da coluna da mensagem é mensagem; o resto é regra.
    const corte = colunaMensagem - 2
    const esquerda = linha.slice(0, corte).trim()
    const direita = linha.slice(corte).trim()
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
    if (!r.efeito) {
      r.efeito = /^Uso Denegado/i.test(r.mensagem) ? 'denegacao' : /^Alerta/i.test(r.mensagem) ? 'alerta' : 'rejeicao'
    }
    // Regras com prefixo numérico (1C17-10, 3BA02-10…) consultam bases da SEFAZ.
    r.consultaBaseSefaz = /^\d/.test(r.id)
  }
  return regras
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [pdf, paginas, documento, saida] = process.argv.slice(2)
  if (!saida) {
    console.error('uso: node extrair-regras.mjs <pdf> <primeira-ultima> <documento> <saida.json>')
    process.exit(2)
  }
  const [primeira, ultima] = paginas.split('-').map(Number)
  const regras = extrair(pdf, documento, primeira, ultima)
  writeFileSync(saida, JSON.stringify(regras, null, 1) + '\n')
  console.error(`${documento}: ${regras.length} regras`)
}
