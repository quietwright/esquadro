// Gera COBERTURA.md: o que o esquadro confere, regra por regra, e por que o resto fica de fora.

import { writeFileSync } from 'node:fs'
import regrasDoCatalogo from '../catalogo/regras.json' with { type: 'json' }
import { regras } from '../src/regras/index.js'

// Regras estruturais aplicadas em src/index.js, fora da lista de regras de negócio.
const ESTRUTURAIS = ['B01', 'B02', 'B06', 'D01', 'D01a', 'D01b', 'D01d', 'D01e', 'D02', 'D03']
const implementadas = new Set([...regras.map((r) => r.id), ...ESTRUTURAIS])

// Motivo de cada regra que não é conferida, em ordem de prioridade.
const MOTIVOS = [
  [
    'banco',
    'Consulta bases da SEFAZ',
    'Cadastro de contribuintes, notas já autorizadas, eventos, CSC. Só o autorizador tem esses dados.',
    (r) => r.consultaBaseSefaz || /Acessar (BD|Cadastro)/i.test(r.regra) || /^(BB05-1[89]0|BB05-200|C21-20|BA10-[2-5]0)$/.test(r.id),
  ],
  ['outro', 'Outro serviço', 'Regras de eventos e da consulta de GTIN que aparecem nas tabelas de autorização das NTs.', (r) => /^(D0[456]|G04e|G06|G08|P10-\d+)$/.test(r.id)],
  [
    'schema',
    'Coberta pelo schema',
    'A própria NT diz que o schema XML faz a verificação; o esquadro acusa como falha de schema (D01, cStat 225).',
    (r) => /O Schema XML faz esta verifica|Validação realizada pelo Schema/i.test(r.regra + r.mensagem) && !/vers[ãa]o .?100/i.test(r.regra),
  ],
  [
    'campos',
    'Campos fora do schema 010f',
    'Regras de campos que ainda não existem no pacote de schemas vigente (010f). Entram quando o pacote que os cria for publicado.',
    (r) => /^(NB01-\d+|I11c-\d+|W01a-\d+|YC0\d-\d+)$/.test(r.id),
  ],
  [
    'ambiente',
    'Ambiente de transmissão',
    'Certificado de transmissão, envelope SOAP, lote, webservice, UF ou ambiente de destino, SVC, PAA. Dependem de como e para onde a nota é enviada.',
    (r) => /^(A0\d|B0[0345]|B00|B02-\d+|B06-\d+|B22-[2-7]0|B24-10|C12-10|C17-11|GAP|C02-20|C02a-30|B26-22|B26-40|ZG01-10|ZG02-[2-4]\d|B25b-30|GAP03a-\d)$/.test(r.id),
  ],
  ['assinatura', 'Cadeia do certificado e assinaturas fora da NF-e', 'Cadeia até a raiz ICP-Brasil e revogação (dependem do cadastro de ACs e das LCRs da SEFAZ), assinatura RSA do PAA e assinatura do QR Code de contingência (o algoritmo está no Manual do DANFE NFC-e, que o esquadro ainda não baixa).', (r) => /^(E0\d|F0\d|ZG04-10|ZX02-338)$/.test(r.id)],
  ['futura', 'Implementação futura', 'A própria NT diz que a regra ainda não vale.', (r) => /implementa[çc][ãa]o futura/i.test(r.regra) || r.id === 'NA17-10'],
  ['suframa', 'Inscrição SUFRAMA', 'O MOC pede o dígito verificador, mas não diz o algoritmo, e a SUFRAMA não o publica junto das regras.', (r) => /^(C22-20|E18-20)$/.test(r.id)],
  [
    'uf',
    'Parâmetro da UF',
    'Limites de valor e opções que cada SEFAZ configura e não publica em tabela nacional.',
    (r) => /parametriz[áa]vel|valor limite|restrita a UF|UF que não (aceita|permite)|não permitid[oa]s? para a UF|para a UF\b|Em UF que/i.test(r.regra) || /^(I05g-10|N12a-30|YA04a-20|C21-10|I08-19[48]|BB02-10)$/.test(r.id),
  ],
  [
    'qrcode',
    'QR Code com segredo do contribuinte ou versão antiga',
    'Hash da versão 2 (usa o CSC, segredo do emitente) e parâmetros da versão 100, extinta em 2018.',
    (r) => /^ZX02-(2[0-9]|[3-9]\d|1[01]\d|120|2[89]\d|3[0-2]\d)$/.test(r.id) && !implementadas.has(r.id),
  ],
  [
    'tabela',
    'Tabela ainda não incorporada',
    'Dependem de tabela que o esquadro ainda não traz: NCM, enquadramento do IPI, cBenef por UF, unidades de medida, URLs do QR Code por UF, índice de biocombustível, indicadores de CST mais novos.',
    (r) => /^(I05-20|I05-30|I05c-10|I05h-10|I09-10|I13-10|I14-10|O06-10|N12-8[56]|N12-9[48]|N14a-20|B25d-20|YC05-10|Z13-10|ZX02-20|ZX03-20|X04-10|UB14-[35]0|UB66a-20|UB2[7]-10|UB46-10|UB65-10|UB13-4[045]|UB112-[12]0|UB131-[23]0|UB56-20|UB8[89]\w?-10|UB9[34]\w-10|UB9[89]\w-10|UB10[34]\w-10|K01-10|LB01-20|ZF0[25]-\d+|LA11-10|N23b-20|N12-90)$/.test(r.id),
  ],
  ['formato', 'Formato de número de documento', 'DI, drawback, registro de exportação e RECOPI: o MOC remete a regras de formação que não estão nos documentos baixados.', (r) => /^(I19-10|I29a-20|I51-20|I53-10|LB01-30)$/.test(r.id)],
  ['pendente', 'Pendente', 'Ainda não implementadas.', () => true],
]

