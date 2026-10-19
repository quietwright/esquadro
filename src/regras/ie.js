// Inscrição estadual inválida para a UF (tamanho, composição ou dígito verificador) em cada
// lugar da nota onde há IE. A vinculação da IE ao CNPJ e a situação no cadastro dependem da base
// da SEFAZ e ficam de fora.

import { el, todos, val } from '../consulta.js'
import { problemaNaIe } from '../ie.js'

// Confere a IE em `grupo/IE` (ou outro campo) contra a UF dada; ISENTO e UF do exterior não contam.
function conferir(grupo, uf, falhar, campo = 'IE') {
  const no = el(grupo, campo)
  const ie = val(grupo, campo)
  if (!no || !ie || ie === 'ISENTO' || !uf || uf === 'EX') return
  const problema = problemaNaIe(ie, uf)
  if (problema) falhar(no, `IE ${ie} (${uf}): ${problema}`)
}

export default [
  {
    id: 'C17-20',
    verificar({ emit }, falhar) {
      conferir(emit, val(emit, 'enderEmit/UF'), falhar)
    },
  },
  {
    id: 'C18-30',
    verificar({ inf, emit, dest, det }, falhar) {
      // A IEST é a inscrição do emitente na UF de destino; no faturamento direto de veículos
      // novos, a UF é a do local de entrega.
      const faturamentoDireto = det.some((d) => val(d, 'prod/veicProd/tpOp') === '2')
      const uf = faturamentoDireto ? val(inf, 'entrega/UF') : val(dest, 'enderDest/UF')
      conferir(emit, uf, falhar, 'IEST')
    },
  },
  {
    id: 'E17-50',
    verificar({ dest }, falhar) {
      conferir(dest, val(dest, 'enderDest/UF'), falhar)
    },
  },
  {
    id: 'F15-10',
    verificar({ inf }, falhar) {
      const retirada = el(inf, 'retirada')
      conferir(retirada, val(retirada, 'UF'), falhar)
    },
  },
  {
    id: 'G15-10',
    verificar({ inf }, falhar) {
      const entrega = el(inf, 'entrega')
      conferir(entrega, val(entrega, 'UF'), falhar)
    },
  },
  {
    id: 'X07-20',
    verificar({ transp }, falhar) {
      for (const t of todos(transp, 'transporta')) conferir(t, val(t, 'UF'), falhar)
    },
  },
]
