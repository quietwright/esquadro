import assert from 'node:assert/strict'
import { test } from 'node:test'
import { NFCE, NFE_55, acusadas, nota } from './ajuda.js'

const ICMS00 = /<ICMS00>.*<\/ICMS00>/.exec(NFE_55)[0]
const ENDER_DEST = /<enderDest>.*<\/enderDest>/.exec(NFE_55)[0]
const icms = (grupo, base = NFE_55) => nota([[ICMS00, grupo]], base)
const DEST_RJ = ENDER_DEST.replace('<cMun>3550308</cMun><xMun>SAO PAULO</xMun><UF>SP</UF>', '<cMun>3304557</cMun><xMun>RIO DE JANEIRO</xMun><UF>RJ</UF>')
const DEST_BA = ENDER_DEST.replace('<cMun>3550308</cMun><xMun>SAO PAULO</xMun><UF>SP</UF>', '<cMun>2927408</cMun><xMun>SALVADOR</xMun><UF>BA</UF>')
// Venda interestadual para consumidor final não contribuinte (a fixture já é para CPF, indIEDest=9).
const interestadual = (dest = DEST_RJ, extras = []) => nota([['<idDest>1', '<idDest>2'], [ENDER_DEST, dest], ['<CFOP>5102', '<CFOP>6102'], ...extras])
const UFDEST = (p = {}) =>
  `<ICMSUFDest><vBCUFDest>100.00</vBCUFDest><pFCPUFDest>${p.pFCP ?? '0.0000'}</pFCPUFDest><pICMSUFDest>20.0000</pICMSUFDest><pICMSInter>${p.inter ?? '12.00'}</pICMSInter><pICMSInterPart>${p.part ?? '100.0000'}</pICMSInterPart><vFCPUFDest>${p.vFCP ?? '0.00'}</vFCPUFDest><vICMSUFDest>${p.v ?? '8.00'}</vICMSUFDest><vICMSUFRemet>0.00</vICMSUFRemet></ICMSUFDest>`
const comUFDest = (xml, p) => nota([['</COFINS>', `</COFINS>${UFDEST(p)}`]], xml)
const icms00 = (pICMS = '18.00', vICMS = '18.00', orig = '0', extra = '') => `<ICMS00><orig>${orig}</orig><CST>00</CST><modBC>3</modBC><vBC>100.00</vBC><pICMS>${pICMS}</pICMS><vICMS>${vICMS}</vICMS>${extra}</ICMS00>`
const SN = (csosn) => `<ICMSSN102><orig>0</orig><CSOSN>${csosn}</CSOSN></ICMSSN102>`
const simples = (grupo, base = NFE_55) => nota([['<CRT>3', '<CRT>1']], icms(grupo, base))
const mei = (grupo, base = NFE_55) => nota([['<CRT>3', '<CRT>4']], icms(grupo, base))
const ICMS51 = (campos) => `<ICMS51><orig>0</orig><CST>51</CST>${campos}</ICMS51>`
const ICMS40 = (cst = '40', deson = '') => `<ICMS40><orig>0</orig><CST>${cst}</CST>${deson}</ICMS40>`
const ICMS60 = (extra = '') => `<ICMS60><orig>0</orig><CST>60</CST>${extra}</ICMS60>`
const ICMS90ST = '<ICMS90><orig>0</orig><CST>90</CST><modBCST>4</modBCST><vBCST>10.00</vBCST><pICMSST>18.00</pICMSST><vICMSST>1.80</vICMSST></ICMS90>'
const ISSQN = '<ISSQN><vBC>100.00</vBC><vAliq>5.0000</vAliq><vISSQN>5.00</vISSQN><cMunFG>3550308</cMunFG><cListServ>01.01</cListServ><indISS>1</indISS><indIncentivo>2</indIncentivo></ISSQN>'
const servico = nota([[/<ICMS>.*<\/ICMS>/.exec(NFE_55)[0], ISSQN], ['<CFOP>5102', '<CFOP>5933']])
const IPINT = (cst, enq) => `<IPI><cEnq>${enq}</cEnq><IPINT><CST>${cst}</CST></IPINT></IPI>`
const comb = (anp) => nota([['<indTot>1</indTot>', `<indTot>1</indTot><comb><cProdANP>${anp}</cProdANP><descANP>COMBUSTIVEL</descANP><UFCons>SP</UFCons></comb>`]])

