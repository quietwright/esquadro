// Grupos N a UA: tributos do item (ICMS, partilha para a UF de destino, IPI, II, PIS, COFINS,
// ISSQN e devolução de tributos).
//
// Ficam de fora as regras que dependem das tabelas de benefício fiscal de cada UF (cBenef,
// N12-85/86/94/98) e as que a própria NT marca como "implementação futura".

import { cfop } from '../apoio.js'
import { difere, el, num, tem, val } from '../consulta.js'
import { atributo } from '../xml.js'
import { diaCivil } from './util.js'

const nItem = (d) => atributo(d, 'nItem')
const grupoIcms = (d) => el(d, 'imposto/ICMS')?.filhos.find((f) => f.tipo === 'elemento')
const cst = (g) => val(g, 'CST')
const csosn = (g) => val(g, 'CSOSN')
const codigoCfop = (d) => val(d, 'prod/CFOP')
const dia = ({ ide }) => diaCivil(val(ide, 'dhEmi'))
const indicador = (d, n, nome) => cfop(codigoCfop(d), dia(n))?.[nome] === 1

// Valor calculado com arredondamento em centavos e a tolerância de R$ 0,01 da nota (*4).
const produto = (...fatores) => Math.round(fatores.reduce((p, f) => p * f, 1) * 100) / 100
const fora = (informado, calculado) => difere(informado, calculado, 0.01)

function porItem(id, teste, onde = (d) => grupoIcms(d) ?? el(d, 'imposto')) {
  return {
    id,
    verificar(n, falhar) {
      for (const d of n.det) {
        const detalhe = teste(d, n, grupoIcms(d))
        if (detalhe) falhar(onde(d), `item ${nItem(d)}: ${detalhe}`)
      }
    },
  }
}

const CFOP_SIMPLIFICADA = new Set(['5101', '5102', '5103', '5104', '5115', '5910'])
const CFOP_ST_SIMPLIFICADA = new Set(['5405', '5656', '5667', '5910'])
// Combustíveis com repasse interestadual (N08-10).
const COMBUSTIVEIS_REPASSE = new Set(
  ('210203001 320101001 320101002 320102002 320102001 320102003 320102005 320201001 320103001 220102001 320301001 320103002 ' +
    '820101032 820101026 820101027 820101004 820101005 820101022 820101031 820101030 820101014 820101006 820101016 820101015 ' +
    '820101025 820101017 820101018 820101019 820101020 820101021 420105001 420101005 420101004 420102005 420102004 420104001 ' +
    '820101033 820101034 420106001 820101011 820101003 820101013 820101012 420106002 830101001 420301004 420202001 420301001 ' +
    '420301002 410103001 410101001 410102001 430101004 510101001 510101002 510102001 510102002 510201001 510201003 510301003 ' +
    '510103001 510301001').split(' '),
)
// Combustíveis que não são derivados de petróleo (exceções da partilha e do N12-70).
const NAO_DERIVADOS_PETROLEO = new Set(
  '820101001 820101010 810102001 810102004 810102002 810102003 810101002 810101001 810101003 220101003 220101004 220101002 220101001 220101005 220101006 560101001'.split(' '),
)
const derivadoDePetroleo = (d) => tem(d, 'prod/comb') && !NAO_DERIVADOS_PETROLEO.has(val(d, 'prod/comb/cProdANP'))
const ZFM_CFOP = new Set('1203 1204 1208 1209 2203 2204 2208 2209 5109 5110 5120 5151 5152 5651 5652 5654 5655 5658 5659 5910 6905 6109 6110 6120 6122 6123 6151 6152 6651 6652 6654 6655 6658 6659 6910 6923'.split(' '))
const SUL_SUDESTE = new Set(['PR', 'SC', 'RS', 'SP', 'RJ', 'MG'])
const importado = (g) => ['1', '2', '3', '8'].includes(val(g, 'orig'))
const tipoNotaDeRetornoOuAjuste = (ide) => ['2', '3', '5', '6'].includes(val(ide, 'finNFe')) || val(ide, 'gCompraGov/tpOperGov') === '2'

// Alíquota interestadual esperada: 7% do Sul/Sudeste (exceto ES) para N, NE, CO e ES; 12% no resto.
const aliquotaInterestadual = (ufOrigem, ufDestino) => (SUL_SUDESTE.has(ufOrigem) && !SUL_SUDESTE.has(ufDestino) ? 7 : 12)

