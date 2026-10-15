import assert from 'node:assert/strict'
import { test } from 'node:test'
import { NFCE, NFE_55, acusadas, nota } from './ajuda.js'

const ICMS = /<ICMS>.*<\/ICMS>/.exec(NFE_55)[0]
const tot = (de, para, base = NFE_55) => nota([[`<${de}`, `<${para}`]], base)

// Nota de serviço coerente: ISSQN no item e ISSQNtot no total.
const ISSQN = '<ISSQN><vBC>100.00</vBC><vAliq>5.0000</vAliq><vISSQN>5.00</vISSQN><cMunFG>3550308</cMunFG><cListServ>01.01</cListServ><indISS>1</indISS><indIncentivo>2</indIncentivo></ISSQN>'
const SERVICO = nota([
  [ICMS, ISSQN],
  ['<CFOP>5102', '<CFOP>5933'],
  ['<vBC>100.00</vBC><vICMS>18.00</vICMS>', '<vBC>0.00</vBC><vICMS>0.00</vICMS>'],
  ['<vProd>100.00</vProd><vFrete>', '<vProd>0.00</vProd><vFrete>'],
  ['</ICMSTot>', '</ICMSTot><ISSQNtot><vServ>100.00</vServ><vBC>100.00</vBC><vISS>5.00</vISS><vPIS>1.65</vPIS><vCOFINS>7.60</vCOFINS><dCompet>2026-10-15</dCompet></ISSQNtot>'],
  ['<vPIS>1.65</vPIS><vCOFINS>7.60</vCOFINS><vOutro>', '<vPIS>0.00</vPIS><vCOFINS>0.00</vCOFINS><vOutro>'],
])

// Nota com IBS/CBS coerente entre item e total.
const IBSCBS_ITEM =
  '<IBSCBS><CST>000</CST><cClassTrib>000001</cClassTrib><gIBSCBS><vBC>100.00</vBC>' +
  '<gIBSUF><pIBSUF>0.1000</pIBSUF><vIBSUF>0.10</vIBSUF></gIBSUF><gIBSMun><pIBSMun>0.0000</pIBSMun><vIBSMun>0.00</vIBSMun></gIBSMun><vIBS>0.10</vIBS>' +
  '<gCBS><pCBS>0.9000</pCBS><vCBS>0.90</vCBS></gCBS></gIBSCBS></IBSCBS>'
const IBSCBS_TOTAL =
  '<IBSCBSTot><vBCIBSCBS>100.00</vBCIBSCBS><gIBS><gIBSUF><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSUF>0.10</vIBSUF></gIBSUF>' +
  '<gIBSMun><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vIBSMun>0.00</vIBSMun></gIBSMun><vIBS>0.10</vIBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gIBS>' +
  '<gCBS><vDif>0.00</vDif><vDevTrib>0.00</vDevTrib><vCBS>0.90</vCBS><vCredPres>0.00</vCredPres><vCredPresCondSus>0.00</vCredPresCondSus></gCBS></IBSCBSTot>'
const comItem = (item, base = SEM_IBSCBS) => nota([['</COFINS>', `</COFINS>${item}`]], base)
// A fixture já traz IBS/CBS coerente entre item e total.
const RTC = NFE_55
const SEM_IBSCBS = nota([[IBSCBS_ITEM, ''], [IBSCBS_TOTAL, '']])
const rtc = (de, para) => nota([[de, para]], RTC)

const MONO_ITEM = (campo) =>
  '<IBSCBS><CST>620</CST><cClassTrib>620001</cClassTrib><gIBSCBSMono>' +
  '<gIBSMonoAdRem><gMonoPadrao><qBCMono>10.0000</qBCMono><adRemIBS>0.1000</adRemIBS><vIBSMono>1.00</vIBSMono></gMonoPadrao>' +
  '<gMonoReten><qBCMonoReten>10.0000</qBCMonoReten><adRemIBSReten>0.1000</adRemIBSReten><vIBSMonoReten>1.00</vIBSMonoReten></gMonoReten><gMonoRet><vIBSMonoRet>1.00</vIBSMonoRet></gMonoRet></gIBSMonoAdRem>' +
  '<gCBSMonoAdRem><gMonoPadrao><qBCMono>10.0000</qBCMono><adRemCBS>0.1000</adRemCBS><vCBSMono>1.00</vCBSMono></gMonoPadrao>' +
  '<gMonoReten><qBCMonoReten>10.0000</qBCMonoReten><adRemCBSReten>0.1000</adRemCBSReten><vCBSMonoReten>1.00</vCBSMonoReten></gMonoReten><gMonoRet><vCBSMonoRet>1.00</vCBSMonoRet></gMonoRet></gCBSMonoAdRem>' +
  '<vTotIBSMonoItem>1.00</vTotIBSMonoItem><vTotCBSMonoItem>1.00</vTotCBSMonoItem></gIBSCBSMono></IBSCBS>'
