// Grupos BA, BB, VB, VC e X a ZX: documentos referenciados, compras governamentais,
// referência por item, transporte, cobrança, pagamento, intermediador, exportação, compras,
// responsável técnico, agropecuário e QR Code da NFC-e.

import { bandeiraVigente, cfop, meioDePagamentoVigente, municipioExiste } from '../apoio.js'
import { difere, el, num, tem, todos, val } from '../consulta.js'
import { atributo, texto } from '../xml.js'
import { CODIGO_UF } from './partes.js'
import { DIA, cnpjValido, cpfValido, diaCivil, dvChave } from './util.js'

const UFS = new Set(Object.values(CODIGO_UF))
const nItem = (d) => atributo(d, 'nItem')
const dia = ({ ide }) => diaCivil(val(ide, 'dhEmi'))
const raizCnpj = (doc) => (doc && doc.length === 14 ? doc.slice(0, 8) : doc)

/** Campos de uma chave de acesso de 44 posições. */
export function partesDaChave(chave) {
  return {
    uf: chave.slice(0, 2),
    ano: Number(chave.slice(2, 4)),
    mes: Number(chave.slice(4, 6)),
    doc: chave.slice(6, 20),
    modelo: chave.slice(20, 22),
    serie: Number(chave.slice(22, 25)),
    numero: chave.slice(25, 34),
    tpEmis: chave.slice(34, 35),
    cNF: chave.slice(35, 43),
    dv: chave.slice(43),
  }
}

// Problema de formação de uma chave referenciada, conforme a família de regras BA02/BA19/BB05.
function formacao(chave, agora, { modelos, cpfPorSerie = true }) {
  const p = partesDaChave(chave)
  const anoAtual = agora.getUTCFullYear() % 100
  if (String(dvChave(chave.slice(0, 43))) !== p.dv) return { tipo: 'dv', detalhe: `chave ${chave} com DV inválido` }
  if (!UFS.has(p.uf)) return { tipo: 'uf', detalhe: `chave ${chave} com UF ${p.uf} inválida` }
  if (p.ano < 6 || p.ano > anoAtual) return { tipo: 'ano', detalhe: `chave ${chave} com ano ${p.ano} inválido` }
  if (p.mes < 1 || p.mes > 12) return { tipo: 'mes', detalhe: `chave ${chave} com mês ${p.mes} inválido` }
  const serieCnpj = p.serie <= 909 || (p.serie >= 980 && p.serie <= 989)
  const ehCnpj = !cpfPorSerie || (p.tpEmis === '3' ? p.numero[4] === '1' : serieCnpj)
  const docValido = ehCnpj ? cnpjValido(p.doc) : cpfValido(p.doc.slice(3))
  if (!docValido) return { tipo: 'doc', detalhe: `chave ${chave} com ${ehCnpj ? 'CNPJ' : 'CPF'} inválido` }
  if (modelos && !modelos.includes(p.modelo)) return { tipo: 'modelo', detalhe: `chave ${chave} de modelo ${p.modelo}` }
  if (/^0+$/.test(p.numero)) return { tipo: 'numero', detalhe: `chave ${chave} com número zerado` }
  if (Number(`20${String(p.ano).padStart(2, '0')}${String(p.mes).padStart(2, '0')}`) > 201104 && !'12345679'.includes(p.tpEmis)) {
    return { tipo: 'tpEmis', detalhe: `chave ${chave} com tipo de emissão ${p.tpEmis} inválido` }
  }
  return null
}

// Família de regras de chave referenciada: uma regra por tipo de problema.
function regrasDeChave(ids, achar, opcoes) {
  return Object.entries(ids).map(([tipo, id]) => ({
    id,
    verificar(n, falhar) {
      for (const no of achar(n)) {
        const p = formacao(texto(no), n.agora, typeof opcoes === 'function' ? opcoes(n) : opcoes)
        if (p?.tipo === tipo) falhar(no, p.detalhe)
      }
    },
  }))
}

const refNFe = ({ ide }) => todos(ide, 'NFref/refNFe')
const refNFeSig = ({ ide }) => todos(ide, 'NFref/refNFeSig')
const refCTe = ({ ide }) => todos(ide, 'NFref/refCTe')
const refDFeAnt = ({ ide }) => todos(ide, 'gCompraGov/refDFeAnt')
const repetida = (nos) => {
  const vistos = new Set()
  return nos.find((no) => {
    const v = texto(no)
    if (vistos.has(v)) return true
    vistos.add(v)
    return false
  })
}

// Documento do transportador e das partes, para as regras X04.
const docTransp = (transp) => val(transp, 'transporta/CNPJ') ?? val(transp, 'transporta/CPF')
const docDe = (grupo) => val(grupo, 'CNPJ') ?? val(grupo, 'CPF')
const mesmaRaiz = (a, b) => a && b && raizCnpj(a) === raizCnpj(b)

// QR Code: os parâmetros vêm depois de "p=", separados por "|".
function parametrosQr(qrCode) {
  const i = qrCode.indexOf('p=')
  return i < 0 ? null : qrCode.slice(i + 2).split('|')
}

