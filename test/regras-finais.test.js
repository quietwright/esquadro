import assert from 'node:assert/strict'
import { test } from 'node:test'
import { dvChave } from '../src/regras/util.js'
import { AGORA, NFCE, NFE_55, acusadas, comChave, comQrCode, nota, validarNota } from './ajuda.js'

// Chave de outra nota, com DV correto; `troca` altera trechos antes de calcular o DV.
function chave({ uf = '35', aamm = '2609', doc = '11444777000161', mod = '55', serie = '001', nNF = '000000456', tpEmis = '1', cNF = '12345678' } = {}) {
  const corpo = uf + aamm + doc + mod + serie + nNF + tpEmis + cNF
  return corpo + dvChave(corpo)
}
const comDvErrado = (c) => c.slice(0, 43) + ((Number(c[43]) + 1) % 10)
const ref = (tag, valor, base = NFE_55) => nota([['</verProc>', `</verProc><NFref><${tag}>${valor}</${tag}></NFref>`]], base)
const refs = (pares, base = NFE_55) => nota([['</verProc>', `</verProc>${pares.map(([t, v]) => `<NFref><${t}>${v}</${t}></NFref>`).join('')}`]], base)
const MINHA = /Id="NFe(\d{44})"/.exec(NFE_55)[1]

const compraGov = (tpOperGov, chaves = []) =>
  nota([['</verProc>', `</verProc><gCompraGov><tpEnteGov>1</tpEnteGov><pRedutor>0.0000</pRedutor><tpOperGov>${tpOperGov}</tpOperGov>${chaves.map((c) => `<refDFeAnt>${c}</refDFeAnt>`).join('')}</gCompraGov>`]])
const dfeRef = (chaveAcesso, item = '<nItem>1</nItem>', base = NFE_55) => nota([['</imposto>', `</imposto><DFeReferenciado><chaveAcesso>${chaveAcesso}</chaveAcesso>${item}</DFeReferenciado>`]], base)
const transporta = (doc, extra = '') => `<transporta>${doc}<xNome>TRANSPORTES</xNome>${extra}</transporta>`
const transp = (modFrete, grupo = '', base = NFE_55) => nota([['<transp><modFrete>9</modFrete></transp>', `<transp><modFrete>${modFrete}</modFrete>${grupo}</transp>`]], base)
const cobr = (conteudo, base = NFE_55) => nota([['</transp>', `</transp><cobr>${conteudo}</cobr>`]], base)
const pag = (detPags, troco = '', base = NFE_55) => nota([[/<pag>.*<\/pag>/.exec(NFE_55)[0], `<pag>${detPags}${troco}</pag>`]], base)
const detPag = (tPag, vPag = '100.00', extra = '', antes = '') => `<detPag>${antes}<tPag>${tPag}</tPag>${extra.startsWith('<xPag>') ? extra : ''}<vPag>${vPag}</vPag>${extra.startsWith('<xPag>') ? '' : extra}</detPag>`
const depoisDoPag = (xml, base = NFE_55) => nota([['</pag>', `</pag>${xml}`]], base)
const qr = (params, base = NFCE) => nota([[/<qrCode>.*<\/qrCode>/.exec(NFCE)[0], `<qrCode>https://www.homologacao.nfce.fazenda.sp.gov.br/qrcode?p=${params}</qrCode>`]], base)
const CHAVE_NFCE = /Id="NFe(\d{44})"/.exec(NFCE)[1]
// NFC-e em contingência off-line, com a chave refeita (tpEmis=9 entra na chave).
const offline = comChave(nota([['<tpEmis>1', '<tpEmis>9'], ['</verProc>', '</verProc><dhCont>2026-10-15T09:00:00-03:00</dhCont><xJust>SEM CONEXAO COM A INTERNET NO MOMENTO</xJust>']], NFCE))
const CHAVE_OFFLINE = /Id="NFe(\d{44})"/.exec(offline)[1]

