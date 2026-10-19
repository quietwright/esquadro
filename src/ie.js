// Dígito verificador da inscrição estadual, um algoritmo por UF, conforme os roteiros de crítica
// publicados no SINTEGRA (http://www.sintegra.gov.br/insc_est.html).
//
// Como manda a nota (*2) do MOC, zeros à esquerda não contam: a IE é normalizada antes do
// cálculo. Onde o roteiro admite mais de um formato (BA, PE, RN, TO, SP rural), vale qualquer um.
// Prefixos fixos que o roteiro cita ("sempre 24", "15 ou 75 a 79") não são exigidos: séries novas
// já apareceram depois dos roteiros, e o dígito verificador sozinho pega o erro de digitação.

const digitos = (s) => [...s].map(Number)

// Soma ponderada; `pesos` alinhados da esquerda para a direita com os dígitos.
const soma = (ds, pesos) => ds.reduce((t, d, i) => t + d * pesos[i], 0)

// Pesos 2, 3, ..., max aplicados da direita para a esquerda, recomeçando em 2.
function pesosDaDireita(n, max = 9) {
  const p = []
  for (let i = 0; i < n; i++) p.unshift(2 + (i % (max - 1)))
  return p
}

// Módulo 11 mais comum: resto 0 ou 1 dá 0; senão, 11 - resto.
const mod11 = (s) => (s % 11 < 2 ? 0 : 11 - (s % 11))
const mod10 = (s) => (s % 10 === 0 ? 0 : 10 - (s % 10))

// IE de `tamanho` dígitos com um verificador no fim, pesos 9..2 (ou da direita) e módulo 11.
const simples = (tamanho) => ({ [tamanho]: (ds) => mod11(soma(ds.slice(0, -1), pesosDaDireita(tamanho - 1))) === ds.at(-1) })

// Dois verificadores no fim, cada um pelo módulo 11 com pesos 2..9 da direita.
function doisDigitos(ds) {
  const n = ds.length - 2
  const d1 = mod11(soma(ds.slice(0, n), pesosDaDireita(n)))
  const d2 = mod11(soma([...ds.slice(0, n), d1], pesosDaDireita(n + 1)))
  return d1 === ds[n] && d2 === ds[n + 1]
}

// Bahia: o segundo verificador é calculado primeiro; o módulo (10 ou 11) depende do primeiro
// dígito (IE de 8) ou do segundo (IE de 9).
function bahia(ds) {
  const n = ds.length - 2
  const seletor = ds[ds.length === 8 ? 0 : 1]
  const mod = [6, 7, 9].includes(seletor) ? mod11 : mod10
  const base = ds.slice(0, n)
  const d2 = mod(soma(base, pesosDaDireita(n)))
  const d1 = mod(soma([...base, d2], pesosDaDireita(n + 1)))
  return d1 === ds[n] && d2 === ds[n + 1]
}

// São Paulo, comércio e indústria: verificadores na 9ª e na 12ª posição, e o dígito é o
// algarismo da direita do resto.
function saoPaulo(ds) {
  const d1 = soma(ds.slice(0, 8), [1, 3, 4, 5, 6, 7, 8, 10]) % 11 % 10
  const d2 = soma(ds.slice(0, 11), [3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2]) % 11 % 10
  return d1 === ds[8] && d2 === ds[11]
}

// São Paulo, produtor rural (P0MMMSSSSD000): o schema da NF-e não aceita a letra, sobram 12
// dígitos com o verificador na 9ª posição.
const saoPauloRural = (ds) => ds[0] === 0 && soma(ds.slice(0, 8), [1, 3, 4, 5, 6, 7, 8, 10]) % 11 % 10 === ds[8]

// Minas Gerais: o primeiro verificador soma os algarismos dos produtos (pesos 1 e 2 alternados,
// com um 0 inserido depois do código do município); o segundo é módulo 11 com pesos até 11.
function minasGerais(ds) {
  const trabalhado = [...ds.slice(0, 3), 0, ...ds.slice(3, 11)]
  let s1 = 0
  trabalhado.forEach((d, i) => {
    const p = d * (i % 2 === 0 ? 1 : 2)
    s1 += Math.floor(p / 10) + (p % 10)
  })
  const d1 = mod10(s1)
  const d2 = mod11(soma([...ds.slice(0, 11), d1], pesosDaDireita(12, 11)))
  return d1 === ds[11] && d2 === ds[12]
}

// Amapá: constantes p e d conforme a faixa da inscrição.
function amapa(ds) {
  const n = Number(ds.slice(0, 8).join(''))
  const [p, d] = n <= 3017000 ? [5, 0] : n <= 3019022 ? [9, 1] : [0, 0]
  const dig = 11 - ((p + soma(ds.slice(0, 8), [9, 8, 7, 6, 5, 4, 3, 2])) % 11)
  return (dig === 10 ? 0 : dig === 11 ? d : dig) === ds[8]
}

// Alagoas e Rio Grande do Norte: soma × 10, módulo 11, resto 10 vira 0.
const vezesDez = (ds) => ((soma(ds.slice(0, -1), pesosDaDireita(ds.length - 1, 10)) * 10) % 11) % 10 === ds.at(-1)

