// Gera src/tabelas.js com as tabelas de apoio oficiais (seção "Diversos" do Portal da NF-e)
// que as regras consultam: CFOP e seus indicadores, municípios do IBGE, países do BACEN,
// prefixos GS1, combustíveis da tributação monofásica, alíquotas de FCP por UF, lista de
// serviços, tipo e espécie de veículo, meios de pagamento e classificação tributária do IBS/CBS.
//
// Requer fontes/ (npm run fontes) e o comando unzip.

import { readFileSync, writeFileSync } from 'node:fs'
import { lerOds, lerXlsx } from './ler-planilha.mjs'

const manifesto = JSON.parse(readFileSync('fontes/manifesto.json', 'utf8'))
const fonte = (nome) => manifesto.find((m) => m.arquivo === `tabelas/${nome}.bin`)
const arquivo = (nome) => `fontes/tabelas/${nome}.bin`

// Datas do Excel (número de dias desde 30/12/1899) ou dd/mm/aaaa, para AAAA-MM-DD.
function data(v) {
  if (!v) return null
  if (/^\d+(\.\d+)?$/.test(v)) return new Date(Date.UTC(1899, 11, 30) + Math.floor(Number(v)) * 86400000).toISOString().slice(0, 10)
  const m = v.match(/^(\d{2})\/(\d{2})\/(\d{4})/)
  return m ? `${m[3]}-${m[2]}-${m[1]}` : null
}

// Linhas de dados: a partir do cabeçalho que tem a coluna `chave`.
function corpo(linhas, chave) {
  const i = linhas.findIndex((l) => l.includes(chave))
  if (i < 0) throw new Error(`cabeçalho "${chave}" não encontrado`)
  const cabecalho = linhas[i]
  return linhas.slice(i + 1).map((l) => Object.fromEntries(cabecalho.map((c, j) => [c, l[j] ?? ''])))
}

const tabelas = { fontes: {} }
const registrar = (nome) => {
  const f = fonte(nome)
  tabelas.fontes[nome] = { titulo: f.titulo, sha256: f.sha256 }
}

// CFOP: indicadores na ordem da planilha, num texto de 0/1, mais a vigência.
const INDICADORES_CFOP = ['indNFe', 'indComunica', 'indTransp', 'indDevol', 'indRetor', 'indAnula', 'indRemes', 'indComb', 'indExcIBSCBS']
tabelas.cfop = {}
for (const l of corpo(lerXlsx(arquivo('cfop')), 'CFOP')) {
  if (!/^\d{4}$/.test(l.CFOP)) continue
  tabelas.cfop[l.CFOP] = [INDICADORES_CFOP.map((k) => (/^\d$/.test(l[k]) ? l[k] : '0')).join(''), data(l['Início de vigência']), data(l['Fim de vigência'])]
}
tabelas.indicadoresCfop = INDICADORES_CFOP
registrar('cfop')

tabelas.municipios = corpo(lerXlsx(arquivo('municipios')), 'cMun')
  .map((l) => l.cMun)
  .filter((c) => /^\d{7}$/.test(c))
  .join(',')
registrar('municipios')

tabelas.paises = corpo(lerOds(arquivo('paises')), 'cPais')
  .filter((l) => /^\d+$/.test(l.cPais))
  .map((l) => [Number(l.cPais), data(l['Data Início']), data(l['Data Fim'])])
registrar('paises')

tabelas.gs1 = corpo(lerXlsx(arquivo('gs1'), 1), 'fxPrefixIni')
  .filter((l) => /^\d+$/.test(l.fxPrefixIni))
  .map((l) => [Number(l.fxPrefixIni), Number(l.fxPrefixFim)])
registrar('gs1')

