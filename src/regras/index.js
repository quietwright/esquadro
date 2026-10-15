// Todas as regras de negócio implementadas, na ordem em que o MOC as lista.

import ide from './ide.js'
import partes from './partes.js'
import produtos from './produtos.js'

export const regras = [...ide, ...partes, ...produtos]
