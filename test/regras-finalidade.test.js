import assert from 'node:assert/strict'
import { test } from 'node:test'
import { dvChave } from '../src/regras/util.js'
import { NFCE, NFE_55, acusadas, comChave, nota } from './ajuda.js'

const chave = ({ uf = '35', doc = '11222333000181', mod = '55', nNF = '000000456' } = {}) => {
  const corpo = `${uf}2609${doc}${mod}001${nNF}112345678`
  return corpo + dvChave(corpo)
}
const ref = (...chaves) => ['</verProc>', `</verProc>${chaves.map((c) => `<NFref><refNFe>${c}</refNFe></NFref>`).join('')}`]
const ICMS = /<ICMS>.*<\/ICMS>/.exec(NFE_55)[0]
const PIS = /<PIS>.*<\/PIS>/.exec(NFE_55)[0]
const COFINS = /<COFINS>.*<\/COFINS>/.exec(NFE_55)[0]
// Nota de crédito "pura": entrada, só IBS/CBS.
const credito = (tipo, extras = []) =>
  nota([['<finNFe>1</finNFe>', `<finNFe>5</finNFe><tpNFCredito>${tipo}</tpNFCredito>`], ['<tpNF>1', '<tpNF>0'], [ICMS, ''], [PIS, ''], [COFINS, ''], ...extras])
const debito = (tipo, extras = []) => nota([['<finNFe>1</finNFe>', `<finNFe>6</finNFe><tpNFDebito>${tipo}</tpNFDebito>`], [ICMS, ''], [PIS, ''], [COFINS, ''], ...extras])

const casos = [
  ['B07-10', 'NFC-e com série do PAA', comChave(nota([['<serie>1</serie>', '<serie>975</serie>']], NFCE))],
  ['B25-30', 'complementar sem referência', nota([['<finNFe>1', '<finNFe>2']])],
  ['B25-40', 'complementar com duas referências', nota([['<finNFe>1', '<finNFe>2'], ref(chave(), chave({ nNF: '000000457' }))])],
  ['B25-50', 'complementar referenciando outro emitente', nota([['<finNFe>1', '<finNFe>2'], ref(chave({ doc: '11444777000161' }))])],
  ['B25-60', 'complementar referenciando outra UF', nota([['<finNFe>1', '<finNFe>2'], ref(chave({ uf: '33' }))])],
  ['B25-65', 'crédito presumido ZFM com referência', credito('02', [ref(chave())])],
  ['B25-70', 'devolução sem documento referenciado', nota([['<finNFe>1', '<finNFe>4'], ['<CFOP>5102', '<CFOP>5202']])],
  ['B25-80', 'nota de débito com ICMS', nota([['<finNFe>1</finNFe>', '<finNFe>6</finNFe><tpNFDebito>04</tpNFDebito>']])],
  ['B25-90', 'item sem ICMS nem ISSQN', nota([[ICMS, '']])],
  ['B25-100', 'crédito referenciando NFC-e', credito('01', [ref(chave({ mod: '65' }))])],
  ['B25-110', 'crédito de saída', nota([['<tpNF>0', '<tpNF>1']], credito('04', [ref(chave())]))],
  ['B25-120', 'débito de entrada', debito('04', [['<tpNF>1', '<tpNF>0']])],
  ['B25.1-10', 'tipo de débito em nota normal', nota([['<finNFe>1</finNFe>', '<finNFe>1</finNFe><tpNFDebito>04</tpNFDebito>']])],
  ['B25.1-20', 'débito sem tipo', nota([['<finNFe>1', '<finNFe>6'], [ICMS, '']])],
  ['B25.2-10', 'tipo de crédito em nota normal', nota([['<finNFe>1</finNFe>', '<finNFe>1</finNFe><tpNFCredito>04</tpNFCredito>']])],
  ['B25.2-20', 'crédito sem tipo', nota([['<finNFe>1', '<finNFe>5'], ['<tpNF>1', '<tpNF>0']])],
  ['B25.2-30', 'crédito presumido ZFM antes de 2029', credito('02')],
  ['B25.2-40', 'crédito de retorno de saída', nota([['<tpNF>0', '<tpNF>1']], credito('03', [ref(chave())]))],
  ['B25b-60', 'município do IBS em venda presencial comum', nota([['</cMunFG>', '</cMunFG><cMunFGIBS>3550308</cMunFGIBS>']], NFCE)],
  ['B25b-70', 'venda fora do estabelecimento sem município do IBS', nota([['<indPres>1', '<indPres>5']], NFCE)],
  ['B25d-10', 'NFC-e com cIndOp', nota([['<indIntermed>0</indIntermed>', '<indIntermed>0</indIntermed><cIndOp>010101</cIndOp>']], NFCE)],
  ['B25d-30', 'cIndOp de retirada sem local de retirada', nota([['<indIntermed>0</indIntermed>', '<indIntermed>0</indIntermed><cIndOp>010104</cIndOp>']])],
  ['B26-24', 'PAA fora da faixa de série', comChave(nota([['<procEmi>0', '<procEmi>4'], ['<serie>1</serie>', '<serie>1</serie>']]))],
  ['C02a-14', 'pessoa física fora da série avulsa', comChave(nota([['<CNPJ>11222333000181</CNPJ>', '<CPF>12345678909</CPF>'], ['<serie>1</serie>', '<serie>920</serie>']]))],
  ['UB14-60', 'cClassTrib de estorno por perda em nota normal', nota([['<CST>000</CST><cClassTrib>000001', '<CST>410</CST><cClassTrib>410030']])],
]

for (const [regra, descricao, xml] of casos) {
  test(`${regra}: ${descricao}`, () => {
    const r = acusadas(xml)
    assert.ok(r.includes(regra), `esperava ${regra}; veio ${r.join(', ') || 'nada'}`)
  })
}

test('notas de crédito e débito corretas não acusam as regras de finalidade', () => {
  const ok = credito('04', [ref(chave())])
  const r = acusadas(ok).filter((id) => id.startsWith('B25'))
  assert.deepEqual(r, [])
  assert.deepEqual(acusadas(debito('04')).filter((id) => id.startsWith('B25')), [])
})