const MONO = nota([
  ['</ICMSTot>', '</ICMSTot><IBSCBSTot><vBCIBSCBS>0.00</vBCIBSCBS><gMono><vIBSMono>0.00</vIBSMono><vCBSMono>0.00</vCBSMono><vIBSMonoReten>0.00</vIBSMonoReten><vCBSMonoReten>0.00</vCBSMonoReten><vIBSMonoRet>0.00</vIBSMonoRet><vCBSMonoRet>0.00</vCBSMonoRet></gMono></IBSCBSTot>'],
], comItem(MONO_ITEM()))

const ESTORNO = nota([
  ['</gIBSCBS></IBSCBS>', '</gIBSCBS><gEstornoCred><vIBSEstCred>1.00</vIBSEstCred><vCBSEstCred>1.00</vCBSEstCred></gEstornoCred></IBSCBS>'],
  ['</gCBS></IBSCBSTot>', '</gCBS><gEstornoCred><vIBSEstCred>0.00</vIBSEstCred><vCBSEstCred>0.00</vCBSEstCred></gEstornoCred></IBSCBSTot>'],
], RTC)

const nfceGrande = nota([['<vNF>100.00</vNF>', '<vNF>15000.00</vNF>']], NFCE)
const nfceComCpf = nota([['</emit>', '</emit><dest><CPF>12345678909</CPF><indIEDest>9</indIEDest></dest>']], nfceGrande)

test('notas coerentes de serviço e de IBS/CBS não acusam totais', () => {
  const totais = (xml) => acusadas(xml).filter((id) => id.startsWith('W') && id !== 'W07-10')
  assert.deepEqual(totais(SERVICO), [])
  assert.deepEqual(totais(RTC), [])
})

