import assert from 'node:assert/strict'
import { test } from 'node:test'
import tabelas from '../src/tabelas.js'
import { NFCE, NFE_55, acusadas, nota } from './ajuda.js'

const ITEM = /<IBSCBS>.*<\/IBSCBS>/.exec(NFE_55)[0]
const TOTAL = /<IBSCBSTot>.*<\/IBSCBSTot>/.exec(NFE_55)[0]
const GIBSUF = '<gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>0.10</vIBSUF></gIBSUF>'
const item = (de, para, base = NFE_55) => nota([[de, para]], base)
const ibscbs = (conteudo, base = NFE_55) => nota([[ITEM, `<IBSCBS>${conteudo}</IBSCBS>`]], base)
const comCst = (cst, cClassTrib, base = NFE_55) => item('<CST>000</CST><cClassTrib>000001</cClassTrib>', `<CST>${cst}</CST><cClassTrib>${cClassTrib}</cClassTrib>`, base)
const GRUPO = /<gIBSCBS>.*<\/gIBSCBS>/.exec(NFE_55)[0]
const depoisDoGrupo = (xml, base = NFE_55) => item('</gIBSCBS>', `</gIBSCBS>${xml}`, base)

// Classificações tiradas da tabela oficial, para os testes não dependerem de códigos fixos.
const classDoCst = (cst) => Object.entries(tabelas.cclasstrib).find(([, c]) => c.cst === cst)?.[0]
const C200 = classDoCst('200')
const SEM_NFE = Object.entries(tabelas.cclasstrib).find(([, c]) => !c.nfe)
const MONO = (padrao = '1.00') =>
  `<CST>620</CST><cClassTrib>${classDoCst('620')}</cClassTrib><gIBSCBSMono><gIBSMonoAdRem><gMonoPadrao><qBCMono>10.0000</qBCMono><adRemIBS>0.1000</adRemIBS><vIBSMono>${padrao}</vIBSMono></gMonoPadrao></gIBSMonoAdRem>` +
  '<vTotIBSMonoItem>1.00</vTotIBSMonoItem><vTotCBSMonoItem>0.00</vTotCBSMonoItem></gIBSCBSMono>'

