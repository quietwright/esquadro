// Funções de apoio comuns às regras: dígitos verificadores e datas.

/**
 * Dígito verificador módulo 11 da chave de acesso (pesos 2 a 9 da direita para a esquerda).
 * Com o CNPJ alfanumérico a chave pode ter letras; cada caractere vale o código ASCII menos 48,
 * o que mantém o resultado para chaves só numéricas (NT Conjunta 2025.001, "Cálculo do DV da
 * Chave de Acesso").
 */
export function dvChave(chave43) {
  let soma = 0
  let peso = 2
  for (let i = chave43.length - 1; i >= 0; i--) {
    soma += (chave43.charCodeAt(i) - 48) * peso
    peso = peso === 9 ? 2 : peso + 1
  }
  const resto = soma % 11
  return resto < 2 ? 0 : 11 - resto
}

/**
 * CNPJ válido, numérico ou alfanumérico (NT 2026.004 / IN RFB 2.229/2024). No alfanumérico,
 * cada caractere vale seu código ASCII menos 48; os dois dígitos verificadores continuam
 * numéricos e são calculados por módulo 11 com pesos 2 a 9.
 */
export function cnpjValido(cnpj) {
  if (!/^[0-9A-Z]{12}[0-9]{2}$/.test(cnpj)) return false
  if (/^(\d)\1{13}$/.test(cnpj)) return false
  const valor = (c) => c.charCodeAt(0) - 48
  const dv = (corpo) => {
    let soma = 0
    let peso = 2
    for (let i = corpo.length - 1; i >= 0; i--) {
      soma += valor(corpo[i]) * peso
      peso = peso === 9 ? 2 : peso + 1
    }
    const resto = soma % 11
    return resto < 2 ? 0 : 11 - resto
  }
  const d1 = dv(cnpj.slice(0, 12))
  const d2 = dv(cnpj.slice(0, 12) + d1)
  return cnpj.slice(12) === `${d1}${d2}`
}

export function cpfValido(cpf) {
  if (!/^\d{11}$/.test(cpf) || /^(\d)\1{10}$/.test(cpf)) return false
  const dv = (corpo) => {
    let soma = 0
    for (let i = 0; i < corpo.length; i++) soma += Number(corpo[i]) * (corpo.length + 1 - i)
    const resto = (soma * 10) % 11
    return resto === 10 ? 0 : resto
  }
  const d1 = dv(cpf.slice(0, 9))
  const d2 = dv(cpf.slice(0, 9) + d1)
  return cpf.slice(9) === `${d1}${d2}`
}

/** Data-hora do XML (AAAA-MM-DDThh:mm:ssTZD) em milissegundos, ou NaN. */
export function instante(dataHora) {
  return dataHora ? Date.parse(dataHora) : NaN
}

/**
 * Data civil (AAAA-MM-DD) de uma data-hora do XML, no fuso informado nela. "Não considerar a
 * hora" no MOC quer dizer comparar esse dia, não o dia em UTC.
 */
export function diaCivil(dataHora) {
  return dataHora?.slice(0, 10)
}

/** Soma meses a uma data civil AAAA-MM-DD, prendendo no último dia do mês. */
export function somarMeses(dia, meses) {
  const [a, m, d] = dia.split('-').map(Number)
  const alvo = new Date(Date.UTC(a, m - 1 + meses, 1))
  const ultimo = new Date(Date.UTC(alvo.getUTCFullYear(), alvo.getUTCMonth() + 1, 0)).getUTCDate()
  alvo.setUTCDate(Math.min(d, ultimo))
  return alvo.toISOString().slice(0, 10)
}

export const MINUTO = 60 * 1000
export const DIA = 24 * 60 * MINUTO