const casos = [
  ['BA01-10', 'NFC-e com nota referenciada', ref('refNFe', chave(), NFCE)],
  ['BA02-10', 'chave referenciada com DV errado', ref('refNFe', comDvErrado(chave()))],
  ['BA02-14', 'chave referenciada com UF inválida', ref('refNFe', chave({ uf: '99' }))],
  ['BA02-20', 'chave referenciada do futuro', ref('refNFe', chave({ aamm: '3001' }))],
  ['BA02-24', 'chave referenciada com mês 13', ref('refNFe', chave({ aamm: '2613' }))],
  ['BA02-30', 'chave referenciada com CNPJ inválido', ref('refNFe', chave({ doc: '11444777000162' }))],
  ['BA02-34', 'chave referenciada de modelo 57', ref('refNFe', chave({ mod: '57' }))],
  ['BA02-35', 'venda referenciando NFC-e', ref('refNFe', chave({ mod: '65' }))],
  ['BA02-40', 'chave referenciada com número zero', ref('refNFe', chave({ nNF: '000000000' }))],
  ['BA02-44', 'mesma chave referenciada duas vezes', refs([['refNFe', chave()], ['refNFe', chave()]])],
  ['BA02-50', 'nota referencia a si mesma', ref('refNFe', MINHA)],
  ['BA02-60', 'chave referenciada com tpEmis 8', ref('refNFe', chave({ tpEmis: '8' }))],
  ['BA02a-10', 'refNFeSig em nota que não é normal', nota([['<finNFe>1', '<finNFe>2']], ref('refNFeSig', chave({ cNF: '00000000' })))],
  ['BA02a-74', 'refNFeSig com código numérico', nota([['<finNFe>1', '<finNFe>2']], ref('refNFeSig', chave()))],
  ['BA02a-120', 'refNFeSig em PE', nota([['<finNFe>1', '<finNFe>2'], ['<cUF>35', '<cUF>26']], ref('refNFeSig', chave({ cNF: '00000000' })))],
  ['BA03-10', 'referência a NF modelo 1', ref('refNF', '<cUF>35</cUF><AAMM>2601</AAMM><CNPJ>11444777000161</CNPJ><mod>01</mod><serie>1</serie><nNF>1</nNF>')],
  ['BA10-10', 'referência a NF de produtor', ref('refNFP', '<cUF>35</cUF><AAMM>2601</AAMM><CPF>12345678909</CPF><IE>ISENTO</IE><mod>04</mod><serie>0</serie><nNF>1</nNF>')],
  ['BA19-10', 'CT-e referenciado com DV errado', ref('refCTe', comDvErrado(chave({ mod: '57' })))],
  ['BA19-34', 'CT-e referenciado de modelo 55', ref('refCTe', chave())],
  ['BA19-44', 'CT-e referenciado duas vezes', refs([['refCTe', chave({ mod: '57' })], ['refCTe', chave({ mod: '57' })]])],
  ['BA20-30', 'cupom fiscal referenciado', ref('refECF', '<mod>2D</mod><nECF>1</nECF><nCOO>1</nCOO>')],
  ['BB01-10', 'NFC-e com compra governamental', nota([['</verProc>', '</verProc><gCompraGov><tpEnteGov>1</tpEnteGov><pRedutor>0.0000</pRedutor><tpOperGov>1</tpOperGov></gCompraGov>']], NFCE)],
  ['BB05-10', 'pagamento posterior com DF-e anterior', compraGov(1, [chave()])],
  ['BB05-20', 'recebimento sem DF-e anterior', compraGov(2)],
  ['BB05-30', 'recebimento com dois DF-e anteriores', compraGov(2, [chave(), chave({ nNF: '000000457' })])],
  ['BB05-70', 'DF-e anterior com DV errado', compraGov(2, [comDvErrado(chave())])],
  ['BB05-120', 'DF-e anterior de modelo 65', compraGov(2, [chave({ mod: '65' })])],
  ['BB05-150', 'DF-e anterior é a própria nota', compraGov(2, [MINHA])],
  ['BB05-180', 'DF-e anterior de outro emitente', compraGov(2, [chave()])],
  ['VC02-04', 'NFC-e com DF-e referenciado no item', dfeRef(chave(), '<nItem>1</nItem>', NFCE)],
  ['VC02-05', 'referência no item e na nota', ref('refNFe', chave(), dfeRef(chave()))],
  ['VC02-14', 'devolução sem referência no item', nota([['<finNFe>1', '<finNFe>4'], ['<CFOP>5102', '<CFOP>5202']])],
  ['VC03-20', 'DF-e referenciado sem nItem', dfeRef(chave(), '')],
  ['X02-10', 'NFC-e com frete sem entrega', transp('0', '', NFCE)],
  ['X03-30', 'transportador sem frete', transp('9', transporta('<CNPJ>11444777000161</CNPJ>'))],
  ['X04-20', 'CNPJ do transportador inválido', transp('0', transporta('<CNPJ>11444777000162</CNPJ>'))],
  ['X04-30', 'transporte do remetente feito por terceiro', transp('3', transporta('<CNPJ>11444777000161</CNPJ>'))],
  ['X04-50', 'frete CIF com o próprio emitente transportando', transp('0', transporta('<CNPJ>11222333000181</CNPJ>'))],
  ['X04-70', 'transporte do destinatário feito por terceiro', transp('4', transporta('<CNPJ>11444777000161</CNPJ>'))],
  ['X05-10', 'CPF do transportador inválido', transp('0', transporta('<CPF>12345678900</CPF>'))],
  ['X07-10', 'IE do transportador sem UF', transp('0', transporta('<CNPJ>11444777000161</CNPJ>', '<IE>123456789</IE>'))],
  ['X18-10', 'NFC-e com veículo de transporte', transp('9', '<veicTransp><placa>ABC1D23</placa></veicTransp>', NFCE)],
  ['Y01-10', 'NFC-e com cobrança', cobr('<fat><nFat>1</nFat><vOrig>100.00</vOrig><vLiq>100.00</vLiq></fat>', NFCE)],
  ['Y01-20', 'fatura incompleta', cobr('<fat><nFat>1</nFat></fat>')],
  ['Y05-10', 'desconto maior que a fatura', cobr('<fat><nFat>1</nFat><vOrig>100.00</vOrig><vDesc>150.00</vDesc><vLiq>0.00</vLiq></fat>')],
  ['Y06-10', 'líquido diferente de original menos desconto', cobr('<fat><nFat>1</nFat><vOrig>100.00</vOrig><vDesc>10.00</vDesc><vLiq>100.00</vLiq></fat>')],
  ['Y08-10', 'parcela mal numerada', cobr('<fat><nFat>1</nFat><vOrig>100.00</vOrig><vLiq>100.00</vLiq></fat><dup><nDup>1</nDup><dVenc>2026-11-15</dVenc><vDup>100.00</vDup></dup>')],
  ['Y09-20', 'vencimento antes da emissão', cobr('<fat><nFat>1</nFat><vOrig>100.00</vOrig><vLiq>100.00</vLiq></fat><dup><nDup>001</nDup><dVenc>2026-10-01</dVenc><vDup>100.00</vDup></dup>')],
  ['Y09-30', 'vencimentos fora de ordem', cobr('<fat><nFat>1</nFat><vOrig>100.00</vOrig><vLiq>100.00</vLiq></fat><dup><nDup>001</nDup><dVenc>2026-12-15</dVenc><vDup>50.00</vDup></dup><dup><nDup>002</nDup><dVenc>2026-11-15</dVenc><vDup>50.00</vDup></dup>')],
  ['Y09-40', 'parcela única à vista', cobr('<fat><nFat>1</nFat><vOrig>100.00</vOrig><vLiq>100.00</vLiq></fat><dup><nDup>001</nDup><dVenc>2026-10-15</dVenc><vDup>100.00</vDup></dup>')],
  ['Y09-50', 'vencimento a mais de 10 anos', cobr('<fat><nFat>1</nFat><vOrig>100.00</vOrig><vLiq>100.00</vLiq></fat><dup><nDup>001</nDup><dVenc>2040-01-01</dVenc><vDup>100.00</vDup></dup>')],
  ['Y10-10', 'parcelas não somam o líquido', cobr('<fat><nFat>1</nFat><vOrig>100.00</vOrig><vLiq>100.00</vLiq></fat><dup><nDup>001</nDup><dVenc>2026-11-15</dVenc><vDup>90.00</vDup></dup>')],
  ['YA02-04', 'devolução com pagamento', nota([['<finNFe>1', '<finNFe>4'], ['<CFOP>5102', '<CFOP>5202']])],
  ['YA02-10', 'NFC-e com duplicata mercantil', pag(detPag('14'), '', NFCE)],
  ['YA02-40', 'NFC-e sem pagamento', pag(detPag('90', '0.00'), '', NFCE)],
  ['YA02-60', 'meio de pagamento inexistente', pag(detPag('42'))],
  ['YA02a-10', 'outros sem descrição', pag(detPag('99'))],
  ['YA02a-20', 'descrição em meio que não é outros', pag(detPag('01', '100.00', '<xPag>DINHEIRO VIVO</xPag>'))],
  ['YA03-10', 'NFC-e com pagamento menor que o total', pag(detPag('01', '90.00'), '', NFCE)],
  ['YA03-20', 'pagamento maior que o total sem troco', pag(detPag('01', '120.00'))],
  ['YA03-30', 'sem pagamento com valor', pag(detPag('90', '100.00'))],
  ['YA03c-10', 'CNPJ do pagamento inválido', pag(detPag('01', '100.00', '<CNPJPag>11444777000162</CNPJPag><UFPag>SP</UFPag>'))],
  ['YA04-10', 'NFC-e paga com cartão sem grupo card', pag(detPag('03'), '', NFCE)],
  ['YA04-20', 'grupo card em pagamento em dinheiro', pag(detPag('01', '100.00', '<card><tpIntegra>2</tpIntegra></card>'))],
  ['YA05-10', 'pagamento integrado sem autorização', pag(detPag('03', '100.00', '<card><tpIntegra>1</tpIntegra></card>'))],
  ['YA05-20', 'CNPJ da credenciadora inválido', pag(detPag('03', '100.00', '<card><tpIntegra>2</tpIntegra><CNPJ>11444777000162</CNPJ></card>'))],
  ['YA06-10', 'bandeira inexistente', pag(detPag('03', '100.00', '<card><tpIntegra>2</tpIntegra><tBand>98</tBand></card>'))],
  ['YA09-10', 'troco errado', pag(detPag('01', '120.00'), '<vTroco>10.00</vTroco>')],
  ['YB01-10', 'intermediador sem infIntermed', nota([['<indIntermed>0', '<indIntermed>1']])],
  ['YB01-20', 'infIntermed sem intermediador', depoisDoPag('<infIntermed><CNPJ>11444777000161</CNPJ><idCadIntTran>LOJA1</idCadIntTran></infIntermed>')],
  ['YB02-10', 'CNPJ do intermediador inválido', depoisDoPag('<infIntermed><CNPJ>11444777000162</CNPJ><idCadIntTran>LOJA1</idCadIntTran></infIntermed>', nota([['<indIntermed>0', '<indIntermed>1']]))],
  ['ZA01-10', 'exportação sem local de embarque', nota([['<idDest>1', '<idDest>3']])],
  ['ZA01-20', 'local de embarque fora de exportação', nota([['</infRespTec>', '</infRespTec>'], ['</pag>', '</pag>'], ['<infRespTec>', '<exporta><UFSaidaPais>SP</UFSaidaPais><xLocExporta>SANTOS</xLocExporta></exporta><infRespTec>']])],
  ['ZB01-10', 'NFC-e com dados de compra', nota([['<infRespTec>', '<compra><xPed>123</xPed></compra><infRespTec>']], NFCE)],
  ['ZD01-10', 'sem responsável técnico', nota([[/<infRespTec>.*<\/infRespTec>/.exec(NFE_55)[0], '']])],
  ['ZD02-10', 'CNPJ do responsável técnico inválido', nota([['<infRespTec><CNPJ>11444777000161', '<infRespTec><CNPJ>11444777000162']])],
  ['ZE01-10', 'solicitação de NFF fora da NFF', nota([['</infRespTec>', '</infRespTec><infSolicNFF><xSolic>PEDIDO DE EMISSAO</xSolic></infSolicNFF>']])],
  ['ZX01-10', 'NF-e com QR Code', comQrCode(NFE_55)],
  ['ZX02-10', 'NFC-e sem QR Code', nota([[/<infNFeSupl>.*<\/infNFeSupl>/.exec(NFCE)[0], '']], NFCE)],
  ['ZX02-228', 'QR Code com outra chave', qr(`${chave({ mod: '65' })}|3|2`)],
  ['ZX02-244', 'QR Code com outro ambiente', qr(`${CHAVE_NFCE}|3|1`)],
  ['ZX02-268', 'QR Code de contingência com dia errado', qr(`${CHAVE_OFFLINE}|3|2|14|100.00|||QVNTSU5BVFVSQQ==`, offline)],
  ['ZX02-276', 'QR Code de contingência com valor errado', qr(`${CHAVE_OFFLINE}|3|2|15|99.00|||QVNTSU5BVFVSQQ==`, offline)],
  ['ZX02-328', 'QR Code de contingência com destinatário que a nota não tem', qr(`${CHAVE_OFFLINE}|3|2|15|100.00|2|12345678909|QVNTSU5BVFVSQQ==`, offline)],
]