tabelas.combustiveisMonofasicos = {}
for (const l of corpo(lerXlsx(arquivo('combustiveis-monofasicos')), 'cProdANP')) {
  if (!/^\d{9}$/.test(l.cProdANP)) continue
  tabelas.combustiveisMonofasicos[l.cProdANP] = { pBio: l.pBio === '1', origComb: l.origComb === '1', uTrib: l.uTrib, adRemICMS: Number(l.adRemICMS) }
}
registrar('combustiveis-monofasicos')

tabelas.anp = corpo(lerXlsx(arquivo('anp')), 'cProdANP')
  .map((l) => l.cProdANP)
  .filter((c) => /^\d{9}$/.test(c))
  .join(',')
registrar('anp')

// FCP: por UF, alíquotas fixas aceitas ou um máximo ("Fixo:2.00", "Max:4.00").
tabelas.fcp = {}
for (const l of corpo(lerXlsx(arquivo('fcp-uf')), 'cUF')) {
  if (!/^\d{2}$/.test(l.cUF)) continue
  const regras = ['Aliq_1', 'Aliq_2', 'Aliq_3']
    .map((k) => l[k].replace(/\s/g, '').match(/^(Fixo|Max):([\d.]+)$/))
    .filter(Boolean)
    .map((m) => [m[1] === 'Fixo' ? 'fixo' : 'max', Number(m[2])])
  tabelas.fcp[l.cUF] = regras
}
registrar('fcp-uf')

tabelas.listaServicos = corpo(lerXlsx(arquivo('lista-servicos')), 'cListServ')
  .map((l) => l.cListServ)
  .filter((c) => /^\d{2}\.\d{2}$/.test(c))
  .join(',')
registrar('lista-servicos')

tabelas.veiculos = corpo(lerXlsx(arquivo('veiculos')), 'tpVeic')
  .filter((l) => /^\d+$/.test(l.tpVeic) && /^\d+$/.test(l.EspVeic) && !data(l.dFimVig))
  .map((l) => `${l.tpVeic}-${l.EspVeic}`)
  .join(',')
registrar('veiculos')

tabelas.meiosPagamento = corpo(lerXlsx(arquivo('meios-pagamento')), 'tPag')
  .filter((l) => /^\d{2}$/.test(l.tPag))
  .map((l) => [l.tPag, data(l.dIniVig), data(l.dFimVig)])
registrar('meios-pagamento')

// cClassTrib: o que as regras do grupo UB consultam.
tabelas.cclasstrib = {}
for (const l of corpo(lerXlsx(arquivo('cclasstrib')), 'cClassTrib')) {
  if (!/^\d{6}$/.test(l.cClassTrib)) continue
  tabelas.cclasstrib[l.cClassTrib] = {
    cst: l['CST-IBS/CBS'],
    tipoAliquota: l['Tipo de Alíquota'],
    pRedIBS: Number(l.pRedIBS || 0),
    pRedCBS: Number(l.pRedCBS || 0),
    grupos: ['ind_gTribRegular', 'ind_gCredPresOper', 'ind_gMonoPadrao', 'ind_gMonoReten', 'ind_gMonoRet', 'ind_gpBioDiferenca', 'ind_gEstornoCred']
      .filter((k) => l[k] === '1')
      .map((k) => k.slice(4)),
    nfe: l.indNFe === '1',
    nfce: l.indNFCe === '1',
    inicio: data(l.dIniVig),
    fim: data(l.dFimVig),
  }
}
registrar('cclasstrib')

const json = JSON.stringify(tabelas)
writeFileSync(
  'src/tabelas.js',
  '// Gerado por scripts/montar-tabelas.mjs a partir das tabelas de apoio do Portal da NF-e. Não editar à mão.\n\n' +
    `export default ${json}\n`,
)
console.error(
  `tabelas: ${Object.keys(tabelas.cfop).length} CFOP, ${tabelas.municipios.split(',').length} municípios, ${tabelas.paises.length} países, ` +
    `${tabelas.gs1.length} faixas GS1, ${Object.keys(tabelas.cclasstrib).length} cClassTrib (${(json.length / 1024).toFixed(0)} KB)`,
)