const casos = [
  ['W03-10', tot('vBC>100.00</vBC><vICMS>18.00', 'vBC>101.00</vBC><vICMS>18.00')],
  ['W03-20', tot('vBC>100.00</vBC><vICMS>18.00', 'vBC>250000.00</vBC><vICMS>18.00')],
  ['W04-10', tot('vICMS>18.00</vICMS', 'vICMS>19.00</vICMS')],
  ['W04a-10', tot('vICMSDeson>0.00', 'vICMSDeson>1.00')],
  ['W04b-10', tot('vFCP>0.00', 'vFCP>1.00')],
  ['W04c-10', tot('vICMSDeson>0.00</vICMSDeson', 'vICMSDeson>0.00</vICMSDeson><vFCPUFDest>1.00</vFCPUFDest')],
  ['W04e-10', tot('vICMSDeson>0.00</vICMSDeson', 'vICMSDeson>0.00</vICMSDeson><vICMSUFDest>1.00</vICMSUFDest')],
  ['W04g-10', tot('vICMSDeson>0.00</vICMSDeson', 'vICMSDeson>0.00</vICMSDeson><vICMSUFRemet>1.00</vICMSUFRemet')],
  ['W05-10', tot('vBCST>0.00', 'vBCST>1.00')],
  ['W06-10', tot('vST>0.00', 'vST>1.00')],
  ['W06a-10', tot('vFCPST>0.00', 'vFCPST>1.00')],
  ['W06b-10', tot('vFCPSTRet>0.00', 'vFCPSTRet>1.00')],
  ['W06b.1-10', tot('vFCPSTRet>0.00</vFCPSTRet', 'vFCPSTRet>0.00</vFCPSTRet><qBCMono>1.00</qBCMono')],
  ['W06c-10', tot('vFCPSTRet>0.00</vFCPSTRet', 'vFCPSTRet>0.00</vFCPSTRet><vICMSMono>1.00</vICMSMono')],
  ['W06c.1-10', tot('vFCPSTRet>0.00</vFCPSTRet', 'vFCPSTRet>0.00</vFCPSTRet><qBCMonoReten>1.00</qBCMonoReten')],
  ['W06d-10', tot('vFCPSTRet>0.00</vFCPSTRet', 'vFCPSTRet>0.00</vFCPSTRet><vICMSMonoReten>1.00</vICMSMonoReten')],
  ['W06d.1-10', tot('vFCPSTRet>0.00</vFCPSTRet', 'vFCPSTRet>0.00</vFCPSTRet><qBCMonoRet>1.00</qBCMonoRet')],
  ['W06e-10', tot('vFCPSTRet>0.00</vFCPSTRet', 'vFCPSTRet>0.00</vFCPSTRet><vICMSMonoRet>1.00</vICMSMonoRet')],
  ['W07-10', tot('vProd>100.00</vProd><vFrete', 'vProd>101.00</vProd><vFrete')],
  ['W08-10', tot('vFrete>0.00', 'vFrete>1.00')],
  ['W09-10', tot('vSeg>0.00', 'vSeg>1.00')],
  ['W10-10', tot('vDesc>0.00', 'vDesc>1.00')],
  ['W11-10', tot('vII>0.00', 'vII>1.00')],
  ['W12-10', tot('vIPI>0.00', 'vIPI>1.00')],
  ['W12a-10', tot('vIPIDevol>0.00', 'vIPIDevol>1.00')],
  ['W13-10', tot('vPIS>1.65</vPIS><vCOFINS', 'vPIS>1.66</vPIS><vCOFINS')],
  ['W14-10', tot('vCOFINS>7.60</vCOFINS><vOutro', 'vCOFINS>7.61</vCOFINS><vOutro')],
  ['W15-10', tot('vOutro>0.00', 'vOutro>1.00')],
  ['W16-10', tot('vNF>100.00', 'vNF>101.00')],
  ['W16-30', nota([['<vNF>100.00</vNF>', '<vNF>250000.00</vNF>']], NFCE)],
  ['W16-40', nfceGrande],
  ['W16-50', nfceComCpf],
  ['W16-60', nfceComCpf],
  ['W16a-10', tot('vNF>100.00</vNF', 'vNF>100.00</vNF><vTotTrib>1.00</vTotTrib')],
  ['W18-10', tot('vServ>100.00', 'vServ>101.00', SERVICO)],
  ['W19-10', nota([['<ISSQNtot><vServ>100.00</vServ><vBC>100.00', '<ISSQNtot><vServ>100.00</vServ><vBC>101.00']], SERVICO)],
  ['W20-10', tot('vISS>5.00', 'vISS>6.00', SERVICO)],
  ['W21-10', nota([['<vPIS>1.65</vPIS><vCOFINS>7.60</vCOFINS><dCompet>', '<vPIS>1.66</vPIS><vCOFINS>7.60</vCOFINS><dCompet>']], SERVICO)],
  ['W22-10', nota([['<vCOFINS>7.60</vCOFINS><dCompet>', '<vCOFINS>7.61</vCOFINS><dCompet>']], SERVICO)],
  ['W22b-10', tot('/dCompet', '/dCompet><vDeducao>1.00</vDeducao', SERVICO)],
  ['W22c-10', tot('/dCompet', '/dCompet><vOutro>1.00</vOutro', SERVICO)],
  ['W22d-10', tot('/dCompet', '/dCompet><vDescIncond>1.00</vDescIncond', SERVICO)],
  ['W22e-10', tot('/dCompet', '/dCompet><vDescCond>1.00</vDescCond', SERVICO)],
  ['W22f-10', tot('/dCompet', '/dCompet><vISSRet>1.00</vISSRet', SERVICO)],
  ['W31-10', tot('/ICMSTot', '/ICMSTot><ISTot><vIS>1.00</vIS></ISTot')],
  ['W31-20', nota([['</COFINS>', '</COFINS><IS><CSTIS>000</CSTIS><cClassTribIS>000001</cClassTribIS></IS>']])],
  ['W34-10', nota([[IBSCBS_ITEM, '']])],
  ['W34-20', nota([[IBSCBS_TOTAL, '']])],
  ['W35-10', rtc('<vBCIBSCBS>100.00', '<vBCIBSCBS>101.00')],
  ['W38-10', rtc('<gIBSUF><vDif>0.00', '<gIBSUF><vDif>1.00')],
  ['W39-10', rtc('<vDevTrib>0.00</vDevTrib><vIBSUF>', '<vDevTrib>1.00</vDevTrib><vIBSUF>')],
  ['W41-10', rtc('<vIBSUF>0.10</vIBSUF></gIBSUF><gIBSMun><vDif>', '<vIBSUF>0.20</vIBSUF></gIBSUF><gIBSMun><vDif>')],
  ['W43-10', rtc('<gIBSMun><vDif>0.00', '<gIBSMun><vDif>1.00')],
  ['W44-10', rtc('<vDevTrib>0.00</vDevTrib><vIBSMun>', '<vDevTrib>1.00</vDevTrib><vIBSMun>')],
  ['W46-10', rtc('<vIBSMun>0.00</vIBSMun></gIBSMun><vIBS>0.10</vIBS><vCredPres>', '<vIBSMun>1.00</vIBSMun></gIBSMun><vIBS>0.10</vIBS><vCredPres>')],
  ['W47-10', rtc('<vIBS>0.10</vIBS><vCredPres>', '<vIBS>0.20</vIBS><vCredPres>')],
  ['W48-10', rtc('<vIBS>0.10</vIBS><vCredPres>0.00', '<vIBS>0.10</vIBS><vCredPres>1.00')],
  ['W53-10', rtc('<gCBS><vDif>0.00', '<gCBS><vDif>1.00')],
  ['W54-10', rtc('<vDevTrib>0.00</vDevTrib><vCBS>', '<vDevTrib>1.00</vDevTrib><vCBS>')],
  ['W56-10', rtc('<vCBS>0.90</vCBS><vCredPres>', '<vCBS>1.90</vCBS><vCredPres>')],
  ['W56a-10', rtc('<vCBS>0.90</vCBS><vCredPres>0.00', '<vCBS>0.90</vCBS><vCredPres>1.00')],
  ['W58-10', MONO],
  ['W59-10', MONO],
  ['W59a-10', MONO],
  ['W59b-10', MONO],
  ['W59c-10', MONO],
  ['W59d-10', MONO],
  ['W59f-10', ESTORNO],
  ['W59g-10', ESTORNO],
]

