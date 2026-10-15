// Grupos H a LB: itens da nota (produto, GTIN, NCM, CFOP, importação, exportação, rastro,
// veículos, medicamentos, armas, combustíveis e papel imune).

import { difere, el, num, tem, todos, val } from '../consulta.js'
import { atributo, texto } from '../xml.js'
import { DIA, cnpjValido, cpfValido, dvChave } from './util.js'

const SEM_GTIN = (g) => g === undefined || g === '' || g === 'SEM GTIN'

/** Dígito verificador GS1 (GTIN-8, 12, 13 e 14): pesos 3 e 1 a partir da direita. */
export function gtinValido(gtin) {
  if (!/^(\d{8}|\d{12,14})$/.test(gtin)) return false
  let soma = 0
  for (let i = gtin.length - 2, peso = 3; i >= 0; i--, peso = peso === 3 ? 1 : 3) soma += Number(gtin[i]) * peso
  return (10 - (soma % 10)) % 10 === Number(gtin.at(-1))
}

const cfop = (d) => val(d, 'prod/CFOP')
const primeiroDigito = (d) => cfop(d)[0]
const temISSQN = (d) => tem(d, 'imposto/ISSQN')
const nItem = (d) => atributo(d, 'nItem')

// Regra que se repete item a item: chama `teste(d)` e acusa com o detalhe devolvido.
function porItem(id, teste, onde = (d) => el(d, 'prod')) {
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

// Exceção do I08-30/I08-60: combustível consumido no exterior autoriza CFOP 7 fora da exportação.
const consumoNoExterior = (d) => val(d, 'prod/comb/UFCons') === 'EX'

const CFOP_NFCE = new Set(['5101', '5102', '5103', '5104', '5115', '5405', '5656', '5667', '5910', '5933'])
const CFOP_DEVOLUCAO_MEI = new Set(['1202', '1553', '2202', '2553', '5202', '6202'])
const SERVICO = /^[1256]933$/
const GLP = '210203001'
const GLP_E_GAS = new Set(['210203001', '210203003', '210203004', '210203005'])
const AREA_ZFM_ALC = (uf, cMun) => ['AC', 'AM', 'RO', 'RR'].includes(uf) || (uf === 'AP' && ['1600303', '1600600'].includes(cMun))

export default [
  {
    id: 'H02-10',
    verificar({ det }, falhar) {
      det.forEach((d, i) => {
        if (nItem(d) !== String(i + 1)) falhar(d, `item na posição ${i + 1} com nItem="${nItem(d)}"`)
      })
    },
  },
  porItem('I03-10', (d) => {
    const g = val(d, 'prod/cEAN')
    return !SEM_GTIN(g) && !gtinValido(g) && `GTIN ${g} com dígito verificador inválido`
  }),
  porItem('I03-30', (d) => val(d, 'prod/cEAN') === '' && 'cEAN vazio; sem GTIN, informe "SEM GTIN"'),
  {
    id: 'I04-10',
    verificar({ ide, det, simplificada }, falhar) {
      const literal = 'NOTA FISCAL EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL'
      if (simplificada && val(ide, 'tpAmb') === '2' && val(det[0], 'prod/xProd') !== literal) {
        falhar(el(det[0], 'prod/xProd'), `em homologação o primeiro item deve se chamar "${literal}"`)
      }
    },
  },
  porItem('I05-10', (d) => {
    const ncm = val(d, 'prod/NCM')
    return ncm.length === 2 && ncm !== '00' && `NCM "${ncm}" incompleto; informe 8 dígitos (ou 00 para serviço)`
  }),
  porItem('I05-24', (d, { ide }) => val(d, 'prod/NCM') === '00' && val(ide, 'finNFe') !== '3' && !temISSQN(d) && 'NCM 00 em item que não é serviço'),
  porItem('I05e-10', (d) => val(d, 'prod/indEscala') === 'N' && !tem(d, 'prod/CNPJFab') && 'escala não relevante sem CNPJ do fabricante'),
  porItem('I05e-20', (d) => {
    const c = val(d, 'prod/CNPJFab')
    return c !== undefined && !cnpjValido(c) && `CNPJ do fabricante ${c} inválido`
  }),
  porItem('I05k-10', (d) => tem(d, 'prod/tpCredPresIBSZFM') && 'classificação de crédito presumido da ZFM em NFC-e'),
  porItem('I05k-20', (d, { emit }) => {
    if (!tem(d, 'prod/tpCredPresIBSZFM')) return null
    const uf = val(emit, 'enderEmit/UF')
    return !AREA_ZFM_ALC(uf, val(emit, 'enderEmit/cMun')) && `classificação de crédito presumido da ZFM com emitente em ${uf}`
  }),
  porItem('I08-10', (d, { ide }) => val(ide, 'tpNF') === '1' && '123'.includes(primeiroDigito(d)) && `CFOP de entrada ${cfop(d)} em nota de saída`),
  porItem('I08-20', (d, { ide }) => val(ide, 'tpNF') === '0' && '567'.includes(primeiroDigito(d)) && `CFOP de saída ${cfop(d)} em nota de entrada`),
  porItem('I08-30', (d, { ide }) => {
    if (!'37'.includes(primeiroDigito(d)) || val(ide, 'idDest') === '3') return null
    if (primeiroDigito(d) === '7' && consumoNoExterior(d)) return null
    return `CFOP de exterior ${cfop(d)} com idDest=${val(ide, 'idDest')}`
  }),
  porItem('I08-40', (d, { ide }) => '26'.includes(primeiroDigito(d)) && val(ide, 'idDest') !== '2' && `CFOP interestadual ${cfop(d)} com idDest=${val(ide, 'idDest')}`),
  porItem('I08-50', (d, { ide }) => '15'.includes(primeiroDigito(d)) && val(ide, 'idDest') !== '1' && `CFOP interno ${cfop(d)} com idDest=${val(ide, 'idDest')}`),
  porItem('I08-60', (d, { dest }) => {
    if (!'37'.includes(primeiroDigito(d)) || consumoNoExterior(d) || !tem(dest, 'enderDest')) return null
    const uf = val(dest, 'enderDest/UF')
    return uf !== 'EX' && `CFOP de exterior ${cfop(d)} com destinatário em ${uf}`
  }),
  {
    id: 'I08-70',
    verificar({ ide, emit, dest, det, transp }, falhar) {
      if (val(ide, 'idDest') !== '1' || val(dest, 'indIEDest') !== '1') return
      const ufEmit = val(emit, 'enderEmit/UF')
      // Na NFC-e sem endereço, o destinatário é tido como da UF do emitente.
      const ufDest = val(dest, 'enderDest/UF') ?? ufEmit
      if (ufDest === ufEmit) return
      if (det.some((d) => val(d, 'prod/comb/UFCons') === ufEmit)) return
      if (val(ide, 'indPres') === '1' && val(transp, 'modFrete') === '9') return
      falhar(el(ide, 'idDest'), `operação interna entre ${ufEmit} e ${ufDest} com destinatário contribuinte`)
    },
  },
  {
    id: 'I08-90',
    verificar({ ide, emit, dest, det, inf }, falhar) {
      const ufEmit = val(emit, 'enderEmit/UF')
      const ufDest = val(dest, 'enderDest/UF')
      if (!ufDest || ufEmit !== ufDest) return
      if ((val(emit, 'CNPJ') ?? val(emit, 'CPF')) === (val(dest, 'CNPJ') ?? val(dest, 'CPF'))) return
      if (tem(inf, 'entrega/UF') && val(inf, 'entrega/UF') !== ufEmit) return
      if (tem(inf, 'retirada/UF') && val(inf, 'retirada/UF') !== ufDest) return
      for (const d of det) {
        if (!'26'.includes(primeiroDigito(d))) continue
        if (tem(d, 'prod/comb/UFCons') && val(d, 'prod/comb/UFCons') !== ufEmit) continue
        if (val(ide, 'finNFe') === '3' && cfop(d) === '6206') continue
        falhar(el(d, 'prod/CFOP'), `item ${nItem(d)}: CFOP interestadual ${cfop(d)} com emitente e destinatário em ${ufEmit}`)
      }
    },
  },
  porItem('I08-110', (d) => primeiroDigito(d) === '3' && !['3201', '3202', '3503', '3553'].includes(cfop(d)) && !tem(d, 'prod/DI') && `CFOP de importação ${cfop(d)} sem DI`),
  porItem('I08-120', (d) => primeiroDigito(d) === '3' && !['3201', '3202', '3211', '3503', '3553'].includes(cfop(d)) && !tem(d, 'imposto/IPI') && `CFOP de importação ${cfop(d)} sem grupo IPI`),
  porItem('I08-130', (d) => primeiroDigito(d) === '3' && !['3201', '3202', '3211', '3503', '3553'].includes(cfop(d)) && !tem(d, 'imposto/II') && `CFOP de importação ${cfop(d)} sem grupo II`),
  porItem('I08-141', (d, { ide, emit }) => {
    if (val(emit, 'CRT') !== '4' || val(ide, 'idDest') === '3') return null
    const retorno = val(ide, 'finNFe') === '4' || ['03', '06'].includes(val(ide, 'tpNFCredito'))
    return retorno && !CFOP_DEVOLUCAO_MEI.has(cfop(d)) && `MEI em devolução com CFOP ${cfop(d)}; aceitos ${[...CFOP_DEVOLUCAO_MEI].join(', ')}`
  }),
  porItem('I08-150', (d, { simplificada, ide }) => {
    if (!simplificada || CFOP_NFCE.has(cfop(d))) return null
    // RS e SP admitem 5949 com CSOSN 900 ou CST 90 (RS) / 40 (SP).
    if (cfop(d) === '5949') {
      const grupo = el(d, 'imposto/ICMS')?.filhos.find((f) => f.tipo === 'elemento')
      const cst = val(grupo, 'CSOSN') ?? val(grupo, 'CST')
      if (val(ide, 'cUF') === '43' && ['900', '90'].includes(cst)) return null
      if (val(ide, 'cUF') === '35' && ['900', '40'].includes(cst)) return null
    }
    return `CFOP ${cfop(d)} não permitido em NFC-e ou NF-e com DANFE simplificado`
  }),
  porItem('I08-160', (d) => SERVICO.test(cfop(d)) && !temISSQN(d) && `CFOP de serviço ${cfop(d)} sem grupo ISSQN`),
  porItem('I08-170', (d) => !SERVICO.test(cfop(d)) && temISSQN(d) && `grupo ISSQN com CFOP ${cfop(d)}`),
  {
    id: 'I08-180',
    verificar({ ide, det }, falhar) {
      if (!det.some((d) => ['5929', '6929'].includes(cfop(d)))) return
      const nfce = todos(ide, 'NFref/refNFe').find((r) => texto(r).slice(20, 22) === '65')
      if (nfce) falhar(nfce, 'lançamento de cupom fiscal (CFOP 5929/6929) referenciando NFC-e')
    },
  },
  {
    id: 'I08-184',
    verificar({ ide, det }, falhar) {
      if (det.some((d) => ['5929', '6929'].includes(cfop(d))) && !tem(ide, 'NFref')) falhar(ide, 'CFOP 5929/6929 sem documento referenciado')
    },
  },
  {
    id: 'I08-190',
    verificar({ ide, det }, falhar) {
      if (det.some((d) => ['3503', '7501'].includes(cfop(d))) && !tem(ide, 'NFref')) falhar(ide, 'exportação indireta (CFOP 3503/7501) sem nota referenciada')
    },
  },
  porItem('I11-10', (d, { ide }) => {
    if (val(ide, 'finNFe') !== '1') return null
    const calculado = Math.round(num(d, 'prod/vUnCom') * num(d, 'prod/qCom') * 100) / 100
    return difere(num(d, 'prod/vProd'), calculado, 0.01) && `vProd ${val(d, 'prod/vProd')} difere de vUnCom × qCom = ${calculado.toFixed(2)}`
  }),
  porItem('I11-20', (d, { ide }) => {
    if (val(ide, 'finNFe') !== '1') return null
    const calculado = Math.round(num(d, 'prod/vUnTrib') * num(d, 'prod/qTrib') * 100) / 100
    return difere(num(d, 'prod/vProd'), calculado, 0.01) && `vProd ${val(d, 'prod/vProd')} difere de vUnTrib × qTrib = ${calculado.toFixed(2)}`
  }),
  porItem('I12-10', (d) => {
    const g = val(d, 'prod/cEANTrib')
    return !SEM_GTIN(g) && !gtinValido(g) && `GTIN tributável ${g} com dígito verificador inválido`
  }),
  porItem('I12-30', (d) => !SEM_GTIN(val(d, 'prod/cEAN')) && SEM_GTIN(val(d, 'prod/cEANTrib')) && 'cEAN informado e cEANTrib sem GTIN'),
  porItem('I12-40', (d) => !SEM_GTIN(val(d, 'prod/cEANTrib')) && SEM_GTIN(val(d, 'prod/cEAN')) && 'cEANTrib informado e cEAN sem GTIN'),
  porItem('I12-60', (d) => val(d, 'prod/cEANTrib') === '' && 'cEANTrib vazio; sem GTIN, informe "SEM GTIN"'),
  porItem('I17-10', (d) => num(d, 'prod/vDesc') > num(d, 'prod/vProd') && `desconto ${val(d, 'prod/vDesc')} maior que o valor do produto ${val(d, 'prod/vProd')}`),
  porItem('I17b-10', (d, { simplificada }) => simplificada && val(d, 'prod/indTot') === '0' && 'item fora do total (indTot=0)'),
  porItem('I23-10', (d, { agora }) => {
    for (const di of todos(d, 'prod/DI')) {
      const desembaraco = val(di, 'dDesemb')
      const limite = new Date(agora.getTime() - 5 * 365.25 * DIA).toISOString().slice(0, 10)
      if (desembaraco > agora.toISOString().slice(0, 10)) return `desembaraço ${desembaraco} no futuro`
      if (desembaraco < limite) return `desembaraço ${desembaraco} há mais de 5 anos`
    }
    return null
  }),
  porItem('I23b-10', (d) => todos(d, 'prod/DI').some((di) => val(di, 'tpViaTransp') === '1' && !tem(di, 'vAFRMM')) && 'importação marítima sem vAFRMM'),
  porItem('I23d-10', (d) => todos(d, 'prod/DI').some((di) => ['2', '3'].includes(val(di, 'tpIntermedio')) && !tem(di, 'CNPJ') && !tem(di, 'CPF')) && 'importação por conta e ordem/encomenda sem CNPJ ou CPF do adquirente'),
  porItem('I23d-20', (d) => {
    const c = todos(d, 'prod/DI').map((di) => val(di, 'CNPJ')).find((c) => c !== undefined && !cnpjValido(c))
    return c && `CNPJ do adquirente ${c} inválido`
  }),
  porItem('I23d1-10', (d) => {
    const c = todos(d, 'prod/DI').map((di) => val(di, 'CPF')).find((c) => c !== undefined && !cpfValido(c))
    return c && `CPF do adquirente ${c} inválido`
  }),
  porItem('I23e-10', (d) => todos(d, 'prod/DI').some((di) => ['2', '3'].includes(val(di, 'tpIntermedio')) && !tem(di, 'UFTerceiro')) && 'importação por conta e ordem/encomenda sem UF do adquirente'),
  porItem('I29a-10', (d) => ['3127', '3211'].includes(cfop(d)) && !todos(d, 'prod/DI/adi').some((a) => tem(a, 'nDraw')) && `CFOP ${cfop(d)} sem número do drawback na adição`),
  porItem('I50-10', (d, { ide }) => tem(d, 'prod/detExport') && val(ide, 'idDest') !== '3' && 'grupo de exportação em operação que não é com exterior'),
  porItem('I51-10', (d) => ['7127', '7211'].includes(cfop(d)) && !todos(d, 'prod/detExport').some((e) => tem(e, 'nDraw')) && `CFOP ${cfop(d)} sem número do drawback`),
  porItem('I52-10', (d, { ide }) => ['3503', '7501'].includes(cfop(d)) && val(ide, 'finNFe') !== '2' && !tem(d, 'prod/detExport/exportInd') && `CFOP ${cfop(d)} sem grupo de exportação indireta`),
  porItem('I54-10', (d) => {
    const ch = todos(d, 'prod/detExport/exportInd/chNFe').map(texto).find((c) => String(dvChave(c.slice(0, 43))) !== c[43])
    return ch && `chave ${ch} com DV inválido`
  }),
  porItem('I54-20', (d) => {
    const ch = todos(d, 'prod/detExport/exportInd/chNFe').map(texto).find((c) => c.slice(20, 22) !== '55')
    return ch && `chave ${ch} não é de NF-e (modelo ${ch.slice(20, 22)})`
  }),
  porItem('I54-30', (d) => {
    const chaves = todos(d, 'prod/detExport/exportInd/chNFe').map(texto)
    const repetida = chaves.find((c, i) => chaves.indexOf(c) !== i)
    return repetida && `chave ${repetida} repetida no item`
  }),
  porItem('I54-40', (d, { ide }) => {
    const referenciadas = new Set(todos(ide, 'NFref/refNFe').map(texto))
    const ch = todos(d, 'prod/detExport/exportInd/chNFe').map(texto).find((c) => !referenciadas.has(c))
    return ch && `chave ${ch} não consta nas notas referenciadas`
  }),
  porItem('I55-10', (d) => {
    const grupos = todos(d, 'prod/detExport/exportInd')
    if (!grupos.length) return null
    const total = grupos.reduce((s, g) => s + num(g, 'qExport'), 0)
    return Math.abs(total - num(d, 'prod/qCom')) > 1e-6 && `soma de qExport ${total} difere de qCom ${val(d, 'prod/qCom')}`
  }),
  porItem('I83-10', (d, { agora }) => {
    const hoje = agora.toISOString().slice(0, 10)
    const r = todos(d, 'prod/rastro').find((r) => val(r, 'dFab') > hoje)
    return r && `fabricação ${val(r, 'dFab')} depois de hoje`
  }),
  porItem('I84-10', (d) => {
    const r = todos(d, 'prod/rastro').find((r) => val(r, 'dVal') < val(r, 'dFab'))
    return r && `validade ${val(r, 'dVal')} antes da fabricação ${val(r, 'dFab')}`
  }),
  porItem('I86-10', (d, { ide }) => val(ide, 'tpEmis') !== '3' && !['1', '2'].includes(val(ide, 'procEmi')) && tem(d, 'prod/infProdNFF') && 'grupo infProdNFF fora da NFF e da nota avulsa'),
  // O texto do MOC para I87-10 é ambíguo ("tpEmis<>3 ou procEmi=1 ou 2"); segue o mesmo sentido
  // do I86-10, a regra irmã: embalagem só na NFF ou na avulsa.
  porItem('I87-10', (d, { ide }) => val(ide, 'tpEmis') !== '3' && !['1', '2'].includes(val(ide, 'procEmi')) && tem(d, 'prod/infProdEmb') && 'grupo infProdEmb fora da NFF e da nota avulsa'),
  porItem('J01-10', (d, { simplificada }) => simplificada && tem(d, 'prod/veicProd') && 'grupo de veículo novo'),
  porItem('K01-20', (d, { ide }) => {
    if (!tem(d, 'prod/med') || tem(d, 'prod/rastro')) return null
    if (val(ide, 'finNFe') === '4' || ['2', '3'].includes(val(ide, 'indPres')) || val(ide, 'tpNF') === '0' || val(ide, 'tpImp') === '6') return null
    if (['5922', '6922', '5118', '6118', '5119', '6119', '5120', '6120'].includes(cfop(d))) return null
    return 'medicamento sem grupo de rastreabilidade (rastro)'
  }),
  porItem('L01-10', (d, { simplificada }) => simplificada && tem(d, 'prod/arma') && 'grupo de armamento'),
  porItem('LA01-30', (d) => {
    const cClassTrib = val(d, 'imposto/IBSCBS/cClassTrib')
    return cClassTrib && (cClassTrib === '410013' || cClassTrib.startsWith('620')) && !tem(d, 'prod/comb') && `cClassTrib ${cClassTrib} de combustível sem grupo comb`
  }),
  porItem('LA03c-10', (d) => {
    const c = el(d, 'prod/comb')
    return c && (tem(c, 'pGLP') || tem(c, 'pGNn') || tem(c, 'pGNi')) && val(c, 'cProdANP') !== GLP && `percentuais de GLP/gás natural para o produto ANP ${val(c, 'cProdANP')}`
  }),
  porItem('LA03c-20', (d) => {
    const c = el(d, 'prod/comb')
    if (!c || val(c, 'cProdANP') !== GLP) return null
    const soma = num(c, 'pGLP') + num(c, 'pGNn') + num(c, 'pGNi')
    return difere(soma, 100) && `pGLP + pGNn + pGNi = ${soma}, deve ser 100`
  }),
  porItem('LA11-20', (d) => tem(d, 'prod/comb/encerrante') && !['5656', '5667'].includes(cfop(d)) && `encerrante com CFOP ${cfop(d)}`),
  porItem('LA16-10', (d) => {
    const e = el(d, 'prod/comb/encerrante')
    return e && num(e, 'vEncFin') <= num(e, 'vEncIni') && `encerrante final ${val(e, 'vEncFin')} não é maior que o inicial ${val(e, 'vEncIni')}`
  }),
  porItem('LA21-10', (d) => {
    const c = el(d, 'prod/comb')
    if (!c || GLP_E_GAS.has(val(c, 'cProdANP'))) return null
    const origens = todos(c, 'origComb')
    if (!origens.length) return null
    const soma = origens.reduce((s, o) => s + num(o, 'pOrig'), 0)
    return Math.abs(soma - 100) > 0.1 + 1e-9 && `soma de pOrig ${soma.toFixed(4)}, deve ser 100`
  }),
  porItem('LA21-20', (d) => {
    const c = el(d, 'prod/comb')
    if (!c || !GLP_E_GAS.has(val(c, 'cProdANP'))) return null
    for (const tipo of ['0', '1']) {
      const origens = todos(c, 'origComb').filter((o) => val(o, 'indImport') === tipo)
      if (!origens.length) continue
      const soma = origens.reduce((s, o) => s + num(o, 'pOrig'), 0)
      if (Math.abs(soma - 100) > 0.1 + 1e-9) return `soma de pOrig ${tipo === '0' ? 'nacional' : 'importado'} ${soma.toFixed(4)}, deve ser 100`
    }
    return null
  }),
  porItem('LB01-10', (d, { simplificada }) => simplificada && tem(d, 'prod/nRECOPI') && 'número RECOPI (papel imune)'),
]

