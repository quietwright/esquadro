import assert from 'node:assert/strict'
import { test } from 'node:test'
import { gtinValido } from '../src/regras/produtos.js'
import { dvChave } from '../src/regras/util.js'
import { NFCE, NFE_55, acusadas, nota } from './ajuda.js'

const GTIN = '4006381333931' // exemplo de EAN-13 válido da GS1
const ICMS = /<ICMS>.*<\/ICMS>/.exec(NFE_55)[0]
const ISSQN = '<ISSQN><vBC>100.00</vBC><vAliq>5.0000</vAliq><vISSQN>5.00</vISSQN><cMunFG>3550308</cMunFG><cListServ>01.01</cListServ><indISS>1</indISS><indIncentivo>2</indIncentivo></ISSQN>'
const DEST_EX = '<enderDest><xLgr>MAIN ST</xLgr><nro>1</nro><xBairro>DOWNTOWN</xBairro><cMun>9999999</cMun><xMun>EXTERIOR</xMun><UF>EX</UF><cPais>249</cPais></enderDest>'
const ENDER_DEST = /<enderDest>.*<\/enderDest>/.exec(NFE_55)[0]
const exterior = (cfop, extras = []) =>
  nota([['<idDest>1', '<idDest>3'], ['<CPF>12345678909</CPF>', '<idEstrangeiro>AB123</idEstrangeiro>'], [ENDER_DEST, DEST_EX], ['<CFOP>5102', `<CFOP>${cfop}`], ...extras])

// Grupos opcionais do produto, na posição que o schema exige.
const depoisDoIndTot = (xml, base = NFE_55) => nota([['<indTot>1</indTot>', `<indTot>1</indTot>${xml}`]], base)
const DI = (extra = '') =>
  `<DI><nDI>123</nDI><dDI>2026-10-01</dDI><xLocDesemb>SANTOS</xLocDesemb><UFDesemb>SP</UFDesemb><dDesemb>2026-10-01</dDesemb>${extra}<cExportador>X1</cExportador><adi><nSeqAdic>1</nSeqAdic><cFabricante>F1</cFabricante></adi></DI>`
const viaETerceiro = (via, intermedio, resto = '') => `<tpViaTransp>${via}</tpViaTransp><tpIntermedio>${intermedio}</tpIntermedio>${resto}`
const rastro = (fab, val) => `<rastro><nLote>L1</nLote><qLote>1.000</qLote><dFab>${fab}</dFab><dVal>${val}</dVal></rastro>`
const comb = (anp, extra = '', uf = '<UFCons>SP</UFCons>') => `<comb><cProdANP>${anp}</cProdANP><descANP>COMBUSTIVEL</descANP>${extra}${uf}</comb>`
const exportInd = (chave, q = '2.0000') => `<detExport><exportInd><nRE>123456789012</nRE><chNFe>${chave}</chNFe><qExport>${q}</qExport></exportInd></detExport>`
// Chave de outra nota (emitente 11.444.777/0001-61), com DV correto.
const chaveValida = (modelo = '55') => {
  const corpo = `352610${'11444777000161'}${modelo}001000000456112345678`
  return corpo + dvChave(corpo)
}

test('GTIN: dígito verificador GS1', () => {
  assert.ok(gtinValido(GTIN))
  assert.ok(gtinValido('96385074')) // GTIN-8
  assert.ok(!gtinValido('4006381333932'))
})

