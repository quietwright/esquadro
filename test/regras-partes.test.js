import assert from 'node:assert/strict'
import { test } from 'node:test'
import { NFCE, NFE_55, acusadas, comChave, nota } from './ajuda.js'

const DEST = /<dest>.*<\/dest>/.exec(NFE_55)[0]
const ENDER_DEST = /<enderDest>.*<\/enderDest>/.exec(NFE_55)[0]
const CNPJ_OK = '11444777000161'

// Troca o destinatário inteiro.
const dest = (conteudo, base = NFE_55) => nota([[DEST, `<dest>${conteudo}</dest>`]], base)
const nomeHomolog = '<xNome>NF-E EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL</xNome>'
const enderRJ = '<enderDest><xLgr>RUA A</xLgr><nro>1</nro><xBairro>CENTRO</xBairro><cMun>3304557</cMun><xMun>RIO DE JANEIRO</xMun><UF>RJ</UF></enderDest>'
const enderEX = (pais = '') => `<enderDest><xLgr>MAIN ST</xLgr><nro>1</nro><xBairro>DOWNTOWN</xBairro><cMun>9999999</cMun><xMun>EXTERIOR</xMun><UF>EX</UF>${pais}</enderDest>`
const local = (tag, doc, extra = '') =>
  `<${tag}>${doc}<xLgr>RUA B</xLgr><nro>2</nro><xBairro>CENTRO</xBairro><cMun>3550308</cMun><xMun>SAO PAULO</xMun><UF>SP</UF>${extra}</${tag}>`
const depoisDoDest = (xml, base = NFE_55) => nota([['</dest>', `</dest>${xml}`]], base)
const emitCpf = (serie) => comChave(nota([['<CNPJ>11222333000181</CNPJ>', '<CPF>12345678909</CPF>'], ['<serie>1</serie>', `<serie>${serie}</serie>`]]))
const nfceComDest = (conteudo) => nota([['</emit>', `</emit><dest>${conteudo}</dest>`]], NFCE)

