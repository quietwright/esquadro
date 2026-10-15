import assert from 'node:assert/strict'
import { test } from 'node:test'
import { NFCE, NFE_55, acusadas, nota } from './ajuda.js'

const ICMS00 = /<ICMS00>.*<\/ICMS00>/.exec(NFE_55)[0]
const ENDER_DEST = /<enderDest>.*<\/enderDest>/.exec(NFE_55)[0]
const ISSQN = (extra = '', mun = '3550308', lista = '01.01') =>
  `<ISSQN><vBC>100.00</vBC><vAliq>5.0000</vAliq><vISSQN>5.00</vISSQN><cMunFG>${mun}</cMunFG><cListServ>${lista}</cListServ><indISS>1</indISS>${extra}<indIncentivo>2</indIncentivo></ISSQN>`
const servico = (issqn) => nota([[/<ICMS>.*<\/ICMS>/.exec(NFE_55)[0], issqn], ['<CFOP>5102', '<CFOP>5933']])
const local = (tag, extra = '', mun = '3550308') =>
  `<${tag}><CNPJ>11444777000161</CNPJ><xLgr>RUA B</xLgr><nro>2</nro><xBairro>CENTRO</xBairro><cMun>${mun}</cMun><xMun>SAO PAULO</xMun><UF>SP</UF>${extra}</${tag}>`
const depoisDoDest = (xml) => nota([['</dest>', `</dest>${xml}`]])
const comb = (anp, extra = '', antesUF = '') => `<comb><cProdANP>${anp}</cProdANP><descANP>COMBUSTIVEL</descANP>${antesUF}<UFCons>SP</UFCons>${extra}</comb>`
const comComb = (c, base = NFE_55) => nota([['<indTot>1</indTot>', `<indTot>1</indTot>${c}`]], base)
const VEICULO = (tp, esp) =>
  '<veicProd><tpOp>1</tpOp><chassi>9BWZZZ377VT004251</chassi><cCor>1</cCor><xCor>BRANCO</xCor><pot>100</pot><cilin>1000</cilin><pesoL>1000.0000</pesoL><pesoB>1100.0000</pesoB>' +
  `<nSerie>1</nSerie><tpComb>01</tpComb><nMotor>M1</nMotor><CMT>1500.0000</CMT><dist>2500</dist><anoMod>2026</anoMod><anoFab>2026</anoFab><tpPint>S</tpPint><tpVeic>${tp}</tpVeic><espVeic>${esp}</espVeic>` +
  '<VIN>N</VIN><condVeic>1</condVeic><cMod>123456</cMod><cCorDENATRAN>01</cCorDENATRAN><lota>5</lota><tpRest>0</tpRest></veicProd>'

