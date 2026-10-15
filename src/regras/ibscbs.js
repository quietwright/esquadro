// Grupo UB: IBS e CBS do item (Reforma Tributária, NT 2025.002).
//
// Os indicadores vêm de duas tabelas oficiais: a de indicadores de CST (gIBSCBS, gRed, gDif…)
// e a de cClassTrib (tributação regular, monofásico, estorno, crédito presumido). Quando a
// tabela não cobre o CST ou manda "avaliar no cClassTrib", a regra não é aplicada: melhor não
// acusar do que acusar sem base.

import { classificacaoTributaria, combustivelMonofasico, creditoPresumido, cstIbsCbsConhecido, indicadoresCstIbsCbs } from '../apoio.js'
import { difere, el, num, tem, todos, val } from '../consulta.js'
import { atributo, texto } from '../xml.js'
import { diaCivil } from './util.js'

const nItem = (d) => atributo(d, 'nItem')
const ibscbs = (d) => el(d, 'imposto/IBSCBS')
const g = (d) => el(d, 'imposto/IBSCBS/gIBSCBS')
const ano = ({ ide }) => Number(val(ide, 'dhEmi').slice(0, 4))
const produto = (...f) => Math.round(f.reduce((p, x) => p * x, 1) * 100) / 100
const fora = (a, b) => difere(a, b, 0.01)

function porItem(id, teste, onde = (d) => ibscbs(d) ?? el(d, 'imposto')) {
  return {
    id,
    verificar(n, falhar) {
      for (const d of n.det) {
        const detalhe = teste(d, n)
        if (detalhe) falhar(onde(d), `item ${nItem(d)}: ${detalhe}`)
      }
    },
  }
}

const cst = (d) => val(ibscbs(d), 'CST')
const cClass = (d) => classificacaoTributaria(val(ibscbs(d), 'cClassTrib'))
const indCst = (d, k) => indicadoresCstIbsCbs(cst(d))?.[k] ?? null
const grupoClass = (d, nome) => {
  const c = cClass(d)
  return c ? c.grupos.includes(nome) : null
}

// Alíquota usada no cálculo: a efetiva do grupo de redução, se houver.
const aliquota = (grupo, campo) => (tem(grupo, 'gRed') ? num(grupo, 'gRed/pAliqEfet') : num(grupo, campo))

// Exceções comuns das regras de alíquota do período de teste.
const notaDeAjusteDeValor = ({ ide }) => val(ide, 'finNFe') === '4' || ['03', '04', '06'].includes(val(ide, 'tpNFCredito'))

// Três esferas com regras paralelas: UF, Município e CBS.
const ESFERAS = [
  { nome: 'IBS da UF', grupo: 'gIBSUF', aliq: 'pIBSUF', valor: 'vIBSUF' },
  { nome: 'IBS do Município', grupo: 'gIBSMun', aliq: 'pIBSMun', valor: 'vIBSMun' },
  { nome: 'CBS', grupo: 'gCBS', aliq: 'pCBS', valor: 'vCBS' },
]
const esfera = (d, e) => el(g(d), e.grupo)

// Indicadores dos grupos monofásicos no cClassTrib.
const MONO = [
  ['gMonoPadrao', 'MonoPadrao'],
  ['gMonoReten', 'MonoReten'],
  ['gMonoRet', 'MonoRet'],
  ['gpBioDiferenca', 'pBioDiferenca'],
]

// Exigência/proibição de um subgrupo monofásico dentro de um grupo Ad Rem/Ad Valorem.
function monoSubgrupo(idExige, idVeda, pai, sub, indicador) {
  const exige = porItem(idExige, (d) => {
    const p = el(ibscbs(d), `gIBSCBSMono/${pai}`)
    return p && grupoClass(d, indicador) === true && !tem(p, sub) && `${pai} sem ${sub}, exigido pelo cClassTrib ${val(ibscbs(d), 'cClassTrib')}`
  })
  const veda = porItem(idVeda, (d) => {
    const p = el(ibscbs(d), `gIBSCBSMono/${pai}`)
    return p && grupoClass(d, indicador) === false && tem(p, sub) && `${pai} com ${sub}, vedado pelo cClassTrib ${val(ibscbs(d), 'cClassTrib')}`
  })
  return [exige, veda]
}

