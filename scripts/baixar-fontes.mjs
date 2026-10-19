// Baixa do Portal da NF-e os documentos de onde as regras saem: Manual de Orientação do
// Contribuinte (MOC) e Anexo I, todas as Notas Técnicas e o pacote de schemas mais recente.
// Grava tudo em fontes/ (fora do git) e escreve fontes/manifesto.json com URL e sha256 de cada
// arquivo, para que toda regra do catálogo possa apontar o documento exato de onde veio.

import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { PORTAL, buscar, listar } from './portal.mjs'

// Tabelas de apoio da seção "Diversos". O portal lista da mais nova para a mais antiga; fica a
// primeira que casa com o título.
const TABELAS = {
  cfop: /^Tabela de CFOP/,
  municipios: /^Tabela de Municípios/,
  paises: /^Tabela de Países/,
  gs1: /^Tabela Prefixo GS1/,
  'combustiveis-monofasicos': /^Tabela de códigos? de combustíveis sujeitos à tributação monofásica/i,
  'fcp-uf': /^Tabela de Alíquotas de FCP por UF/,
  'lista-servicos': /^Tabela de Códigos de item da Lista de Serviços/i,
  veiculos: /^Tabela de Tipo e Espécie de Veículo/,
  cclasstrib: /^Tabela de (Código de )?Classificação Tributária do IBS/,
  'credito-presumido': /^Tabela de Código de Crédito Presumido do IBS/,
  'aliquotas-cbs': /^Tabela de Alíquotas da CBS/,
  'meios-pagamento': /^Tabela de Meios de pagamento/i,
  bandeiras: /^Tabela de bandeiras de Cartões/,
  anp: /^Tabela de Códigos? de Produtos da ANP/,
  'ncm-utrib': /^Tabela de NCM e respectiva uTrib/i,
  'cst-ibscbs': /^Tabela de Indicadores de CST do IBS/,
  'biocombustivel': /^Tabela de Código de Índice de Biocombustível/,
}
const destino = process.argv[2] ?? 'fontes'

function nomeDaNota(titulo) {
  const m = titulo.match(/(Conjunta )?(\d{4}\.\d{3})\W+v\.?\s*([\d.]+\w?)/)
  if (!m) return titulo.replace(/\W+/g, '-').slice(0, 40)
  return `${m[1] ? 'ntc' : 'nt'}-${m[2]}-v${m[3].replace(/\.$/, '')}`
}

const escolhidos = []
const manuais = await listar('manuais')
for (const l of manuais) {
  if (/^Manual de Orientação ao Contribuinte - MOC/.test(l.titulo)) escolhidos.push({ ...l, arquivo: 'moc.pdf' })
  if (/Anexo I - Leiaute e Regra de Validação/.test(l.titulo)) escolhidos.push({ ...l, arquivo: 'moc-anexo1.pdf' })
}
const notas = await listar('notas')
for (const l of notas) escolhidos.push({ ...l, arquivo: join('nt', `${nomeDaNota(l.titulo)}.pdf`) })
const esquemas = await listar('esquemas')
const pacote = esquemas.find((l) => /Pacote de Liberação/.test(l.titulo))
escolhidos.push({ ...pacote, arquivo: join('xsd', 'pacote.zip') })

const diversos = await listar('diversos')
for (const [nome, padrao] of Object.entries(TABELAS)) {
  const tabela = diversos.find((l) => padrao.test(l.titulo))
  if (tabela) escolhidos.push({ ...tabela, arquivo: join('tabelas', `${nome}.bin`) })
  else console.error(`tabela não encontrada no portal: ${nome}`)
}

mkdirSync(join(destino, 'nt'), { recursive: true })
mkdirSync(join(destino, 'tabelas'), { recursive: true })
mkdirSync(join(destino, 'xsd'), { recursive: true })
const manifesto = []
for (const item of escolhidos) {
  const alvo = join(destino, item.arquivo)
  const conteudo = existsSync(alvo) ? readFileSync(alvo) : await buscar(item.caminho)
  writeFileSync(alvo, conteudo)
  manifesto.push({
    titulo: item.titulo,
    url: PORTAL + item.caminho,
    arquivo: item.arquivo,
    sha256: createHash('sha256').update(conteudo).digest('hex'),
  })
  process.stderr.write('.')
}
writeFileSync(join(destino, 'manifesto.json'), JSON.stringify(manifesto, null, 1) + '\n')
// Retrato das listas do portal neste download. O scripts/vigiar-portal.mjs compara o portal com
// ele para avisar quando sai documento novo.
const titulos = (lista) => lista.map((l) => l.titulo)
const retrato = { manuais: titulos(manuais), notas: titulos(notas), esquemas: titulos(esquemas), diversos: titulos(diversos) }
writeFileSync('catalogo/portal.json', JSON.stringify(retrato, null, 1) + '\n')
console.error(`\n${manifesto.length} arquivos em ${destino}/`)
