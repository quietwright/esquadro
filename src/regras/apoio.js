// Regras que consultam as tabelas de apoio oficiais: municípios do IBGE, países do BACEN,
// prefixos GS1, CFOP, combustíveis da tributação monofásica, FCP por UF, veículos, lista de
// serviços e produtos da ANP.

import {
  cfop,
  combustivelMonofasico,
  especieDeVeiculoExiste,
  fcpAceito,
  fcpPermitidos,
  itemListaServicosExiste,
  municipioExiste,
  paisExiste,
  prefixoGs1Valido,
  produtoAnpExiste,
  tipoDeVeiculoExiste,
  veiculoExiste,
} from '../apoio.js'
import { el, num, tem, val } from '../consulta.js'
import { CODIGO_UF } from './partes.js'
import { atributo } from '../xml.js'
import { diaCivil } from './util.js'

const SEM_GTIN = (g) => g === undefined || g === '' || g === 'SEM GTIN'
const nItem = (d) => atributo(d, 'nItem')
const dia = ({ ide }) => diaCivil(val(ide, 'dhEmi'))
const grupoIcms = (d) => el(d, 'imposto/ICMS')?.filhos.find((f) => f.tipo === 'elemento')
const cstIcms = (d) => val(grupoIcms(d), 'CST')

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

// Município: existe na tabela do IBGE (exceto o 9999999 do exterior, quando permitido).
function municipio(id, achar, { exterior = false } = {}) {
  return {
    id,
    verificar(n, falhar) {
      for (const no of achar(n)) {
        if (!no) continue
        const codigo = no.filhos.map((f) => f.valor ?? '').join('')
        if (exterior && codigo === '9999999') continue
        if (!municipioExiste(codigo)) falhar(no, `município ${codigo} não existe na tabela do IBGE`)
      }
    },
  }
}

function pais(id, achar) {
  return {
    id,
    verificar(n, falhar) {
      for (const no of achar(n)) {
        if (!no) continue
        const codigo = no.filhos.map((f) => f.valor ?? '').join('')
        if (!paisExiste(codigo, dia(n))) falhar(no, `país ${codigo} não existe na tabela do BACEN`)
      }
    },
  }
}

const RETORNO_DE_TIPO = ['03', '06']

