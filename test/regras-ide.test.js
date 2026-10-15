import assert from 'node:assert/strict'
import { test } from 'node:test'
import { AGORA, NFCE, NFE_55, acusadas, comChave, nota } from './ajuda.js'

const DIA = 24 * 60 * 60 * 1000

test('as fixtures de NF-e e NFC-e não acusam nada', () => {
  assert.deepEqual(acusadas(NFE_55), [])
  assert.deepEqual(acusadas(NFCE), [])
})

// [regra, descrição, xml]: cada caso precisa acusar a regra (e continuar válido no schema).
const casos = [
  ['A03-10', 'Id não bate com os campos', nota([['<nNF>123</nNF>', '<nNF>124</nNF>']])],
  ['B23-10', 'DV da chave errado', nota([['<cDV>7</cDV>', '<cDV>8</cDV>']])],
  ['B03-10', 'cNF em sequência proibida', comChave(nota([['<cNF>48213907</cNF>', '<cNF>12345678</cNF>']]))],
  ['B03-10', 'cNF igual ao nNF', comChave(nota([['<cNF>48213907</cNF>', '<cNF>00000123</cNF>']]))],
  ['B09-10', 'emissão no futuro', nota([['T10:00:00-03:00</dhEmi>', 'T10:07:00-03:00</dhEmi>']])],
  ['B09-40', 'NFC-e transmitida 10 minutos depois', nota([['T10:00:00-03:00</dhEmi>', 'T09:50:00-03:00</dhEmi>']], NFCE)],
  ['B10-10', 'NFC-e com data de saída', nota([['</dhEmi>', '</dhEmi><dhSaiEnt>2026-10-15T10:00:00-03:00</dhSaiEnt>']], NFCE)],
  ['B10-40', 'saída antes da emissão', nota([['</dhEmi>', '</dhEmi><dhSaiEnt>2026-10-15T09:00:00-03:00</dhSaiEnt>']])],
  ['B10a-20', 'previsão de entrega além de 3 meses', nota([['</dhEmi>', '</dhEmi><dPrevEntrega>2027-01-16</dPrevEntrega>'], ['<modFrete>9', '<modFrete>0']])],
  ['B10a-30', 'previsão de entrega antes da saída', nota([['</dhEmi>', '</dhEmi><dPrevEntrega>2026-10-14</dPrevEntrega>'], ['<modFrete>9', '<modFrete>0']])],
  ['B10a-40', 'previsão de entrega em nota complementar', nota([['</dhEmi>', '</dhEmi><dPrevEntrega>2026-10-20</dPrevEntrega>'], ['<finNFe>1', '<finNFe>2'], ['<modFrete>9', '<modFrete>0']])],
  ['B10a-50', 'previsão de entrega sem transporte', nota([['</dhEmi>', '</dhEmi><dPrevEntrega>2026-10-20</dPrevEntrega>']])],
  ['B11-10', 'NFC-e de entrada', nota([['<tpNF>1', '<tpNF>0']], NFCE)],
  ['B11a-10', 'NFC-e interestadual', nota([['<idDest>1', '<idDest>2']], NFCE)],
  ['B11a-10', 'NF-e com DANFE simplificado interestadual', nota([['<tpImp>1', '<tpImp>6'], ['<idDest>1', '<idDest>2']])],
  ['B12-20', 'município do fato gerador de outra UF', nota([['<cMunFG>3550308', '<cMunFG>3304557']])],
  ['B21-10', 'NFC-e com DANFE retrato', nota([['<tpImp>4', '<tpImp>1']], NFCE)],
  ['B21-20', 'NF-e com DANFE NFC-e', nota([['<tpImp>1', '<tpImp>4']])],
  ['B22-10', 'NF-e off-line sem DANFE simplificado', nota([['<tpEmis>1', '<tpEmis>9'], ['</verProc>', '</verProc><dhCont>2026-10-15T09:00:00-03:00</dhCont><xJust>SEM CONEXAO COM A INTERNET NO MOMENTO</xJust>']])],
  ['B22-30', 'contingência SCAN extinta', nota([['<tpEmis>1', '<tpEmis>3']])],
  ['B22-34', 'NFC-e em contingência EPEC', nota([['<tpEmis>1', '<tpEmis>4']], NFCE)],
  ['B25-20', 'NFC-e de devolução', nota([['<finNFe>1', '<finNFe>4']], NFCE)],
  ['B25a-10', 'NFC-e para não consumidor final', nota([['<indFinal>1', '<indFinal>0']], NFCE)],
  ['B25b-10', 'NF-e com entrega a domicílio', nota([['<indPres>1', '<indPres>4']])],
  ['B25b-20', 'NFC-e pela internet', nota([['<indPres>1', '<indPres>2']], NFCE)],
  ['B25b-40', 'venda fora do estabelecimento sem nota referenciada', nota([['<indPres>1', '<indPres>5']])],
  ['B25c-10', 'venda sem indIntermed', nota([['<indIntermed>0</indIntermed>', '']])],
  ['B25c-20', 'intermediador em operação sem presença definida', nota([['<indPres>1</indPres><indIntermed>0', '<indPres>0</indPres><indIntermed>1']])],
  ['B26-10', 'série reservada ao fisco', comChave(nota([['<serie>1</serie>', '<serie>890</serie>']]))],
  ['B26-10', 'série exclusiva do PAA', comChave(nota([['<serie>1</serie>', '<serie>975</serie>']]))],
  ['B26-20', 'emissão pelo fisco fora da série avulsa', nota([['<procEmi>0', '<procEmi>1']])],
  ['B26-26', 'PAA sem infPAA', comChave(nota([['<procEmi>0', '<procEmi>4'], ['<serie>1</serie>', '<serie>975</serie>']]))],
  ['B26-30', 'emissão pelo fisco em contingência', comChave(nota([['<procEmi>0', '<procEmi>1'], ['<serie>1</serie>', '<serie>890</serie>'], ['<tpEmis>1', '<tpEmis>2'], ['</verProc>', '</verProc><dhCont>2026-10-15T09:00:00-03:00</dhCont><xJust>FORMULARIO DE SEGURANCA EM USO</xJust>']]))],
  ['B26-50', 'NFC-e emitida por aplicativo do fisco', nota([['<procEmi>0', '<procEmi>3']], NFCE)],
  ['B28-10', 'emissão normal com justificativa de contingência', nota([['</verProc>', '</verProc><dhCont>2026-10-15T09:00:00-03:00</dhCont><xJust>SEM CONEXAO COM A INTERNET NO MOMENTO</xJust>']])],
  ['B28-20', 'contingência sem justificativa', comChave(nota([['<tpEmis>1', '<tpEmis>2']]))],
]

