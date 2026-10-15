// Consultas às tabelas de apoio oficiais (src/tabelas.js, gerado a partir do Portal da NF-e).

import t from './tabelas.js'

const conjunto = (lista) => new Set(lista.split(','))
const municipios = conjunto(t.municipios)
const listaServicos = conjunto(t.listaServicos)
const veiculos = conjunto(t.veiculos)
const anp = conjunto(t.anp)

const vigente = (inicio, fim, dia) => (!inicio || !dia || inicio <= dia) && (!fim || !dia || dia <= fim)

/** Indicadores do CFOP na data (AAAA-MM-DD), ou null se não existe ou não está vigente. */
export function cfop(codigo, dia) {
  const linha = t.cfop[codigo]
  if (!linha || !vigente(linha[1], linha[2], dia)) return null
  const ind = Object.fromEntries(t.indicadoresCfop.map((k, i) => [k, Number(linha[0][i])]))
  return ind
}

export const municipioExiste = (codigo) => municipios.has(codigo)

export function paisExiste(codigo, dia) {
  const n = Number(codigo)
  return t.paises.some(([c, inicio, fim]) => c === n && vigente(inicio, fim, dia))
}

/** Prefixo GS1 do GTIN: posições 2 a 4 do GTIN em 14 dígitos, ou 7 a 9 se for GTIN-8. */
export function prefixoGs1Valido(gtin) {
  const g = gtin.padStart(14, '0')
  const prefixo = Number(g.startsWith('000000') ? g.slice(6, 9) : g.slice(1, 4))
  return t.gs1.some(([ini, fim]) => prefixo >= ini && prefixo <= fim)
}

export const combustivelMonofasico = (cProdANP) => t.combustiveisMonofasicos[cProdANP] ?? null
export const produtoAnpExiste = (cProdANP) => anp.has(cProdANP)
export const itemListaServicosExiste = (cListServ) => listaServicos.has(cListServ)
export const veiculoExiste = (tpVeic, espVeic) => veiculos.has(`${Number(tpVeic)}-${Number(espVeic)}`)
export const tipoDeVeiculoExiste = (tpVeic) => [...veiculos].some((v) => v.startsWith(`${Number(tpVeic)}-`))
export const especieDeVeiculoExiste = (espVeic) => [...veiculos].some((v) => v.endsWith(`-${Number(espVeic)}`))

export function meioDePagamentoVigente(tPag, dia) {
  return t.meiosPagamento.some(([c, inicio, fim]) => c === tPag && vigente(inicio, fim, dia))
}

/** Percentual de FCP aceito para a UF (código IBGE), segundo a tabela por UF. */
export function fcpAceito(cUF, percentual) {
  const regras = t.fcp[cUF]
  if (!regras) return true
  return regras.some(([tipo, v]) => (tipo === 'fixo' ? Math.abs(percentual - v) < 1e-9 : percentual <= v + 1e-9))
}

export const fcpPermitidos = (cUF) => t.fcp[cUF] ?? []
export const classificacaoTributaria = (cClassTrib) => t.cclasstrib[cClassTrib] ?? null
export const fontesDasTabelas = t.fontes

export function bandeiraVigente(tBand, dia) {
  return t.bandeiras.some(([c, inicio, fim]) => c === tBand && vigente(inicio, fim, dia))
}

/** Indicadores do CST do IBS/CBS (1 exige, 0 veda, null: avaliar no cClassTrib), ou null. */
export const indicadoresCstIbsCbs = (cst) => t.cstIbsCbs[cst] ?? null
export const creditoPresumido = (cCredPres) => t.creditoPresumido[cCredPres] ?? null
export const cstIbsCbsConhecido = (cst) => cst in t.cstIbsCbs || Object.values(t.cclasstrib).some((c) => c.cst === cst)
