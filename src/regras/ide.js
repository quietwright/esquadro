// Grupo B: identificação da NF-e (ide) e chave de acesso.

import { el, tem, todos, val } from '../consulta.js'
import { DIA, MINUTO, diaCivil, dvChave, instante, somarMeses } from './util.js'

const CNF_PROIBIDOS = new Set([
  '00000000', '11111111', '22222222', '33333333', '44444444', '55555555', '66666666', '77777777',
  '88888888', '99999999', '12345678', '23456789', '34567890', '45678901', '56789012', '67890123',
  '78901234', '89012345', '90123456', '01234567',
])

// Chave de acesso montada a partir dos campos, sem o DV (43 posições).
function chaveSemDv({ ide, emit }) {
  const dhEmi = val(ide, 'dhEmi') ?? ''
  const aamm = dhEmi.slice(2, 4) + dhEmi.slice(5, 7)
  const doc = val(emit, 'CNPJ') ?? (val(emit, 'CPF') ?? '').padStart(14, '0')
  return (
    val(ide, 'cUF') +
    aamm +
    doc +
    val(ide, 'mod') +
    val(ide, 'serie').padStart(3, '0') +
    val(ide, 'nNF').padStart(9, '0') +
    val(ide, 'tpEmis') +
    val(ide, 'cNF')
  )
}

const serieNum = (ide) => Number(val(ide, 'serie'))

