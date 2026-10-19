import assert from 'node:assert/strict'
import { test } from 'node:test'
import { problemaNaIe, UFS_COM_ROTEIRO } from '../src/ie.js'
import { acusadas, nota } from './ajuda.js'

// Exemplos dos roteiros de crítica do SINTEGRA (http://www.sintegra.gov.br/insc_est.html) e, onde
// o roteiro não traz exemplo, IEs de notas autorizadas em produção que estão publicadas.
const VALIDAS = {
  AC: ['0100482300112'],
  AL: ['240000048'],
  AP: ['030123459'],
  BA: ['12345663', '61234557', '100000306'],
  CE: ['060000015'],
  ES: ['999999990'],
  GO: ['109876547'],
  MA: ['120000385'],
  MG: ['0623079040081'],
  MT: ['00130000019'],
  PA: ['159999995', '750000023'],
  PB: ['060000015'],
  PE: ['032141840', '18100100000049'],
  PI: ['012345679'],
  PR: ['1234567850'],
  RN: ['200400401', '2000400400'],
  RO: ['00000000625213'],
  RR: ['240066281', '240017556', '240034290', '240013603', '240082668', '240061536', '240073562', '240054674', '240041455', '240013407'],
  RS: ['2243658792'],
  SC: ['251040852'],
  SE: ['271234563'],
  SP: ['110042490114'],
  TO: ['29010227836'],
}

test('exemplos dos roteiros: válidos, e inválidos com o último dígito trocado', () => {
  for (const [uf, ies] of Object.entries(VALIDAS)) {
    for (const ie of ies) {
      assert.equal(problemaNaIe(ie, uf), null, `${uf} ${ie}`)
      const trocada = ie.slice(0, -1) + ((Number(ie.at(-1)) + 1) % 10)
      assert.match(problemaNaIe(trocada, uf) ?? '', /dígito verificador/, `${uf} ${trocada}`)
    }
  }
})

test('SP, produtor rural: o verificador é o 9º dígito; os 3 últimos não entram no cálculo', () => {
  // P-01100424.3/002 do roteiro, sem a letra P, que o schema da NF-e não aceita.
  assert.equal(problemaNaIe('011004243002', 'SP'), null)
  assert.equal(problemaNaIe('011004243009', 'SP'), null)
  assert.match(problemaNaIe('011004244002', 'SP'), /dígito verificador/)
})

test('todas as UFs têm roteiro', () => {
  assert.equal(UFS_COM_ROTEIRO.length, 27)
})

test('zeros à esquerda não contam (nota *2 do MOC)', () => {
  assert.equal(problemaNaIe('130000019', 'MT'), null)
  assert.equal(problemaNaIe('0012345663', 'BA'), null)
  assert.equal(problemaNaIe('625213', 'RO'), null)
})

test('tamanho: mais dígitos significativos que o formato da UF', () => {
  assert.match(problemaNaIe('1100424901140', 'SP'), /13 dígitos significativos; SP usa 12/)
  assert.match(problemaNaIe('000', 'SP'), /0 dígitos significativos/)
})

test('Goiás: resto 1 aceita 0 ou 1, porque os roteiros divergem na faixa', () => {
  // 10103105 com pesos 9 a 2: soma 45, resto 1.
  const base = '10103105'
  assert.equal(problemaNaIe(base + '0', 'GO'), null)
  assert.equal(problemaNaIe(base + '1', 'GO'), null)
})

const EMIT_IE = '<IE>110042490114</IE>'

const casos = [
  ['C17-20', 'IE do emitente com dígito errado', nota([[EMIT_IE, '<IE>110042490115</IE>']])],
  ['C18-30', 'IEST com dígito errado', nota([[EMIT_IE, `${EMIT_IE}<IEST>110042490115</IEST>`]])],
  ['E17-50', 'IE do destinatário com dígito errado', nota([['<indIEDest>9</indIEDest>', '<indIEDest>1</indIEDest><IE>110042490115</IE>']])],
  [
    'F15-10',
    'IE do local de retirada',
    nota([['</dest>', '</dest><retirada><CNPJ>11222333000181</CNPJ><xLgr>RUA A</xLgr><nro>1</nro><xBairro>CENTRO</xBairro><cMun>4106902</cMun><xMun>CURITIBA</xMun><UF>PR</UF><IE>1234567851</IE></retirada>']]),
  ],
  [
    'G15-10',
    'IE do local de entrega',
    nota([['</dest>', '</dest><entrega><CNPJ>11222333000181</CNPJ><xLgr>RUA A</xLgr><nro>1</nro><xBairro>CENTRO</xBairro><cMun>4205407</cMun><xMun>FLORIANOPOLIS</xMun><UF>SC</UF><IE>251040853</IE></entrega>']]),
  ],
  [
    'X07-20',
    'IE do transportador',
    nota([['<modFrete>9</modFrete>', '<modFrete>0</modFrete><transporta><CNPJ>11444777000161</CNPJ><xNome>TRANSPORTES TESTE LTDA</xNome><IE>0623079040082</IE><xEnder>RUA B 2</xEnder><xMun>BELO HORIZONTE</xMun><UF>MG</UF></transporta>']]),
  ],
]

for (const [regra, descricao, xml] of casos) {
  test(`${regra}: ${descricao}`, () => {
    assert.ok(acusadas(xml).includes(regra), `esperava ${regra}; veio ${acusadas(xml).join(', ') || 'nada'}`)
    const corrigida = xml.replace(/(<IE(?:ST)?>\d+)(\d)(<\/IE(?:ST)?>)(?![\s\S]*<IE)/, (todo, a, d, b) => a + ((Number(d) + 9) % 10) + b)
    assert.ok(!acusadas(corrigida).includes(regra), `${regra} acusou a IE correta`)
  })
}

test('ISENTO e UF do exterior não são conferidos', () => {
  const xml = nota([['<modFrete>9</modFrete>', '<modFrete>0</modFrete><transporta><xNome>TRANSPORTES TESTE</xNome><IE>ISENTO</IE><UF>MG</UF></transporta>']])
  assert.ok(!acusadas(xml).includes('X07-20'))
})