const casos = [
  ['N01-10', 'ICMS de emitente sem IE', nota([['<IE>110042490114</IE>', '']])],
  ['N08-10', 'ICMS60 para combustível com repasse', icms(ICMS60(), comb('320102001'))],
  ['N12-10', 'exportação com CST 00', nota([['<CFOP>5102', '<CFOP>7102'], ['<idDest>1', '<idDest>3']])],
  ['N12-20', 'CST para Simples Nacional', nota([['<CRT>3', '<CRT>1']])],
  ['N12-30', 'NFC-e com CST 10', icms('<ICMS10><orig>0</orig><CST>10</CST><modBC>3</modBC><vBC>100.00</vBC><pICMS>18.00</pICMS><vICMS>18.00</vICMS><modBCST>4</modBCST><vBCST>10.00</vBCST><pICMSST>18.00</pICMSST><vICMSST>1.80</vICMSST></ICMS10>', NFCE)],
  ['N12-34', 'NFC-e com CST 90 e ST', icms(ICMS90ST, NFCE)],
  ['N12-40', 'NFC-e CST 00 com CFOP 5405', nota([['<CFOP>5102', '<CFOP>5405']], NFCE)],
  ['N12-44', 'NFC-e CST 60 com CFOP 5102', icms(ICMS60(), NFCE)],
  ['N12-50', 'NFC-e com partilha', icms('<ICMSPart><orig>0</orig><CST>10</CST><modBC>3</modBC><vBC>100.00</vBC><pICMS>18.00</pICMS><vICMS>18.00</vICMS><modBCST>4</modBCST><vBCST>10.00</vBCST><pICMSST>18.00</pICMSST><vICMSST>1.80</vICMSST><pBCOp>100.0000</pBCOp><UFST>RJ</UFST></ICMSPart>', NFCE)],
  ['N12-70', 'CST 10 para não contribuinte', icms('<ICMS10><orig>0</orig><CST>10</CST><modBC>3</modBC><vBC>100.00</vBC><pICMS>18.00</pICMS><vICMS>18.00</vICMS><modBCST>4</modBCST><vBCST>10.00</vBCST><pICMSST>18.00</pICMSST><vICMSST>1.80</vICMSST></ICMS10>')],
  ['N12-80', 'CST 51 para isento de IE', icms(ICMS51(''), nota([['<indIEDest>9', '<indIEDest>2']]))],
  ['N12-81', 'CST 60 sem ST retido para contribuinte', icms(ICMS60(), nota([['<indFinal>1', '<indFinal>0'], ['<indIEDest>9</indIEDest>', '<indIEDest>1</indIEDest><IE>123456789</IE>']]))],
  ['N12-82', 'CST 60 para consumidor final sem ICMS efetivo', icms(ICMS60())],
  ['N12-97', 'CST 51 sem campos do diferimento', icms(ICMS51(''))],
  ['N12a-10', 'CSOSN para regime normal', icms(SN('102'))],
  ['N12a-20', 'NFC-e com CSOSN 101', simples('<ICMSSN101><orig>0</orig><CSOSN>101</CSOSN><pCredSN>1.0000</pCredSN><vCredICMSSN>1.00</vCredICMSSN></ICMSSN101>', NFCE)],
  ['N12a-40', 'NFC-e CSOSN 102 com CFOP 5405', nota([['<CFOP>5102', '<CFOP>5405']], simples(SN('102'), NFCE))],
  ['N12a-44', 'NFC-e CSOSN 500 com CFOP 5102', simples('<ICMSSN500><orig>0</orig><CSOSN>500</CSOSN></ICMSSN500>', NFCE)],
  ['N12a-50', 'CSOSN 500 sem ST retido para contribuinte', nota([['<indFinal>1', '<indFinal>0'], ['<indIEDest>9</indIEDest>', '<indIEDest>1</indIEDest><IE>123456789</IE>']], simples('<ICMSSN500><orig>0</orig><CSOSN>500</CSOSN></ICMSSN500>'))],
  ['N12a-60', 'CSOSN 500 para consumidor final sem ICMS efetivo', simples('<ICMSSN500><orig>0</orig><CSOSN>500</CSOSN></ICMSSN500>')],
  ['N12a-70', 'CSOSN 101 para não contribuinte', simples('<ICMSSN101><orig>0</orig><CSOSN>101</CSOSN><pCredSN>1.0000</pCredSN><vCredICMSSN>1.00</vCredICMSSN></ICMSSN101>')],
  ['N12a-80', 'MEI com CSOSN 103', mei(SN('103'))],
  ['N12a-81', 'MEI em NFC-e com CSOSN 400', mei(SN('400'), NFCE)],
  ['N12a-90', 'MEI com CSOSN 102 e CFOP 5101', nota([['<CFOP>5102', '<CFOP>5101']], mei(SN('102')))],
  ['N12a-91', 'MEI em NFC-e com CFOP 5101', nota([['<CFOP>5102', '<CFOP>5101']], mei(SN('102'), NFCE))],
  ['N14a-10', 'diferimento com redução sem cBenefRBC', icms(ICMS51('<modBC>3</modBC><pRedBC>10.0000</pRedBC><vBC>90.00</vBC><pICMS>18.00</pICMS><vICMSOp>16.20</vICMSOp><pDif>100.0000</pDif><vICMSDif>16.20</vICMSDif><vICMS>0.00</vICMS>'))],
  ['N16-04', 'importado com alíquota interestadual de 12%', icms(icms00('12.00', '12.00', '1'), interestadual())],
  ['N16-20', 'interestadual de SP para BA acima de 7%', icms(icms00('12.00', '12.00'), interestadual(DEST_BA))],
  ['N16a-10', 'ICMS da operação do diferimento errado', icms(ICMS51('<modBC>3</modBC><pRedBC>0.0000</pRedBC><vBC>100.00</vBC><pICMS>18.00</pICMS><vICMSOp>17.00</vICMSOp><pDif>100.0000</pDif><vICMSDif>17.00</vICMSDif><vICMS>0.00</vICMS>'))],
  ['N16c-10', 'ICMS diferido errado', icms(ICMS51('<modBC>3</modBC><pRedBC>0.0000</pRedBC><vBC>100.00</vBC><pICMS>18.00</pICMS><vICMSOp>18.00</vICMSOp><pDif>50.0000</pDif><vICMSDif>18.00</vICMSDif><vICMS>0.00</vICMS>'))],
  ['N17-10', 'ICMS do diferimento errado', icms(ICMS51('<modBC>3</modBC><pRedBC>0.0000</pRedBC><vBC>100.00</vBC><pICMS>18.00</pICMS><vICMSOp>18.00</vICMSOp><pDif>50.0000</pDif><vICMSDif>9.00</vICMSDif><vICMS>18.00</vICMS>'))],
  ['N17-20', 'ICMS diferente de base × alíquota', icms(icms00('18.00', '17.00'))],
  ['N17b-10', 'pFCP zero', icms(icms00('18.00', '18.00', '0', '<pFCP>0.0000</pFCP><vFCP>0.00</vFCP>'))],
  ['N17c-10', 'vFCP diferente do calculado', icms(icms00('18.00', '18.00', '0', '<pFCP>2.0000</pFCP><vFCP>3.00</vFCP>'))],
  ['N17c-20', 'FCP em interestadual para não contribuinte', icms(icms00('12.00', '12.00', '0', '<pFCP>2.0000</pFCP><vFCP>2.00</vFCP>'), interestadual())],
  ['N18-10', 'MVA sem pMVAST', icms(ICMS90ST)],
  ['N18-20', 'pMVAST sem modalidade MVA', icms(ICMS90ST.replace('<modBCST>4</modBCST>', '<modBCST>0</modBCST><pMVAST>40.0000</pMVAST>'))],
  ['N23-10', 'ST sem CEST', icms(ICMS60())],
  ['N28-12', 'desoneração SUFRAMA sem indDeduzDeson', icms(ICMS40('40', '<vICMSDeson>18.00</vICMSDeson><motDesICMS>7</motDesICMS>'))],
  ['N28-20', 'desoneração SUFRAMA com CFOP 5102', icms(ICMS40('40', '<vICMSDeson>18.00</vICMSDeson><motDesICMS>7</motDesICMS>'))],
  ['N28-30', 'desoneração com valor zero', icms(ICMS40('40', '<vICMSDeson>0.00</vICMSDeson><motDesICMS>9</motDesICMS>'))],
  ['N37a-10', 'CST 02 sem quantidade', icms('<ICMS02><orig>0</orig><CST>02</CST><adRemICMS>1.0000</adRemICMS><vICMSMono>1.00</vICMSMono></ICMS02>')],
  ['N39-10', 'ICMS monofásico diferente do calculado', icms('<ICMS02><orig>0</orig><CST>02</CST><qBCMono>10.0000</qBCMono><adRemICMS>1.0000</adRemICMS><vICMSMono>9.00</vICMSMono></ICMS02>')],
  ['N43a-10', 'CST 61 sem quantidade', icms('<ICMS61><orig>0</orig><CST>61</CST><adRemICMSRet>1.0000</adRemICMSRet><vICMSMonoRet>1.00</vICMSMonoRet></ICMS61>')],
  ['NA01-10', 'NFC-e com ICMSUFDest', comUFDest(NFCE)],
  ['NA01-20', 'interestadual a consumidor final sem ICMSUFDest', icms(icms00('12.00', '12.00'), interestadual())],
  ['NA01-30', 'ICMSUFDest em operação interna', comUFDest(NFE_55)],
  ['NA09-10', '4% para mercadoria nacional', comUFDest(icms(icms00('12.00', '12.00'), interestadual()), { inter: '4.00' })],
  ['NA09-20', '12% para importado', comUFDest(icms(icms00('4.00', '4.00', '1'), interestadual()))],
  ['NA09-30', '12% de SP para BA', comUFDest(icms(icms00('7.00', '7.00'), interestadual(DEST_BA)))],
  ['NA11-10', 'partilha de 80% em 2026', comUFDest(icms(icms00('12.00', '12.00'), interestadual()), { part: '80.0000' })],
  ['NA13-10', 'FCP do destino diferente do calculado', comUFDest(icms(icms00('12.00', '12.00'), interestadual()), { pFCP: '2.0000', vFCP: '1.00' }).replace('<pFCPUFDest>', '<vBCFCPUFDest>100.00</vBCFCPUFDest><pFCPUFDest>')],
  ['NA15-10', 'ICMS do destino diferente do calculado', comUFDest(icms(icms00('12.00', '12.00'), interestadual()), { v: '5.00' })],
  ['O01-10', 'NFC-e com IPI', nota([['</ICMS>', `</ICMS>${IPINT('53', '999')}`]], NFCE)],
  ['O09-10', 'IPI isento com enquadramento fora da faixa', nota([['</ICMS>', `</ICMS>${IPINT('52', '999')}`]])],
  ['Q01-20', 'item sem PIS', nota([[/<PIS>.*<\/PIS>/.exec(NFE_55)[0], '']])],
  ['S01-20', 'item sem COFINS', nota([[/<COFINS>.*<\/COFINS>/.exec(NFE_55)[0], '']])],
  ['U01-10', 'ISSQN sem inscrição municipal', servico],
  ['U01-20', 'nota só de serviço', servico],
  ['U01-30', 'serviço com GTIN', nota([['<cEAN>SEM GTIN', '<cEAN>7891000315507'], ['<cEANTrib>SEM GTIN', '<cEANTrib>7891000315507']], servico)],
  ['UA01-10', 'devolução de tributos em nota normal', nota([['</imposto>', '</imposto><impostoDevol><pDevol>100.00</pDevol><IPI><vIPIDevol>0.00</vIPIDevol></IPI></impostoDevol>']])],
]

for (const [regra, descricao, xml] of casos) {
  test(`${regra}: ${descricao}`, () => {
    const r = acusadas(xml)
    assert.ok(r.includes(regra), `esperava ${regra}; veio ${r.join(', ') || 'nada'}`)
  })
}

test('exceções e casos corretos', () => {
  assert.ok(!acusadas(icms(icms00('7.00', '7.00'), interestadual(DEST_BA))).includes('N16-20'))
  assert.ok(!acusadas(icms(icms00('12.00', '12.00'), interestadual())).includes('N16-20'))
  assert.ok(!acusadas(comUFDest(icms(icms00('12.00', '12.00'), interestadual()))).some((r) => r.startsWith('NA')))
  assert.ok(!acusadas(nota([['<CFOP>5102', '<CFOP>5949'], [ICMS00, '<ICMS40><orig>0</orig><CST>40</CST></ICMS40>']], NFCE)).includes('N12-40'))
})