const casos = [
  ['B12-10', 'município do fato gerador inexistente', nota([['<cMunFG>3550308', '<cMunFG>3599999']])],
  ['C10-10', 'município do emitente inexistente', nota([['<cMun>3550308</cMun><xMun>SAO PAULO</xMun><UF>SP</UF><CEP>01001000', '<cMun>3599999</cMun><xMun>SAO PAULO</xMun><UF>SP</UF><CEP>01001000']])],
  ['E10-10', 'município do destinatário inexistente', nota([['<cMun>3550308</cMun><xMun>SAO PAULO</xMun><UF>SP</UF><CEP>01310100', '<cMun>3599999</cMun><xMun>SAO PAULO</xMun><UF>SP</UF><CEP>01310100']])],
  ['F07-20', 'município da retirada inexistente', depoisDoDest(local('retirada', '', '3599999'))],
  ['G07-20', 'município da entrega inexistente', depoisDoDest(local('entrega', '', '3599999'))],
  ['U05-10', 'município do ISSQN inexistente', servico(ISSQN('', '3599999'))],
  ['U14-10', 'município de incidência inexistente', servico(ISSQN('<cMun>3599999</cMun>'))],
  ['E14-04', 'país do destinatário inexistente', nota([['<CEP>01310100</CEP>', '<CEP>01310100</CEP><cPais>9999</cPais><xPais>NARNIA</xPais>']])],
  ['F11-10', 'país da retirada inexistente', depoisDoDest(local('retirada', '<cPais>9999</cPais>'))],
  ['G11-10', 'país da entrega inexistente', depoisDoDest(local('entrega', '<cPais>9999</cPais>'))],
  ['U15-10', 'país do ISSQN inexistente', servico(ISSQN('<cPais>9999</cPais>'))],
  ['I03-20', 'GTIN com prefixo GS1 inexistente', nota([['<cEAN>SEM GTIN', '<cEAN>1400000000003'], ['<cEANTrib>SEM GTIN', '<cEANTrib>1400000000003']])],
  ['I12-20', 'GTIN tributável com prefixo GS1 inexistente', nota([['<cEAN>SEM GTIN', '<cEAN>1400000000003'], ['<cEANTrib>SEM GTIN', '<cEANTrib>1400000000003']])],
  ['I08-04', 'CFOP inexistente', nota([['<CFOP>5102', '<CFOP>5999']])],
  ['I08-140', 'devolução com CFOP de venda', nota([['<finNFe>1', '<finNFe>4']])],
  ['I08-144', 'CFOP de devolução em nota normal', nota([['<CFOP>5102', '<CFOP>5202']])],
  ['I08-191', 'emitente sem IE com CFOP não permitido', nota([['<IE>110042490114</IE>', '']])],
  ['LA01-20', 'CFOP de combustível sem grupo comb', nota([['<CFOP>5102', '<CFOP>5656']])],
  ['N17b-20', 'percentual de FCP fora da tabela da UF', nota([[ICMS00, '<ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>100.00</vBC><pICMS>18.00</pICMS><vICMS>18.00</vICMS><pFCP>3.0000</pFCP><vFCP>3.00</vFCP></ICMS00>']])],
  ['J19-10', 'tipo de veículo inexistente', comComb(VEICULO(99, 1))],
  ['J20-10', 'espécie de veículo inexistente', comComb(VEICULO(6, 9))],
  ['J20-20', 'espécie incompatível com o tipo', comComb(VEICULO(2, 2))],
  ['U06-10', 'item da lista de serviços inexistente', servico(ISSQN('', '3550308', '99.99'))],
  ['LA02-10', 'produto ANP inexistente', comComb(comb('999999999'))],
  ['I13-20', 'unidade tributável errada para combustível monofásico', comComb(comb('210203001'))],
  ['LA17-10', 'pBio em produto sem biocombustível', comComb(comb('210203001', '<pBio>10.0000</pBio>'))],
  ['LA18-30', 'origem para produto fora da tabela monofásica', comComb(comb('110203073', '<origComb><indImport>0</indImport><cUFOrig>35</cUFOrig><pOrig>100.0000</pOrig></origComb>'))],
  ['N12-100', 'CST monofásico para produto comum', nota([[ICMS00, '<ICMS61><orig>0</orig><CST>61</CST><adRemICMSRet>1.0000</adRemICMSRet><vICMSMonoRet>1.00</vICMSMonoRet></ICMS61>']])],
  ['N12-110', 'combustível monofásico sem CST monofásico', comComb(comb('210203001'))],
]

for (const [regra, descricao, xml] of casos) {
  test(`${regra}: ${descricao}`, () => {
    const r = acusadas(xml)
    assert.ok(r.includes(regra), `esperava ${regra}; veio ${r.join(', ') || 'nada'}`)
  })
}

test('casos válidos das tabelas não acusam', () => {
  const r = acusadas(nota([['<CEP>01310100</CEP>', '<CEP>01310100</CEP><cPais>1058</cPais><xPais>BRASIL</xPais>']]))
  assert.ok(!r.includes('E14-04'))
  assert.ok(!acusadas(nota([['<cEAN>SEM GTIN', '<cEAN>7891000315507'], ['<cEANTrib>SEM GTIN', '<cEANTrib>7891000315507']])).includes('I03-20'))
  assert.ok(!acusadas(nota([['<finNFe>1', '<finNFe>4'], ['<CFOP>5102', '<CFOP>5202']])).includes('I08-140'))
  assert.ok(!acusadas(servico(ISSQN())).includes('U06-10'))
  assert.ok(!acusadas(NFCE).length)
})
