// Grupos C a GA: emitente, avulsa, destinatário, locais de retirada e entrega, autorização de
// download do XML.

import { el, tem, todos, val } from '../consulta.js'
import { cnpjValido, cpfValido } from './util.js'

const serieNum = (ide) => Number(val(ide, 'serie'))
const entre = (x, a, b) => x >= a && x <= b

// Exceções que se repetem nas regras de operação com exterior.
function combustivelParaExterior(det) {
  return det.some((d) => val(d, 'prod/comb/UFCons') === 'EX' && val(d, 'prod/CFOP') === '7667')
}
function cfopExportacaoEspecial(det) {
  return det.some((d) => ['7552', '7501'].includes(val(d, 'prod/CFOP')))
}
const excecaoExterior = (det) => combustivelParaExterior(det) || cfopExportacaoEspecial(det)

// Municípios da ZFM e das ALC (NT 2025.002, regra C22-10).
const AREA_INCENTIVADA = new Set([
  '1302603', '1303569', '1301902', '1304062', '1600303', '1600600', '1100106', '1400100', '1400159',
  '1200104', '1200252', '1200203',
])

// UFs que não aceitam destinatário contribuinte isento de IE (E16a-30).
const UF_SEM_ISENTO = new Set(['AL', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MG', 'MS', 'MT', 'PB', 'PE', 'RJ', 'RN', 'RS', 'SE', 'SP'])

function cnpjInvalido(no, caminhoCnpj) {
  const cnpj = val(no, caminhoCnpj)
  return cnpj !== undefined && !cnpjValido(cnpj)
}
function cpfInvalido(no, caminhoCpf) {
  const cpf = val(no, caminhoCpf)
  return cpf !== undefined && !cpfValido(cpf)
}

// Exceções 1, 2 e 4 da E16a-30/35: ST destacado ou retido, ou item isento, imune ou não tributado.
function isentoDispensado(det) {
  return det.some((d) => {
    const grupos = todos(d, 'imposto/ICMS').flatMap((i) => i.filhos.filter((f) => f.tipo === 'elemento'))
    return grupos.some((g) => {
      const c = val(g, 'CST') ?? val(g, 'CSOSN')
      return tem(g, 'vICMSST') || tem(g, 'vICMSSTRet') || ['40', '41', '103', '300', '400'].includes(c)
    })
  })
}

// Regra comum das UFs de origem e destino (E12-30 a E12-60).
function ufsDivergentes({ ide, emit, dest, inf, det }) {
  const tpNF = val(ide, 'tpNF')
  const idDest = val(ide, 'idDest')
  const ufEmit = val(emit, 'enderEmit/UF')
  const ufDest = val(dest, 'enderDest/UF')
  const ufEntrega = val(inf, 'entrega/UF')
  const ufRetirada = val(inf, 'retirada/UF')
  // Na entrada, origem e destino da mercadoria se invertem.
  const [origem, destino] = tpNF === '1' ? [ufEmit, ufDest] : [ufDest, ufEmit]
  if (idDest === '2') {
    if (ufDest !== ufEmit) return null
    if ((val(emit, 'CNPJ') ?? val(emit, 'CPF')) === (val(dest, 'CNPJ') ?? val(dest, 'CPF'))) return null
    if (det.some((d) => tem(d, 'prod/comb/UFCons') && val(d, 'prod/comb/UFCons') !== ufEmit)) return null
    if (ufEntrega && !ufRetirada && ufEntrega !== origem) return null
    if (ufRetirada && !ufEntrega && ufRetirada !== destino) return null
    if (ufEntrega && ufRetirada && ufEntrega !== ufRetirada) return null
    return `operação interestadual (idDest=2) com emitente e destinatário em ${ufEmit}`
  }
  if (idDest === '1' && val(ide, 'indFinal') !== '1') {
    if (ufDest === ufEmit) return null
    if (det.some((d) => val(d, 'prod/comb/UFCons') === ufEmit)) return null
    if (ufEntrega && !ufRetirada && ufEntrega === origem) return null
    if (ufRetirada && !ufEntrega && ufRetirada === destino) return null
    if (ufEntrega && ufRetirada && ufEntrega === ufRetirada) return null
    return `operação interna (idDest=1) entre ${ufEmit} e ${ufDest}`
  }
  return null
}

export default [
  // --- Emitente --------------------------------------------------------------------------
  {
    id: 'C02-10',
    verificar({ emit }, falhar) {
      if (cnpjInvalido(emit, 'CNPJ')) falhar(el(emit, 'CNPJ'), `CNPJ ${val(emit, 'CNPJ')} com dígito verificador inválido`)
    },
  },
  {
    id: 'C02-30',
    verificar({ ide, emit }, falhar) {
      const serie = serieNum(ide)
      if (tem(emit, 'CNPJ') && !(entre(serie, 0, 909) || entre(serie, 980, 989))) {
        falhar(el(ide, 'serie'), `série ${serie} fora das faixas de emitente CNPJ (0-909, 980-989)`)
      }
    },
  },
  {
    id: 'C02a-04',
    verificar({ ide, emit }, falhar) {
      if (tem(emit, 'CPF') && val(ide, 'tpEmis') !== '3') falhar(el(emit, 'CPF'), 'NFC-e com emitente CPF')
    },
  },
  {
    id: 'C02a-08',
    verificar({ emit }, falhar) {
      if (tem(emit, 'CPF')) falhar(el(emit, 'CPF'), 'NF-e com emitente CPF; a UF pode recusar')
    },
  },
  {
    id: 'C02a-10',
    verificar({ ide, emit }, falhar) {
      const serie = serieNum(ide)
      if (tem(emit, 'CPF') && val(ide, 'tpEmis') !== '3' && !(entre(serie, 890, 899) || entre(serie, 910, 979))) {
        falhar(el(ide, 'serie'), `série ${serie} fora das faixas de emitente CPF (890-899, 910-979)`)
      }
    },
  },
  {
    id: 'C02a-20',
    verificar({ emit }, falhar) {
      if (cpfInvalido(emit, 'CPF')) falhar(el(emit, 'CPF'), `CPF ${val(emit, 'CPF')} inválido`)
    },
  },
  {
    id: 'C10-20',
    verificar({ ide, emit }, falhar) {
      const cMun = val(emit, 'enderEmit/cMun')
      if (cMun.slice(0, 2) !== val(ide, 'cUF')) falhar(el(emit, 'enderEmit/cMun'), `município ${cMun} não é da UF ${val(ide, 'cUF')}`)
    },
  },
  {
    id: 'C17-30',
    verificar({ ide, emit, modelo }, falhar) {
      if (val(emit, 'IE') !== 'ISENTO') return
      if (modelo === '65' || !entre(serieNum(ide), 890, 919)) falhar(el(emit, 'IE'), 'IE "ISENTO" só na nota avulsa (série 890-919)')
    },
  },
  {
    id: 'C17-42',
    verificar({ ide, emit }, falhar) {
      const ano = Number(val(ide, 'dhEmi').slice(0, 4))
      if (!tem(emit, 'IE') && ano < 2033) falhar(emit, 'NFC-e de emitente sem IE (contribuinte só de IBS/CBS)')
    },
  },
  {
    id: 'C17-43',
    verificar({ emit }, falhar) {
      if (!tem(emit, 'IE') && !tem(emit, 'CNPJ')) falhar(emit, 'emitente sem IE precisa informar CNPJ')
    },
  },
  {
    id: 'C18-10',
    verificar({ emit, simplificada }, falhar) {
      if (simplificada && tem(emit, 'IEST')) falhar(el(emit, 'IEST'), 'IEST em NFC-e ou NF-e com DANFE simplificado')
    },
  },
  {
    id: 'C18-14',
    verificar({ ide, emit }, falhar) {
      if (tem(emit, 'IEST') && ['1', '3'].includes(val(ide, 'idDest'))) {
        falhar(el(emit, 'IEST'), `IEST em operação ${val(ide, 'idDest') === '1' ? 'interna' : 'com exterior'}; a UF pode aceitar na interna`)
      }
    },
  },
  {
    id: 'C18-20',
    verificar({ emit, det, inf }, falhar) {
      const faturamentoDireto = det.some((d) => val(d, 'prod/veicProd/tpOp') === '2')
      if (tem(emit, 'IEST') && faturamentoDireto && !tem(inf, 'entrega/UF')) {
        falhar(el(emit, 'IEST'), 'faturamento direto de veículo novo sem UF do local de entrega')
      }
    },
  },
  {
    id: 'C18-40',
    verificar({ emit, dest }, falhar) {
      const iest = val(emit, 'IEST')
      if (iest && (iest === val(emit, 'IE') || iest === val(dest, 'IE'))) falhar(el(emit, 'IEST'), `IEST ${iest} igual à IE do emitente ou do destinatário`)
    },
  },
  {
    id: 'C18-50',
    verificar({ emit }, falhar) {
      if (!tem(emit, 'IE') && tem(emit, 'IEST')) falhar(el(emit, 'IEST'), 'IEST sem IE do emitente')
    },
  },
  {
    id: 'C22-10',
    verificar({ emit }, falhar) {
      const cMun = val(emit, 'enderEmit/cMun')
      if (tem(emit, 'ISUFEmit') && !AREA_INCENTIVADA.has(cMun)) {
        falhar(el(emit, 'ISUFEmit'), `inscrição SUFRAMA com município ${cMun}, fora da ZFM e das ALC`)
      }
    },
  },

  // --- Avulsa ----------------------------------------------------------------------------
  {
    id: 'D01-10',
    verificar({ ide, inf }, falhar) {
      if (tem(inf, 'avulsa') && !['1', '2'].includes(val(ide, 'procEmi'))) falhar(el(inf, 'avulsa'), 'grupo avulsa em nota emitida pela empresa')
    },
  },
  {
    id: 'D01-20',
    verificar({ ide, inf }, falhar) {
      if (['1', '2'].includes(val(ide, 'procEmi')) && !tem(inf, 'avulsa')) falhar(el(ide, 'procEmi'), 'emissão pelo fisco sem o grupo avulsa')
    },
  },

  // --- Destinatário ----------------------------------------------------------------------
  {
    id: 'E01-10',
    verificar({ dest, inf }, falhar) {
      if (!dest) falhar(inf, 'NF-e sem o grupo dest')
    },
  },
  {
    id: 'E01-20',
    verificar({ ide, dest, inf, simplificada }, falhar) {
      if (simplificada && val(ide, 'indPres') === '4' && !dest) falhar(inf, 'venda com entrega em domicílio sem destinatário')
    },
  },
  {
    id: 'E02-10',
    verificar({ dest }, falhar) {
      if (cnpjInvalido(dest, 'CNPJ')) falhar(el(dest, 'CNPJ'), `CNPJ ${val(dest, 'CNPJ')} com dígito verificador inválido`)
    },
  },
  {
    id: 'E02-20',
    verificar({ emit, dest }, falhar) {
      if (tem(dest, 'CNPJ') && val(dest, 'CNPJ') === val(emit, 'CNPJ')) falhar(el(dest, 'CNPJ'), 'destinatário com o CNPJ do emitente')
    },
  },
  {
    id: 'E03-10',
    verificar({ dest }, falhar) {
      if (cpfInvalido(dest, 'CPF')) falhar(el(dest, 'CPF'), `CPF ${val(dest, 'CPF')} inválido`)
    },
  },
  {
    id: 'E03a-10',
    verificar({ ide, dest, det }, falhar) {
      if (val(ide, 'idDest') !== '3' || !dest || tem(dest, 'idEstrangeiro')) return
      if (cfopExportacaoEspecial(det)) return
      if (tem(dest, 'CNPJ') && val(dest, 'enderDest/cPais') === '1058' && combustivelParaExterior(det)) return
      falhar(dest, 'operação com exterior sem idEstrangeiro')
    },
  },
  {
    id: 'E03a-20',
    verificar({ ide, dest }, falhar) {
      if (val(ide, 'idDest') !== '3' && tem(dest, 'idEstrangeiro') && val(ide, 'indFinal') !== '1') {
        falhar(el(dest, 'idEstrangeiro'), 'idEstrangeiro fora de operação com exterior e sem consumidor final')
      }
    },
  },
  {
    id: 'E03a-30',
    verificar({ dest }, falhar) {
      if (tem(dest, 'idEstrangeiro') && tem(dest, 'IE')) falhar(el(dest, 'IE'), 'IE junto com idEstrangeiro')
    },
  },
  {
    id: 'E03a-60',
    verificar({ dest }, falhar) {
      const id = val(dest, 'idEstrangeiro')
      if (id && !/^[A-Za-z0-9:.+\-/() ]*$/.test(id)) falhar(el(dest, 'idEstrangeiro'), `idEstrangeiro "${id}" com caractere fora de [A-Za-z0-9:.+-/() ]`)
    },
  },
  {
    id: 'E04-10',
    verificar({ dest }, falhar) {
      if (dest && !tem(dest, 'xNome')) falhar(dest, 'destinatário sem xNome')
    },
  },
  {
    id: 'E04-20',
    verificar({ ide, dest }, falhar) {
      const literal = 'NF-E EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL'
      if (val(ide, 'tpAmb') !== '2' || val(ide, 'tpEmis') === '3' || !tem(dest, 'xNome')) return
      if (val(dest, 'xNome') !== literal) falhar(el(dest, 'xNome'), `em homologação o xNome do destinatário deve ser "${literal}"`)
    },
  },
  {
    id: 'E05-10',
    verificar({ dest }, falhar) {
      if (dest && !tem(dest, 'enderDest')) falhar(dest, 'destinatário sem enderDest')
    },
  },
  {
    id: 'E05-20',
    verificar({ ide, dest }, falhar) {
      if (val(ide, 'indPres') === '4' && dest && !tem(dest, 'enderDest')) falhar(dest, 'entrega em domicílio sem endereço do destinatário')
    },
  },
  {
    id: 'E10-20',
    verificar({ dest }, falhar) {
      const uf = val(dest, 'enderDest/UF')
      const cMun = val(dest, 'enderDest/cMun')
      if (!uf || uf === 'EX') return
      if (cMun.slice(0, 2) !== CODIGO_UF[uf]) falhar(el(dest, 'enderDest/cMun'), `município ${cMun} não é de ${uf}`)
    },
  },
  {
    id: 'E10-30',
    verificar({ dest }, falhar) {
      if (val(dest, 'enderDest/UF') === 'EX' && val(dest, 'enderDest/cMun') !== '9999999') {
        falhar(el(dest, 'enderDest/cMun'), 'destinatário no exterior com cMun diferente de 9999999')
      }
    },
  },
  {
    id: 'E12-10',
    verificar({ ide, dest, det }, falhar) {
      if (val(ide, 'idDest') === '3' && tem(dest, 'enderDest') && val(dest, 'enderDest/UF') !== 'EX' && !excecaoExterior(det)) {
        falhar(el(dest, 'enderDest/UF'), `operação com exterior e UF do destinatário ${val(dest, 'enderDest/UF')}`)
      }
    },
  },
  {
    id: 'E12-30',
    verificar(n, falhar) {
      if (val(n.ide, 'tpNF') !== '1' || !tem(n.dest, 'enderDest')) return
      const motivo = val(n.ide, 'idDest') === '2' && ufsDivergentes(n)
      if (motivo) falhar(el(n.ide, 'idDest'), motivo)
    },
  },
  {
    id: 'E12-40',
    verificar(n, falhar) {
      if (val(n.ide, 'tpNF') !== '1' || !tem(n.dest, 'enderDest')) return
      const motivo = val(n.ide, 'idDest') === '1' && ufsDivergentes(n)
      if (motivo) falhar(el(n.ide, 'idDest'), motivo)
    },
  },
  {
    id: 'E12-50',
    verificar(n, falhar) {
      if (val(n.ide, 'tpNF') !== '0' || !tem(n.dest, 'enderDest')) return
      const motivo = val(n.ide, 'idDest') === '2' && ufsDivergentes(n)
      if (motivo) falhar(el(n.ide, 'idDest'), motivo)
    },
  },
  {
    id: 'E12-60',
    verificar(n, falhar) {
      if (val(n.ide, 'tpNF') !== '0' || !tem(n.dest, 'enderDest')) return
      const motivo = val(n.ide, 'idDest') === '1' && ufsDivergentes(n)
      if (motivo) falhar(el(n.ide, 'idDest'), motivo)
    },
  },
  {
    id: 'E14-10',
    verificar({ ide, dest, det }, falhar) {
      if (val(ide, 'idDest') !== '3' || !tem(dest, 'enderDest') || excecaoExterior(det)) return
      const cPais = val(dest, 'enderDest/cPais')
      if (!cPais || Number(cPais) === 1058) falhar(el(dest, 'enderDest'), `operação com exterior e cPais ${cPais ?? 'ausente'}`)
    },
  },
  {
    id: 'E14-20',
    verificar({ ide, dest }, falhar) {
      const cPais = val(dest, 'enderDest/cPais')
      if (val(ide, 'idDest') !== '3' && cPais && Number(cPais) !== 1058 && !val(dest, 'idEstrangeiro')) {
        falhar(el(dest, 'enderDest/cPais'), `operação no país com cPais ${cPais}`)
      }
    },
  },
  {
    id: 'E14-30',
    verificar({ dest }, falhar) {
      if (val(dest, 'enderDest/UF') === 'EX' && Number(val(dest, 'enderDest/cPais')) === 1058) {
        falhar(el(dest, 'enderDest/cPais'), 'destinatário no exterior com cPais 1058 (Brasil)')
      }
    },
  },
  {
    id: 'E16a-10',
    verificar({ dest }, falhar) {
      if (dest && val(dest, 'indIEDest') !== '9') falhar(el(dest, 'indIEDest'), `indIEDest=${val(dest, 'indIEDest')}; NFC-e só para não contribuinte (9)`)
    },
  },
  {
    id: 'E16a-20',
    verificar({ ide, dest, det }, falhar) {
      if (val(ide, 'idDest') === '3' && dest && val(dest, 'indIEDest') !== '9' && !excecaoExterior(det)) {
        falhar(el(dest, 'indIEDest'), `operação com exterior e indIEDest=${val(dest, 'indIEDest')}`)
      }
    },
  },
  {
    id: 'E16a-30',
    verificar({ ide, dest, det }, falhar) {
      const uf = val(dest, 'enderDest/UF')
      if (val(dest, 'indIEDest') !== '2' || !['1', '2'].includes(val(ide, 'idDest')) || !UF_SEM_ISENTO.has(uf)) return
      if (isentoDispensado(det)) return
      falhar(el(dest, 'indIEDest'), `${uf} não aceita destinatário contribuinte isento de IE`)
    },
  },
  {
    id: 'E16a-40',
    verificar({ ide, dest }, falhar) {
      if (val(dest, 'indIEDest') === '9' && val(ide, 'indFinal') !== '1' && val(ide, 'tpNF') === '1' && val(ide, 'idDest') !== '3') {
        falhar(el(dest, 'indIEDest'), 'saída para não contribuinte sem indicar consumidor final (indFinal=1)')
      }
    },
  },
  {
    id: 'E17-10',
    verificar({ ide, dest }, falhar) {
      if (val(ide, 'idDest') === '3' && tem(dest, 'IE')) falhar(el(dest, 'IE'), 'NFC-e para exterior com IE do destinatário')
    },
  },
  {
    id: 'E17-20',
    verificar({ dest }, falhar) {
      if (val(dest, 'indIEDest') === '1' && !tem(dest, 'IE')) falhar(el(dest, 'indIEDest'), 'destinatário contribuinte (indIEDest=1) sem IE')
    },
  },
  {
    id: 'E17-30',
    verificar({ dest }, falhar) {
      if (val(dest, 'indIEDest') === '2' && tem(dest, 'IE')) falhar(el(dest, 'IE'), 'destinatário isento (indIEDest=2) com IE')
    },
  },
  {
    id: 'E17-40',
    verificar({ dest }, falhar) {
      if (tem(dest, 'IE') && val(dest, 'enderDest/UF') === 'EX') falhar(el(dest, 'IE'), 'IE de destinatário no exterior')
    },
  },
  {
    id: 'E18-10',
    verificar({ dest }, falhar) {
      if (tem(dest, 'ISUF')) falhar(el(dest, 'ISUF'), 'NFC-e com inscrição SUFRAMA do destinatário')
    },
  },
  {
    id: 'E18-30',
    verificar({ dest }, falhar) {
      if (!tem(dest, 'ISUF')) return
      const uf = val(dest, 'enderDest/UF')
      const cMun = val(dest, 'enderDest/cMun')
      const permitido = ['AC', 'AM', 'RO', 'RR'].includes(uf) || (uf === 'AP' && ['1600303', '1600600'].includes(cMun))
      if (!permitido) falhar(el(dest, 'ISUF'), `inscrição SUFRAMA com destinatário em ${uf}`)
    },
  },

  // --- Retirada, entrega e autorização de download ---------------------------------------
  {
    id: 'F01-10',
    verificar({ inf, simplificada }, falhar) {
      if (simplificada && tem(inf, 'retirada')) falhar(el(inf, 'retirada'), 'local de retirada em NFC-e ou NF-e com DANFE simplificado')
    },
  },
  ...local('retirada', { cnpj: 'F02-10', cpf: 'F02a-10', exterior: 'F07-10', uf: 'F07-30' }),
  ...local('entrega', { cnpj: 'G02-10', cpf: 'G02a-10', exterior: 'G07-10', uf: 'G07-30' }),
  {
    id: 'GA02-10',
    verificar({ inf }, falhar) {
      for (const a of todos(inf, 'autXML')) if (cnpjInvalido(a, 'CNPJ')) falhar(el(a, 'CNPJ'), `CNPJ ${val(a, 'CNPJ')} inválido`)
    },
  },
  {
    id: 'GA03-10',
    verificar({ inf }, falhar) {
      for (const a of todos(inf, 'autXML')) if (cpfInvalido(a, 'CPF')) falhar(el(a, 'CPF'), `CPF ${val(a, 'CPF')} inválido`)
    },
  },
  {
    id: 'GA03-20',
    verificar({ inf, dest }, falhar) {
      const cpf = val(dest, 'CPF')
      for (const a of todos(inf, 'autXML')) if (cpf && val(a, 'CPF') === cpf) falhar(el(a, 'CPF'), 'autorização de download para o próprio destinatário')
    },
  },
]

// Regras iguais para retirada (F) e entrega (G).
function local(tag, ids) {
  return [
    {
      id: ids.cnpj,
      verificar({ inf }, falhar) {
        const l = el(inf, tag)
        if (cnpjInvalido(l, 'CNPJ')) falhar(el(l, 'CNPJ'), `CNPJ ${val(l, 'CNPJ')} inválido`)
      },
    },
    {
      id: ids.cpf,
      verificar({ inf }, falhar) {
        const l = el(inf, tag)
        if (cpfInvalido(l, 'CPF')) falhar(el(l, 'CPF'), `CPF ${val(l, 'CPF')} inválido`)
      },
    },
    {
      id: ids.exterior,
      verificar({ inf }, falhar) {
        const l = el(inf, tag)
        if (val(l, 'UF') === 'EX' && val(l, 'cMun') !== '9999999') falhar(el(l, 'cMun'), `${tag} no exterior com cMun diferente de 9999999`)
      },
    },
    {
      id: ids.uf,
      verificar({ inf }, falhar) {
        const l = el(inf, tag)
        const uf = val(l, 'UF')
        if (!l || uf === 'EX') return
        if (val(l, 'cMun').slice(0, 2) !== CODIGO_UF[uf]) falhar(el(l, 'cMun'), `município ${val(l, 'cMun')} não é de ${uf}`)
      },
    },
  ]
}

export const CODIGO_UF = {
  RO: '11', AC: '12', AM: '13', RR: '14', PA: '15', AP: '16', TO: '17', MA: '21', PI: '22', CE: '23',
  RN: '24', PB: '25', PE: '26', AL: '27', SE: '28', BA: '29', MG: '31', ES: '32', RJ: '33', SP: '35',
  PR: '41', SC: '42', RS: '43', MS: '50', MT: '51', GO: '52', DF: '53',
}