const casos = [
  ['H02-10', 'item fora de sequência', nota([['<det nItem="1">', '<det nItem="2">']])],
  ['I03-10', 'GTIN com DV errado', nota([['<cEAN>SEM GTIN', '<cEAN>4006381333932'], ['<cEANTrib>SEM GTIN', '<cEANTrib>4006381333932']])],
  ['I03-30', 'cEAN vazio', nota([['<cEAN>SEM GTIN</cEAN>', '<cEAN></cEAN>']])],
  ['I04-10', 'NFC-e de homologação sem a descrição padrão', nota([['<xProd>NOTA FISCAL EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL', '<xProd>CANETA']], NFCE)],
  ['I05-10', 'NCM incompleto', nota([['<NCM>84713012', '<NCM>84']])],
  ['I05-24', 'NCM 00 em produto', nota([['<NCM>84713012', '<NCM>00']])],
  ['I05e-10', 'escala não relevante sem fabricante', nota([['</NCM>', '</NCM><CEST>2104700</CEST><indEscala>N</indEscala>']])],
  ['I05e-20', 'CNPJ do fabricante inválido', nota([['</NCM>', '</NCM><CEST>2104700</CEST><indEscala>N</indEscala><CNPJFab>11444777000162</CNPJFab>']])],
  ['I05k-10', 'crédito presumido ZFM em NFC-e', nota([['<CFOP>', '<tpCredPresIBSZFM>1</tpCredPresIBSZFM><CFOP>']], NFCE)],
  ['I05k-20', 'crédito presumido ZFM fora da área', nota([['<CFOP>', '<tpCredPresIBSZFM>1</tpCredPresIBSZFM><CFOP>']])],
  ['I08-10', 'CFOP de entrada em saída', nota([['<CFOP>5102', '<CFOP>1102']])],
  ['I08-20', 'CFOP de saída em entrada', nota([['<tpNF>1', '<tpNF>0']])],
  ['I08-30', 'CFOP de exterior em operação interna', nota([['<CFOP>5102', '<CFOP>7102']])],
  ['I08-40', 'CFOP interestadual em operação interna', nota([['<CFOP>5102', '<CFOP>6102']])],
  ['I08-50', 'CFOP interno em operação interestadual', nota([['<idDest>1', '<idDest>2']])],
  ['I08-60', 'CFOP de exterior com destinatário no país', nota([['<CFOP>5102', '<CFOP>7102'], ['<idDest>1', '<idDest>3']])],
  ['I08-70', 'interna para contribuinte de outra UF', nota([['<idDest>1', '<idDest>1'], ['<indPres>1', '<indPres>2'], [ENDER_DEST, ENDER_DEST.replace('<UF>SP', '<UF>RJ').replace('3550308', '3304557')], ['<indIEDest>9</indIEDest>', '<indIEDest>1</indIEDest><IE>123456789</IE>']])],
  ['I08-90', 'CFOP interestadual dentro da UF', nota([['<CFOP>5102', '<CFOP>6102'], ['<idDest>1', '<idDest>2']])],
  ['I08-110', 'importação sem DI', exterior('3102')],
  ['I08-120', 'importação sem IPI', exterior('3102')],
  ['I08-130', 'importação sem II', exterior('3102')],
  ['I08-141', 'devolução de MEI com CFOP comum', nota([['<CRT>3', '<CRT>4'], ['<finNFe>1', '<finNFe>4']])],
  ['I08-150', 'NFC-e com CFOP 5949', nota([['<CFOP>5102', '<CFOP>5949']], NFCE)],
  ['I08-160', 'serviço sem ISSQN', nota([['<CFOP>5102', '<CFOP>5933']])],
  ['I08-170', 'ISSQN com CFOP de mercadoria', nota([[ICMS, ISSQN]])],
  ['I08-180', 'cupom fiscal referenciando NFC-e', nota([['<CFOP>5102', '<CFOP>5929'], ['</verProc>', `</verProc><NFref><refNFe>${chaveValida('65')}</refNFe></NFref>`]])],
  ['I08-184', 'cupom fiscal sem documento referenciado', nota([['<CFOP>5102', '<CFOP>5929']])],
  ['I08-190', 'exportação indireta sem nota referenciada', exterior('7501')],
  ['I11-10', 'vProd difere de vUnCom × qCom', nota([['<vUnCom>50.0000000000', '<vUnCom>51.0000000000']])],
  ['I11-20', 'vProd difere de vUnTrib × qTrib', nota([['<vUnTrib>50.0000000000', '<vUnTrib>51.0000000000']])],
  ['I12-10', 'GTIN tributável com DV errado', nota([['<cEAN>SEM GTIN', `<cEAN>${GTIN}`], ['<cEANTrib>SEM GTIN', '<cEANTrib>4006381333932']])],
  ['I12-30', 'GTIN sem GTIN tributável', nota([['<cEAN>SEM GTIN', `<cEAN>${GTIN}`]])],
  ['I12-40', 'GTIN tributável sem GTIN', nota([['<cEANTrib>SEM GTIN', `<cEANTrib>${GTIN}`]])],
  ['I12-60', 'cEANTrib vazio', nota([['<cEANTrib>SEM GTIN</cEANTrib>', '<cEANTrib></cEANTrib>']])],
  ['I17-10', 'desconto maior que o produto', nota([['</vUnTrib>', '</vUnTrib><vDesc>150.00</vDesc>']])],
  ['I17b-10', 'NFC-e com item fora do total', nota([['<indTot>1', '<indTot>0']], NFCE)],
  ['I23-10', 'desembaraço há mais de 5 anos', depoisDoIndTot(DI(viaETerceiro(4, 1)).replace('<dDesemb>2026-10-01', '<dDesemb>2019-01-01'), exterior('3102'))],
  ['I23b-10', 'importação marítima sem AFRMM', depoisDoIndTot(DI(viaETerceiro(1, 1)), exterior('3102'))],
  ['I23d-10', 'conta e ordem sem adquirente', depoisDoIndTot(DI(viaETerceiro(4, 2, '<UFTerceiro>SP</UFTerceiro>')), exterior('3102'))],
  ['I23d-20', 'adquirente com CNPJ inválido', depoisDoIndTot(DI(viaETerceiro(4, 2, '<CNPJ>11444777000162</CNPJ><UFTerceiro>SP</UFTerceiro>')), exterior('3102'))],
  ['I23d1-10', 'adquirente com CPF inválido', depoisDoIndTot(DI(viaETerceiro(4, 2, '<CPF>12345678900</CPF><UFTerceiro>SP</UFTerceiro>')), exterior('3102'))],
  ['I23e-10', 'conta e ordem sem UF do adquirente', depoisDoIndTot(DI(viaETerceiro(4, 3, '<CNPJ>11444777000161</CNPJ>')), exterior('3102'))],
  ['I29a-10', 'drawback sem número na adição', depoisDoIndTot(DI(viaETerceiro(4, 1)), exterior('3127'))],
  ['I50-10', 'grupo de exportação em operação interna', depoisDoIndTot('<detExport><nDraw>20201234567</nDraw></detExport>')],
  ['I51-10', 'exportação com drawback sem número', exterior('7127')],
  ['I52-10', 'exportação indireta sem o grupo', exterior('7501')],
  ['I54-10', 'chave de exportação indireta com DV errado', depoisDoIndTot(exportInd(chaveValida().slice(0, 43) + ((Number(chaveValida().at(-1)) + 1) % 10)), exterior('7501'))],
  ['I54-20', 'chave de exportação indireta de NFC-e', depoisDoIndTot(exportInd(chaveValida('65')), exterior('7501'))],
  ['I54-30', 'chave de exportação indireta repetida', depoisDoIndTot(exportInd(chaveValida(), '1.0000') + exportInd(chaveValida(), '1.0000'), exterior('7501'))],
  ['I54-40', 'chave de exportação indireta não referenciada', depoisDoIndTot(exportInd(chaveValida()), exterior('7501'))],
  ['I55-10', 'quantidade exportada difere da comercial', depoisDoIndTot(exportInd(chaveValida(), '1.0000'), exterior('7501'))],
  ['I83-10', 'fabricação no futuro', depoisDoIndTot(rastro('2027-01-01', '2028-01-01'))],
  ['I84-10', 'validade antes da fabricação', depoisDoIndTot(rastro('2026-01-01', '2025-01-01'))],
  ['I86-10', 'produto de NFF fora da NFF', depoisDoIndTot('<infProdNFF><cProdFisco>12345678901234</cProdFisco><cOperNFF>1</cOperNFF></infProdNFF>')],
  ['I87-10', 'embalagem fora da NFF', depoisDoIndTot('<infProdEmb><xEmb>CAIXA</xEmb><qVolEmb>1.000</qVolEmb><uEmb>UN</uEmb></infProdEmb>')],
  ['K01-20', 'medicamento sem rastro', depoisDoIndTot('<med><cProdANVISA>ISENTO</cProdANVISA><xMotivoIsencao>SEM REGISTRO</xMotivoIsencao><vPMC>10.00</vPMC></med>')],
  ['L01-10', 'NFC-e com arma', depoisDoIndTot('<arma><tpArma>0</tpArma><nSerie>1</nSerie><nCano>1</nCano><descr>PISTOLA</descr></arma>', NFCE)],
  ['LA03c-10', 'percentual de GLP para outro produto', depoisDoIndTot(comb('320102001', '<pGLP>50.0000</pGLP>'))],
  ['LA03c-20', 'percentuais de GLP somando menos de 100', depoisDoIndTot(comb('210203001', '<pGLP>50.0000</pGLP><pGNn>40.0000</pGNn><pGNi>0.0000</pGNi><vPart>10.00</vPart>'))],
  ['LA11-20', 'encerrante fora da venda de combustível', depoisDoIndTot(comb('320102001', '', '<UFCons>SP</UFCons><encerrante><nBico>1</nBico><nTanque>1</nTanque><vEncIni>100.000</vEncIni><vEncFin>200.000</vEncFin></encerrante>'))],
  ['LA16-10', 'encerrante final menor que o inicial', depoisDoIndTot(comb('320102001', '', '<UFCons>SP</UFCons><encerrante><nBico>1</nBico><nTanque>1</nTanque><vEncIni>200.000</vEncIni><vEncFin>100.000</vEncFin></encerrante>'))],
  ['LA21-10', 'origens do combustível somando menos de 100', depoisDoIndTot(comb('320102001', '', '<UFCons>SP</UFCons><origComb><indImport>0</indImport><cUFOrig>35</cUFOrig><pOrig>90.0000</pOrig></origComb>'))],
  ['LA21-20', 'origens do GLP nacional somando menos de 100', depoisDoIndTot(comb('210203001', '<pGLP>60.0000</pGLP><pGNn>40.0000</pGNn><pGNi>0.0000</pGNi><vPart>10.00</vPart>', '<UFCons>SP</UFCons><origComb><indImport>0</indImport><cUFOrig>35</cUFOrig><pOrig>50.0000</pOrig></origComb>'))],
  ['LB01-10', 'NFC-e com papel imune', depoisDoIndTot('<nRECOPI>20260101000000000000</nRECOPI>', NFCE)],
]

