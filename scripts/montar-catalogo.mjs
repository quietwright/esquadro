// Monta catalogo/regras.json: as regras de validação da autorização de NF-e/NFC-e vigentes,
// partindo do MOC 7.0 Anexo I (novembro de 2020) e aplicando por cima, em ordem de publicação,
// a versão mais recente de cada Nota Técnica publicada depois dele.
//
// Quando duas fontes trazem o mesmo id de regra, vale a publicada por último; as anteriores
// ficam em `historico`. Isso segue como as NTs funcionam: cada uma republica a regra inteira
// que altera, com o mesmo id.
//
// Requer fontes/ (npm run fontes) e pdftotext (poppler).

import { readFileSync, writeFileSync } from 'node:fs'
import { extrair } from './extrair-regras.mjs'

const BASE = { documento: 'MOC 7.0 Anexo I', arquivo: 'moc-anexo1.pdf', paginas: [71, 153], data: '2020-11-01' }

const manifesto = JSON.parse(readFileSync('fontes/manifesto.json', 'utf8'))
// Correções feitas à mão, cada uma com o motivo, para o que a extração automática não acerta.
const ajustes = JSON.parse(readFileSync('catalogo/ajustes.json', 'utf8'))
const excluida = (r) =>
  ajustes.some((a) => a.acao === 'excluir' && r.documento.startsWith(a.documento + ' ') && a.ids.includes(r.id))

function dataDe(titulo) {
  const m = titulo.match(/(\d{2})\/(\d{2})\/(\d{2,4})/)
  if (!m) return null
  return `${m[3].length === 2 ? '20' + m[3] : m[3]}-${m[2]}-${m[1]}`
}

// Versão mais recente de cada NT, pela data de publicação no título do portal.
const notas = new Map()
for (const item of manifesto) {
  const m = item.arquivo.match(/^nt\/(ntc?)-(\d{4}\.\d{3})-v(.+)\.pdf$/)
  if (!m) continue
  const data = dataDe(item.titulo)
  if (!data) continue
  const chave = `${m[1]}-${m[2]}`
  const documento = `${m[1] === 'ntc' ? 'NT Conjunta' : 'NT'} ${m[2]} v${m[3]}`
  const anterior = notas.get(chave)
  if (!anterior || data > anterior.data) notas.set(chave, { documento, arquivo: item.arquivo, data })
}
const aplicadas = [...notas.values()]
  .filter((n) => n.data > BASE.data)
  .sort((a, b) => a.data.localeCompare(b.data) || a.documento.localeCompare(b.documento))

const regras = new Map()
const fontes = []
for (const fonte of [BASE, ...aplicadas]) {
  const [primeira, ultima] = fonte.paginas ?? [1, null]
  const extraidas = extrair(`fontes/${fonte.arquivo}`, fonte.documento, primeira, ultima)
  const daAutorizacao = extraidas.filter((r) => r.servico === 'autorizacao' && !excluida(r))
  const sha256 = manifesto.find((i) => i.arquivo === fonte.arquivo).sha256
  fontes.push({ ...fonte, sha256, regras: daAutorizacao.length })
  for (const r of daAutorizacao) {
    const anterior = regras.get(r.id)
    const historico = anterior ? [...anterior.historico, origem(anterior)] : []
    regras.set(r.id, { ...r, data: fonte.data, historico })
  }
  console.error(`${fonte.documento.padEnd(24)} ${String(daAutorizacao.length).padStart(4)} regras`)
}

function origem(r) {
  return { documento: r.documento, pagina: r.pagina, cStat: r.cStat }
}

const ordenadas = [...regras.values()]
  .map(({ servico, secao, data, ...r }) => r)
  .sort((a, b) => a.id.localeCompare(b.id, 'en', { numeric: true }))

writeFileSync('catalogo/regras.json', JSON.stringify(ordenadas, null, 1) + '\n')
writeFileSync('catalogo/fontes.json', JSON.stringify(fontes, null, 1) + '\n')
console.error(`\n${ordenadas.length} regras vigentes de ${fontes.length} documentos`)