export default [
  {
    id: 'A03-10',
    verificar(n, falhar) {
      // NF avulsa (série 890-899) usa o CNPJ da SEFAZ da UF, que não está no XML.
      const serie = serieNum(n.ide)
      if (serie >= 890 && serie <= 899) return
      const esperada = chaveSemDv(n) + val(n.ide, 'cDV')
      if (n.chave !== esperada) falhar(n.inf, `Id="NFe${n.chave}", mas os campos formam NFe${esperada}`)
    },
  },
  {
    id: 'B23-10',
    verificar(n, falhar) {
      const corpo = chaveSemDv(n)
      const dv = dvChave(corpo)
      if (val(n.ide, 'cDV') !== String(dv)) falhar(el(n.ide, 'cDV'), `cDV=${val(n.ide, 'cDV')}; o DV de ${corpo} é ${dv}`)
    },
  },
  {
    id: 'B03-10',
    verificar({ ide }, falhar) {
      const cNF = val(ide, 'cNF')
      if (CNF_PROIBIDOS.has(cNF)) falhar(el(ide, 'cNF'), `cNF=${cNF} é sequência proibida`)
      else if (Number(cNF) === Number(val(ide, 'nNF'))) falhar(el(ide, 'cNF'), `cNF igual ao número da nota (${val(ide, 'nNF')})`)
    },
  },
  {
    id: 'B09-10',
    verificar({ ide, agora }, falhar) {
      const emissao = instante(val(ide, 'dhEmi'))
      if (emissao > agora.getTime() + 5 * MINUTO) {
        falhar(el(ide, 'dhEmi'), `emissão ${val(ide, 'dhEmi')} posterior ao recebimento (${agora.toISOString()}) além da tolerância de 5 minutos`)
      }
    },
  },
  {
    id: 'B09-20',
    verificar({ ide, agora }, falhar) {
      // Até 7 dias: autorizada (100). Depois: autorizada fora de prazo (150). Depois de 30 dias,
      // a critério da UF, só contingência (tpEmis 2, 4, 5, 9) é aceita; é esse caso que rejeita.
      const atraso = agora.getTime() - instante(val(ide, 'dhEmi'))
      if (atraso > 30 * DIA && !['2', '4', '5', '9'].includes(val(ide, 'tpEmis'))) {
        falhar(el(ide, 'dhEmi'), `emitida há ${Math.floor(atraso / DIA)} dias, fora de contingência; a UF pode rejeitar após 30 dias`)
      }
    },
  },
  {
    id: 'B09-40',
    verificar({ ide, agora, simplificada }, falhar) {
      if (!simplificada || !['1', '6', '7'].includes(val(ide, 'tpEmis'))) return
      const atraso = agora.getTime() - instante(val(ide, 'dhEmi'))
      if (atraso > 5 * MINUTO) falhar(el(ide, 'dhEmi'), `emitida ${Math.round(atraso / MINUTO)} minutos antes do recebimento; o limite é 5`)
    },
  },
  {
    id: 'B10-10',
    verificar({ ide, simplificada }, falhar) {
      if (simplificada && tem(ide, 'dhSaiEnt')) falhar(el(ide, 'dhSaiEnt'), 'dhSaiEnt informada em NFC-e ou NF-e com DANFE simplificado')
    },
  },
  {
    id: 'B10-40',
    verificar({ ide }, falhar) {
      if (val(ide, 'tpNF') !== '1' || !tem(ide, 'dhSaiEnt')) return
      if (instante(val(ide, 'dhSaiEnt')) < instante(val(ide, 'dhEmi'))) {
        falhar(el(ide, 'dhSaiEnt'), `saída ${val(ide, 'dhSaiEnt')} antes da emissão ${val(ide, 'dhEmi')}`)
      }
    },
  },
  {
    id: 'B10a-10',
    verificar({ ide }, falhar) {
      if (tem(ide, 'dPrevEntrega')) falhar(el(ide, 'dPrevEntrega'), 'dPrevEntrega informada em NFC-e')
    },
  },
  {
    id: 'B10a-20',
    verificar({ ide }, falhar) {
      const previsao = val(ide, 'dPrevEntrega')
      if (!previsao) return
      const saida = diaCivil(val(ide, 'dhSaiEnt') ?? val(ide, 'dhEmi'))
      const limite = somarMeses(saida, 3)
      if (previsao > limite) falhar(el(ide, 'dPrevEntrega'), `previsão ${previsao} depois de ${limite} (3 meses da saída ${saida})`)
    },
  },
  {
    id: 'B10a-30',
    verificar({ ide }, falhar) {
      const previsao = val(ide, 'dPrevEntrega')
      if (!previsao) return
      const saida = diaCivil(val(ide, 'dhSaiEnt') ?? val(ide, 'dhEmi'))
      if (previsao < saida) falhar(el(ide, 'dPrevEntrega'), `previsão ${previsao} antes da saída ${saida}`)
    },
  },
  {
    id: 'B10a-40',
    verificar({ ide }, falhar) {
      if (tem(ide, 'dPrevEntrega') && !['1', '4'].includes(val(ide, 'finNFe'))) {
        falhar(el(ide, 'dPrevEntrega'), `dPrevEntrega com finNFe=${val(ide, 'finNFe')}; só para 1 (normal) e 4 (devolução)`)
      }
    },
  },
  {
    id: 'B10a-50',
    verificar({ ide, transp }, falhar) {
      const modFrete = val(transp, 'modFrete')
      if (tem(ide, 'dPrevEntrega') && ['1', '4', '9'].includes(modFrete)) {
        falhar(el(ide, 'dPrevEntrega'), `dPrevEntrega com modFrete=${modFrete}`)
      }
    },
  },
  {
    id: 'B11-10',
    verificar({ ide, simplificada }, falhar) {
      if (simplificada && val(ide, 'tpNF') === '0') falhar(el(ide, 'tpNF'), 'operação de entrada (tpNF=0)')
    },
  },
  {
    id: 'B11a-10',
    verificar({ ide, simplificada }, falhar) {
      if (simplificada && val(ide, 'idDest') !== '1') falhar(el(ide, 'idDest'), `idDest=${val(ide, 'idDest')}; só operação interna (1)`)
    },
  },
  {
    id: 'B12-20',
    verificar({ ide }, falhar) {
      const cMunFG = val(ide, 'cMunFG')
      if (cMunFG.slice(0, 2) !== val(ide, 'cUF')) falhar(el(ide, 'cMunFG'), `cMunFG=${cMunFG} não é da UF ${val(ide, 'cUF')}`)
    },
  },
  {
    id: 'B21-10',
    verificar({ ide }, falhar) {
      const tpImp = val(ide, 'tpImp')
      if (tpImp !== '4' && tpImp !== '5') falhar(el(ide, 'tpImp'), `tpImp=${tpImp}; NFC-e usa 4 ou 5`)
    },
  },
  {
    id: 'B21-20',
    verificar({ ide }, falhar) {
      const tpImp = val(ide, 'tpImp')
      if (tpImp === '4' || tpImp === '5') falhar(el(ide, 'tpImp'), `tpImp=${tpImp} é de NFC-e`)
    },
  },
  {
    id: 'B22-10',
    verificar({ ide }, falhar) {
      if (val(ide, 'tpEmis') === '9' && val(ide, 'tpImp') !== '6') {
        falhar(el(ide, 'tpEmis'), 'contingência off-line (tpEmis=9) só com DANFE simplificado tipo 2 (tpImp=6)')
      }
    },
  },
  {
    id: 'B22-30',
    verificar({ ide }, falhar) {
      // Vale na autorização pela SEFAZ de origem. Na SVC o próprio tpEmis 6/7 é o esperado
      // (regra B22-60), mas o validador offline não sabe para onde a nota vai: acusa o 3-SCAN,
      // extinto, e deixa 6/7 passar.
      if (val(ide, 'tpEmis') === '3' && val(ide, 'mod') === '55') falhar(el(ide, 'tpEmis'), 'tpEmis=3 (SCAN) não é mais aceito')
    },
  },
  {
    id: 'B22-34',
    verificar({ ide }, falhar) {
      const tpEmis = val(ide, 'tpEmis')
      if (['2', '4', '5'].includes(tpEmis)) falhar(el(ide, 'tpEmis'), `tpEmis=${tpEmis} não é contingência válida para NFC-e`)
    },
  },
  {
    id: 'B25-20',
    verificar({ ide, simplificada }, falhar) {
      if (simplificada && val(ide, 'finNFe') !== '1') falhar(el(ide, 'finNFe'), `finNFe=${val(ide, 'finNFe')}; só 1 (normal)`)
    },
  },
  {
    id: 'B25a-10',
    verificar({ ide, simplificada }, falhar) {
      if (simplificada && val(ide, 'indFinal') === '0') falhar(el(ide, 'indFinal'), 'operação não destinada a consumidor final')
    },
  },
  {
    id: 'B25b-10',
    verificar({ ide }, falhar) {
      // A NT 2026.002 passou a admitir indPres=4 na NF-e com DANFE simplificado tipo 2.
      if (val(ide, 'indPres') === '4' && val(ide, 'tpImp') !== '6') falhar(el(ide, 'indPres'), 'indPres=4 (entrega a domicílio) é de NFC-e')
    },
  },
  {
    id: 'B25b-20',
    verificar({ ide, simplificada }, falhar) {
      const indPres = val(ide, 'indPres')
      if (simplificada && !['1', '4', '5'].includes(indPres)) falhar(el(ide, 'indPres'), `indPres=${indPres}; aceitos 1, 4 e 5`)
    },
  },
  {
    id: 'B25b-40',
    verificar({ ide }, falhar) {
      if (val(ide, 'indPres') !== '5') return
      const refs = todos(ide, 'NFref')
      if (!refs.some((r) => tem(r, 'refNFe') || tem(r, 'refNF'))) {
        falhar(el(ide, 'indPres'), 'operação presencial fora do estabelecimento sem NF-e ou NF referenciada')
      }
    },
  },
  {
    id: 'B25c-10',
    verificar({ ide, det }, falhar) {
      if (!['1', '2', '3', '4', '9'].includes(val(ide, 'indPres'))) return
      if (val(ide, 'tpNF') !== '1' || val(ide, 'finNFe') !== '1' || tem(ide, 'indIntermed')) return
      const isentos = /^530[1-7]$|^520[5-7]$|^525[1-8]$/
      if (det.some((d) => isentos.test(val(d, 'prod/CFOP')))) return
      falhar(ide, `indPres=${val(ide, 'indPres')} em venda: falta indIntermed`)
    },
  },
  {
    id: 'B25c-20',
    verificar({ ide }, falhar) {
      if (!['1', '2', '3', '4', '9'].includes(val(ide, 'indPres')) && val(ide, 'indIntermed') === '1') {
        falhar(el(ide, 'indIntermed'), `indIntermed=1 com indPres=${val(ide, 'indPres')}`)
      }
    },
  },
  {
    id: 'B26-10',
    verificar({ ide }, falhar) {
      const procEmi = val(ide, 'procEmi')
      const serie = serieNum(ide)
      if ((procEmi === '0' || procEmi === '3') && !((serie >= 0 && serie <= 889) || (serie >= 920 && serie <= 969))) {
        falhar(el(ide, 'serie'), `série ${serie} fora das faixas do contribuinte (0-889, 920-969)`)
      } else if (procEmi !== '4' && serie >= 970 && serie <= 979) {
        falhar(el(ide, 'serie'), `série ${serie} é exclusiva do PAA`)
      }
    },
  },
  {
    id: 'B26-20',
    verificar({ ide }, falhar) {
      const procEmi = val(ide, 'procEmi')
      const serie = serieNum(ide)
      if ((procEmi === '1' || procEmi === '2') && !(serie >= 890 && serie <= 919)) {
        falhar(el(ide, 'serie'), `emissão pelo fisco com série ${serie}; esperado 890-919`)
      } else if (procEmi === '4' && !(serie >= 970 && serie <= 979)) {
        falhar(el(ide, 'serie'), `emissão por PAA com série ${serie}; esperado 970-979`)
      }
    },
  },
  {
    id: 'B26-26',
    verificar({ ide, inf }, falhar) {
      if (val(ide, 'procEmi') === '4' && !tem(inf, 'infPAA')) falhar(el(ide, 'procEmi'), 'procEmi=4 sem o grupo infPAA')
    },
  },
  {
    id: 'B26-28',
    verificar({ ide, inf }, falhar) {
      if (val(ide, 'procEmi') !== '4' && tem(inf, 'infPAA')) falhar(el(inf, 'infPAA'), `grupo infPAA com procEmi=${val(ide, 'procEmi')}`)
    },
  },
  {
    id: 'B26-30',
    verificar({ ide }, falhar) {
      const procEmi = val(ide, 'procEmi')
      const tpEmis = val(ide, 'tpEmis')
      if ((procEmi === '1' || procEmi === '2') && !['1', '6', '7'].includes(tpEmis)) {
        // Exceção da NT: SC aceita 9 (off-line da NFC-e).
        if (tpEmis === '9' && val(ide, 'cUF') === '42') return
        falhar(el(ide, 'tpEmis'), `emissão pelo fisco com tpEmis=${tpEmis}`)
      }
    },
  },
  {
    id: 'B26-50',
    verificar({ ide }, falhar) {
      const procEmi = val(ide, 'procEmi')
      if (val(ide, 'tpEmis') === '3' || procEmi === '0') return
      if (val(ide, 'cUF') === '42' && (procEmi === '1' || procEmi === '2')) return
      falhar(el(ide, 'procEmi'), `procEmi=${procEmi}; NFC-e é emitida pelo aplicativo do contribuinte (0)`)
    },
  },
  {
    id: 'B28-10',
    verificar({ ide }, falhar) {
      if (val(ide, 'tpEmis') === '1' && (tem(ide, 'dhCont') || tem(ide, 'xJust'))) {
        falhar(el(ide, 'dhCont') ?? el(ide, 'xJust'), 'emissão normal com dados de contingência')
      }
    },
  },
  {
    id: 'B28-20',
    verificar({ ide }, falhar) {
      if (['2', '4', '5', '9'].includes(val(ide, 'tpEmis')) && !(tem(ide, 'dhCont') && tem(ide, 'xJust'))) {
        falhar(el(ide, 'tpEmis'), `contingência (tpEmis=${val(ide, 'tpEmis')}) sem dhCont e xJust`)
      }
    },
  },
]

export { chaveSemDv }