for (const [regra, descricao, xml] of casos) {
  test(`${regra}: ${descricao}`, () => {
    const r = acusadas(xml, { agora: AGORA })
    assert.ok(r.includes(regra), `esperava ${regra}; veio ${r.join(', ') || 'nada'}`)
  })
}

test('casos corretos não acusam', () => {
  assert.deepEqual(acusadas(ref('refNFe', chave())).filter((r) => r.startsWith('BA')), [])
  assert.deepEqual(acusadas(transp('0', transporta('<CNPJ>11444777000161</CNPJ>'))).filter((r) => r.startsWith('X')), [])
  assert.deepEqual(acusadas(pag(detPag('01', '120.00'), '<vTroco>20.00</vTroco>')).filter((r) => r.startsWith('YA')), [])
  assert.deepEqual(acusadas(cobr('<fat><nFat>1</nFat><vOrig>100.00</vOrig><vLiq>100.00</vLiq></fat><dup><nDup>001</nDup><dVenc>2026-11-15</dVenc><vDup>50.00</vDup></dup><dup><nDup>002</nDup><dVenc>2026-12-15</dVenc><vDup>50.00</vDup></dup>')).filter((r) => r.startsWith('Y')), [])
})

test('regra de implementação futura sai como aviso facultativo e não invalida a nota', () => {
  const r = validarNota(transp('0', transporta('<CNPJ>11222333000181</CNPJ>')))
  const x04 = r.problemas.find((p) => p.regra === 'X04-50')
  assert.equal(x04.aplicacao, 'facultativa')
  assert.equal(r.valida, true)
})