// Cálculo dentro de um subgrupo monofásico: resultado = a × b (tolerância de 0,01).
function monoCalculo(id, caminho, resultado, a, b) {
  return porItem(id, (d) => {
    const s = el(ibscbs(d), `gIBSCBSMono/${caminho}`)
    if (!s) return null
    const calc = produto(num(s, a), num(s, b))
    return fora(num(s, resultado), calc) && `${resultado} ${val(s, resultado)} difere de ${a} × ${b} = ${calc.toFixed(2)}`
  })
}

const ehMonofasico = (d) => !!combustivelMonofasico(val(d, 'prod/comb/cProdANP'))

// Obrigatoriedade do grupo IBSCBS (UB12-10, NT 2025.002 v1.52): em homologação, regime normal,
// a partir de 01/07/2026. As datas de produção foram riscadas na v1.52 ("implementação futura
// para produção"), então em produção a regra ainda não vale.
function ibscbsObrigatorio({ ide, emit }) {
  return val(ide, 'tpAmb') === '2' && val(emit, 'CRT') === '3' && diaCivil(val(ide, 'dhEmi')) >= '2026-07-01'
}

export default [
  porItem('UB12-10', (d, n) => {
    if (tem(d, 'imposto/IBSCBS') || !ibscbsObrigatorio(n) || ehMonofasico(d)) return null
    const { ide } = n
    if (['2', '4'].includes(val(ide, 'finNFe'))) {
      const anos = todos(ide, 'NFref/refNFe').map((r) => Number(texto(r).slice(2, 4)))
      if (anos.length && anos.every((a) => a < 27)) return null
    }
    return 'sem o grupo IBSCBS'
  }),
  porItem('UB12-11', (d, { emit }) => !tem(emit, 'IE') && !tem(d, 'imposto/IBSCBS') && 'emitente sem IE (só IBS/CBS) e item sem o grupo IBSCBS'),
  porItem('UB13-10', (d) => cst(d) !== undefined && !cstIbsCbsConhecido(cst(d)) && `CST ${cst(d)} do IBS/CBS inexistente`),
  porItem('UB13-20', (d) => tem(ibscbs(d), 'gIBSCBS') && indCst(d, 'gIBSCBS') === 0 && `CST ${cst(d)} não admite o grupo gIBSCBS`),
  porItem('UB13-30', (d, { ide }) => ibscbs(d) && !tem(ibscbs(d), 'gIBSCBS') && indCst(d, 'gIBSCBS') === 1 && val(ide, 'tpNFDebito') !== '07' && `CST ${cst(d)} exige o grupo gIBSCBS`),
  porItem('UB13-39', (d) => tem(ibscbs(d), 'gIBSCBSMono') && indCst(d, 'gIBSCBSMono') === 0 && `CST ${cst(d)} não admite o grupo gIBSCBSMono`),
  porItem('UB14-10', (d) => {
    const c = val(ibscbs(d), 'cClassTrib')
    return c !== undefined && !classificacaoTributaria(c) && `cClassTrib ${c} inexistente`
  }),
  porItem('UB14-20', (d) => {
    const c = cClass(d)
    return c && c.cst !== cst(d) && `cClassTrib ${val(ibscbs(d), 'cClassTrib')} é do CST ${c.cst}, não do ${cst(d)}`
  }),
  porItem('UB14-25', (d, { modelo }) => {
    const c = cClass(d)
    if (!c) return null
    return (modelo === '55' ? !c.nfe : !c.nfce) && `cClassTrib ${val(ibscbs(d), 'cClassTrib')} não pode ser usado no modelo ${modelo}`
  }),
  ...[
    ['UB14-70', 'tpNFDebito', { '01': '800002', '02': '811001', '03': '811002', '05': '800001', '07': '410030', '08': '811003' }],
    ['UB14-80', 'tpNFCredito', { '02': '810001', '05': '800001' }],
  ].map(([id, campo, exigido]) => ({
    id,
    verificar({ ide, det }, falhar) {
      const tipo = val(ide, campo)
      const esperado = tipo && exigido[tipo]
      if (!esperado) return
      for (const d of det) {
        const c = val(ibscbs(d), 'cClassTrib')
        if (c && c !== esperado) falhar(ibscbs(d), `item ${nItem(d)}: ${campo}=${tipo} exige cClassTrib ${esperado}, veio ${c}`)
      }
    },
  })),

  // --- Alíquotas do período de teste (2026: IBS UF 0,1%, IBS Mun 0%, CBS 0,9%) -------------
  ...[
    ['UB18-10', ESFERAS[0], { 2025: 0.1, 2026: 0.1, 2027: 0.05, 2028: 0.05 }],
    ['UB37-10', ESFERAS[1], { 2025: 0, 2026: 0, 2027: 0.05, 2028: 0.05 }],
    ['UB56-10', ESFERAS[2], { 2025: 0.9, 2026: 0.9 }],
  ].map(([id, e, porAno]) =>
    porItem(id, (d, n) => {
      const grupo = esfera(d, e)
      const esperado = porAno[ano(n)]
      if (!grupo || esperado === undefined || notaDeAjusteDeValor(n)) return null
      // Com tributação regular informada, a alíquota do grupo é zero.
      const alvo = tem(g(d), 'gTribRegular') ? 0 : esperado
      const p = num(grupo, e.aliq)
      if (Math.abs(p - alvo) < 1e-9) return null
      // CBS zero em operação entre áreas incentivadas (exceção 3 da UB56-10) não é avaliada
      // aqui: depende de NCM e da relação de municípios. Só a alíquota "cheia" errada acusa.
      if (e.grupo === 'gCBS' && p === 0) return null
      return `${e.aliq} ${p}; em ${ano(n)} é ${alvo}`
    }),
  ),

  // --- Diferimento, devolução e redução por esfera ------------------------------------------
  ...[
    ['UB22-10', 'UB22-20', ESFERAS[0]],
    ['UB40-20', 'UB40-10', ESFERAS[1]],
    ['UB59-20', 'UB59-10', ESFERAS[2]],
  ].flatMap(([idVeda, idExige, e]) => [
    porItem(idVeda, (d) => tem(esfera(d, e), 'gDif') && indCst(d, 'gDif') === 0 && `CST ${cst(d)} não admite diferimento (${e.grupo}/gDif)`),
    porItem(idExige, (d) => esfera(d, e) && !tem(esfera(d, e), 'gDif') && indCst(d, 'gDif') === 1 && `CST ${cst(d)} exige diferimento (${e.grupo}/gDif)`),
  ]),
  ...[
    ['UB23-10', ESFERAS[0]],
    ['UB42-10', ESFERAS[1]],
    ['UB61-10', ESFERAS[2]],
  ].map(([id, e]) =>
    porItem(id, (d) => {
      const grupo = esfera(d, e)
      if (!tem(grupo, 'gDif')) return null
      const calc = produto(num(g(d), 'vBC'), aliquota(grupo, e.aliq) / 100, num(grupo, 'gDif/pDif') / 100)
      return fora(num(grupo, 'gDif/vDif'), calc) && `${e.grupo}/gDif/vDif ${val(grupo, 'gDif/vDif')} difere do calculado ${calc.toFixed(2)}`
    }),
  ),
  porItem('UB24-10', (d) => tem(esfera(d, ESFERAS[0]), 'gDevTrib') && 'devolução de tributo no IBS da UF (gIBSUF/gDevTrib)'),
  porItem('UB43-10', (d) => tem(esfera(d, ESFERAS[1]), 'gDevTrib') && 'devolução de tributo no IBS do Município (gIBSMun/gDevTrib)'),
  porItem('UB62-10', (d) => tem(esfera(d, ESFERAS[2]), 'gDevTrib') && 'devolução da CBS (gCBS/gDevTrib) em NFC-e'),
  porItem('UB62a-10', (d) => tem(esfera(d, ESFERAS[2]), 'gDevTrib') && !tem(esfera(d, ESFERAS[2]), 'gDevTrib/pDevTrib') && 'gCBS/gDevTrib sem pDevTrib'),
  porItem('UB63-10', (d) => {
    const c = esfera(d, ESFERAS[2])
    if (!tem(c, 'gDevTrib/pDevTrib')) return null
    const calc = produto(num(g(d), 'vBC'), aliquota(c, 'pCBS') / 100, num(c, 'gDevTrib/pDevTrib') / 100)
    return fora(num(c, 'gDevTrib/vDevTrib'), calc) && `vDevTrib ${val(c, 'gDevTrib/vDevTrib')} difere do calculado ${calc.toFixed(2)}`
  }),
  ...[
    ['UB26-10', 'UB26-20', 'UB28-10', ESFERAS[0]],
    ['UB45-10', 'UB45-20', 'UB47-10', ESFERAS[1]],
    ['UB64-10', 'UB64-20', 'UB66-10', ESFERAS[2]],
  ].flatMap(([idVeda, idExige, idCalc, e]) => [
    porItem(idVeda, (d, { ide }) => {
      const grupo = esfera(d, e)
      if (!tem(grupo, 'gRed') || indCst(d, 'gRed') !== 0) return null
      if (tem(ide, 'gCompraGov') && num(grupo, 'gRed/pRedAliq') === 0) return null
      return `CST ${cst(d)} não admite redução de alíquota (${e.grupo}/gRed)`
    }),
    porItem(idExige, (d, { ide }) => {
      const grupo = esfera(d, e)
      if (!grupo || tem(grupo, 'gRed')) return null
      return (indCst(d, 'gRed') === 1 || tem(ide, 'gCompraGov')) && `falta a redução de alíquota (${e.grupo}/gRed)`
    }),
    porItem(idCalc, (d, { ide }) => {
      const grupo = esfera(d, e)
      if (!tem(grupo, 'gRed')) return null
      let calc = num(grupo, e.aliq) * (1 - num(grupo, 'gRed/pRedAliq') / 100)
      if (tem(ide, 'gCompraGov')) calc *= 1 - num(ide, 'gCompraGov/pRedutor') / 100
      return Math.abs(num(grupo, 'gRed/pAliqEfet') - calc) > 0.0001 + 1e-9 && `${e.grupo}/gRed/pAliqEfet ${val(grupo, 'gRed/pAliqEfet')} difere do calculado ${calc.toFixed(4)}`
    }),
  ]),
  ...[
    ['UB35-10', ESFERAS[0]],
    ['UB54-10', ESFERAS[1]],
    ['UB67-10', ESFERAS[2]],
  ].map(([id, e]) =>
    porItem(id, (d) => {
      const grupo = esfera(d, e)
      if (!grupo) return null
      const calc = produto(num(g(d), 'vBC'), aliquota(grupo, e.aliq) / 100) - num(grupo, 'gDif/vDif') - num(grupo, 'gDevTrib/vDevTrib')
      return fora(num(grupo, e.valor), calc) && `${e.valor} ${val(grupo, e.valor)} difere do calculado ${calc.toFixed(2)}`
    }),
  ),
  porItem('UB54a-10', (d) => {
    if (!g(d)) return null
    const credito = el(ibscbs(d), 'gCredPresOper')
    const deduz = credito && creditoPresumido(val(credito, 'cCredPres'))?.deduz ? num(credito, 'gIBSCredPres/vCredPres') : 0
    const calc = num(g(d), 'gIBSUF/vIBSUF') + num(g(d), 'gIBSMun/vIBSMun') - deduz
    return fora(num(g(d), 'vIBS'), calc) && `vIBS ${val(g(d), 'vIBS')} difere de vIBSUF + vIBSMun${deduz ? ' − vCredPres' : ''} = ${calc.toFixed(2)}`
  }),

  // --- ZFM / ALC na CBS ----------------------------------------------------------------------
  porItem('UB66a-10', (d, { emit }) => tem(esfera(d, ESFERAS[2]), 'gALCZFMCBS') && !tem(emit, 'ISUFEmit') && 'gALCZFMCBS sem inscrição SUFRAMA do emitente'),
  porItem('UB66c-10', (d) => {
    const z = el(esfera(d, ESFERAS[2]), 'gALCZFMCBS')
    return z && val(z, 'tpALCZFMCBS') === '2' && !/[1-9]/.test(val(z, 'nProcSuframa') ?? '') && 'tpALCZFMCBS=2 sem número do processo SUFRAMA'
  }),
  porItem('UB66e-10', (d) => {
    const z = el(esfera(d, ESFERAS[2]), 'gALCZFMCBS')
    if (!z) return null
    const calc = produto(num(g(d), 'vBC'), num(z, 'pAliqEfetRegCBS') / 100)
    return fora(num(z, 'vTribRegCBS'), calc) && `gALCZFMCBS/vTribRegCBS ${val(z, 'vTribRegCBS')} difere do calculado ${calc.toFixed(2)}`
  }),

  // --- Tributação regular --------------------------------------------------------------------
  porItem('UB68-10', (d) => g(d) && !tem(g(d), 'gTribRegular') && grupoClass(d, 'gTribRegular') === true && `cClassTrib ${val(ibscbs(d), 'cClassTrib')} exige gTribRegular`),
  porItem('UB68-11', (d) => tem(g(d), 'gTribRegular') && grupoClass(d, 'gTribRegular') === false && `cClassTrib ${val(ibscbs(d), 'cClassTrib')} não admite gTribRegular`),
  porItem('UB69-10', (d) => {
    const c = val(g(d), 'gTribRegular/CSTReg')
    return c !== undefined && !cstIbsCbsConhecido(c) && `CSTReg ${c} inexistente`
  }),
  porItem('UB70-10', (d) => {
    const c = val(g(d), 'gTribRegular/cClassTribReg')
    return c !== undefined && !classificacaoTributaria(c) && `cClassTribReg ${c} inexistente`
  }),
  ...[
    ['UB72-10', 'pAliqEfetRegIBSUF', 'vTribRegIBSUF'],
    ['UB72b-10', 'pAliqEfetRegIBSMun', 'vTribRegIBSMun'],
    ['UB72d-10', 'pAliqEfetRegCBS', 'vTribRegCBS'],
  ].map(([id, aliq, valor]) =>
    porItem(id, (d) => {
      const r = el(g(d), 'gTribRegular')
      if (!r) return null
      const calc = produto(num(g(d), 'vBC'), num(r, aliq) / 100)
      return fora(num(r, valor), calc) && `${valor} ${val(r, valor)} difere do calculado ${calc.toFixed(2)}`
    }),
  ),

  // --- Compras governamentais ----------------------------------------------------------------
  porItem('UB82a-10', (d, { ide }) => tem(ide, 'gCompraGov') && g(d) && !tem(g(d), 'gTribCompraGov') && indCst(d, 'gIBSCBS') !== 0 && 'compra governamental sem gTribCompraGov'),
  porItem('UB82a-20', (d) => {
    const c = el(g(d), 'gTribCompraGov')
    if (!c) return null
    const soma = num(c, 'vTribIBSUF') + num(c, 'vTribIBSMun') + num(c, 'vTribCBS')
    const tributos = num(g(d), 'gIBSUF/vIBSUF') + num(g(d), 'gIBSMun/vIBSMun') + num(g(d), 'gCBS/vCBS')
    return difere(soma, tributos, 0.04) && `gTribCompraGov soma ${soma.toFixed(2)}; os tributos somam ${tributos.toFixed(2)}`
  }),
  porItem('UB82a-30', (d, { ide }) => !tem(ide, 'gCompraGov') && tem(g(d), 'gTribCompraGov') && 'gTribCompraGov sem compra governamental'),

  // --- Monofásico ----------------------------------------------------------------------------
  ...[
    ['UB85a-10', 'UB85a-20', 'gIBSMonoAdRem', 2028, 'depois'],
    ['UB90-10', 'UB90-20', 'gIBSMonoAdValorem', 2028, 'ate'],
    ['UB95a-10', 'UB95a-20', 'gCBSMonoAdRem', 2026, 'depois'],
    ['UB100-10', 'UB100-20', 'gCBSMonoAdValorem', 2026, 'ate'],
  ].flatMap(([idVeda, idExige, grupo, limite, quando]) => {
    // Ad Rem vale depois do ano-limite; Ad Valorem até ele.
    const vale = (n) => (quando === 'depois' ? ano(n) > limite : ano(n) <= limite)
    return [
      porItem(idVeda, (d, n) => {
        if (!tem(ibscbs(d), `gIBSCBSMono/${grupo}`) || vale(n)) return null
        // A CBS Ad Rem em 2026 é tolerada em homologação.
        if (grupo === 'gCBSMonoAdRem' && val(n.ide, 'tpAmb') === '2') return null
        return `${grupo} não vale em ${ano(n)}`
      }),
      porItem(idExige, (d, n) => {
        const mono = el(ibscbs(d), 'gIBSCBSMono')
        if (!mono || tem(mono, grupo) || !vale(n)) return null
        const c = cClass(d)
        if (!c || !MONO.some(([, ind]) => c.grupos.includes(ind))) return null
        if (grupo === 'gCBSMonoAdValorem' && val(n.ide, 'tpAmb') === '2' && tem(mono, 'gCBSMonoAdRem')) return null
        return `falta ${grupo} (cClassTrib ${val(ibscbs(d), 'cClassTrib')})`
      }),
    ]
  }),
  ...[
    ['gIBSMonoAdRem', [['UB86-10', 'UB86-20'], ['UB87-10', 'UB87-20'], ['UB88-10', 'UB88-20'], ['UB89-10', 'UB89-20']]],
    ['gIBSMonoAdValorem', [['UB91-10', 'UB91-20'], ['UB92-10', 'UB92-20'], ['UB93-10', 'UB93-20'], ['UB94-10', 'UB94-20']]],
    ['gCBSMonoAdRem', [['UB96-10', 'UB96-20'], ['UB97-10', 'UB97-20'], ['UB98-10', 'UB98-20'], ['UB99-10', 'UB99-20']]],
    ['gCBSMonoAdValorem', [['UB101-10', 'UB101-20'], ['UB102-10', 'UB102-20'], ['UB103-10', 'UB103-20'], ['UB104-10', 'UB104-20']]],
  ].flatMap(([pai, pares]) => pares.flatMap(([exige, veda], i) => monoSubgrupo(exige, veda, pai, MONO[i][0], MONO[i][1]))),
  monoCalculo('UB86c-10', 'gIBSMonoAdRem/gMonoPadrao', 'vIBSMono', 'qBCMono', 'adRemIBS'),
  monoCalculo('UB87c-10', 'gIBSMonoAdRem/gMonoReten', 'vIBSMonoReten', 'qBCMonoReten', 'adRemIBSReten'),
  monoCalculo('UB96c-10', 'gCBSMonoAdRem/gMonoPadrao', 'vCBSMono', 'qBCMono', 'adRemCBS'),
  monoCalculo('UB97c-10', 'gCBSMonoAdRem/gMonoReten', 'vCBSMonoReten', 'qBCMonoReten', 'adRemCBSReten'),
  ...[
    ['UB91c-10', 'vIBSMonoUF', 'pAliqMonoUF'],
    ['UB91e-10', 'vIBSMonoMun', 'pAliqMonoMun'],
  ].map(([id, resultado, aliq]) =>
    porItem(id, (d) => {
      const s = el(ibscbs(d), 'gIBSCBSMono/gIBSMonoAdValorem/gMonoPadrao')
      if (!s) return null
      const calc = produto(num(s, 'vBCMono'), num(s, aliq) / 100)
      return fora(num(s, resultado), calc) && `${resultado} ${val(s, resultado)} difere de vBCMono × ${aliq} = ${calc.toFixed(2)}`
    }),
  ),
  porItem('UB91f-10', (d) => {
    const s = el(ibscbs(d), 'gIBSCBSMono/gIBSMonoAdValorem/gMonoPadrao')
    if (!s) return null
    const calc = num(s, 'vIBSMonoUF') + num(s, 'vIBSMonoMun')
    return fora(num(s, 'vIBSMono'), calc) && `vIBSMono ${val(s, 'vIBSMono')} difere de vIBSMonoUF + vIBSMonoMun = ${calc.toFixed(2)}`
  }),
  ...[
    ['UB92c-10', 'gIBSMonoAdValorem/gMonoReten', 'vIBSMonoReten'],
    ['UB102c-10', 'gCBSMonoAdValorem/gMonoReten', 'vCBSMonoReten'],
  ].map(([id, caminho, resultado]) =>
    porItem(id, (d) => {
      const s = el(ibscbs(d), `gIBSCBSMono/${caminho}`)
      if (!s) return null
      const calc = produto(num(s, 'vBCMonoReten'), num(s, 'pAliqMonoReten') / 100)
      return fora(num(s, resultado), calc) && `${resultado} ${val(s, resultado)} difere de vBCMonoReten × pAliqMonoReten = ${calc.toFixed(2)}`
    }),
  ),
  porItem('UB101c-10', (d) => {
    const s = el(ibscbs(d), 'gIBSCBSMono/gCBSMonoAdValorem/gMonoPadrao')
    if (!s) return null
    const calc = produto(num(s, 'vBCMono'), num(s, 'pAliqMonoCBS') / 100)
    return fora(num(s, 'vCBSMono'), calc) && `vCBSMono ${val(s, 'vCBSMono')} difere de vBCMono × pAliqMonoCBS = ${calc.toFixed(2)}`
  }),

  // --- Transferência de crédito, ajuste de competência e estorno ------------------------------
  porItem('UB106-30', (d, { ide }) => tem(ibscbs(d), 'gTransfCred') && val(ide, 'finNFe') !== '6' && 'transferência de crédito fora de nota de débito (finNFe=6)'),
  porItem('UB106-31', (d, { ide }) => tem(ibscbs(d), 'gTransfCred') && !['01', '05'].includes(val(ide, 'tpNFDebito')) && `transferência de crédito com tpNFDebito=${val(ide, 'tpNFDebito') ?? 'ausente'}`),
  porItem('UB106-40', (d) => {
    const t = el(ibscbs(d), 'gTransfCred')
    return t && !(num(t, 'vIBS') > 0 || num(t, 'vCBS') > 0) && 'transferência de crédito sem valor de IBS ou CBS'
  }),
  porItem('UB112-30', (d) => {
    const a = el(ibscbs(d), 'gAjusteCompet')
    return a && !(num(a, 'vIBS') > 0 || num(a, 'vCBS') > 0) && 'ajuste de competência sem valor de IBS ou CBS'
  }),
  porItem('UB116-10', (d, { ide }) => tem(ibscbs(d), 'gEstornoCred') && grupoClass(d, 'gEstornoCred') === false && val(ide, 'tpNFDebito') !== '07' && `cClassTrib ${val(ibscbs(d), 'cClassTrib')} não admite gEstornoCred`),
  porItem('UB116-20', (d, { ide }) => ibscbs(d) && !tem(ibscbs(d), 'gEstornoCred') && (grupoClass(d, 'gEstornoCred') === true || val(ide, 'tpNFDebito') === '07') && 'falta o grupo gEstornoCred'),
  porItem('UB116-30', (d, { ide }) => {
    const e = el(ibscbs(d), 'gEstornoCred')
    return e && val(ide, 'tpNFDebito') !== '07' && !(num(e, 'vIBSEstCred') > 0 || num(e, 'vCBSEstCred') > 0) && 'estorno de crédito sem valor de IBS ou CBS'
  }),

  // --- Crédito presumido ---------------------------------------------------------------------
  porItem('UB120-10', (d) => tem(ibscbs(d), 'gCredPresOper') && 'crédito presumido em NFC-e'),
  porItem('UB120-20', (d) => tem(ibscbs(d), 'gCredPresOper') && grupoClass(d, 'gCredPresOper') === false && val(d, 'prod/indBemMovelUsado') !== '1' && `cClassTrib ${val(ibscbs(d), 'cClassTrib')} não admite crédito presumido`),
  porItem('UB122-10', (d) => {
    const c = val(ibscbs(d), 'gCredPresOper/cCredPres')
    return c !== undefined && !creditoPresumido(c) && `cCredPres ${c} inexistente`
  }),
  ...[
    ['UB123-10', 'UB123-20', 'gIBSCredPres'],
    ['UB127-10', 'UB127-20', 'gCBSCredPres'],
  ].flatMap(([idVeda, idExige, grupo]) => [
    porItem(idVeda, (d) => {
      const c = el(ibscbs(d), 'gCredPresOper')
      return tem(c, grupo) && creditoPresumido(val(c, 'cCredPres'))?.[grupo] === 0 && `cCredPres ${val(c, 'cCredPres')} não admite ${grupo}`
    }),
    porItem(idExige, (d) => {
      const c = el(ibscbs(d), 'gCredPresOper')
      return c && !tem(c, grupo) && creditoPresumido(val(c, 'cCredPres'))?.[grupo] === 1 && `cCredPres ${val(c, 'cCredPres')} exige ${grupo}`
    }),
  ]),
  ...[
    ['UB125-10', 'gIBSCredPres'],
    ['UB129-10', 'gCBSCredPres'],
  ].map(([id, grupo]) =>
    porItem(id, (d) => {
      const c = el(ibscbs(d), 'gCredPresOper')
      return val(c, 'cCredPres') === '04' && num(c, `${grupo}/vCredPres`) > num(d, 'prod/vProd') && `crédito presumido ${val(c, `${grupo}/vCredPres`)} maior que o vProd ${val(d, 'prod/vProd')}`
    }),
  ),
  ...[
    ['UB126-10', 'gIBSCredPres', 2033],
    ['UB130-10', 'gCBSCredPres', 2027],
  ].map(([id, grupo, desde]) =>
    porItem(id, (d, n) => {
      const c = el(ibscbs(d), 'gCredPresOper')
      if (!tem(c, `${grupo}/vCredPresCondSus`)) return null
      return (ano(n) < desde || val(c, 'cCredPres') !== '04') && `vCredPresCondSus só a partir de ${desde} e com cCredPres 04`
    }),
  ),
  porItem('UB131-10', (d) => tem(ibscbs(d), 'gCredPresIBSZFM') && 'crédito presumido ZFM em NFC-e'),
  porItem('UB131-40', (d, { ide }) => tem(ibscbs(d), 'gCredPresIBSZFM') && val(ide, 'tpNFCredito') !== '02' && `gCredPresIBSZFM com tpNFCredito=${val(ide, 'tpNFCredito') ?? 'ausente'}`),
  {
    id: 'UB131-50',
    verificar({ ide, det }, falhar) {
      if (val(ide, 'tpNFCredito') === '02' && !det.some((d) => tem(ibscbs(d), 'gCredPresIBSZFM'))) falhar(el(ide, 'tpNFCredito'), 'tpNFCredito=02 sem o grupo gCredPresIBSZFM')
    },
  },
  porItem('UB132-10', (d, { agora }) => {
    const c = val(ibscbs(d), 'gCredPresIBSZFM/competApur')
    return c && c > agora.toISOString().slice(0, 7) && `competApur ${c} no futuro`
  }),
  {
    id: 'UB133-10',
    verificar({ det }, falhar) {
      const vistos = new Set()
      for (const d of det) {
        const t = val(ibscbs(d), 'gCredPresIBSZFM/tpCredPresIBSZFM')
        if (t === undefined) continue
        if (vistos.has(t)) falhar(ibscbs(d), `item ${nItem(d)}: tpCredPresIBSZFM ${t} repetido em outro item`)
        vistos.add(t)
      }
    },
  },
]
