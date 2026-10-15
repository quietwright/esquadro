// Grupo W: totais da NF-e (ICMS, ISSQN, IS e IBS/CBS) contra a soma dos itens.
//
// As somas comparam em centavos: a SEFAZ não aceita diferença de arredondamento, salvo onde a
// regra diz (vNF tem tolerância de R$ 0,50, nota (*3) do MOC).

import { difere, el, num, somaDescendentes, tem, val } from '../consulta.js'

const grupoIcms = (d) => el(d, 'imposto/ICMS')?.filhos.find((f) => f.tipo === 'elemento')
const temIcms = (d) => tem(d, 'imposto/ICMS')
const temIssqn = (d) => tem(d, 'imposto/ISSQN')
const soma = (lista, f) => lista.reduce((s, x) => s + f(x), 0)
const brl = (v) => v.toFixed(2)

// Regra de total: compara o campo do total com a soma calculada dos itens.
function total(id, caminhoTotal, calcular, { quando, tolerancia = 0, quantidade = false } = {}) {
  return {
    id,
    verificar(n, falhar) {
      if (quando && !quando(n)) return
      const informado = num(n.total, caminhoTotal)
      const calculado = calcular(n)
      const diferente = quantidade ? Math.abs(informado - calculado) > tolerancia + 1e-9 : difere(informado, calculado, tolerancia)
      if (diferente) {
        const fmt = quantidade ? (v) => v.toFixed(4) : brl
        const campo = caminhoTotal.split('/').at(-1)
        falhar(el(n.total, caminhoTotal) ?? n.total, `${campo} = ${fmt(informado)}; a soma dos itens dá ${fmt(calculado)}`)
      }
    },
  }
}

// Soma de um campo dentro do grupo de ICMS de cada item (ICMS00, ICMS10, ICMSSN900…).
const somaIcms = (campo, filtro = () => true) => ({ det }) =>
  soma(det, (d) => {
    const g = grupoIcms(d)
    return g && filtro(g) ? num(g, campo) : 0
  })

const icmsTot = (campo) => `ICMSTot/${campo}`
const somaItens = (caminho) => ({ det }) => soma(det, (d) => num(d, caminho))
const somaNosItens = (raiz, nome) => ({ det }) => soma(det, (d) => somaDescendentes(el(d, raiz), nome))

// vNF conforme a W16-10. Faturamento direto de veículo novo (tpOp=2) não soma ST, FCP-ST,
// monofásico retido nem IPI devolvido.
function vNFCalculado(n, { comDesonerado }) {
  const t = el(n.total, 'ICMSTot')
  const faturamentoDireto = n.det.some((d) => val(d, 'prod/veicProd/tpOp') === '2')
  let v = num(t, 'vProd') - num(t, 'vDesc') + num(t, 'vFrete') + num(t, 'vSeg') + num(t, 'vOutro') + num(t, 'vII') + num(t, 'vIPI')
  if (comDesonerado) v -= num(t, 'vICMSDeson')
  if (!faturamentoDireto) v += num(t, 'vST') + num(t, 'vFCPST') + num(t, 'vICMSMonoReten') + num(t, 'vIPIDevol')
  v += num(n.total, 'ISSQNtot/vServ')
  for (const d of n.det) {
    if (val(d, 'imposto/PISST/indSomaPISST') === '1') v += num(d, 'imposto/PISST/vPIS')
    if (val(d, 'imposto/COFINSST/indSomaCOFINSST') === '1') v += num(d, 'imposto/COFINSST/vCOFINS')
  }
  return v
}

const nfceAcimaDe10Mil = ({ modelo, total: t }) => modelo === '65' && num(t, 'ICMSTot/vNF') > 10000

