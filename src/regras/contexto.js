// O que toda regra recebe: os grupos da NF-e já localizados e alguns fatos derivados que
// várias regras do MOC usam com o mesmo nome.

import { atributo } from '../xml.js'
import { el, todos, val } from '../consulta.js'

export function contexto(nfe, opcoes = {}) {
  const inf = el(nfe, 'infNFe')
  const ide = el(inf, 'ide')
  const modelo = val(ide, 'mod')
  const id = atributo(inf, 'Id') ?? ''
  return {
    nfe,
    inf,
    ide,
    emit: el(inf, 'emit'),
    dest: el(inf, 'dest'),
    det: todos(inf, 'det'),
    total: el(inf, 'total'),
    transp: el(inf, 'transp'),
    cobr: el(inf, 'cobr'),
    pag: el(inf, 'pag'),
    infAdic: el(inf, 'infAdic'),
    modelo,
    chave: id.startsWith('NFe') ? id.slice(3) : null,
    // "NFC-e ou NF-e com DANFE Simplificado Tipo 2 (tpImp=6)": a NT 2026.002 estendeu às duas
    // as restrições que antes eram só da NFC-e.
    simplificada: modelo === '65' || val(ide, 'tpImp') === '6',
    // Horário de recebimento na SEFAZ que as regras de data simulam.
    agora: opcoes.agora ?? new Date(),
    opcoes,
  }
}