for (const [regra, xml] of casos) {
  test(`${regra} acusa total divergente`, () => {
    const r = acusadas(xml)
    assert.ok(r.includes(regra), `esperava ${regra}; veio ${r.join(', ') || 'nada'}`)
  })
}

test('W16-10: tolera R$ 0,50 e aceita vNF sem subtrair o ICMS desonerado', () => {
  assert.ok(!acusadas(tot('vNF>100.00', 'vNF>100.40')).includes('W16-10'))
  const desonerado = nota([
    ['<ICMS00><orig>0</orig><CST>00</CST><modBC>3</modBC><vBC>100.00</vBC><pICMS>18.00</pICMS><vICMS>18.00</vICMS></ICMS00>', '<ICMS40><orig>0</orig><CST>40</CST><vICMSDeson>10.00</vICMSDeson><motDesICMS>9</motDesICMS></ICMS40>'],
    ['<vBC>100.00</vBC><vICMS>18.00</vICMS><vICMSDeson>0.00', '<vBC>0.00</vBC><vICMS>0.00</vICMS><vICMSDeson>10.00'],
  ])
  assert.ok(!acusadas(desonerado).includes('W16-10'))
  assert.ok(!acusadas(nota([['<vNF>100.00', '<vNF>90.00']], desonerado)).includes('W16-10'))
})

test('W04-10 não soma ICMS de CST 40, 41 e 50', () => {
  assert.ok(!acusadas(nota([[ICMS, '<ICMS><ICMS40><orig>0</orig><CST>41</CST></ICMS40></ICMS>'], ['<vICMS>18.00</vICMS><vICMSDeson>', '<vICMS>0.00</vICMS><vICMSDeson>']])).includes('W04-10'))
})
