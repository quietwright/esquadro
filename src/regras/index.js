// Todas as regras de negócio implementadas, na ordem em que o MOC as lista.

import apoio from './apoio.js'
import ide from './ide.js'
import partes from './partes.js'
import produtos from './produtos.js'
import totais from './totais.js'

export const regras = [...ide, ...partes, ...produtos, ...totais, ...apoio]