for (const [regra, descricao, xml] of casos) {
  test(`${regra}: ${descricao}`, () => {
    assert.ok(acusadas(xml).includes(regra), `esperava ${regra}; veio ${acusadas(xml).join(', ') || 'nada'}`)
  })
}

test('B09-20: acusa nota normal com mais de 30 dias, mas não contingência', () => {
  const depois = new Date(AGORA.getTime() + 31 * DIA)
  assert.ok(acusadas(NFE_55, { agora: depois }).includes('B09-20'))
  const contingencia = comChave(nota([['<tpEmis>1', '<tpEmis>2'], ['</verProc>', '</verProc><dhCont>2026-10-15T09:00:00-03:00</dhCont><xJust>FORMULARIO DE SEGURANCA EM USO</xJust>']]))
  assert.ok(!acusadas(contingencia, { agora: depois }).includes('B09-20'))
  assert.ok(!acusadas(NFE_55, { agora: new Date(AGORA.getTime() + 29 * DIA) }).includes('B09-20'))
})

test('B09-40 não se aplica à NF-e comum', () => {
  const atrasada = nota([['T10:00:00-03:00</dhEmi>', 'T09:50:00-03:00</dhEmi>']])
  assert.ok(!acusadas(atrasada).includes('B09-40'))
})

test('B25c-10 não se aplica a CFOP de serviço de comunicação/energia da exceção', () => {
  const xml = nota([['<indIntermed>0</indIntermed>', ''], ['<CFOP>5102', '<CFOP>5301']])
  assert.ok(!acusadas(xml).includes('B25c-10'))
})

test('B26-30: SC aceita contingência off-line na emissão pelo fisco', () => {
  const xml = comChave(
    nota([
      ['<cUF>35', '<cUF>42'], ['<cMunFG>3550308', '<cMunFG>4205407'],
      ['<procEmi>0', '<procEmi>1'], ['<serie>1</serie>', '<serie>890</serie>'],
      ['<tpImp>1', '<tpImp>6'], ['<tpEmis>1', '<tpEmis>9'],
      ['</verProc>', '</verProc><dhCont>2026-10-15T09:00:00-03:00</dhCont><xJust>SEM CONEXAO COM A INTERNET NO MOMENTO</xJust>'],
    ]),
  )
  assert.ok(!acusadas(xml).includes('B26-30'))
})

test('regras de NFC-e não rodam na NF-e e vice-versa', () => {
  assert.ok(!acusadas(nota([['<tpEmis>1', '<tpEmis>4']])).includes('B22-34'))
  assert.ok(!acusadas(nota([['<indPres>1', '<indPres>4']], NFCE)).includes('B25b-10'))
})

test('chave com CNPJ alfanumérico: DV calculado com ASCII - 48', () => {
  const xml = comChave(nota([['<CNPJ>11222333000181</CNPJ>', '<CNPJ>12ABC34501DE35</CNPJ>']]))
  const r = acusadas(xml)
  assert.ok(!r.includes('A03-10') && !r.includes('B23-10'), r.join(', '))
})
