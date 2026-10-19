// Todas as regras de negócio implementadas, na ordem em que o MOC as lista.

import apoio from './apoio.js'
import assinatura from './assinatura.js'
import finais from './finais.js'
import finalidade from './finalidade.js'
import ibscbs from './ibscbs.js'
import ide from './ide.js'
import ie from './ie.js'
import partes from './partes.js'
import produtos from './produtos.js'
import totais from './totais.js'
import tributos from './tributos.js'

export const regras = [...assinatura, ...ide, ...finalidade, ...partes, ...ie, ...produtos, ...tributos, ...ibscbs, ...totais, ...finais, ...apoio]