export default [
  // --- Documentos referenciados ------------------------------------------------------------
  {
    id: 'BA01-10',
    verificar({ ide, simplificada }, falhar) {
      if (simplificada && tem(ide, 'NFref')) falhar(el(ide, 'NFref'), 'documento referenciado em NFC-e ou NF-e com DANFE simplificado')
    },
  },
  ...regrasDeChave({ dv: 'BA02-10', uf: 'BA02-14', ano: 'BA02-20', mes: 'BA02-24', doc: 'BA02-30', modelo: 'BA02-34', numero: 'BA02-40', tpEmis: 'BA02-60' }, refNFe, { modelos: ['55', '65', '59'] }),
  {
    id: 'BA02-35',
    verificar({ ide }, falhar) {
      if (val(ide, 'tpNF') !== '1' || ['2', '4'].includes(val(ide, 'finNFe'))) return
      for (const r of refNFe({ ide })) {
        const modelo = partesDaChave(texto(r)).modelo
        if (['65', '59'].includes(modelo)) falhar(r, `referência a documento de modelo ${modelo} em nota de saída`)
      }
    },
  },
  {
    id: 'BA02-44',
    verificar(n, falhar) {
      const r = repetida(refNFe(n))
      if (r) falhar(r, `chave ${texto(r)} referenciada mais de uma vez`)
    },
  },
  {
    id: 'BA02-50',
    verificar(n, falhar) {
      for (const r of refNFe(n)) if (texto(r) === n.chave) falhar(r, 'a nota referencia a própria chave')
    },
  },
  {
    id: 'BA02a-10',
    verificar(n, falhar) {
      if (val(n.ide, 'finNFe') !== '1' && refNFeSig(n).length) falhar(refNFeSig(n)[0], 'referência com código numérico zerado (refNFeSig) em nota que não é normal')
    },
  },
  ...regrasDeChave({ uf: 'BA02a-20', ano: 'BA02a-30', mes: 'BA02a-40', doc: 'BA02a-50', modelo: 'BA02a-60', numero: 'BA02a-70', tpEmis: 'BA02a-110' }, refNFeSig, { modelos: ['55'] }),
  {
    id: 'BA02a-74',
    verificar(n, falhar) {
      for (const r of refNFeSig(n)) if (partesDaChave(texto(r)).cNF !== '00000000') falhar(r, `refNFeSig ${texto(r)} com código numérico diferente de zero`)
    },
  },
  {
    id: 'BA02a-80',
    verificar(n, falhar) {
      const semDv = refNFeSig(n).map((r) => texto(r).slice(0, 43))
      const i = semDv.findIndex((c, j) => semDv.indexOf(c) !== j)
      if (i >= 0) falhar(refNFeSig(n)[i], 'refNFeSig repetida')
    },
  },
  {
    id: 'BA02a-90',
    verificar(n, falhar) {
      const natural = (c) => c.slice(0, 2) + c.slice(6, 34)
      const comuns = new Set(refNFe(n).map((r) => natural(texto(r))))
      for (const r of refNFeSig(n)) if (comuns.has(natural(texto(r)))) falhar(r, 'a mesma nota referenciada em refNFe e refNFeSig')
    },
  },
  {
    id: 'BA02a-100',
    verificar(n, falhar) {
      const natural = (c) => c.slice(0, 2) + c.slice(6, 20) + c.slice(22, 34)
      for (const r of refNFeSig(n)) if (n.chave && natural(texto(r)) === natural(n.chave)) falhar(r, 'refNFeSig com a chave natural da própria nota')
    },
  },
  {
    id: 'BA02a-120',
    verificar(n, falhar) {
      if (val(n.ide, 'cUF') === '26' && refNFeSig(n).length) falhar(refNFeSig(n)[0], 'PE não aceita referência com código numérico zerado')
    },
  },
  {
    id: 'BA03-10',
    verificar({ ide }, falhar) {
      const r = todos(ide, 'NFref/refNF')[0]
      if (r) falhar(r, 'referência a NF modelo 1/2 (refNF) não é mais aceita')
    },
  },
  {
    id: 'BA10-10',
    verificar({ ide }, falhar) {
      const r = todos(ide, 'NFref/refNFP')[0]
      if (r) falhar(r, 'referência a NF de produtor (refNFP) não é mais aceita')
    },
  },
  ...regrasDeChave({ dv: 'BA19-10', uf: 'BA19-14', ano: 'BA19-20', mes: 'BA19-24', doc: 'BA19-30', modelo: 'BA19-34', numero: 'BA19-40' }, refCTe, { modelos: ['57'], cpfPorSerie: false }),
  {
    id: 'BA19-44',
    verificar(n, falhar) {
      const r = repetida(refCTe(n))
      if (r) falhar(r, `CT-e ${texto(r)} referenciado mais de uma vez`)
    },
  },
  {
    id: 'BA20-30',
    verificar({ ide }, falhar) {
      const r = todos(ide, 'NFref/refECF')[0]
      if (r) falhar(r, 'referência a cupom fiscal (refECF); a UF pode recusar')
    },
  },

  // --- Compras governamentais --------------------------------------------------------------
  {
    id: 'BB01-10',
    verificar({ ide }, falhar) {
      if (tem(ide, 'gCompraGov')) falhar(el(ide, 'gCompraGov'), 'grupo de compra governamental em NFC-e')
    },
  },
  ...[
    ['BB05-10', '1', 'proibida'],
    ['BB05-20', '2', 'exigida'],
    ['BB05-40', '3', 'exigida'],
    ['BB05-50', '4', 'proibida'],
  ].map(([id, tipo, regra]) => ({
    id,
    verificar(n, falhar) {
      const g = el(n.ide, 'gCompraGov')
      if (val(g, 'tpOperGov') !== tipo) return
      const tem_ = refDFeAnt(n).length > 0
      if (regra === 'proibida' && tem_) falhar(refDFeAnt(n)[0], `tpOperGov=${tipo} não referencia DF-e anterior`)
      if (regra === 'exigida' && !tem_) falhar(g, `tpOperGov=${tipo} exige a chave do DF-e anterior (refDFeAnt)`)
    },
  })),
  {
    id: 'BB05-30',
    verificar(n, falhar) {
      if (val(n.ide, 'gCompraGov/tpOperGov') === '2' && refDFeAnt(n).length > 1) falhar(refDFeAnt(n)[1], 'tpOperGov=2 com mais de um DF-e anterior')
    },
  },
  {
    id: 'BB05-60',
    verificar(n, falhar) {
      for (const r of refDFeAnt(n)) if (texto(r).length !== 44) falhar(r, `chave com ${texto(r).length} caracteres`)
    },
  },
  ...regrasDeChave(
    { dv: 'BB05-70', uf: 'BB05-80', ano: 'BB05-90', mes: 'BB05-100', doc: 'BB05-110', modelo: 'BB05-120', numero: 'BB05-130', tpEmis: 'BB05-160' },
    (n) => refDFeAnt(n).filter((r) => texto(r).length === 44),
    { modelos: ['55'] },
  ),
  {
    id: 'BB05-140',
    verificar(n, falhar) {
      const r = repetida(refDFeAnt(n))
      if (r) falhar(r, `chave ${texto(r)} referenciada mais de uma vez`)
    },
  },
  {
    id: 'BB05-150',
    verificar(n, falhar) {
      for (const r of refDFeAnt(n)) if (texto(r) === n.chave) falhar(r, 'a nota referencia a própria chave')
    },
  },
  {
    id: 'BB05-180',
    verificar(n, falhar) {
      const emitente = docDe(n.emit)
      for (const r of refDFeAnt(n)) {
        const doc = partesDaChave(texto(r)).doc
        const docRef = doc.startsWith('000') && cpfValido(doc.slice(3)) ? doc.slice(3) : doc
        if (raizCnpj(docRef) !== raizCnpj(emitente)) falhar(r, 'DF-e anterior de outro emitente')
      }
    },
  },

  // --- Referência por item -----------------------------------------------------------------
  {
    id: 'VC02-04',
    verificar({ det, simplificada }, falhar) {
      const d = simplificada && det.find((x) => tem(x, 'DFeReferenciado'))
      if (d) falhar(el(d, 'DFeReferenciado'), 'DF-e referenciado no item em NFC-e ou NF-e com DANFE simplificado')
    },
  },
  {
    id: 'VC02-05',
    verificar({ det, ide }, falhar) {
      const d = det.find((x) => tem(x, 'DFeReferenciado'))
      if (d && tem(ide, 'NFref')) falhar(el(d, 'DFeReferenciado'), 'referência no item e na nota ao mesmo tempo')
    },
  },
  {
    id: 'VC02-07',
    verificar({ det, ide }, falhar) {
      const d = det.find((x) => tem(x, 'DFeReferenciado'))
      if (d && val(ide, 'finNFe') === '5' && val(ide, 'tpNFCredito') !== '06') falhar(el(d, 'DFeReferenciado'), 'nota de crédito com referência no item')
    },
  },
  {
    id: 'VC02-10',
    verificar({ det, ide }, falhar) {
      const exige = ['03', '04'].includes(val(ide, 'tpNFDebito')) || val(ide, 'tpNFCredito') === '06'
      for (const d of det) if (exige && !tem(d, 'DFeReferenciado')) falhar(d, `item ${nItem(d)}: falta DFeReferenciado`)
    },
  },
  {
    id: 'VC02-14',
    verificar({ det, ide }, falhar) {
      if (val(ide, 'finNFe') !== '4') return
      for (const d of det) if (!tem(d, 'DFeReferenciado')) falhar(d, `item ${nItem(d)}: devolução sem DFeReferenciado`)
    },
  },
  {
    id: 'VC02-20',
    verificar({ det }, falhar) {
      const vistos = new Set()
      for (const d of det) {
        const r = el(d, 'DFeReferenciado')
        if (!r) continue
        const k = `${val(r, 'chaveAcesso')}|${val(r, 'nItem') ?? ''}`
        if (vistos.has(k)) falhar(r, `item ${nItem(d)}: DF-e/item referenciado em duplicidade`)
        vistos.add(k)
      }
    },
  },
  {
    id: 'VC02-30',
    verificar({ det, ide }, falhar) {
      if (['03', '07'].includes(val(ide, 'tpNFDebito')) || val(ide, 'finNFe') === '4') return
      const chaves = new Set(det.map((d) => val(d, 'DFeReferenciado/chaveAcesso')).filter(Boolean))
      if (chaves.size > 1) falhar(det.find((d) => tem(d, 'DFeReferenciado')), `${chaves.size} documentos diferentes referenciados nos itens`)
    },
  },
  {
    id: 'VC03-10',
    verificar({ det, ide }, falhar) {
      if (val(ide, 'tpNFDebito') !== '03') return
      for (const d of det) if (tem(d, 'DFeReferenciado/nItem')) falhar(el(d, 'DFeReferenciado/nItem'), `item ${nItem(d)}: nItem não se informa nesse tipo de débito`)
    },
  },
  {
    id: 'VC03-20',
    verificar({ det, ide }, falhar) {
      if (val(ide, 'tpNFDebito') === '03') return
      for (const d of det) if (tem(d, 'DFeReferenciado') && !tem(d, 'DFeReferenciado/nItem')) falhar(el(d, 'DFeReferenciado'), `item ${nItem(d)}: DFeReferenciado sem nItem`)
    },
  },

  // --- Transporte --------------------------------------------------------------------------
  {
    id: 'X02-10',
    verificar({ ide, transp, simplificada }, falhar) {
      if (simplificada && val(transp, 'modFrete') !== '9' && val(ide, 'indPres') !== '4') falhar(el(transp, 'modFrete'), `frete (modFrete=${val(transp, 'modFrete')}) fora de entrega em domicílio`)
    },
  },
  {
    id: 'X02-20',
    verificar({ ide, transp, inf }, falhar) {
      if (val(ide, 'idDest') === '2' && (tem(transp, 'veicTransp') || tem(transp, 'reboque')) && !tem(inf, 'avulsa')) {
        falhar(el(transp, 'veicTransp') ?? el(transp, 'reboque'), 'veículo/reboque em operação interestadual')
      }
    },
  },
  {
    id: 'X03-30',
    verificar({ transp }, falhar) {
      if (val(transp, 'modFrete') === '9' && tem(transp, 'transporta')) falhar(el(transp, 'transporta'), 'transportador informado sem frete (modFrete=9)')
    },
  },
  {
    id: 'X04-20',
    verificar({ transp }, falhar) {
      const c = val(transp, 'transporta/CNPJ')
      if (c !== undefined && !cnpjValido(c)) falhar(el(transp, 'transporta/CNPJ'), `CNPJ do transportador ${c} inválido`)
    },
  },
  {
    id: 'X05-10',
    verificar({ transp }, falhar) {
      const c = val(transp, 'transporta/CPF')
      if (c !== undefined && !cpfValido(c)) falhar(el(transp, 'transporta/CPF'), `CPF do transportador ${c} inválido`)
    },
  },
  // X04-30 a X04-100: coerência entre a modalidade do frete e quem transporta.
  ...[
    ['X04-30', '1', ['3'], 'remetente', true],
    ['X04-40', '0', ['3'], 'remetente', true],
    ['X04-50', '1', ['0', '4', '9'], 'remetente', false],
    ['X04-60', '0', ['0', '4', '9'], 'remetente', false],
    ['X04-70', '1', ['4'], 'destinatario', true],
    ['X04-80', '0', ['4'], 'destinatario', true],
    ['X04-90', '1', ['1', '3', '9'], 'destinatario', false],
    ['X04-100', '0', ['1', '3', '9'], 'destinatario', false],
  ].map(([id, tpNF, modalidades, quem, igual]) => ({
    id,
    verificar({ ide, emit, dest, transp }, falhar) {
      const doc = docTransp(transp)
      if (!doc || val(ide, 'tpNF') !== tpNF || !modalidades.includes(val(transp, 'modFrete'))) return
      // Na saída o remetente é o emitente; na entrada, o destinatário do grupo dest.
      const remetente = tpNF === '1' ? docDe(emit) : docDe(dest)
      const destinatario = tpNF === '1' ? docDe(dest) : docDe(emit)
      const alvo = quem === 'remetente' ? remetente : destinatario
      if (!igual && mesmaRaiz(docDe(emit), docDe(dest))) return
      if (igual !== !!mesmaRaiz(doc, alvo)) {
        falhar(el(transp, 'transporta'), `modFrete=${val(transp, 'modFrete')}: transportador ${igual ? 'deve' : 'não pode'} ser o ${quem}`)
      }
    },
  })),
  {
    id: 'X07-10',
    verificar({ transp }, falhar) {
      if (tem(transp, 'transporta/IE') && !tem(transp, 'transporta/UF')) falhar(el(transp, 'transporta'), 'IE do transportador sem UF')
    },
  },
  ...[
    ['X11-10', 'retTransp'],
    ['X18-10', 'veicTransp'],
    ['X22-10', 'reboque'],
    ['X25a-10', 'vagao'],
    ['X25b-10', 'balsa'],
  ].map(([id, grupo]) => ({
    id,
    verificar({ transp, simplificada }, falhar) {
      if (simplificada && tem(transp, grupo)) falhar(el(transp, grupo), `grupo ${grupo} em NFC-e ou NF-e com DANFE simplificado`)
    },
  })),
  {
    id: 'X16-10',
    verificar(n, falhar) {
      const c = val(n.transp, 'retTransp/CFOP')
      if (c && !cfop(c, dia(n))?.indTransp) falhar(el(n.transp, 'retTransp/CFOP'), `CFOP ${c} não é de transporte`)
    },
  },
  {
    id: 'X17-10',
    verificar({ transp }, falhar) {
      const c = val(transp, 'retTransp/cMunFG')
      if (c && !municipioExiste(c)) falhar(el(transp, 'retTransp/cMunFG'), `município ${c} não existe na tabela do IBGE`)
    },
  },

  // --- Cobrança ----------------------------------------------------------------------------
  {
    id: 'Y01-10',
    verificar({ cobr, simplificada }, falhar) {
      if (simplificada && cobr) falhar(cobr, 'grupo de cobrança em NFC-e ou NF-e com DANFE simplificado')
    },
  },
  {
    id: 'Y01-20',
    verificar({ cobr }, falhar) {
      const fat = el(cobr, 'fat')
      if (fat && !['nFat', 'vOrig', 'vLiq'].every((c) => tem(fat, c))) falhar(fat, 'fatura sem nFat, vOrig ou vLiq')
    },
  },
  {
    id: 'Y05-10',
    verificar({ cobr }, falhar) {
      const fat = el(cobr, 'fat')
      if (fat && num(fat, 'vDesc') > num(fat, 'vOrig')) falhar(fat, `desconto ${val(fat, 'vDesc')} maior que o valor original ${val(fat, 'vOrig') ?? '0'}`)
    },
  },
  {
    id: 'Y06-10',
    verificar({ cobr }, falhar) {
      const fat = el(cobr, 'fat')
      if (tem(fat, 'vLiq') && tem(fat, 'vOrig') && difere(num(fat, 'vLiq'), num(fat, 'vOrig') - num(fat, 'vDesc'))) {
        falhar(el(fat, 'vLiq'), `vLiq ${val(fat, 'vLiq')} difere de vOrig − vDesc`)
      }
    },
  },
  {
    id: 'Y08-10',
    verificar({ cobr }, falhar) {
      todos(cobr, 'dup').forEach((d, i) => {
        const esperado = String(i + 1).padStart(3, '0')
        if (val(d, 'nDup') !== esperado) falhar(d, `parcela ${i + 1} com nDup "${val(d, 'nDup') ?? ''}"; esperado ${esperado}`)
      })
    },
  },
  {
    id: 'Y09-20',
    verificar(n, falhar) {
      for (const d of todos(n.cobr, 'dup')) if (!val(d, 'dVenc') || val(d, 'dVenc') < dia(n)) falhar(d, `vencimento ${val(d, 'dVenc') ?? 'ausente'} antes da emissão ${dia(n)}`)
    },
  },
  {
    id: 'Y09-30',
    verificar({ cobr }, falhar) {
      const dups = todos(cobr, 'dup')
      for (let i = 1; i < dups.length; i++) {
        if (!val(dups[i], 'dVenc') || val(dups[i], 'dVenc') < val(dups[i - 1], 'dVenc')) falhar(dups[i], `vencimento ${val(dups[i], 'dVenc') ?? 'ausente'} antes do da parcela anterior`)
      }
    },
  },
  {
    id: 'Y09-40',
    verificar(n, falhar) {
      const dups = todos(n.cobr, 'dup')
      if (dups.length === 1 && val(dups[0], 'dVenc') === dia(n)) falhar(dups[0], 'parcela única vencendo na emissão (pagamento à vista não usa duplicata)')
    },
  },
  {
    id: 'Y09-50',
    verificar({ cobr, agora }, falhar) {
      const limite = new Date(agora.getTime() + 3652.5 * DIA).toISOString().slice(0, 10)
      for (const d of todos(cobr, 'dup')) if (val(d, 'dVenc') > limite) falhar(d, `vencimento ${val(d, 'dVenc')} a mais de 10 anos`)
    },
  },
  {
    id: 'Y10-10',
    verificar({ cobr }, falhar) {
      const dups = todos(cobr, 'dup')
      if (!dups.length) return
      const soma = dups.reduce((s, d) => s + num(d, 'vDup'), 0)
      if (difere(soma, num(cobr, 'fat/vLiq'))) falhar(el(cobr, 'fat') ?? cobr, `soma das parcelas ${soma.toFixed(2)} difere de vLiq ${val(cobr, 'fat/vLiq') ?? '0.00'}`)
    },
  },

  // --- Pagamento ---------------------------------------------------------------------------
  {
    id: 'YA02-04',
    verificar({ ide, pag }, falhar) {
      if (!['3', '4'].includes(val(ide, 'finNFe'))) return
      for (const p of todos(pag, 'detPag')) if (val(p, 'tPag') !== '90') falhar(el(p, 'tPag'), `finNFe=${val(ide, 'finNFe')} exige tPag=90 (sem pagamento)`)
    },
  },
  ...[
    ['YA02-10', '14', 'duplicata mercantil (14) em NFC-e'],
    ['YA02-40', '90', 'sem pagamento (90) em NFC-e'],
  ].map(([id, codigo, detalhe]) => ({
    id,
    verificar({ pag }, falhar) {
      for (const p of todos(pag, 'detPag')) if (val(p, 'tPag') === codigo) falhar(el(p, 'tPag'), detalhe)
    },
  })),
  {
    id: 'YA02-60',
    verificar(n, falhar) {
      for (const p of todos(n.pag, 'detPag')) if (!meioDePagamentoVigente(val(p, 'tPag'), dia(n))) falhar(el(p, 'tPag'), `meio de pagamento ${val(p, 'tPag')} inexistente`)
    },
  },
  {
    id: 'YA02a-10',
    verificar({ pag }, falhar) {
      for (const p of todos(pag, 'detPag')) if (val(p, 'tPag') === '99' && !tem(p, 'xPag')) falhar(el(p, 'tPag'), 'tPag=99 (outros) sem descrição xPag')
    },
  },
  {
    id: 'YA02a-20',
    verificar({ pag }, falhar) {
      for (const p of todos(pag, 'detPag')) if (val(p, 'tPag') !== '99' && tem(p, 'xPag')) falhar(el(p, 'xPag'), `xPag com tPag=${val(p, 'tPag')}`)
    },
  },
  {
    id: 'YA03-10',
    verificar({ ide, pag, total, modelo }, falhar) {
      // Para o modelo 55 a NT diz "implementação futura"; vale para a NFC-e.
      if (modelo !== '65' || ['3', '4'].includes(val(ide, 'finNFe'))) return
      const pagamentos = todos(pag, 'detPag')
      if (pagamentos.some((p) => ['90', '91'].includes(val(p, 'tPag')))) return
      const soma = pagamentos.reduce((s, p) => s + num(p, 'vPag'), 0)
      if (Math.round(soma * 100) < Math.round(num(total, 'ICMSTot/vNF') * 100)) falhar(pag, `pagamentos somam ${soma.toFixed(2)}, menos que o vNF ${val(total, 'ICMSTot/vNF')}`)
    },
  },
  {
    id: 'YA03-20',
    verificar({ pag, total }, falhar) {
      const soma = todos(pag, 'detPag').reduce((s, p) => s + num(p, 'vPag'), 0)
      if (Math.round(soma * 100) > Math.round(num(total, 'ICMSTot/vNF') * 100) && !tem(pag, 'vTroco')) falhar(pag, `pagamentos somam ${soma.toFixed(2)}, mais que o vNF, sem vTroco`)
    },
  },
  {
    id: 'YA03-30',
    verificar({ pag }, falhar) {
      for (const p of todos(pag, 'detPag')) if (['90', '91'].includes(val(p, 'tPag')) && num(p, 'vPag') !== 0) falhar(el(p, 'vPag'), `tPag=${val(p, 'tPag')} com vPag ${val(p, 'vPag')}`)
    },
  },
  {
    id: 'YA03a-10',
    verificar({ pag, agora }, falhar) {
      const hoje = agora.toISOString().slice(0, 10)
      for (const p of todos(pag, 'detPag')) if (val(p, 'dPag') > hoje) falhar(el(p, 'dPag'), `data de pagamento ${val(p, 'dPag')} no futuro`)
    },
  },
  {
    id: 'YA03c-10',
    verificar({ pag }, falhar) {
      for (const p of todos(pag, 'detPag')) if (tem(p, 'CNPJPag') && !cnpjValido(val(p, 'CNPJPag'))) falhar(el(p, 'CNPJPag'), `CNPJ ${val(p, 'CNPJPag')} inválido`)
    },
  },
  {
    id: 'YA04-10',
    verificar({ pag, modelo }, falhar) {
      if (modelo !== '65') return // implementação futura para o modelo 55
      for (const p of todos(pag, 'detPag')) if (['03', '04', '17'].includes(val(p, 'tPag')) && !tem(p, 'card')) falhar(el(p, 'tPag'), `tPag=${val(p, 'tPag')} sem o grupo card`)
    },
  },
  {
    id: 'YA04-20',
    verificar({ pag }, falhar) {
      for (const p of todos(pag, 'detPag')) {
        if (tem(p, 'card') && !['03', '04', '10', '11', '12', '13', '15', '17', '18'].includes(val(p, 'tPag'))) falhar(el(p, 'card'), `grupo card com tPag=${val(p, 'tPag')}`)
        else if (tem(p, 'card/CNPJReceb') && !cnpjValido(val(p, 'card/CNPJReceb'))) falhar(el(p, 'card/CNPJReceb'), `CNPJ do recebedor ${val(p, 'card/CNPJReceb')} inválido`)
      }
    },
  },
  {
    id: 'YA05-10',
    verificar({ pag }, falhar) {
      for (const c of todos(pag, 'detPag/card')) if (val(c, 'tpIntegra') === '1' && !(tem(c, 'CNPJ') && tem(c, 'cAut'))) falhar(c, 'pagamento integrado (tpIntegra=1) sem CNPJ da credenciadora e cAut')
    },
  },
  {
    id: 'YA05-20',
    verificar({ pag }, falhar) {
      for (const c of todos(pag, 'detPag/card')) if (tem(c, 'CNPJ') && !cnpjValido(val(c, 'CNPJ'))) falhar(el(c, 'CNPJ'), `CNPJ da instituição de pagamento ${val(c, 'CNPJ')} inválido`)
    },
  },
  {
    id: 'YA06-10',
    verificar(n, falhar) {
      for (const c of todos(n.pag, 'detPag/card')) if (tem(c, 'tBand') && !bandeiraVigente(val(c, 'tBand'), dia(n))) falhar(el(c, 'tBand'), `bandeira ${val(c, 'tBand')} inexistente`)
    },
  },
  {
    id: 'YA09-10',
    verificar({ pag, total }, falhar) {
      if (!tem(pag, 'vTroco')) return
      const soma = todos(pag, 'detPag').reduce((s, p) => s + num(p, 'vPag'), 0)
      const esperado = soma - num(total, 'ICMSTot/vNF')
      if (difere(num(pag, 'vTroco'), esperado)) falhar(el(pag, 'vTroco'), `troco ${val(pag, 'vTroco')}; pagamentos − vNF = ${esperado.toFixed(2)}`)
    },
  },
  {
    id: 'YA09-20',
    verificar({ pag }, falhar) {
      if (num(pag, 'vTroco') > 300000) falhar(el(pag, 'vTroco'), `troco ${val(pag, 'vTroco')} acima de R$ 300.000,00`)
    },
  },

  // --- Intermediador, exportação, compras, cana, responsável técnico ----------------------
  {
    id: 'YB01-10',
    verificar({ ide, inf }, falhar) {
      if (val(ide, 'indIntermed') === '1' && !tem(inf, 'infIntermed')) falhar(el(ide, 'indIntermed'), 'venda por intermediador (indIntermed=1) sem infIntermed')
    },
  },
  {
    id: 'YB01-20',
    verificar({ ide, inf }, falhar) {
      if (val(ide, 'indIntermed') !== '1' && tem(inf, 'infIntermed')) falhar(el(inf, 'infIntermed'), `infIntermed com indIntermed=${val(ide, 'indIntermed') ?? 'ausente'}`)
    },
  },
  {
    id: 'YB02-10',
    verificar({ inf }, falhar) {
      const c = val(inf, 'infIntermed/CNPJ')
      if (c !== undefined && !cnpjValido(c)) falhar(el(inf, 'infIntermed/CNPJ'), `CNPJ do intermediador ${c} inválido`)
    },
  },
  {
    id: 'ZA01-10',
    verificar({ ide, inf }, falhar) {
      if (val(ide, 'tpNF') === '1' && val(ide, 'idDest') === '3' && !tem(inf, 'exporta')) falhar(inf, 'exportação sem o grupo exporta (local de embarque)')
    },
  },
  {
    id: 'ZA01-20',
    verificar({ ide, inf }, falhar) {
      if (tem(inf, 'exporta') && (val(ide, 'tpNF') === '0' || val(ide, 'idDest') !== '3')) falhar(el(inf, 'exporta'), 'grupo exporta fora de exportação')
    },
  },
  {
    id: 'ZA01-30',
    verificar({ inf }, falhar) {
      if (tem(inf, 'exporta')) falhar(el(inf, 'exporta'), 'grupo exporta em NFC-e')
    },
  },
  ...[
    ['ZB01-10', 'compra'],
    ['ZC01-10', 'cana'],
  ].map(([id, grupo]) => ({
    id,
    verificar({ inf, simplificada }, falhar) {
      if (simplificada && tem(inf, grupo)) falhar(el(inf, grupo), `grupo ${grupo} em NFC-e ou NF-e com DANFE simplificado`)
    },
  })),
  {
    id: 'ZB02-10',
    verificar({ det, inf }, falhar) {
      const orgaoPublico = det.some((d) => val(el(d, 'imposto/ICMS')?.filhos.find((f) => f.tipo === 'elemento'), 'motDesICMS') === '8')
      if (orgaoPublico && !tem(inf, 'compra/xNEmp')) falhar(inf, 'desoneração para órgão público sem nota de empenho (compra/xNEmp)')
    },
  },
  {
    id: 'ZD01-10',
    verificar({ inf }, falhar) {
      if (!tem(inf, 'infRespTec')) falhar(inf, 'sem o grupo infRespTec (responsável técnico); exigido em várias UFs')
    },
  },
  {
    id: 'ZD02-10',
    verificar({ inf }, falhar) {
      const c = val(inf, 'infRespTec/CNPJ')
      if (c !== undefined && !cnpjValido(c)) falhar(el(inf, 'infRespTec/CNPJ'), `CNPJ do responsável técnico ${c} inválido`)
    },
  },
  {
    id: 'ZD07-10',
    verificar({ ide, inf, modelo }, falhar) {
      if (val(ide, 'cUF') !== '41' || modelo !== '55' || ['3', '7', '8'].includes(val(ide, 'tpEmis')) || !tem(inf, 'infRespTec')) return
      if (!tem(inf, 'infRespTec/idCSRT') || !tem(inf, 'infRespTec/hashCSRT')) falhar(el(inf, 'infRespTec'), 'PR exige idCSRT e hashCSRT do responsável técnico')
    },
  },
  {
    id: 'ZE01-10',
    verificar({ ide, inf }, falhar) {
      if (val(ide, 'tpEmis') !== '3' && tem(inf, 'infSolicNFF')) falhar(el(inf, 'infSolicNFF'), 'infSolicNFF fora da Nota Fiscal Fácil')
    },
  },
  {
    id: 'ZE01-20',
    verificar({ ide, inf }, falhar) {
      if (val(ide, 'tpEmis') === '3' && !tem(inf, 'infSolicNFF')) falhar(el(ide, 'tpEmis'), 'Nota Fiscal Fácil sem infSolicNFF')
    },
  },
  {
    id: 'ZF03a-10',
    verificar({ inf }, falhar) {
      for (const d of todos(inf, 'agropecuario/defensivo')) if (!cpfValido(val(d, 'CPFRespTec'))) falhar(el(d, 'CPFRespTec'), `CPF do responsável técnico ${val(d, 'CPFRespTec')} inválido`)
    },
  },

  // --- QR Code (NFC-e e NF-e com DANFE simplificado) -----------------------------------------
  {
    id: 'ZX01-10',
    verificar({ nfe, ide }, falhar) {
      // A NF-e com DANFE simplificado tipo 2 também leva QR Code (NT 2026.002).
      if (tem(nfe, 'infNFeSupl') && val(ide, 'tpImp') !== '6') falhar(el(nfe, 'infNFeSupl'), 'grupo infNFeSupl (QR Code) em NF-e')
    },
  },
  {
    id: 'ZX02-10',
    verificar({ nfe, ide, simplificada }, falhar) {
      if (simplificada && val(ide, 'tpEmis') !== '3' && !tem(nfe, 'infNFeSupl/qrCode')) falhar(nfe, 'sem QR Code (infNFeSupl/qrCode)')
    },
  },
  {
    id: 'ZX02-220',
    verificar({ nfe }, falhar) {
      const p = parametrosQr(val(nfe, 'infNFeSupl/qrCode') ?? '')
      if (p && p[1] !== '3') falhar(el(nfe, 'infNFeSupl/qrCode'), `QR Code versão ${p[1]}; a NF-e com DANFE simplificado usa a 3`)
    },
  },
  {
    id: 'ZX02-222',
    verificar({ nfe, emit }, falhar) {
      const p = parametrosQr(val(nfe, 'infNFeSupl/qrCode') ?? '')
      if (p?.[1] === '2' && tem(emit, 'CPF')) falhar(el(nfe, 'infNFeSupl/qrCode'), 'QR Code versão 2 com emitente pessoa física; use a versão 3')
    },
  },
  ...qrCode(),
]

