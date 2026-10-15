// Todas as regras de negócio implementadas, na ordem em que o MOC as lista.

import apoio from './apoio.js'
import finais from './finais.js'
import ide from './ide.js'
import partes from './partes.js'
import produtos from './produtos.js'
import totais from './totais.js'
import tributos from './tributos.js'

export const regras = [...ide, ...partes, ...produtos, ...tributos, ...totais, ...finais, ...apoio]