function amazonas(ds) {
  const s = soma(ds.slice(0, 8), [9, 8, 7, 6, 5, 4, 3, 2])
  return (s < 11 ? 11 - s : mod11(s)) === ds[8]
}

// Goiás: resto 1 dá 1 na faixa 10103105 a 10119997 e 0 fora dela. A faixa varia entre roteiros
// antigos e o atual, que diz só "resto 0 ou 1 dá 0"; com resto 1, aceita os dois.
function goias(ds) {
  const r = soma(ds.slice(0, 8), [9, 8, 7, 6, 5, 4, 3, 2]) % 11
  if (r === 1) return ds[8] === 0 || ds[8] === 1
  return (r === 0 ? 0 : 11 - r) === ds[8]
}

// Pernambuco, cadastro antigo (CACEPE, 14 dígitos): diferença maior que 9 perde uma dezena.
function pernambucoAntigo(ds) {
  const dig = 11 - (soma(ds.slice(0, 13), [5, 4, 3, 2, 1, 9, 8, 7, 6, 5, 4, 3, 2]) % 11)
  return (dig > 9 ? dig - 10 : dig) === ds[13]
}

// Pernambuco, eFisco (9 dígitos): dois verificadores no fim.
function pernambuco(ds) {
  const d1 = mod11(soma(ds.slice(0, 7), [8, 7, 6, 5, 4, 3, 2]))
  const d2 = mod11(soma([...ds.slice(0, 7), d1], [9, 8, 7, 6, 5, 4, 3, 2]))
  return d1 === ds[7] && d2 === ds[8]
}

function parana(ds) {
  const d1 = mod11(soma(ds.slice(0, 8), [3, 2, 7, 6, 5, 4, 3, 2]))
  const d2 = mod11(soma([...ds.slice(0, 8), d1], [4, 3, 2, 7, 6, 5, 4, 3, 2]))
  return d1 === ds[8] && d2 === ds[9]
}

// Rondônia (desde 2000, 14 dígitos): diferença 10 ou 11 perde uma dezena.
function rondonia(ds) {
  const dig = 11 - (soma(ds.slice(0, 13), pesosDaDireita(13)) % 11)
  return (dig >= 10 ? dig - 10 : dig) === ds[13]
}

// Roraima: pesos 1 a 8 da esquerda, módulo 9.
const roraima = (ds) => soma(ds.slice(0, 8), [1, 2, 3, 4, 5, 6, 7, 8]) % 9 === ds[8]

// Tocantins, formato antigo de 11 dígitos: o 3º e o 4º (tipo de empresa) não entram no cálculo.
function tocantinsAntigo(ds) {
  if (!['01', '02', '03', '99'].includes(ds.slice(2, 4).join(''))) return false
  return mod11(soma([...ds.slice(0, 2), ...ds.slice(4, 10)], [9, 8, 7, 6, 5, 4, 3, 2])) === ds[10]
}

// Formatos aceitos por UF: tamanho → conferência.
const FORMATOS = {
  AC: { 13: doisDigitos },
  AL: { 9: vezesDez },
  AM: { 9: amazonas },
  AP: { 9: amapa },
  BA: { 8: bahia, 9: bahia },
  CE: simples(9),
  DF: { 13: doisDigitos },
  ES: simples(9),
  GO: { 9: goias },
  MA: simples(9),
  MG: { 13: minasGerais },
  MS: simples(9),
  MT: simples(11),
  PA: simples(9),
  PB: simples(9),
  PE: { 9: pernambuco, 14: pernambucoAntigo },
  PI: simples(9),
  PR: { 10: parana },
  RJ: { 8: (ds) => mod11(soma(ds.slice(0, 7), [2, 7, 6, 5, 4, 3, 2])) === ds[7] },
  RN: { 9: vezesDez, 10: vezesDez },
  RO: { 14: rondonia },
  RR: { 9: roraima },
  RS: simples(10),
  SC: simples(9),
  SE: simples(9),
  SP: { 12: (ds) => saoPaulo(ds) || saoPauloRural(ds) },
  TO: { 9: simples(9)[9], 11: tocantinsAntigo },
}

/**
 * Confere a inscrição estadual para a UF.
 * @param {string} ie   Só dígitos, como no XML.
 * @param {string} uf   Sigla.
 * @returns {string|null}  null se válida (ou se a UF não tem roteiro); senão, o motivo.
 */
export function problemaNaIe(ie, uf) {
  const formatos = FORMATOS[uf]
  if (!formatos) return null
  if (!/^\d+$/.test(ie)) return 'a IE tem caracteres que não são dígitos'
  const significativa = ie.replace(/^0+/, '')
  const tamanhos = Object.keys(formatos).map(Number)
  const cabem = tamanhos.filter((t) => significativa.length <= t && significativa.length > 0)
  if (!cabem.length) {
    return `${significativa.length} dígitos significativos; ${uf} usa ${tamanhos.join(' ou ')}`
  }
  for (const t of cabem) if (formatos[t](digitos(significativa.padStart(t, '0')))) return null
  return `dígito verificador não confere com o cálculo de ${uf}`
}

export const UFS_COM_ROTEIRO = Object.keys(FORMATOS)