export default [
  // --- ICMS ------------------------------------------------------------------------------
  total('W04-10', icmsTot('vICMS'), somaIcms('vICMS', (g) => !['40', '41', '50'].includes(val(g, 'CST')))),
  total('W04a-10', icmsTot('vICMSDeson'), somaIcms('vICMSDeson')),
  total('W04b-10', icmsTot('vFCP'), somaIcms('vFCP')),
  total('W04c-10', icmsTot('vFCPUFDest'), somaItens('imposto/ICMSUFDest/vFCPUFDest')),
  total('W04e-10', icmsTot('vICMSUFDest'), somaItens('imposto/ICMSUFDest/vICMSUFDest')),
  total('W04g-10', icmsTot('vICMSUFRemet'), somaItens('imposto/ICMSUFDest/vICMSUFRemet')),
  total('W05-10', icmsTot('vBCST'), somaIcms('vBCST')),
  total('W06-10', icmsTot('vST'), somaIcms('vICMSST')),
  total('W06a-10', icmsTot('vFCPST'), somaIcms('vFCPST')),
  total('W06b-10', icmsTot('vFCPSTRet'), somaIcms('vFCPSTRet')),
  total('W06b.1-10', icmsTot('qBCMono'), somaIcms('qBCMono'), { quantidade: true, tolerancia: 0.01 }),
  total('W06c-10', icmsTot('vICMSMono'), somaIcms('vICMSMono')),
  total('W06c.1-10', icmsTot('qBCMonoReten'), somaIcms('qBCMonoReten'), { quantidade: true, tolerancia: 0.01 }),
  total('W06d-10', icmsTot('vICMSMonoReten'), somaIcms('vICMSMonoReten')),
  total('W06d.1-10', icmsTot('qBCMonoRet'), somaIcms('qBCMonoRet'), { quantidade: true, tolerancia: 0.01 }),
  total('W06e-10', icmsTot('vICMSMonoRet'), somaIcms('vICMSMonoRet')),

  // --- Valores do produto ----------------------------------------------------------------
  // Só itens que compõem o total (indTot=1) e não são serviço do ISSQN, que vai em vServ.
  total('W07-10', icmsTot('vProd'), ({ det }) => soma(det, (d) => (val(d, 'prod/indTot') === '1' && !temIssqn(d) ? num(d, 'prod/vProd') : 0))),
  total('W08-10', icmsTot('vFrete'), somaItens('prod/vFrete')),
  total('W09-10', icmsTot('vSeg'), somaItens('prod/vSeg')),
  total('W10-10', icmsTot('vDesc'), somaItens('prod/vDesc')),
  total('W11-10', icmsTot('vII'), somaItens('imposto/II/vII')),
  total('W12-10', icmsTot('vIPI'), somaItens('imposto/IPI/IPITrib/vIPI')),
  total('W12a-10', icmsTot('vIPIDevol'), somaItens('impostoDevol/IPI/vIPIDevol')),
  total('W13-10', icmsTot('vPIS'), ({ det }) => soma(det, (d) => (temIcms(d) ? somaDescendentes(el(d, 'imposto/PIS'), 'vPIS') : 0))),
  total('W14-10', icmsTot('vCOFINS'), ({ det }) => soma(det, (d) => (temIcms(d) ? somaDescendentes(el(d, 'imposto/COFINS'), 'vCOFINS') : 0))),
  total('W15-10', icmsTot('vOutro'), somaItens('prod/vOutro')),
  {
    id: 'W16-10',
    verificar(n, falhar) {
      if (n.det.some((d) => val(d, 'prod/CFOP').startsWith('3'))) return
      const informado = num(n.total, 'ICMSTot/vNF')
      // A NT 2013/005 aceita o vNF com ou sem o ICMS desonerado subtraído.
      const com = vNFCalculado(n, { comDesonerado: true })
      const sem = vNFCalculado(n, { comDesonerado: false })
      if (difere(informado, com, 0.5) && difere(informado, sem, 0.5)) {
        falhar(el(n.total, 'ICMSTot/vNF'), `vNF = ${brl(informado)}; a composição dos totais dá ${brl(com)} (tolerância de R$ 0,50)`)
      }
    },
  },
  {
    id: 'W16-30',
    verificar({ total: t, simplificada }, falhar) {
      const vNF = num(t, 'ICMSTot/vNF')
      if (simplificada && vNF > 200000) falhar(el(t, 'ICMSTot/vNF'), `vNF ${brl(vNF)} acima do limite padrão de R$ 200.000,00 (a UF pode definir outro)`)
    },
  },
  {
    id: 'W16-40',
    verificar(n, falhar) {
      if (!nfceAcimaDe10Mil(n)) return
      if (!(tem(n.dest, 'CNPJ') || tem(n.dest, 'CPF') || tem(n.dest, 'idEstrangeiro'))) {
        falhar(el(n.total, 'ICMSTot/vNF'), 'NFC-e acima de R$ 10.000,00 sem identificar o destinatário')
      }
    },
  },
  {
    id: 'W16-50',
    verificar(n, falhar) {
      if (nfceAcimaDe10Mil(n) && !tem(n.dest, 'xNome')) falhar(el(n.total, 'ICMSTot/vNF'), 'NFC-e acima de R$ 10.000,00 sem nome do destinatário')
    },
  },
  {
    id: 'W16-60',
    verificar(n, falhar) {
      if (nfceAcimaDe10Mil(n) && !tem(n.dest, 'enderDest')) falhar(el(n.total, 'ICMSTot/vNF'), 'NFC-e acima de R$ 10.000,00 sem endereço do destinatário')
    },
  },
  total('W16a-10', icmsTot('vTotTrib'), somaItens('imposto/vTotTrib')),

  // --- ISSQN -----------------------------------------------------------------------------
  ...[
    ['W18-10', 'vServ', (d) => num(d, 'prod/vProd')],
    ['W19-10', 'vBC', (d) => num(d, 'imposto/ISSQN/vBC')],
    ['W20-10', 'vISS', (d) => num(d, 'imposto/ISSQN/vISSQN')],
    ['W21-10', 'vPIS', (d) => somaDescendentes(el(d, 'imposto/PIS'), 'vPIS')],
    ['W22-10', 'vCOFINS', (d) => somaDescendentes(el(d, 'imposto/COFINS'), 'vCOFINS')],
    ['W22b-10', 'vDeducao', (d) => num(d, 'imposto/ISSQN/vDeducao')],
    ['W22c-10', 'vOutro', (d) => num(d, 'imposto/ISSQN/vOutro')],
    ['W22d-10', 'vDescIncond', (d) => num(d, 'imposto/ISSQN/vDescIncond')],
    ['W22e-10', 'vDescCond', (d) => num(d, 'imposto/ISSQN/vDescCond')],
    ['W22f-10', 'vISSRet', (d) => num(d, 'imposto/ISSQN/vISSRet')],
  ].map(([id, campo, f]) =>
    total(id, `ISSQNtot/${campo}`, ({ det }) => soma(det, (d) => (temIssqn(d) ? f(d) : 0)), {
      quando: ({ total: t, det }) => tem(t, 'ISSQNtot') || det.some(temIssqn),
    }),
  ),

  // --- Imposto Seletivo ------------------------------------------------------------------
  {
    id: 'W31-10',
    verificar({ total: t, det }, falhar) {
      if (tem(t, 'ISTot') && !det.some((d) => tem(d, 'imposto/IS'))) falhar(el(t, 'ISTot'), 'ISTot informado sem nenhum item com IS')
    },
  },
  {
    id: 'W31-20',
    verificar({ total: t, det }, falhar) {
      if (!tem(t, 'ISTot') && det.some((d) => tem(d, 'imposto/IS'))) falhar(t, 'item com IS e total sem o grupo ISTot')
    },
  },

  // --- IBS e CBS -------------------------------------------------------------------------
  {
    id: 'W34-10',
    verificar({ total: t, det }, falhar) {
      if (tem(t, 'IBSCBSTot') && !det.some((d) => tem(d, 'imposto/IBSCBS'))) falhar(el(t, 'IBSCBSTot'), 'IBSCBSTot informado sem nenhum item com IBS/CBS')
    },
  },
  {
    id: 'W34-20',
    verificar({ total: t, det }, falhar) {
      if (!tem(t, 'IBSCBSTot') && det.some((d) => tem(d, 'imposto/IBSCBS'))) falhar(t, 'item com IBS/CBS e total sem o grupo IBSCBSTot')
    },
  },
  ...[
    ['W35-10', 'IBSCBSTot/vBCIBSCBS', 'imposto/IBSCBS/gIBSCBS/vBC'],
    ['W38-10', 'IBSCBSTot/gIBS/gIBSUF/vDif', 'imposto/IBSCBS/gIBSCBS/gIBSUF/gDif/vDif'],
    ['W39-10', 'IBSCBSTot/gIBS/gIBSUF/vDevTrib', 'imposto/IBSCBS/gIBSCBS/gIBSUF/gDevTrib/vDevTrib'],
    ['W41-10', 'IBSCBSTot/gIBS/gIBSUF/vIBSUF', 'imposto/IBSCBS/gIBSCBS/gIBSUF/vIBSUF'],
    ['W43-10', 'IBSCBSTot/gIBS/gIBSMun/vDif', 'imposto/IBSCBS/gIBSCBS/gIBSMun/gDif/vDif'],
    ['W44-10', 'IBSCBSTot/gIBS/gIBSMun/vDevTrib', 'imposto/IBSCBS/gIBSCBS/gIBSMun/gDevTrib/vDevTrib'],
    ['W46-10', 'IBSCBSTot/gIBS/gIBSMun/vIBSMun', 'imposto/IBSCBS/gIBSCBS/gIBSMun/vIBSMun'],
    ['W47-10', 'IBSCBSTot/gIBS/vIBS', 'imposto/IBSCBS/gIBSCBS/vIBS'],
    ['W48-10', 'IBSCBSTot/gIBS/vCredPres', 'imposto/IBSCBS/gCredPresOper/gIBSCredPres/vCredPres'],
    ['W53-10', 'IBSCBSTot/gCBS/vDif', 'imposto/IBSCBS/gIBSCBS/gCBS/gDif/vDif'],
    ['W54-10', 'IBSCBSTot/gCBS/vDevTrib', 'imposto/IBSCBS/gIBSCBS/gCBS/gDevTrib/vDevTrib'],
    ['W56-10', 'IBSCBSTot/gCBS/vCBS', 'imposto/IBSCBS/gIBSCBS/gCBS/vCBS'],
    ['W56a-10', 'IBSCBSTot/gCBS/vCredPres', 'imposto/IBSCBS/gCredPresOper/gCBSCredPres/vCredPres'],
    ['W59f-10', 'IBSCBSTot/gEstornoCred/vIBSEstCred', 'imposto/IBSCBS/gEstornoCred/vIBSEstCred'],
    ['W59g-10', 'IBSCBSTot/gEstornoCred/vCBSEstCred', 'imposto/IBSCBS/gEstornoCred/vCBSEstCred'],
  ].map(([id, caminhoTotal, caminhoItem]) =>
    total(id, caminhoTotal, somaItens(caminhoItem), {
      // Cada total só é conferido quando o grupo dele existe no total; a ausência do grupo
      // inteiro é a W34-20.
      quando: ({ total: t }) => tem(t, caminhoTotal.split('/').slice(0, -1).join('/')),
    }),
  ),
  // Monofásico: os valores ficam em gMonoPadrao/gMonoReten/gMonoRet de gIBSMono* e gCBSMono*.
  ...[
    ['W58-10', 'vIBSMono'],
    ['W59-10', 'vCBSMono'],
    ['W59a-10', 'vIBSMonoReten'],
    ['W59b-10', 'vCBSMonoReten'],
    ['W59c-10', 'vIBSMonoRet'],
    ['W59d-10', 'vCBSMonoRet'],
  ].map(([id, campo]) =>
    total(id, `IBSCBSTot/gMono/${campo}`, somaNosItens('imposto/IBSCBS/gIBSCBSMono', campo), {
      quando: ({ total: t }) => tem(t, 'IBSCBSTot/gMono'),
    }),
  ),
]