const casos = [
  ['C02-10', 'CNPJ do emitente com DV errado', comChave(nota([['<CNPJ>11222333000181', '<CNPJ>11222333000182']]))],
  ['C02-30', 'série fora da faixa de emitente CNPJ', comChave(nota([['<serie>1</serie>', '<serie>950</serie>']]))],
  ['C02a-04', 'NFC-e de pessoa física', comChave(nota([['<CNPJ>11222333000181</CNPJ>', '<CPF>12345678909</CPF>']], NFCE))],
  ['C02a-10', 'série fora da faixa de emitente CPF', emitCpf(1)],
  ['C02a-20', 'CPF do emitente inválido', comChave(nota([['<CNPJ>11222333000181</CNPJ>', '<CPF>12345678900</CPF>'], ['<serie>1</serie>', '<serie>920</serie>']]))],
  ['C10-20', 'município do emitente de outra UF', nota([['<cMun>3550308</cMun><xMun>SAO PAULO</xMun><UF>SP</UF><CEP>01001000', '<cMun>3304557</cMun><xMun>SAO PAULO</xMun><UF>SP</UF><CEP>01001000']])],
  ['C17-30', 'IE ISENTO fora da nota avulsa', nota([['<IE>110042490114</IE>', '<IE>ISENTO</IE>']])],
  ['C17-42', 'NFC-e de emitente sem IE', nota([['<IE>110042490114</IE>', '']], NFCE)],
  ['C17-43', 'emitente sem IE e sem CNPJ', nota([['<IE>110042490114</IE>', '']], emitCpf(920))],
  ['C18-10', 'NFC-e com IEST', nota([['</IE>', '</IE><IEST>123456789</IEST>']], NFCE)],
  ['C18-14', 'IEST em operação interna', nota([['</IE>', '</IE><IEST>123456789</IEST>']])],
  ['C18-40', 'IEST igual à IE', nota([['</IE>', '</IE><IEST>110042490114</IEST>']])],
  ['C18-50', 'IEST sem IE', nota([['<IE>110042490114</IE>', '<IEST>123456789</IEST>']])],
  ['C22-10', 'SUFRAMA fora da área incentivada', nota([['<CRT>3</CRT>', '<CRT>3</CRT><ISUFEmit>200100138</ISUFEmit>']])],
  ['D01-10', 'grupo avulsa em nota da empresa', nota([['</emit>', `</emit><avulsa><CNPJ>${CNPJ_OK}</CNPJ><xOrgao>SEFAZ</xOrgao><matr>123</matr><xAgente>AGENTE FISCAL</xAgente><UF>SP</UF><repEmi>SAO PAULO</repEmi></avulsa>`]])],
  ['D01-20', 'nota do fisco sem grupo avulsa', comChave(nota([['<procEmi>0', '<procEmi>1'], ['<serie>1</serie>', '<serie>890</serie>']]))],
  ['E01-10', 'NF-e sem destinatário', nota([[DEST, '']])],
  ['E01-20', 'NFC-e com entrega a domicílio sem destinatário', nota([['<indPres>1', '<indPres>4']], NFCE)],
  ['E02-10', 'CNPJ do destinatário inválido', dest(`<CNPJ>11444777000162</CNPJ>${nomeHomolog}${ENDER_DEST}<indIEDest>9</indIEDest>`)],
  ['E02-20', 'NFC-e para o próprio emitente', nfceComDest('<CNPJ>11222333000181</CNPJ><indIEDest>9</indIEDest>')],
  ['E03-10', 'CPF do destinatário inválido', nota([['<CPF>12345678909</CPF>', '<CPF>12345678900</CPF>']])],
  ['E03a-10', 'exportação sem idEstrangeiro', nota([['<idDest>1', '<idDest>3']])],
  ['E03a-20', 'idEstrangeiro em operação interna com contribuinte', nota([['<CPF>12345678909</CPF>', '<idEstrangeiro>AB123</idEstrangeiro>'], ['<indFinal>1', '<indFinal>0']])],
  ['E03a-30', 'idEstrangeiro com IE', nota([['<CPF>12345678909</CPF>', '<idEstrangeiro>AB123</idEstrangeiro>'], ['<indIEDest>9</indIEDest>', '<indIEDest>9</indIEDest><IE>123456789</IE>']])],
  ['E03a-60', 'idEstrangeiro com caractere proibido', nota([['<CPF>12345678909</CPF>', '<idEstrangeiro>AB#123</idEstrangeiro>']])],
  ['E04-10', 'destinatário sem nome', nota([[nomeHomolog, '']])],
  ['E04-20', 'homologação sem o nome padrão', nota([[nomeHomolog, '<xNome>FULANO DE TAL</xNome>']])],
  ['E05-10', 'destinatário sem endereço', nota([[ENDER_DEST, '']])],
  ['E05-20', 'NFC-e com entrega a domicílio sem endereço', nota([['<indPres>1', '<indPres>4']], nfceComDest(`<CPF>12345678909</CPF>${nomeHomolog}<indIEDest>9</indIEDest>`))],
  ['E10-20', 'município do destinatário de outra UF', nota([['<cMun>3550308</cMun><xMun>SAO PAULO</xMun><UF>SP</UF><CEP>01310100', '<cMun>3304557</cMun><xMun>SAO PAULO</xMun><UF>SP</UF><CEP>01310100']])],
  ['E10-30', 'exterior com município brasileiro', nota([[ENDER_DEST, enderEX('<cPais>2496</cPais>').replace('9999999', '3550308')]])],
  ['E12-10', 'exportação com UF brasileira', nota([['<idDest>1', '<idDest>3']])],
  ['E12-30', 'interestadual dentro da mesma UF', nota([['<idDest>1', '<idDest>2']])],
  ['E12-40', 'interna com destinatário de outra UF', nota([[ENDER_DEST, enderRJ], ['<indFinal>1', '<indFinal>0'], ['<indIEDest>9', '<indIEDest>2']])],
  ['E12-50', 'entrada interestadual dentro da mesma UF', nota([['<idDest>1', '<idDest>2'], ['<tpNF>1', '<tpNF>0']])],
  ['E12-60', 'entrada interna com destinatário de outra UF', nota([[ENDER_DEST, enderRJ], ['<indFinal>1', '<indFinal>0'], ['<tpNF>1', '<tpNF>0']])],
  ['E14-10', 'exportação sem país', nota([['<idDest>1', '<idDest>3'], [ENDER_DEST, enderEX()]])],
  ['E14-20', 'operação interna com país estrangeiro', nota([['<CEP>01310100</CEP>', '<CEP>01310100</CEP><cPais>2496</cPais><xPais>ESTADOS UNIDOS</xPais>']])],
  ['E14-30', 'exterior com país Brasil', nota([[ENDER_DEST, enderEX('<cPais>1058</cPais>')]])],
  ['E16a-10', 'NFC-e para contribuinte', nfceComDest('<CPF>12345678909</CPF><indIEDest>1</indIEDest><IE>123456789</IE>')],
  ['E16a-20', 'exportação para contribuinte', nota([['<idDest>1', '<idDest>3'], ['<indIEDest>9</indIEDest>', '<indIEDest>1</indIEDest><IE>123456789</IE>']])],
  ['E16a-30', 'destinatário isento em SP', nota([['<indIEDest>9', '<indIEDest>2']])],
  ['E16a-40', 'não contribuinte que não é consumidor final', nota([['<indFinal>1', '<indFinal>0']])],
  ['E17-10', 'NFC-e para exterior com IE', nota([['<idDest>1', '<idDest>3']], nfceComDest('<CPF>12345678909</CPF><indIEDest>9</indIEDest><IE>123456789</IE>'))],
  ['E17-20', 'contribuinte sem IE', nota([['<indIEDest>9', '<indIEDest>1']])],
  ['E17-30', 'isento com IE', nota([['<indIEDest>9</indIEDest>', '<indIEDest>2</indIEDest><IE>123456789</IE>']])],
  ['E17-40', 'destinatário no exterior com IE', nota([[ENDER_DEST, enderEX('<cPais>2496</cPais>')], ['<indIEDest>9</indIEDest>', '<indIEDest>9</indIEDest><IE>123456789</IE>']])],
  ['E18-10', 'NFC-e com SUFRAMA do destinatário', nfceComDest('<CPF>12345678909</CPF><indIEDest>9</indIEDest><ISUF>200100138</ISUF>')],
  ['E18-30', 'SUFRAMA com destinatário em SP', nota([['<indIEDest>9</indIEDest>', '<indIEDest>9</indIEDest><ISUF>200100138</ISUF>']])],
  ['F01-10', 'NFC-e com local de retirada', depoisDoDest(local('retirada', `<CNPJ>${CNPJ_OK}</CNPJ>`), nfceComDest('<CPF>12345678909</CPF><indIEDest>9</indIEDest>'))],
  ['F02-10', 'retirada com CNPJ inválido', depoisDoDest(local('retirada', '<CNPJ>11444777000162</CNPJ>'))],
  ['F02a-10', 'retirada com CPF inválido', depoisDoDest(local('retirada', '<CPF>12345678900</CPF>'))],
  ['F07-10', 'retirada no exterior com município', depoisDoDest(local('retirada', `<CNPJ>${CNPJ_OK}</CNPJ>`).replace('<UF>SP', '<UF>EX'))],
  ['F07-30', 'retirada com município de outra UF', depoisDoDest(local('retirada', `<CNPJ>${CNPJ_OK}</CNPJ>`).replace('<UF>SP', '<UF>RJ'))],
  ['G02-10', 'entrega com CNPJ inválido', depoisDoDest(local('entrega', '<CNPJ>11444777000162</CNPJ>'))],
  ['G02a-10', 'entrega com CPF inválido', depoisDoDest(local('entrega', '<CPF>12345678900</CPF>'))],
  ['G07-10', 'entrega no exterior com município', depoisDoDest(local('entrega', `<CNPJ>${CNPJ_OK}</CNPJ>`).replace('<UF>SP', '<UF>EX'))],
  ['G07-30', 'entrega com município de outra UF', depoisDoDest(local('entrega', `<CNPJ>${CNPJ_OK}</CNPJ>`).replace('<UF>SP', '<UF>RJ'))],
  ['GA02-10', 'autXML com CNPJ inválido', depoisDoDest('<autXML><CNPJ>11444777000162</CNPJ></autXML>')],
  ['GA03-10', 'autXML com CPF inválido', depoisDoDest('<autXML><CPF>12345678900</CPF></autXML>')],
  ['GA03-20', 'autXML para o próprio destinatário', depoisDoDest('<autXML><CPF>12345678909</CPF></autXML>')],
]

