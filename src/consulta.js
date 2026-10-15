// Atalhos para navegar na NF-e dentro das regras: caminhos curtos como 'ide/tpNF' em vez de
// laços sobre filhos. Tudo devolve undefined (ou lista vazia) quando o caminho não existe, para
// que uma regra nunca quebre por causa de um grupo opcional ausente.

import { elementos, texto } from './xml.js'

/** Primeiro elemento no caminho 'a/b/c' a partir de `no`. */
export function el(no, caminho) {
  let atual = no
  for (const nome of caminho.split('/')) {
    if (!atual) return undefined
    atual = elementos(atual).find((f) => f.nome === nome)
  }
  return atual
}

/** Todos os elementos que casam com o caminho, percorrendo cada nível repetido. */
export function todos(no, caminho) {
  let atuais = no ? [no] : []
  for (const nome of caminho.split('/')) {
    atuais = atuais.flatMap((n) => elementos(n).filter((f) => f.nome === nome))
  }
  return atuais
}

/** Texto do primeiro elemento no caminho, ou undefined. */
export function val(no, caminho) {
  const e = el(no, caminho)
  return e ? texto(e) : undefined
}

/** Valor numérico do caminho, ou 0 se ausente. Os decimais da NF-e usam ponto. */
export function num(no, caminho) {
  const v = val(no, caminho)
  return v === undefined || v === '' ? 0 : Number(v)
}

/** Soma de um campo numérico em todos os elementos do caminho. */
export function soma(no, caminho) {
  return todos(no, caminho).reduce((s, e) => s + Number(texto(e) || 0), 0)
}

/** Se o caminho existe. */
export function tem(no, caminho) {
  return el(no, caminho) !== undefined
}

/** Primeiro filho elemento (para grupos de escolha como ICMS/ICMS00, ICMS/ICMS20...). */
export function primeiroFilho(no) {
  return no ? elementos(no)[0] : undefined
}

/**
 * Compara valores monetários com tolerância. A SEFAZ calcula em centavos; erros de ponto
 * flutuante do lado de cá não podem virar rejeição.
 */
export function difere(a, b, tolerancia = 0) {
  return Math.abs(Math.round(a * 100) - Math.round(b * 100)) > Math.round(tolerancia * 100)
}

/** Todos os descendentes com o nome dado, em qualquer profundidade. */
export function descendentes(no, nome) {
  const achados = []
  const visitar = (n) => {
    for (const f of elementos(n)) {
      if (f.nome === nome) achados.push(f)
      visitar(f)
    }
  }
  if (no) visitar(no)
  return achados
}

/** Soma de todos os descendentes com o nome dado. */
export function somaDescendentes(no, nome) {
  return descendentes(no, nome).reduce((s, e) => s + Number(texto(e) || 0), 0)
}
