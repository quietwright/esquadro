// Finalidade da nota (grupo B25 da NT 2025.002): notas de crédito e de débito, documentos
// referenciados conforme a finalidade, município do fato gerador do IBS e indicador do local
// da operação; mais regras de série e de PAA que ficaram fora do grupo B.

import { el, tem, todos, val } from '../consulta.js'
import { atributo, texto } from '../xml.js'
import { partesDaChave } from './finais.js'
import { cnpjValido } from './util.js'

const finNFe = (ide) => val(ide, 'finNFe')
const credito = (ide) => val(ide, 'tpNFCredito')
const debito = (ide) => val(ide, 'tpNFDebito')
const refNFe = (ide) => todos(ide, 'NFref/refNFe')
const serie = (ide) => Number(val(ide, 'serie'))
const nItem = (d) => atributo(d, 'nItem')

// Complementar, ou crédito de multa e juros, retorno ou redução de valores.
const exigeReferencia = (ide) => finNFe(ide) === '2' || (finNFe(ide) === '5' && ['01', '03', '04'].includes(credito(ide)))
// Complementar, ou crédito de retorno ou redução de valores.
const referenciaDoMesmoEmitente = (ide) => finNFe(ide) === '2' || (finNFe(ide) === '5' && ['03', '04'].includes(credito(ide)))

// Tributos que a nota de crédito/débito não pode trazer (B25-80).
const TRIBUTOS_DO_ITEM = ['ICMS', 'ISSQN', 'IPI', 'II', 'PIS', 'PISST', 'COFINS', 'COFINSST', 'ICMSUFDest']