// Exceções comuns de entrega/retirada em outra UF das regras de alíquota interestadual.
const localDiverso = ({ inf, emit, dest }) =>
  (tem(inf, 'entrega/UF') && val(inf, 'entrega/UF') !== val(emit, 'enderEmit/UF')) ||
  (tem(inf, 'retirada/UF') && val(inf, 'retirada/UF') !== val(dest, 'enderDest/UF'))

const vendaDiretaDeVeiculo = ({ det }) => det.some((d) => ['2', '3'].includes(val(d, 'prod/veicProd/tpOp')))

// Percentual de partilha para a UF de destino por ano (EC 87/2015).
const PARTILHA_POR_ANO = { 2016: 40, 2017: 60, 2018: 80 }

export default [
  // --- ICMS --------------------------------------------------------------------------------
  {
    id: 'N01-10',
    verificar({ emit, ide, det }, falhar) {
      if (tem(emit, 'IE') || val(ide, 'finNFe') === '4' || val(ide, 'tpNFCredito') === '03') return
      for (const d of det) {
        const indevido = el(d, 'imposto/ICMS') ?? el(d, 'imposto/ICMSUFDest')
        if (indevido) falhar(indevido, `item ${nItem(d)}: ICMS informado por emitente sem IE (contribuinte só de IBS/CBS)`)
      }
    },
  },
  porItem('N08-10', (d, n, g) => g?.nome === 'ICMS60' && COMBUSTIVEIS_REPASSE.has(val(d, 'prod/comb/cProdANP')) && `ICMS60 para combustível com repasse interestadual (use ICMSST com CST 60)`),
  porItem('N11-10', (d, { emit, ide }, g) => g && val(emit, 'CRT') !== '4' && !['5', '6'].includes(val(ide, 'finNFe')) && !val(g, 'orig') && 'origem da mercadoria (orig) não informada'),
  porItem('N12-10', (d, { ide }, g) => {
    if (!g || !codigoCfop(d).startsWith('7') || val(ide, 'finNFe') === '4') return null
    if (cst(g) !== undefined && cst(g) !== '41') return `exportação com CST ${cst(g)}; esperado 41`
    if (csosn(g) !== undefined && csosn(g) !== '300') return `exportação com CSOSN ${csosn(g)}; esperado 300`
    return null
  }),
  porItem('N12-20', (d, { emit }, g) => val(emit, 'CRT') === '1' && cst(g) !== undefined && !['02', '15', '53', '61'].includes(cst(g)) && `CST ${cst(g)} para emitente do Simples Nacional (CRT=1); use CSOSN`),
  porItem('N12-30', (d, { simplificada }, g) => simplificada && cst(g) !== undefined && !['00', '20', '40', '41', '60', '61', '90'].includes(cst(g)) && `CST ${cst(g)} não permitido`),
  porItem('N12-34', (d, { simplificada }, g) => simplificada && g?.nome === 'ICMS90' && tem(g, 'modBCST') && 'CST 90 com dados de ICMS-ST'),
  porItem('N12-40', (d, { simplificada, ide }, g) => {
    if (!simplificada || !['00', '20', '40', '41', '90'].includes(cst(g)) || CFOP_SIMPLIFICADA.has(codigoCfop(d))) return null
    const uf = val(ide, 'cUF')
    const c = codigoCfop(d)
    if ((uf === '43' && cst(g) === '90' && c === '5949') || (uf === '23' && cst(g) === '90' && c === '5405') || (uf === '35' && cst(g) === '40' && c === '5949')) return null
    return `CFOP ${c} não permitido com CST ${cst(g)}`
  }),
  porItem('N12-44', (d, { simplificada }, g) => simplificada && cst(g) === '60' && !CFOP_ST_SIMPLIFICADA.has(codigoCfop(d)) && `CFOP ${codigoCfop(d)} não permitido com CST 60`),
  porItem('N12-50', (d, { simplificada }, g) => simplificada && g?.nome === 'ICMSPart' && 'partilha de ICMS entre UF (ICMSPart)'),
  porItem('N12-60', (d, { simplificada }, g) => simplificada && g?.nome === 'ICMSST' && 'repasse de ICMS-ST retido (ICMSST)'),
  porItem('N12-70', (d, n, g) => {
    const { dest, ide, det } = n
    const c = cst(g)
    if (val(dest, 'indIEDest') !== '9' || c === undefined || ['00', '20', '40', '41', '60', '61'].includes(c)) return null
    if (val(ide, 'tpNF') === '0' || det.some((x) => tem(x, 'prod/veicProd'))) return null
    if (c === '50' && (indicador(d, n, 'indRetor') || indicador(d, n, 'indRemes') || ['5949', '6949'].includes(codigoCfop(d)))) return null
    if (c === '30' && val(ide, 'idDest') === '2' && derivadoDePetroleo(d)) return null
    if (['50', '51'].includes(c) && val(ide, 'finNFe') === '4') return null
    if (c === '51' && (['5123', '5922', '6123', '6922'].includes(codigoCfop(d)) || (val(ide, 'idDest') === '1' && ['5906', '5907'].includes(codigoCfop(d))))) return null
    // Energia elétrica no mercado livre (ACL) em operação interestadual (exceção 9).
    if (c === '30' && val(ide, 'idDest') === '2' && val(d, 'prod/NCM') === '27160000') return null
    // CE: CST 90 com CFOP 5403 ou 5405.
    if (c === '90' && val(ide, 'cUF') === '23' && ['5403', '5405'].includes(codigoCfop(d))) return null
    if (c === '10' && val(ide, 'idDest') === '1') return `CST 10 em operação com não contribuinte (a UF pode dispensar na operação interna)`
    return `CST ${c} em operação com não contribuinte`
  }),
  porItem('N12-80', (d, { dest }, g) => {
    if (val(dest, 'indIEDest') !== '2' || !['50', '51'].includes(cst(g))) return null
    if (cst(g) === '50' && ['1915', '1916', '2915', '2916', '5915', '5916', '6915', '6916', '1912', '1913', '5912', '5913', '1901', '2901', '5901', '6901'].includes(codigoCfop(d))) return null
    return `CST ${cst(g)} para destinatário isento de IE`
  }),
  porItem('N12-81', (d, { ide }, g) => cst(g) === '60' && val(ide, 'indFinal') === '0' && !['vBCSTRet', 'pST', 'vICMSSubstituto', 'vICMSSTRet'].every((c) => tem(g, c)) && 'CST 60 sem vBCSTRet, pST, vICMSSubstituto e vICMSSTRet'),
  porItem('N12-82', (d, { ide }, g) => cst(g) === '60' && val(ide, 'indFinal') === '1' && !tem(g, 'vICMSEfet') && 'CST 60 para consumidor final sem o grupo de ICMS efetivo'),
  porItem('N12-97', (d, { ide }, g) => {
    if (cst(g) !== '51' || val(ide, 'finNFe') === '4') return null
    const faltam = ['modBC', 'pRedBC', 'vBC', 'pICMS', 'vICMSOp', 'pDif', 'vICMSDif', 'vICMS'].filter((c) => !tem(g, c))
    return faltam.length && `CST 51 sem ${faltam.join(', ')}`
  }),
  porItem('N12a-10', (d, { emit }, g) => csosn(g) !== undefined && !['1', '4'].includes(val(emit, 'CRT')) && `CSOSN ${csosn(g)} para emitente fora do Simples Nacional (CRT=${val(emit, 'CRT')})`),
  porItem('N12a-20', (d, { simplificada }, g) => simplificada && csosn(g) !== undefined && !['102', '103', '300', '400', '500', '900'].includes(csosn(g)) && `CSOSN ${csosn(g)} não permitido`),
  porItem('N12a-34', (d, { simplificada }, g) => simplificada && g?.nome === 'ICMSSN900' && tem(g, 'modBCST') && 'CSOSN 900 com dados de ICMS-ST'),
  porItem('N12a-40', (d, { simplificada, ide }, g) => {
    if (!simplificada || !['102', '103', '300', '400', '900'].includes(csosn(g)) || CFOP_SIMPLIFICADA.has(codigoCfop(d))) return null
    const uf = val(ide, 'cUF')
    const c = codigoCfop(d)
    if (csosn(g) === '900' && ((uf === '23' && c === '5405') || (['35', '43'].includes(uf) && c === '5949'))) return null
    return `CFOP ${c} não permitido com CSOSN ${csosn(g)}`
  }),
  porItem('N12a-44', (d, { simplificada }, g) => simplificada && csosn(g) === '500' && !CFOP_ST_SIMPLIFICADA.has(codigoCfop(d)) && `CFOP ${codigoCfop(d)} não permitido com CSOSN 500`),
  porItem('N12a-50', (d, { ide }, g) => csosn(g) === '500' && val(ide, 'indFinal') === '0' && !['vBCSTRet', 'pST', 'vICMSSubstituto', 'vICMSSTRet'].every((c) => tem(g, c)) && 'CSOSN 500 sem vBCSTRet, pST, vICMSSubstituto e vICMSSTRet'),
  porItem('N12a-60', (d, { ide }, g) => csosn(g) === '500' && val(ide, 'indFinal') === '1' && !tem(g, 'vICMSEfet') && 'CSOSN 500 para consumidor final sem o grupo de ICMS efetivo'),
  porItem('N12a-70', (d, { dest, ide, emit }, g) => {
    const c = csosn(g)
    if (val(dest, 'indIEDest') !== '9' || c === undefined || ['102', '103', '300', '400', '500'].includes(c) || val(ide, 'tpNF') === '0') return null
    if (['5915', '5916', '6915', '6916', '5912', '5913'].includes(codigoCfop(d))) return null
    if (val(emit, 'CRT') === '4' && c === '900' && ['5551', '6551', '5904', '6904'].includes(codigoCfop(d))) return null
    return `CSOSN ${c} em operação com não contribuinte`
  }),
  porItem('N12a-80', (d, { emit, ide }, g) => val(emit, 'CRT') === '4' && val(ide, 'idDest') !== '3' && csosn(g) !== undefined && !['102', '300', '400', '900'].includes(csosn(g)) && `MEI com CSOSN ${csosn(g)}; aceitos 102, 300, 400 e 900`),
  porItem('N12a-81', (d, { emit, ide, simplificada }, g) => simplificada && val(emit, 'CRT') === '4' && val(ide, 'idDest') !== '3' && csosn(g) !== undefined && !['102', '300'].includes(csosn(g)) && `MEI com CSOSN ${csosn(g)}; aceitos 102 e 300`),
  porItem('N12a-90', (d, { emit, ide }, g) => {
    if (val(emit, 'CRT') !== '4' || val(ide, 'idDest') === '3') return null
    const c = codigoCfop(d)
    if (csosn(g) === '102' && !['5102', '6102'].includes(c)) return `MEI com CSOSN 102 e CFOP ${c}; aceitos 5102 e 6102`
    const do900 = '1202 1904 2202 2904 5202 5904 6202 6904 1501 1503 1504 1505 1506 1553 2501 2503 2504 2505 2506 2553 5501 5502 5504 5505 5551 5933 6501 6502 6504 6505 6551 6933'.split(' ')
    if (csosn(g) === '900' && !do900.includes(c)) return `MEI com CSOSN 900 e CFOP ${c}`
    return null
  }),
  porItem('N12a-91', (d, { emit, ide, simplificada }) => simplificada && val(emit, 'CRT') === '4' && val(ide, 'idDest') !== '3' && codigoCfop(d) !== '5102' && `MEI com CFOP ${codigoCfop(d)}; aceito só 5102`),
  porItem('N14a-10', (d, { ide }, g) => {
    if (cst(g) !== '51' || !(num(g, 'pRedBC') > 0) || tem(g, 'cBenefRBC')) return null
    if (val(ide, 'finNFe') === '4' && ['2', '3'].includes(val(ide, 'idDest'))) return null
    const dispensavel = val(ide, 'finNFe') === '4' || val(ide, 'finNFe') === '3' || val(ide, 'tpNF') === '0'
    return `CST 51 com redução de base sem cBenefRBC${dispensavel ? ' (a UF pode dispensar nesta operação)' : ''}`
  }),
  porItem('N16-04', (d, n, g) => {
    const { ide } = n
    if (val(ide, 'idDest') !== '2' || val(ide, 'tpNF') !== '1' || !importado(g) || !['00', '10', '20', '70', '90'].includes(cst(g))) return null
    if (val(ide, 'finNFe') === '4' || indicador(d, n, 'indRetor') || vendaDiretaDeVeiculo(n) || ['6118', '6119', '6122', '6123'].includes(codigoCfop(d))) return null
    if (val(ide, 'finNFe') === '2') return null // depende da data da nota referenciada
    return num(g, 'pICMS') > 4 && `importado (orig ${val(g, 'orig')}) em operação interestadual com alíquota ${val(g, 'pICMS')}%; o máximo é 4%`
  }),
  porItem('N16-20', (d, n, g) => {
    const { ide, emit, dest } = n
    if (val(ide, 'idDest') !== '2' || val(ide, 'tpNF') !== '1' || val(ide, 'finNFe') !== '1' || !g || importado(g) || !tem(g, 'pICMS')) return null
    if (vendaDiretaDeVeiculo(n) || indicador(d, n, 'indRetor') || indicador(d, n, 'indAnula') || ['6118', '6119', '6122', '6123'].includes(codigoCfop(d)) || localDiverso(n)) return null
    const limite = aliquotaInterestadual(val(emit, 'enderEmit/UF'), val(dest, 'enderDest/UF'))
    return num(g, 'pICMS') > limite && `alíquota interestadual ${val(g, 'pICMS')}% acima de ${limite}%`
  }),
  porItem('N16a-10', (d, n, g) => cst(g) === '51' && tem(g, 'vICMSOp') && fora(num(g, 'vICMSOp'), produto(num(g, 'vBC'), num(g, 'pICMS') / 100)) && `vICMSOp ${val(g, 'vICMSOp')} difere de vBC × pICMS`),
  porItem('N16c-10', (d, n, g) => cst(g) === '51' && tem(g, 'vICMSDif') && fora(num(g, 'vICMSDif'), produto(num(g, 'vICMSOp'), num(g, 'pDif') / 100)) && `vICMSDif ${val(g, 'vICMSDif')} difere de vICMSOp × pDif`),
  porItem('N17-10', (d, n, g) => {
    if (cst(g) !== '51' || (!tem(g, 'vICMSDif') && !tem(g, 'vICMS'))) return null
    return fora(num(g, 'vICMS'), num(g, 'vICMSOp') - num(g, 'vICMSDif')) && `vICMS ${val(g, 'vICMS')} difere de vICMSOp − vICMSDif`
  }),
  porItem('N17-20', (d, { ide }, g) => {
    if (!['00', '10', '20', '70'].includes(cst(g)) || val(ide, 'finNFe') !== '1') return null
    const calculado = produto(num(g, 'vBC'), num(g, 'pICMS') / 100)
    return fora(num(g, 'vICMS'), calculado) && `vICMS ${val(g, 'vICMS')} difere de vBC × pICMS = ${calculado.toFixed(2)}`
  }),
  porItem('N17b-10', (d, n, g) => tem(g, 'pFCP') && num(g, 'pFCP') === 0 && 'pFCP igual a zero; sem FCP, omita os campos'),
  porItem('N17c-10', (d, { ide }, g) => {
    if (!tem(g, 'vFCP') || val(ide, 'finNFe') !== '1') return null
    const base = cst(g) === '00' ? num(g, 'vBC') : ['10', '20', '70', '90'].includes(cst(g)) ? num(g, 'vBCFCP') : null
    if (base === null) return null
    const calculado = produto(base, num(g, 'pFCP') / 100)
    return fora(num(g, 'vFCP'), calculado) && `vFCP ${val(g, 'vFCP')} difere de base × pFCP = ${calculado.toFixed(2)}`
  }),
  porItem('N17c-20', (d, { ide, dest }, g) => val(ide, 'idDest') === '2' && val(ide, 'indFinal') === '1' && val(dest, 'indIEDest') === '9' && tem(g, 'vFCP') && 'FCP de operação interestadual para não contribuinte vai em vFCPUFDest'),
  porItem('N18-10', (d, n, g) => val(g, 'modBCST') === '4' && !tem(g, 'pMVAST') && 'modBCST=4 (MVA) sem pMVAST'),
  porItem('N18-20', (d, n, g) => tem(g, 'modBCST') && val(g, 'modBCST') !== '4' && tem(g, 'pMVAST') && `pMVAST com modBCST=${val(g, 'modBCST')}`),
  porItem('N23-10', (d, n, g) => {
    if (!g || tem(d, 'prod/CEST') || g.nome === 'ICMSPart') return null
    const c = cst(g) ?? csosn(g)
    const comST = ['10', '30', '60', '70', '201', '202', '203', '500'].includes(c) || (['90', '900'].includes(c) && num(g, 'vICMSST') !== 0)
    return comST && `CST/CSOSN ${c} (substituição tributária) sem CEST`
  }),
  porItem('N23b-10', (d, n, g) => tem(g, 'pFCPST') && num(g, 'pFCPST') === 0 && 'pFCPST igual a zero; sem FCP-ST, omita os campos'),
  porItem('N23d-10', (d, { ide }, g) => {
    const c = cst(g) ?? csosn(g)
    if (!tem(g, 'vFCPST') || val(ide, 'finNFe') !== '1' || !['10', '30', '70', '90', '201', '202', '203', '900'].includes(c)) return null
    const calculado = produto(num(g, 'vBCFCPST'), num(g, 'pFCPST') / 100) - num(g, 'vFCP')
    return fora(num(g, 'vFCPST'), calculado) && `vFCPST ${val(g, 'vFCPST')} difere de vBCFCPST × pFCPST − vFCP = ${calculado.toFixed(2)}`
  }),
  porItem('N27b-10', (d, n, g) => tem(g, 'pFCPSTRet') && num(g, 'pFCPSTRet') === 0 && 'pFCPSTRet igual a zero'),
  porItem('N28-10', (d, { dest }, g) => val(g, 'motDesICMS') === '7' && !tem(dest, 'ISUF') && !'12'.includes(codigoCfop(d)[0]) && 'desoneração SUFRAMA sem inscrição SUFRAMA do destinatário'),
  porItem('N28-12', (d, n, g) => val(g, 'motDesICMS') === '7' && val(g, 'indDeduzDeson') !== '1' && 'desoneração SUFRAMA com indDeduzDeson diferente de 1'),
  porItem('N28-20', (d, n, g) => val(g, 'motDesICMS') === '7' && !ZFM_CFOP.has(codigoCfop(d)) && `desoneração SUFRAMA com CFOP ${codigoCfop(d)}`),
  porItem('N28-30', (d, n, g) => tem(g, 'motDesICMS') && !(num(g, 'vICMSDeson') > 0) && 'motivo de desoneração sem vICMSDeson maior que zero'),
  porItem('N37a-10', (d, n, g) => ['02', '15', '53'].includes(cst(g)) && !tem(g, 'qBCMono') && `CST ${cst(g)} sem qBCMono`),
  porItem('N39-10', (d, { ide }, g) => {
    if (!['02', '15'].includes(cst(g)) || val(ide, 'finNFe') !== '1' || !tem(g, 'qBCMono')) return null
    const calculado = produto(num(g, 'qBCMono'), num(g, 'adRemICMS'))
    return fora(num(g, 'vICMSMono'), calculado) && `vICMSMono ${val(g, 'vICMSMono')} difere de qBCMono × adRemICMS = ${calculado.toFixed(2)}`
  }),
  porItem('N39a-10', (d, n, g) => cst(g) === '15' && !tem(g, 'qBCMonoReten') && 'CST 15 sem qBCMonoReten'),
  ...[
    ['N41-10', false],
    ['N41-20', true],
  ].map(([id, reduzido]) =>
    porItem(id, (d, { ide }, g) => {
      if (cst(g) !== '15' || val(ide, 'finNFe') !== '1' || !tem(g, 'qBCMonoReten')) return null
      const especial = '420102004 420102005 420105001 820101003 820101011 820101012 820101013 820101026 820101027 820101032 820101033 820101034'.split(' ').includes(val(d, 'prod/comb/cProdANP'))
      if (especial !== reduzido) return null
      const calculado = produto(num(g, 'qBCMonoReten'), num(g, 'adRemICMSReten'), reduzido ? 0.3333 : 1)
      return fora(num(g, 'vICMSMonoReten'), calculado) && `vICMSMonoReten ${val(g, 'vICMSMonoReten')} difere do calculado ${calculado.toFixed(2)}`
    }),
  ),
  porItem('N43a-10', (d, n, g) => cst(g) === '61' && !tem(g, 'qBCMonoRet') && 'CST 61 sem qBCMonoRet'),

  // --- ICMS para a UF de destino (partilha) ------------------------------------------------
  porItem('NA01-10', (d, { simplificada }) => simplificada && tem(d, 'imposto/ICMSUFDest') && 'grupo ICMSUFDest'),
  porItem('NA01-20', (d, n, g) => {
    const { ide, dest, emit, inf } = n
    if (val(ide, 'idDest') !== '2' || val(ide, 'indFinal') !== '1' || val(dest, 'indIEDest') !== '9') return null
    if (tem(d, 'imposto/ISSQN') || tem(d, 'imposto/ICMSUFDest') || g?.nome === 'ICMSPart' || val(ide, 'tpNF') === '0') return null
    if (tipoNotaDeRetornoOuAjuste(ide) || ['1', '4'].includes(val(emit, 'CRT'))) return null
    if (indicador(d, n, 'indRetor') || indicador(d, n, 'indRemes') || ['6552', '6922', '6929'].includes(codigoCfop(d))) return null
    if (derivadoDePetroleo(d) || val(inf, 'entrega/UF') === val(emit, 'enderEmit/UF')) return null
    if (['40', '41'].includes(cst(g)) || ['103', '300', '400'].includes(csosn(g))) return null
    if (val(ide, 'finNFe') === '4') return null // a exceção depende da data da nota referenciada
    return 'venda interestadual a consumidor final não contribuinte sem o grupo ICMSUFDest'
  }),
  porItem('NA01-30', (d, n) => {
    const { ide, dest, emit, inf } = n
    if (!tem(d, 'imposto/ICMSUFDest')) return null
    if (tem(inf, 'entrega/UF') && val(inf, 'entrega/UF') !== val(emit, 'enderEmit/UF')) return null
    if (val(ide, 'idDest') !== '2') return 'ICMSUFDest em operação que não é interestadual'
    if (val(ide, 'indFinal') !== '1') return 'ICMSUFDest em operação que não é com consumidor final'
    if (val(dest, 'indIEDest') !== '9') return 'ICMSUFDest com destinatário contribuinte'
    if (tem(d, 'imposto/ISSQN')) return 'ICMSUFDest em item de serviço'
    if (derivadoDePetroleo(d)) return 'ICMSUFDest em combustível derivado de petróleo'
    return null
  }, (d) => el(d, 'imposto/ICMSUFDest')),
  porItem('NA09-10', (d, n, g) => tem(d, 'imposto/ICMSUFDest') && num(d, 'imposto/ICMSUFDest/pICMSInter') === 4 && !importado(g) && `alíquota interestadual de 4% para mercadoria nacional (orig ${val(g, 'orig')})`),
  porItem('NA09-20', (d, n, g) => tem(d, 'imposto/ICMSUFDest') && [7, 12].includes(num(d, 'imposto/ICMSUFDest/pICMSInter')) && importado(g) && `alíquota interestadual de ${val(d, 'imposto/ICMSUFDest/pICMSInter')}% para importado (orig ${val(g, 'orig')})`),
  porItem('NA09-30', (d, n) => {
    const { ide, emit, dest } = n
    const p = num(d, 'imposto/ICMSUFDest/pICMSInter')
    if (!tem(d, 'imposto/ICMSUFDest') || ![7, 12].includes(p) || val(ide, 'tpNF') !== '1' || val(ide, 'finNFe') !== '1') return null
    if (indicador(d, n, 'indRetor') || localDiverso(n)) return null
    const esperada = aliquotaInterestadual(val(emit, 'enderEmit/UF'), val(dest, 'enderDest/UF'))
    return p !== esperada && `alíquota interestadual ${p}%; de ${val(emit, 'enderEmit/UF')} para ${val(dest, 'enderDest/UF')} é ${esperada}%`
  }),
  porItem('NA11-10', (d, n) => {
    const { ide } = n
    if (!tem(d, 'imposto/ICMSUFDest') || val(ide, 'finNFe') !== '1' || indicador(d, n, 'indRetor')) return null
    const ano = Number(val(ide, 'dhEmi').slice(0, 4))
    const esperado = PARTILHA_POR_ANO[ano] ?? 100
    const p = num(d, 'imposto/ICMSUFDest/pICMSInterPart')
    return p !== esperado && `pICMSInterPart ${p}; em ${ano} é ${esperado}`
  }),
  porItem('NA13-10', (d) => {
    const u = el(d, 'imposto/ICMSUFDest')
    if (!tem(u, 'vFCPUFDest')) return null
    const calculado = produto(num(u, 'vBCFCPUFDest'), num(u, 'pFCPUFDest') / 100)
    return fora(num(u, 'vFCPUFDest'), calculado) && `vFCPUFDest ${val(u, 'vFCPUFDest')} difere de vBCFCPUFDest × pFCPUFDest = ${calculado.toFixed(2)}`
  }),
  porItem('NA15-10', (d, { ide }, g) => {
    const u = el(d, 'imposto/ICMSUFDest')
    if (!u || cst(g) !== '00' || val(ide, 'tpNF') === '0') return null
    const diferenca = (num(u, 'vBCUFDest') * num(u, 'pICMSUFDest') - num(g, 'vBC') * num(u, 'pICMSInter')) / 100
    const calculado = Math.max(0, produto(diferenca, num(u, 'pICMSInterPart') / 100))
    return fora(num(u, 'vICMSUFDest'), calculado) && `vICMSUFDest ${val(u, 'vICMSUFDest')} difere do calculado ${calculado.toFixed(2)}`
  }),

  // --- IPI, II, PIS, COFINS --------------------------------------------------------------
  porItem('O01-10', (d, { simplificada }) => simplificada && tem(d, 'imposto/IPI') && 'grupo IPI'),
  porItem('O09-10', (d) => {
    const c = val(d, 'imposto/IPI/IPINT/CST')
    const enq = Number(val(d, 'imposto/IPI/cEnq'))
    const faixas = { '02': [301, 399], 52: [301, 399], '04': [1, 99], 54: [1, 99], '05': [101, 199], 55: [101, 199] }
    const f = c && faixas[c]
    return f && (enq < f[0] || enq > f[1]) && `IPI CST ${c} com enquadramento ${val(d, 'imposto/IPI/cEnq')}; esperado ${String(f[0]).padStart(3, '0')}-${f[1]}`
  }, (d) => el(d, 'imposto/IPI')),
  porItem('P01-10', (d, { simplificada }) => simplificada && tem(d, 'imposto/II') && 'grupo II'),
  porItem('Q01-20', (d, { ide }) => !tem(d, 'imposto/PIS') && !['5', '6'].includes(val(ide, 'finNFe')) && val(ide, 'gCompraGov/tpOperGov') !== '2' && 'item sem grupo PIS'),
  porItem('R01-10', (d, { simplificada }) => simplificada && tem(d, 'imposto/PISST') && 'grupo PIS-ST'),
  porItem('S01-20', (d, { ide }) => !tem(d, 'imposto/COFINS') && !['5', '6'].includes(val(ide, 'finNFe')) && val(ide, 'gCompraGov/tpOperGov') !== '2' && 'item sem grupo COFINS'),
  porItem('T01-10', (d, { simplificada }) => simplificada && tem(d, 'imposto/COFINSST') && 'grupo COFINS-ST'),

  // --- ISSQN e devolução de tributos -------------------------------------------------------
  porItem('U01-10', (d, { emit }) => tem(d, 'imposto/ISSQN') && !tem(emit, 'IM') && 'ISSQN sem inscrição municipal do emitente'),
  {
    id: 'U01-20',
    verificar({ det }, falhar) {
      if (det.some((d) => tem(d, 'imposto/ISSQN')) && !det.some((d) => tem(d, 'imposto/ICMS'))) {
        falhar(det[0], 'nota só com itens de ISSQN; a UF pode exigir ao menos um item com ICMS')
      }
    },
  },
  porItem('U01-30', (d) => tem(d, 'imposto/ISSQN') && (val(d, 'prod/cEAN') !== 'SEM GTIN' || val(d, 'prod/cEANTrib') !== 'SEM GTIN') && 'item de serviço com GTIN; use "SEM GTIN"', (d) => el(d, 'prod')),
  porItem('UA01-10', (d, { ide }) => tem(d, 'impostoDevol') && val(ide, 'finNFe') !== '4' && 'grupo impostoDevol em nota que não é de devolução', (d) => el(d, 'impostoDevol')),
  porItem('UA01-20', (d, { simplificada }) => simplificada && tem(d, 'impostoDevol') && 'grupo impostoDevol', (d) => el(d, 'impostoDevol')),
]