for (const [regra, descricao, xml] of casos) {
  test(`${regra}: ${descricao}`, () => {
    const r = acusadas(xml)
    assert.ok(r.includes(regra), `esperava ${regra}; veio ${r.join(', ') || 'nada'}`)
  })
}

test('E12-30: entrega em outra UF dispensa a regra', () => {
  const xml = depoisDoDest(local('entrega', `<CNPJ>${CNPJ_OK}</CNPJ>`).replace('<cMun>3550308</cMun><xMun>SAO PAULO</xMun><UF>SP', '<cMun>3304557</cMun><xMun>RIO DE JANEIRO</xMun><UF>RJ'), nota([['<idDest>1', '<idDest>2']]))
  assert.ok(!acusadas(xml).includes('E12-30'))
})

test('E16a-30: item com ICMS isento dispensa a regra', () => {
  const xml = nota([
    ['<indIEDest>9', '<indIEDest>2'],
    ['<ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>100.00</vBC><pICMS>18.00</pICMS><vICMS>18.00</vICMS></ICMS00>', '<ICMS40><orig>0</orig><CST>40</CST></ICMS40>'],
  ])
  assert.ok(!acusadas(xml).includes('E16a-30'))
})

test('E03a-10: exportação com idEstrangeiro passa', () => {
  const xml = nota([['<idDest>1', '<idDest>3'], ['<CPF>12345678909</CPF>', '<idEstrangeiro>AB123</idEstrangeiro>'], [ENDER_DEST, enderEX('<cPais>2496</cPais>')]])
  const r = acusadas(xml)
  for (const id of ['E03a-10', 'E12-10', 'E14-10', 'E16a-20']) assert.ok(!r.includes(id), `${id} em ${r}`)
})