export default [
  {
    id: 'B07-10',
    verificar({ ide }, falhar) {
      if (serie(ide) >= 970 && serie(ide) <= 989) falhar(el(ide, 'serie'), `série ${serie(ide)} do PAA em NFC-e`)
    },
  },
  {
    id: 'B25-30',
    verificar({ ide }, falhar) {
      if (exigeReferencia(ide) && !tem(ide, 'NFref')) falhar(el(ide, 'finNFe'), 'nota complementar ou de crédito sem nota referenciada')
    },
  },
  {
    id: 'B25-40',
    verificar({ ide }, falhar) {
      if (exigeReferencia(ide) && todos(ide, 'NFref').length > 1) falhar(todos(ide, 'NFref')[1], 'nota complementar ou de crédito com mais de uma nota referenciada')
    },
  },
  {
    id: 'B25-50',
    verificar({ ide, emit }, falhar) {
      if (!referenciaDoMesmoEmitente(ide)) return
      const doc = (val(emit, 'CNPJ') ?? (val(emit, 'CPF') ?? '').padStart(14, '0'))
      for (const r of refNFe(ide)) if (partesDaChave(texto(r)).doc !== doc) falhar(r, 'nota referenciada de outro emitente')
    },
  },
  {
    id: 'B25-60',
    verificar({ ide }, falhar) {
      if (!referenciaDoMesmoEmitente(ide)) return
      for (const r of refNFe(ide)) if (partesDaChave(texto(r)).uf !== val(ide, 'cUF')) falhar(r, `nota referenciada da UF ${partesDaChave(texto(r)).uf}`)
    },
  },
  {
    id: 'B25-65',
    verificar({ ide }, falhar) {
      if (credito(ide) === '02' && tem(ide, 'NFref')) falhar(el(ide, 'NFref'), 'crédito presumido da ZFM não referencia nota')
    },
  },
  {
    id: 'B25-70',
    verificar({ ide, det }, falhar) {
      if (finNFe(ide) !== '4' || tem(ide, 'NFref') || det.some((d) => tem(d, 'DFeReferenciado'))) return
      if (det.some((d) => ['1201', '1202', '1410', '1411', '5921', '6921'].includes(val(d, 'prod/CFOP')))) return
      falhar(el(ide, 'finNFe'), 'devolução sem documento referenciado')
    },
  },
  {
    id: 'B25-80',
    verificar({ ide, det }, falhar) {
      const ehCreditoOuDebito = ['5', '6'].includes(finNFe(ide)) || val(ide, 'gCompraGov/tpOperGov') === '2'
      if (!ehCreditoOuDebito || ['03', '04', '06'].includes(credito(ide)) || debito(ide) === '07') return
      const ano = Number(val(ide, 'dhEmi').slice(0, 4))
      for (const d of det) {
        for (const tributo of TRIBUTOS_DO_ITEM) {
          if (!tem(d, `imposto/${tributo}`)) continue
          if (debito(ide) === '06') {
            if (['PIS', 'PISST', 'COFINS', 'COFINSST'].includes(tributo) && ano === 2026) continue
            if (tributo === 'IPI') continue
            if (tributo === 'ICMS' && tem(d, 'imposto/ICMS/ICMSPrevistoPagtoAntecip')) continue
          }
          falhar(el(d, `imposto/${tributo}`), `item ${nItem(d)}: ${tributo} em nota de crédito/débito, que é só de IBS/CBS`)
        }
        if (tem(d, 'impostoDevol')) falhar(el(d, 'impostoDevol'), `item ${nItem(d)}: impostoDevol em nota de crédito/débito`)
      }
    },
  },
  {
    id: 'B25-90',
    verificar({ ide, det, emit, modelo }, falhar) {
      if (['5', '6'].includes(finNFe(ide)) || val(ide, 'gCompraGov/tpOperGov') === '2') return
      // Na SVRS, NF-e de contribuinte só de IBS/CBS (sem IE) pode não ter ICMS.
      if (modelo === '55' && !tem(emit, 'IE')) return
      for (const d of det) if (!tem(d, 'imposto/ICMS') && !tem(d, 'imposto/ISSQN')) falhar(el(d, 'imposto'), `item ${nItem(d)}: sem ICMS e sem ISSQN`)
    },
  },
  {
    id: 'B25-100',
    verificar({ ide }, falhar) {
      if (finNFe(ide) !== '5') return
      const aceitos = credito(ide) === '03' ? ['55', '65'] : ['55']
      for (const r of refNFe(ide)) if (!aceitos.includes(partesDaChave(texto(r)).modelo)) falhar(r, `nota de crédito referenciando modelo ${partesDaChave(texto(r)).modelo}`)
    },
  },
  ...[
    ['B25-110', '5', '0', 'nota de crédito deve ser de entrada (tpNF=0)'],
    ['B25-120', '6', '1', 'nota de débito deve ser de saída (tpNF=1)'],
  ].map(([id, fin, tpNF, detalhe]) => ({
    id,
    verificar({ ide }, falhar) {
      if (finNFe(ide) === fin && val(ide, 'tpNF') !== tpNF) falhar(el(ide, 'tpNF'), detalhe)
    },
  })),
  ...[
    ['B25.1-10', 'B25.1-20', '6', 'tpNFDebito', 'débito'],
    ['B25.2-10', 'B25.2-20', '5', 'tpNFCredito', 'crédito'],
  ].flatMap(([idSobra, idFalta, fin, campo, nome]) => [
    {
      id: idSobra,
      verificar({ ide }, falhar) {
        if (tem(ide, campo) && finNFe(ide) !== fin) falhar(el(ide, campo), `${campo} em nota que não é de ${nome} (finNFe=${finNFe(ide)})`)
      },
    },
    {
      id: idFalta,
      verificar({ ide }, falhar) {
        if (finNFe(ide) === fin && !tem(ide, campo)) falhar(el(ide, 'finNFe'), `nota de ${nome} sem ${campo}`)
      },
    },
  ]),
  {
    id: 'B25.2-30',
    verificar({ ide }, falhar) {
      if (credito(ide) === '02' && Number(val(ide, 'dhEmi').slice(0, 4)) < 2029) falhar(el(ide, 'tpNFCredito'), 'crédito presumido de IBS na ZFM só a partir de 2029')
    },
  },
  {
    id: 'B25.2-40',
    verificar({ ide }, falhar) {
      if (credito(ide) === '03' && val(ide, 'tpNF') !== '0') falhar(el(ide, 'tpNF'), 'crédito de retorno deve ser de entrada (tpNF=0)')
    },
  },
  {
    id: 'B25b-60',
    verificar({ ide }, falhar) {
      if (tem(ide, 'cMunFGIBS') && val(ide, 'indPres') !== '5') falhar(el(ide, 'cMunFGIBS'), 'cMunFGIBS fora de operação presencial fora do estabelecimento')
    },
  },
  {
    id: 'B25b-70',
    verificar({ ide }, falhar) {
      if (!tem(ide, 'cMunFGIBS') && val(ide, 'indPres') === '5') falhar(el(ide, 'indPres'), 'operação presencial fora do estabelecimento sem cMunFGIBS')
    },
  },
  {
    id: 'B25d-10',
    verificar({ ide }, falhar) {
      if (tem(ide, 'cIndOp')) falhar(el(ide, 'cIndOp'), 'cIndOp em NFC-e')
    },
  },
  {
    id: 'B25d-30',
    verificar({ ide, inf }, falhar) {
      if (['010104', '010105'].includes(val(ide, 'cIndOp')) && !tem(inf, 'retirada')) falhar(el(ide, 'cIndOp'), `cIndOp ${val(ide, 'cIndOp')} exige o local de retirada`)
    },
  },
  {
    id: 'B26-24',
    verificar({ ide }, falhar) {
      if (val(ide, 'procEmi') === '4' && !(serie(ide) >= 970 && serie(ide) <= 989)) falhar(el(ide, 'serie'), `emissão por PAA com série ${serie(ide)}; esperado 970-989`)
    },
  },
  {
    id: 'C02a-14',
    verificar({ ide, emit }, falhar) {
      const s = serie(ide)
      if (tem(emit, 'CPF') && val(ide, 'tpEmis') !== '3' && !((s >= 890 && s <= 899) || (s >= 910 && s <= 919))) {
        falhar(el(ide, 'serie'), `emitente CPF com série ${s}; a UF pode exigir 890-899 ou 910-919`)
      }
    },
  },
  {
    id: 'ZG02-10',
    verificar({ inf }, falhar) {
      const c = val(inf, 'infPAA/CNPJPAA')
      if (c !== undefined && !cnpjValido(c)) falhar(el(inf, 'infPAA/CNPJPAA'), `CNPJ do PAA ${c} inválido`)
    },
  },
  {
    id: 'ZX02-15',
    verificar({ nfe, ide }, falhar) {
      const qr = val(nfe, 'infNFeSupl/qrCode') ?? ''
      if (/nVersao=100/.test(qr) && val(ide, 'dhEmi').slice(0, 10) > '2018-09-30') falhar(el(nfe, 'infNFeSupl/qrCode'), 'QR Code versão 100 não vale para notas emitidas depois de 30/09/2018')
    },
  },
  {
    id: 'UB14-60',
    verificar({ ide, det }, falhar) {
      // cClassTrib que só existem para um tipo de nota de débito/crédito.
      const exige = {
        410030: [['07'], []],
        800001: [['05'], ['05']],
        800002: [['01'], []],
        810001: [[], ['02']],
        811001: [['02'], []],
        811002: [['03'], []],
        811003: [['08'], []],
      }
      for (const d of det) {
        const c = val(d, 'imposto/IBSCBS/cClassTrib')
        const regra = c && exige[c]
        if (!regra) continue
        const [debitos, creditos] = regra
        if (!debitos.includes(debito(ide)) && !creditos.includes(credito(ide))) {
          falhar(el(d, 'imposto/IBSCBS'), `item ${nItem(d)}: cClassTrib ${c} não combina com tpNFDebito=${debito(ide) ?? '-'} / tpNFCredito=${credito(ide) ?? '-'}`)
        }
      }
    },
  },
]