for (const [regra, descricao, xml] of casos) {
  test(`${regra}: ${descricao}`, () => {
    const r = acusadas(xml)
    assert.ok(r.includes(regra), `esperava ${regra}; veio ${r.join(', ') || 'nada'}`)
  })
}

test('I08-30: combustível consumido no exterior aceita CFOP 7 fora da exportação', () => {
  const xml = depoisDoIndTot(comb('320102001', '', '<UFCons>EX</UFCons>'), nota([['<CFOP>5102', '<CFOP>7667']]))
  assert.ok(!acusadas(xml).includes('I08-30'))
})

test('I08-150: SP aceita 5949 com CST 40 na NFC-e', () => {
  const xml = nota([['<CFOP>5102', '<CFOP>5949'], [ICMS, '<ICMS><ICMS40><orig>0</orig><CST>40</CST></ICMS40></ICMS>']], NFCE)
  assert.ok(!acusadas(xml).includes('I08-150'))
})

test('I11-10: tolera R$ 0,01 de arredondamento', () => {
  const xml = nota([['<qCom>2.0000', '<qCom>3.0000'], ['<vUnCom>50.0000000000', '<vUnCom>33.3366666666'], ['<qTrib>2.0000', '<qTrib>3.0000'], ['<vUnTrib>50.0000000000', '<vUnTrib>33.3366666666']])
  assert.ok(!acusadas(xml).includes('I11-10'))
})

test('K01-20: devolução dispensa o rastro', () => {
  const xml = depoisDoIndTot('<med><cProdANVISA>ISENTO</cProdANVISA><xMotivoIsencao>SEM REGISTRO</xMotivoIsencao><vPMC>10.00</vPMC></med>', nota([['<finNFe>1', '<finNFe>4']]))
  assert.ok(!acusadas(xml).includes('K01-20'))
})