const casos = [
  ['UB12-10', 'item sem IBSCBS em homologação, regime normal, depois de 01/07/2026', nota([[ITEM, ''], [TOTAL, '']])],
  ['UB12-11', 'emitente sem IE e item sem IBSCBS', nota([[ITEM, ''], [TOTAL, ''], ['<IE>110042490114</IE>', '']])],
  ['UB13-10', 'CST inexistente', comCst('999', '000001')],
  ['UB13-20', 'CST 410 com gIBSCBS', comCst('410', classDoCst('410'))],
  ['UB13-30', 'CST 000 sem gIBSCBS', ibscbs('<CST>000</CST><cClassTrib>000001</cClassTrib>')],
  ['UB13-39', 'CST 000 com grupo monofásico', ibscbs(MONO().replace(/<CST>620<\/CST><cClassTrib>\d+<\/cClassTrib>/, '<CST>000</CST><cClassTrib>000001</cClassTrib>'))],
  ['UB14-10', 'cClassTrib inexistente', comCst('000', '999999')],
  ['UB14-20', 'cClassTrib de outro CST', comCst('000', C200)],
  ['UB14-25', 'cClassTrib que não vale na NF-e', comCst(SEM_NFE[1].cst, SEM_NFE[0])],
  ['UB14-70', 'nota de débito de transferência com cClassTrib comum', item('<finNFe>1</finNFe>', '<finNFe>6</finNFe><tpNFDebito>01</tpNFDebito>')],
  ['UB18-10', 'IBS da UF de 0,2% em 2026', item('<pIBSUF>0.1000', '<pIBSUF>0.2000')],
  ['UB37-10', 'IBS municipal de 0,1% em 2026', item('<pIBSMun>0.0000', '<pIBSMun>0.1000')],
  ['UB56-10', 'CBS de 0,8% em 2026', item('<pCBS>0.9000', '<pCBS>0.8000')],
  ['UB22-10', 'diferimento em CST que não admite', item(GIBSUF, '<gIBSUF><pIBSUF>0.1000</pIBSUF><gDif><pDif>10.0000</pDif><vDif>0.01</vDif></gDif><vIBSUF>0.09</vIBSUF></gIBSUF>')],
  ['UB23-10', 'valor do diferimento errado', item(GIBSUF, '<gIBSUF><pIBSUF>0.1000</pIBSUF><gDif><pDif>10.0000</pDif><vDif>0.05</vDif></gDif><vIBSUF>0.05</vIBSUF></gIBSUF>')],
  ['UB24-10', 'devolução no IBS da UF', item(GIBSUF, '<gIBSUF><pIBSUF>0.1000</pIBSUF><gDevTrib><vDevTrib>0.00</vDevTrib></gDevTrib><vIBSUF>0.10</vIBSUF></gIBSUF>')],
  ['UB26-10', 'redução em CST 000', item(GIBSUF, '<gIBSUF><pIBSUF>0.1000</pIBSUF><gRed><pRedAliq>50.0000</pRedAliq><pAliqEfet>0.0500</pAliqEfet></gRed><vIBSUF>0.05</vIBSUF></gIBSUF>')],
  ['UB26-20', 'CST 200 sem redução', comCst('200', C200)],
  ['UB28-10', 'alíquota efetiva errada', comCst('200', C200, item(GIBSUF, '<gIBSUF><pIBSUF>0.1000</pIBSUF><gRed><pRedAliq>50.0000</pRedAliq><pAliqEfet>0.0600</pAliqEfet></gRed><vIBSUF>0.06</vIBSUF></gIBSUF>'))],
  ['UB35-10', 'valor do IBS da UF errado', item('<vIBSUF>0.10</vIBSUF></gIBSUF><gIBSMun>', '<vIBSUF>0.20</vIBSUF></gIBSUF><gIBSMun>')],
  ['UB54a-10', 'vIBS diferente da soma', item('<vIBS>0.10</vIBS><gCBS>', '<vIBS>0.20</vIBS><gCBS>')],
  ['UB67-10', 'valor da CBS errado', item('<vCBS>0.90</vCBS></gCBS></gIBSCBS>', '<vCBS>1.00</vCBS></gCBS></gIBSCBS>')],
  ['UB68-11', 'tributação regular em cClassTrib que não admite', item('</gCBS></gIBSCBS>', '</gCBS><gTribRegular><CSTReg>000</CSTReg><cClassTribReg>000001</cClassTribReg><pAliqEfetRegIBSUF>0.1000</pAliqEfetRegIBSUF><vTribRegIBSUF>0.10</vTribRegIBSUF><pAliqEfetRegIBSMun>0.0000</pAliqEfetRegIBSMun><vTribRegIBSMun>0.00</vTribRegIBSMun><pAliqEfetRegCBS>0.9000</pAliqEfetRegCBS><vTribRegCBS>0.90</vTribRegCBS></gTribRegular></gIBSCBS>')],
  ['UB72-10', 'tributo regular da UF errado', item('</gCBS></gIBSCBS>', '</gCBS><gTribRegular><CSTReg>000</CSTReg><cClassTribReg>000001</cClassTribReg><pAliqEfetRegIBSUF>0.1000</pAliqEfetRegIBSUF><vTribRegIBSUF>0.50</vTribRegIBSUF><pAliqEfetRegIBSMun>0.0000</pAliqEfetRegIBSMun><vTribRegIBSMun>0.00</vTribRegIBSMun><pAliqEfetRegCBS>0.9000</pAliqEfetRegCBS><vTribRegCBS>0.90</vTribRegCBS></gTribRegular></gIBSCBS>')],
  ['UB82a-30', 'composição de compra governamental sem compra governamental', item('</gCBS></gIBSCBS>', '</gCBS><gTribCompraGov><pAliqIBSUF>0.1000</pAliqIBSUF><vTribIBSUF>0.10</vTribIBSUF><pAliqIBSMun>0.0000</pAliqIBSMun><vTribIBSMun>0.00</vTribIBSMun><pAliqCBS>0.9000</pAliqCBS><vTribCBS>0.90</vTribCBS></gTribCompraGov></gIBSCBS>')],
  ['UB85a-10', 'monofásico Ad Rem do IBS em 2026', ibscbs(MONO())],
  ['UB86c-10', 'IBS monofásico Ad Rem errado', ibscbs(MONO('2.00'))],
  ['UB106-30', 'transferência de crédito em nota normal', ibscbs(`<CST>800</CST><cClassTrib>${classDoCst('800')}</cClassTrib><gTransfCred><vIBS>1.00</vIBS><vCBS>1.00</vCBS></gTransfCred>`)],
  ['UB106-40', 'transferência de crédito zerada', ibscbs(`<CST>800</CST><cClassTrib>${classDoCst('800')}</cClassTrib><gTransfCred><vIBS>0.00</vIBS><vCBS>0.00</vCBS></gTransfCred>`)],
  ['UB112-30', 'ajuste de competência zerado', ibscbs(`<CST>810</CST><cClassTrib>${classDoCst('810')}</cClassTrib><gAjusteCompet><competApur>2026-09</competApur><vIBS>0.00</vIBS><vCBS>0.00</vCBS></gAjusteCompet>`)],
  ['UB116-30', 'estorno zerado', depoisDoGrupo('<gEstornoCred><vIBSEstCred>0.00</vIBSEstCred><vCBSEstCred>0.00</vCBSEstCred></gEstornoCred>')],
  ['UB120-10', 'crédito presumido em NFC-e', depoisDoGrupo('<gCredPresOper><vBCCredPres>100.00</vBCCredPres><cCredPres>01</cCredPres></gCredPresOper>', NFCE)],
  ['UB122-10', 'código de crédito presumido inexistente', depoisDoGrupo('<gCredPresOper><vBCCredPres>100.00</vBCCredPres><cCredPres>99</cCredPres></gCredPresOper>')],
  ['UB123-20', 'crédito presumido sem o grupo do IBS', depoisDoGrupo('<gCredPresOper><vBCCredPres>100.00</vBCCredPres><cCredPres>01</cCredPres></gCredPresOper>')],
  ['UB131-10', 'crédito presumido ZFM em NFC-e', depoisDoGrupo('<gCredPresIBSZFM><competApur>2026-09</competApur><tpCredPresIBSZFM>1</tpCredPresIBSZFM><vCredPresIBSZFM>1.00</vCredPresIBSZFM></gCredPresIBSZFM>', NFCE)],
  ['UB131-50', 'nota de crédito ZFM sem o grupo', item('<finNFe>1</finNFe>', '<finNFe>5</finNFe><tpNFCredito>02</tpNFCredito>')],
  ['UB132-10', 'competência futura', depoisDoGrupo('<gCredPresIBSZFM><competApur>2027-01</competApur><tpCredPresIBSZFM>1</tpCredPresIBSZFM><vCredPresIBSZFM>1.00</vCredPresIBSZFM></gCredPresIBSZFM>')],
]

for (const [regra, descricao, xml] of casos) {
  test(`${regra}: ${descricao}`, () => {
    const r = acusadas(xml)
    assert.ok(r.includes(regra), `esperava ${regra}; veio ${r.join(', ') || 'nada'}`)
  })
}

test('UB12-10 não vale em produção nem para o Simples Nacional (datas riscadas na NT 2025.002 v1.52)', () => {
  const sem = nota([[ITEM, ''], [TOTAL, '']])
  assert.ok(!acusadas(nota([['<tpAmb>2', '<tpAmb>1']], sem)).includes('UB12-10'))
  assert.ok(!acusadas(nota([['<CRT>3', '<CRT>1']], sem)).includes('UB12-10'))
})

test('a fixture com IBS/CBS de 2026 não acusa nada do grupo UB', () => {
  assert.deepEqual(acusadas(NFE_55).filter((r) => r.startsWith('UB')), [])
  assert.ok(GRUPO.length > 0)
})