// Regras dos parâmetros do QR Code versões 2 e 3 (NT 2025.001).
function qrCode() {
  const comQr = (n) => {
    const qr = val(n.nfe, 'infNFeSupl/qrCode')
    const p = qr && parametrosQr(qr)
    return p && ['2', '3'].includes(p[1]) ? { p, no: el(n.nfe, 'infNFeSupl/qrCode'), offline: val(n.ide, 'tpEmis') === '9' } : null
  }
  const regra = (id, teste) => ({
    id,
    verificar(n, falhar) {
      const q = comQr(n)
      const detalhe = q && teste(q, n)
      if (detalhe) falhar(q.no, detalhe)
    },
  })
  const destinatario = (dest) => val(dest, 'CNPJ') ?? val(dest, 'CPF') ?? val(dest, 'idEstrangeiro')
  return [
    regra('ZX02-224', ({ p }) => !p[0] && 'QR Code sem a chave de acesso'),
    regra('ZX02-228', ({ p }, n) => p[0] && p[0] !== n.chave && `chave no QR Code (${p[0]}) diverge da chave da nota`),
    regra('ZX02-244', ({ p }, n) => p[2] && p[2] !== val(n.ide, 'tpAmb') && `ambiente no QR Code (${p[2]}) diverge de tpAmb=${val(n.ide, 'tpAmb')}`),
    regra('ZX02-240', ({ p }) => !p[2] && 'QR Code sem o tipo de ambiente'),
    regra('ZX02-260', ({ p, offline }) => offline && !p[3] && 'QR Code de contingência sem o dia da emissão'),
    regra('ZX02-268', ({ p, offline }, n) => offline && p[3] && Number(p[3]) !== Number(val(n.ide, 'dhEmi').slice(8, 10)) && `dia no QR Code (${p[3]}) diverge da emissão`),
    regra('ZX02-272', ({ p, offline }) => offline && !p[4] && 'QR Code de contingência sem o valor da nota'),
    regra('ZX02-276', ({ p, offline }, n) => offline && p[4] && difere(Number(p[4]), num(n.total, 'ICMSTot/vNF')) && `valor no QR Code (${p[4]}) diverge do vNF ${val(n.total, 'ICMSTot/vNF')}`),
    regra('ZX02-324', ({ p, offline }) => offline && p[1] === '3' && p.length < 6 && 'QR Code v3 de contingência sem o tipo de identificação do destinatário'),
    regra('ZX02-328', ({ p, offline }, n) => {
      if (!offline || p[1] !== '3') return null
      const doc = destinatario(n.dest) ?? ''
      return (p[6] ?? '') !== doc && `destinatário no QR Code (${p[6] || 'vazio'}) diverge do da nota (${doc || 'vazio'})`
    }),
    regra('ZX02-330', ({ p, offline }) => !offline && p[1] === '3' && p.length > 3 && 'QR Code v3 online com parâmetros de contingência (assinatura)'),
    regra('ZX02-334', ({ p, offline }) => offline && p[1] === '3' && !p[7] && 'QR Code v3 de contingência sem a assinatura'),
  ]
}