export default [
  // --- Municípios e países ---------------------------------------------------------------
  municipio('B12-10', ({ ide }) => [el(ide, 'cMunFG')]),
  municipio('C10-10', ({ emit }) => [el(emit, 'enderEmit/cMun')]),
  municipio('E10-10', ({ dest }) => (val(dest, 'enderDest/UF') === 'EX' ? [] : [el(dest, 'enderDest/cMun')])),
  municipio('F07-20', ({ inf }) => (val(inf, 'retirada/UF') === 'EX' ? [] : [el(inf, 'retirada/cMun')])),
  municipio('G07-20', ({ inf }) => (val(inf, 'entrega/UF') === 'EX' ? [] : [el(inf, 'entrega/cMun')])),
  municipio('U05-10', ({ det }) => det.map((d) => el(d, 'imposto/ISSQN/cMunFG')), { exterior: true }),
  municipio('U14-10', ({ det }) => det.map((d) => el(d, 'imposto/ISSQN/cMun'))),
  pais('E14-04', ({ dest }) => [el(dest, 'enderDest/cPais')]),
  pais('F11-10', ({ inf }) => [el(inf, 'retirada/cPais')]),
  pais('G11-10', ({ inf }) => [el(inf, 'entrega/cPais')]),
  pais('U15-10', ({ det }) => det.map((d) => el(d, 'imposto/ISSQN/cPais'))),

  // --- GTIN -------------------------------------------------------------------------------
  porItem('I03-20', (d) => {
    const g = val(d, 'prod/cEAN')
    return !SEM_GTIN(g) && !prefixoGs1Valido(g) && `GTIN ${g} com prefixo GS1 inexistente`
  }),
  porItem('I12-20', (d) => {
    const g = val(d, 'prod/cEANTrib')
    return !SEM_GTIN(g) && !prefixoGs1Valido(g) && `GTIN tributável ${g} com prefixo GS1 inexistente`
  }),

  // --- CFOP --------------------------------------------------------------------------------
  porItem('I08-04', (d, n) => {
    const c = cfop(val(d, 'prod/CFOP'), dia(n))
    if (!c) return `CFOP ${val(d, 'prod/CFOP')} inexistente ou fora de vigência`
    return !c.indNFe && `CFOP ${val(d, 'prod/CFOP')} não pode ser usado em NF-e`
  }),
  porItem('I08-140', (d, n) => {
    const { ide } = n
    const finNFe = val(ide, 'finNFe')
    const retorno = finNFe === '4' || (finNFe === '5' && RETORNO_DE_TIPO.includes(val(ide, 'tpNFCredito')))
    if (!retorno) return null
    const codigo = val(d, 'prod/CFOP')
    if (finNFe === '4' && ['1949', '2949'].includes(codigo)) return null
    if (['5949', '6949'].includes(codigo) && val(d, 'prod/NCM') === '27112100') return null
    const c = cfop(codigo, dia(n))
    return c && !c.indDevol && `CFOP ${codigo} não é de devolução`
  }),
  porItem('I08-144', (d, n) => {
    const { ide } = n
    const finNFe = val(ide, 'finNFe')
    if (['2', '4'].includes(finNFe)) return null
    if (finNFe === '5' && ['03', '04', '06'].includes(val(ide, 'tpNFCredito'))) return null
    const c = cfop(val(d, 'prod/CFOP'), dia(n))
    return c?.indDevol === 1 && `CFOP de devolução ${val(d, 'prod/CFOP')} em nota que não é de devolução`
  }),
  porItem('I08-191', (d, n) => {
    const { emit, ide } = n
    if (tem(emit, 'IE') || val(ide, 'finNFe') === '4' || val(ide, 'tpNFCredito') === '03') return null
    const c = cfop(val(d, 'prod/CFOP'), dia(n))
    return c && !c.indExcIBSCBS && `CFOP ${val(d, 'prod/CFOP')} não permitido para contribuinte só de IBS/CBS (sem IE)`
  }),
  porItem('LA01-20', (d, n) => {
    const c = cfop(val(d, 'prod/CFOP'), dia(n))
    return c && c.indComb > 0 && !tem(d, 'prod/comb') && `CFOP de combustível ${val(d, 'prod/CFOP')} sem grupo comb`
  }),

  // --- FCP -------------------------------------------------------------------------------
  porItem('N17b-20', (d, { ide }) => {
    const g = grupoIcms(d)
    if (!tem(g, 'pFCP')) return null
    const p = num(g, 'pFCP')
    const uf = val(ide, 'cUF')
    return !fcpAceito(uf, p) && `pFCP ${p.toFixed(2)} não aceito para a UF ${uf} (${fcpPermitidos(uf).map(([t, v]) => `${t} ${v.toFixed(2)}`).join(', ')})`
  }),
  porItem('N27b-20', (d, { dest, inf }) => {
    const g = grupoIcms(d)
    if (!tem(g, 'pFCPSTRet')) return null
    const ufDest = val(dest, 'enderDest/UF')
    if (!ufDest || ufDest === 'EX') return null
    const p = num(g, 'pFCPSTRet')
    const ufs = [ufDest, val(inf, 'entrega/UF')].filter((u) => u && u !== 'EX').map((u) => CODIGO_UF[u])
    return !ufs.some((uf) => fcpAceito(uf, p)) && `pFCPSTRet ${p.toFixed(2)} não aceito para a UF ${ufDest}`
  }),

  // --- Veículos, serviços e combustíveis -------------------------------------------------
  porItem('J19-10', (d) => tem(d, 'prod/veicProd') && !tipoDeVeiculoExiste(val(d, 'prod/veicProd/tpVeic')) && `tipo de veículo ${val(d, 'prod/veicProd/tpVeic')} inexistente`),
  porItem('J20-10', (d) => tem(d, 'prod/veicProd') && !especieDeVeiculoExiste(val(d, 'prod/veicProd/espVeic')) && `espécie de veículo ${val(d, 'prod/veicProd/espVeic')} inexistente`),
  porItem('J20-20', (d) => {
    const v = el(d, 'prod/veicProd')
    if (!v || !tipoDeVeiculoExiste(val(v, 'tpVeic')) || !especieDeVeiculoExiste(val(v, 'espVeic'))) return null
    return !veiculoExiste(val(v, 'tpVeic'), val(v, 'espVeic')) && `espécie ${val(v, 'espVeic')} incompatível com o tipo ${val(v, 'tpVeic')}`
  }),
  porItem('U06-10', (d) => tem(d, 'imposto/ISSQN') && !itemListaServicosExiste(val(d, 'imposto/ISSQN/cListServ')) && `item da lista de serviços ${val(d, 'imposto/ISSQN/cListServ')} inexistente`),
  porItem('LA02-10', (d) => tem(d, 'prod/comb') && !produtoAnpExiste(val(d, 'prod/comb/cProdANP')) && `produto ANP ${val(d, 'prod/comb/cProdANP')} inexistente`),
  porItem('I13-20', (d, { ide }) => {
    const m = combustivelMonofasico(val(d, 'prod/comb/cProdANP'))
    if (!m || (val(ide, 'tpNF') === '1' && val(ide, 'idDest') === '3')) return null
    if (['1501', '2501', '5501', '5502', '5504', '5505', '6501', '6502', '6504', '6505'].includes(val(d, 'prod/CFOP'))) return null
    return val(d, 'prod/uTrib').toUpperCase() !== m.uTrib.toUpperCase() && `uTrib ${val(d, 'prod/uTrib')}; para o produto ANP ${val(d, 'prod/comb/cProdANP')} é ${m.uTrib}`
  }),
  porItem('LA17-10', (d) => {
    const c = el(d, 'prod/comb')
    if (!c || !tem(c, 'pBio')) return null
    const m = combustivelMonofasico(val(c, 'cProdANP'))
    return (!m || !m.pBio) && `pBio informado para o produto ANP ${val(c, 'cProdANP')}, que não tem mistura de biocombustível`
  }),
  porItem('LA17-20', (d, n) => {
    const c = el(d, 'prod/comb')
    const m = c && combustivelMonofasico(val(c, 'cProdANP'))
    if (!m?.pBio || tem(c, 'pBio') || dispensaOrigemOuBio(d, n)) return null
    return `produto ANP ${val(c, 'cProdANP')} exige o índice de mistura do biocombustível (pBio)`
  }),
  porItem('LA18-10', (d, n) => {
    const c = el(d, 'prod/comb')
    const m = c && combustivelMonofasico(val(c, 'cProdANP'))
    if (!m?.origComb || tem(c, 'origComb') || dispensaOrigemOuBio(d, n)) return null
    return `produto ANP ${val(c, 'cProdANP')} exige o grupo de origem do combustível (origComb)`
  }),
  porItem('LA18-20', (d, n) => {
    const c = el(d, 'prod/comb')
    if (!c || tem(c, 'origComb') || dispensaOrigemOuBio(d, n)) return null
    return (num(c, 'pGNn') !== 0 || num(c, 'pGNi') !== 0) && 'GLP com gás natural sem o grupo de origem do combustível (origComb)'
  }),
  porItem('LA18-30', (d) => {
    const c = el(d, 'prod/comb')
    return c && tem(c, 'origComb') && !combustivelMonofasico(val(c, 'cProdANP')) && `origem do combustível para o produto ANP ${val(c, 'cProdANP')}, fora da tabela monofásica`
  }),
  porItem('N12-100', (d) => {
    const cst = cstIcms(d)
    if (!['02', '15', '53', '61'].includes(cst)) return null
    return !combustivelMonofasico(val(d, 'prod/comb/cProdANP')) && `CST ${cst} (monofásico) para produto fora da tabela de combustíveis monofásicos`
  }),
  porItem('N12-110', (d, { ide }) => {
    if (!combustivelMonofasico(val(d, 'prod/comb/cProdANP')) || ['5', '6'].includes(val(ide, 'finNFe'))) return null
    const cst = cstIcms(d)
    return cst && !['02', '15', '53', '61', '40', '41', '50', '90'].includes(cst) && `combustível monofásico com CST ${cst}`
  }),
]

// Exceções comuns de LA17-20, LA18-10 e LA18-20.
function dispensaOrigemOuBio(d, { ide }) {
  return ['2', '4'].includes(val(ide, 'finNFe')) || val(ide, 'indFinal') === '1' || ['5922', '6922'].includes(val(d, 'prod/CFOP')) || val(ide, 'tpImp') === '6'
}
