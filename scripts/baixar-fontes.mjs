// Baixa do Portal da NF-e os documentos de onde as regras saem: Manual de Orientação do
// Contribuinte (MOC) e Anexo I, todas as Notas Técnicas e o pacote de schemas mais recente.
// Grava tudo em fontes/ (fora do git) e escreve fontes/manifesto.json com URL e sha256 de cada
// arquivo, para que toda regra do catálogo possa apontar o documento exato de onde veio.
//
// O portal responde com um laço de redirecionamento se o cliente não mandar o cookie de teste
// do ASP.NET (AspxAutoDetectCookieSupport), então ele vai em toda requisição.

import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const PORTAL = 'https://www.nfe.fazenda.gov.br/portal/'
const LISTAS = {
  manuais: 'ndIjl+iEFdE=',
  notas: '04BIflQt1aY=',
  esquemas: 'BMPFMBoln3w=',
  diversos: '/NJarYc9nus=',
}

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

async function buscar(caminho) {
  const resposta = await fetch(PORTAL + caminho, {
    headers: { cookie: 'AspxAutoDetectCookieSupport=1', 'user-agent': 'esquadro' },
  })
  if (!resposta.ok) throw new Error(`${resposta.status} em ${caminho}`)
  return Buffer.from(await resposta.arrayBuffer())
}

const entidades = { amp: '&', quot: '"', lt: '<', gt: '>', '#39': "'" }
const decodificar = (s) => s.replace(/&(amp|quot|lt|gt|#39);/g, (_, e) => entidades[e])

function links(pagina) {
  const achados = []
  for (const m of pagina.matchAll(/<a[^>]*href="([^"]*exibirArquivo[^"]*)"[^>]*>(.*?)<\/a>/gs)) {
    const titulo = decodificar(m[2].replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim()
    // O portal escreve o "+" do base64 como espaço no href; o servidor aceita os dois.
    achados.push({ caminho: decodificar(m[1]).replaceAll(' ', '+'), titulo })
  }
  return achados
}

function nomeDaNota(titulo) {
  const m = titulo.match(/(Conjunta )?(\d{4}\.\d{3})\W+v\.?\s*([\d.]+\w?)/)
  if (!m) return titulo.replace(/\W+/g, '-').slice(0, 40)
  return `${m[1] ? 'ntc' : 'nt'}-${m[2]}-v${m[3].replace(/\.$/, '')}`
}

const escolhidos = []
const manuais = links((await buscar(`listaConteudo.aspx?tipoConteudo=${encodeURIComponent(LISTAS.manuais)}`)).toString())
for (const l of manuais) {
  if (/^Manual de Orientação ao Contribuinte - MOC/.test(l.titulo)) escolhidos.push({ ...l, arquivo: 'moc.pdf' })
  if (/Anexo I - Leiaute e Regra de Validação/.test(l.titulo)) escolhidos.push({ ...l, arquivo: 'moc-anexo1.pdf' })
}
const notas = links((await buscar(`listaConteudo.aspx?tipoConteudo=${encodeURIComponent(LISTAS.notas)}`)).toString())
for (const l of notas) escolhidos.push({ ...l, arquivo: join('nt', `${nomeDaNota(l.titulo)}.pdf`) })
const esquemas = links((await buscar(`listaConteudo.aspx?tipoConteudo=${encodeURIComponent(LISTAS.esquemas)}`)).toString())
const pacote = esquemas.find((l) => /Pacote de Liberação/.test(l.titulo))
escolhidos.push({ ...pacote, arquivo: join('xsd', 'pacote.zip') })

const diversos = links((await buscar(`listaConteudo.aspx?tipoConteudo=${encodeURIComponent(LISTAS.diversos)}`)).toString())
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
console.error(`\n${manifesto.length} arquivos em ${destino}/`)
