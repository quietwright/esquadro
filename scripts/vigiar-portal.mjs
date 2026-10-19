// Compara as listas do Portal da NF-e com catalogo/portal.json, o retrato do último download.
// Imprime os documentos que entraram ou saíram e termina com código 2 se houver diferença: é
// o sinal para baixar as fontes de novo e refazer o catálogo. Roda toda semana no CI.
//
// Código de saída: 0 sem mudança, 2 com mudança (1 fica para erro, como falha de rede).

import { readFileSync } from 'node:fs'
import { LISTAS, listar } from './portal.mjs'

const retrato = JSON.parse(readFileSync('catalogo/portal.json', 'utf8'))
const NOMES = { manuais: 'Manuais', notas: 'Notas Técnicas', esquemas: 'Schemas', diversos: 'Diversos (tabelas)' }
const linhas = []
for (const lista of Object.keys(LISTAS)) {
  const agora = (await listar(lista)).map((l) => l.titulo)
  const antes = new Set(retrato[lista])
  const novos = agora.filter((t) => !antes.has(t))
  const saiu = retrato[lista].filter((t) => !agora.includes(t))
  if (!novos.length && !saiu.length) continue
  linhas.push(`### ${NOMES[lista]}`, '')
  for (const t of novos) linhas.push(`- novo: ${t}`)
  for (const t of saiu) linhas.push(`- saiu: ${t}`)
  linhas.push('')
}
if (linhas.length) {
  console.log(linhas.join('\n'))
  process.exit(2)
}
console.error('portal sem mudanças desde o último download')