const grupos = new Map(MOTIVOS.map(([chave, titulo, explicacao]) => [chave, { titulo, explicacao, regras: [] }]))
let conferidas = 0
for (const r of regrasDoCatalogo) {
  if (implementadas.has(r.id)) {
    conferidas++
    continue
  }
  const [chave] = MOTIVOS.find(([, , , teste]) => teste(r))
  grupos.get(chave).regras.push(r)
}

const total = regrasDoCatalogo.length
const pct = (n) => `${((100 * n) / total).toFixed(0)}%`
const linhas = [
  '# Cobertura',
  '',
  `O catálogo tem **${total} regras** de validação da autorização de NF-e e NFC-e, tiradas do MOC 7.0 e das Notas Técnicas vigentes (veja \`catalogo/fontes.json\`). O esquadro confere **${conferidas}** delas (${pct(conferidas)}).`,
  '',
  'As demais estão abaixo, agrupadas pelo motivo de ficarem de fora. Este arquivo é gerado por `npm run cobertura` a partir do catálogo e do código: não há número escrito à mão.',
  '',
  '| | Regras | |',
  '|---|---:|---:|',
  `| Conferidas pelo esquadro | ${conferidas} | ${pct(conferidas)} |`,
  ...[...grupos.values()].filter((g) => g.regras.length).map((g) => `| ${g.titulo} | ${g.regras.length} | ${pct(g.regras.length)} |`),
  `| **Total** | **${total}** | |`,
  '',
]
for (const g of grupos.values()) {
  if (!g.regras.length) continue
  linhas.push(`## ${g.titulo} (${g.regras.length})`, '', g.explicacao, '', '| Regra | cStat | Mensagem |', '|---|---:|---|')
  for (const r of g.regras) linhas.push(`| ${r.id} | ${r.cStat} | ${r.mensagem.replace(/\|/g, '\\|').replace(/^Rejeição:\s*/, '')} |`)
  linhas.push('')
}
writeFileSync('COBERTURA.md', linhas.join('\n'))
console.error(`COBERTURA.md: ${conferidas}/${total} conferidas; ${[...grupos.values()].map((g) => `${g.titulo}: ${g.regras.length}`).join('; ')}`)
