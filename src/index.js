// esquadro: validação offline de NF-e e NFC-e com as regras da SEFAZ.
//
// A ordem segue a do autorizador: primeiro a mensagem (tamanho, codificação, XML bem formado),
// depois a área de dados (namespace, prefixos, caracteres de edição, schema) e só então as
// regras de negócio. Como na SEFAZ, regra de negócio só roda sobre XML que passou no schema:
// rodar antes produziria acusações sem sentido sobre campos ausentes ou malformados.

import catalogo from './catalogo.js'
import { validarEsquema } from './esquema.js'
import modelo from './esquema/nfe.js'
import { regras } from './regras/index.js'
import { contexto } from './regras/contexto.js'
import { ErroXml, atributo, caminho, elementos, lerXml } from './xml.js'

const NS_NFE = 'http://www.portalfiscal.inf.br/nfe'
const NS_DS = 'http://www.w3.org/2000/09/xmldsig#'
const LIMITE_BYTES = 500 * 1024

/**
 * @typedef {object} Problema
 * @property {string} regra       Id da regra no MOC/NT (ex.: "W16-10").
 * @property {number} cStat       Código que a SEFAZ devolveria.
 * @property {string} mensagem    Mensagem oficial da rejeição.
 * @property {'rejeicao'|'denegacao'|'alerta'} efeito
 * @property {'obrigatoria'|'facultativa'} aplicacao  Facultativa: a UF decide se aplica.
 * @property {string} [detalhe]   O que exatamente está errado neste XML.
 * @property {string} [caminho]   Onde (NFe/infNFe/det[2]/prod/vProd).
 * @property {number} [linha]
 * @property {number} [coluna]
 * @property {string} fonte       Documento e página de onde a regra vem.
 */

/**
 * Valida uma NF-e ou NFC-e (elemento NFe, ou nfeProc com a NFe dentro).
 *
 * @param {string|Uint8Array} xml
 * @param {object} [opcoes]
 * @param {Date} [opcoes.agora]  Instante de referência para regras de data (padrão: agora).
 *   Simula o horário de recebimento na SEFAZ.
 * @param {boolean} [opcoes.exigirAssinatura]  Trata a falta de Signature como falha de schema,
 *   como a SEFAZ. Por padrão a nota sem assinatura é validada e só recebe um aviso.
 * @returns {{valida: boolean, modelo: string|null, chave: string|null, problemas: Problema[], etapa: string}}
 */
export function validar(xml, opcoes = {}) {
  const problemas = []
  const resultado = (etapa, extra = {}) => ({
    valida: !problemas.some((p) => p.aplicacao === 'obrigatoria' && p.efeito !== 'alerta'),
    modelo: null,
    chave: null,
    ...extra,
    etapa,
    problemas,
  })
  const acusar = (id, onde, detalhe) => problemas.push(problema(id, onde, detalhe))
  // Aviso do próprio esquadro, que não é regra da SEFAZ e não invalida a nota.
  const avisar = (onde, detalhe) =>
    problemas.push({ regra: 'esquadro', cStat: null, mensagem: 'Aviso', efeito: 'alerta', aplicacao: 'facultativa', detalhe, caminho: caminho(onde), linha: onde.linha, coluna: onde.coluna, fonte: 'esquadro' })

  // --- Mensagem ---------------------------------------------------------------------------
  let textoXml = xml
  if (typeof xml !== 'string') {
    if (xml.byteLength > LIMITE_BYTES) acusar('B01', null, `${xml.byteLength} bytes; o limite é ${LIMITE_BYTES}`)
    try {
      textoXml = new TextDecoder('utf-8', { fatal: true }).decode(xml)
    } catch {
      acusar('D03', null, 'os bytes não são UTF-8 válido')
      return resultado('mensagem')
    }
  } else if (new TextEncoder().encode(xml).byteLength > LIMITE_BYTES) {
    acusar('B01', null, `o XML passa de ${LIMITE_BYTES} bytes`)
  }

  let doc
  try {
    doc = lerXml(textoXml)
  } catch (e) {
    if (!(e instanceof ErroXml)) throw e
    acusar('B02', { linha: e.linha, coluna: e.coluna }, e.descricao)
    return resultado('mensagem')
  }
  // A declaração de um nfeProc é a do arquivo guardado, não a da mensagem que foi enviada.
  const codificacao = doc.declaracao?.codificacao
  if (codificacao && codificacao.toUpperCase() !== 'UTF-8' && doc.raiz.nome === 'NFe') {
    acusar('D03', doc.raiz, `a declaração XML informa encoding="${codificacao}"`)
  }

  // --- Área de dados ----------------------------------------------------------------------
  const nfe = localizarNFe(doc.raiz)
  if (!nfe) {
    acusar('D01a', doc.raiz, `elemento raiz <${doc.raiz.nome}>; esperado <NFe> (ou <nfeProc> contendo <NFe>)`)
    return resultado('estrutura')
  }
  verificarEstrutura(nfe, acusar)
  const infNFe = elementos(nfe).find((e) => e.nome === 'infNFe')
  const versao = infNFe && atributo(infNFe, 'versao')
  if (infNFe && versao === undefined) acusar('D01b', infNFe, '<infNFe> sem o atributo versao')
  else if (versao !== undefined && versao !== '4.00') {
    acusar('B06', infNFe, `versao="${versao}"; o leiaute vigente é 4.00`)
    return resultado('estrutura')
  }

  // Modelo e chave, mesmo que o resto da nota esteja errado: ajudam a identificar o arquivo.
  const id = infNFe ? atributo(infNFe, 'Id') ?? '' : ''
  const identificacao = {
    modelo: elementos(elementos(infNFe ?? nfe).find((e) => e.nome === 'ide') ?? nfe).find((e) => e.nome === 'mod')?.filhos[0]?.valor ?? null,
    chave: /^NFe\w{44}$/.test(id) ? id.slice(3) : null,
  }
  // Nota sem assinatura: por padrão o esquadro valida mesmo assim (é o caso de quem confere
  // antes de assinar) e só avisa. Com { exigirAssinatura: true }, vira falha de schema como na SEFAZ.
  const semAssinatura = !elementos(nfe).some((e) => e.nome === 'Signature')
  if (semAssinatura && !opcoes.exigirAssinatura) avisar(nfe, 'nota sem assinatura (Signature); a SEFAZ exige, assine antes de enviar')
  const falhasDeEsquema = validarEsquema(modelo, nfe, { assinaturaOpcional: !opcoes.exigirAssinatura })
  for (const p of falhasDeEsquema) acusar('D01', p, p.detalhe)
  if (falhasDeEsquema.length) return resultado('esquema', identificacao)

  // --- Regras de negócio ------------------------------------------------------------------
  const ctx = contexto(nfe, opcoes)
  for (const regra of regras) {
    const meta = catalogo[regra.id]
    if (!meta) throw new Error(`regra ${regra.id} implementada mas ausente do catálogo`)
    if (meta.modelos && !meta.modelos.includes(ctx.modelo)) continue
    regra.verificar(ctx, (onde, detalhe) => acusar(regra.id, onde, detalhe))
  }
  return resultado('negocio', { modelo: ctx.modelo, chave: ctx.chave })
}

function localizarNFe(raiz) {
  if (raiz.nome === 'NFe') return raiz
  if (raiz.nome === 'nfeProc') return elementos(raiz).find((e) => e.nome === 'NFe') ?? null
  return null
}

// Validações D01d, D01e e D02 do MOC: namespace único, sem prefixo e sem caracteres de edição.
function verificarEstrutura(nfe, acusar) {
  let edicao = null
  let prefixo = null
  let outroNs = null
  const visitar = (no) => {
    if (!prefixo && no.prefixo) prefixo = no
    if (!outroNs) {
      // Só o namespace da NF-e, mais o da assinatura declarado em <Signature>.
      for (const [p, uri] of no.namespaces) {
        const permitido = uri === NS_NFE || (uri === NS_DS && !p && no.nome === 'Signature')
        if (!permitido) outroNs = { no, uri }
      }
      if (no.ns !== NS_NFE && no.ns !== NS_DS) outroNs ??= { no, uri: no.ns ?? '(nenhum)' }
    }
    const filhos = elementos(no)
    if (!edicao && filhos.length) {
      const solto = no.filhos.find((f) => f.tipo === 'texto' && f.valor.length && !f.valor.trim())
      if (solto) edicao = { no, solto }
    }
    for (const f of filhos) visitar(f)
  }
  // Espaço antes ou depois do elemento raiz não conta: num arquivo em disco é só a quebra de
  // linha final, e na transmissão a NF-e vai dentro do envelope montado pelo emissor.
  visitar(nfe)
  if (prefixo) acusar('D02', prefixo, `elemento <${prefixo.nomeQualificado}> usa prefixo de namespace`)
  if (outroNs) acusar('D01d', outroNs.no, `<${outroNs.no.nome}> no namespace ${outroNs.uri}`)
  if (edicao) {
    const descricao = JSON.stringify(edicao.solto.valor).slice(1, -1)
    acusar('D01e', { linha: edicao.solto.linha, coluna: edicao.solto.coluna, caminho: caminho(edicao.no) }, `"${descricao}" em <${edicao.no.nome}>`)
  }
}

function problema(id, onde, detalhe) {
  const meta = catalogo[id]
  if (!meta) throw new Error(`regra ${id} ausente do catálogo`)
  const p = {
    regra: id,
    cStat: meta.cStat,
    mensagem: meta.mensagem,
    efeito: meta.efeito,
    aplicacao: meta.aplicacao,
  }
  if (detalhe) p.detalhe = detalhe
  if (onde) {
    const c = onde.caminho ?? (onde.tipo === 'elemento' ? caminho(onde) : undefined)
    if (c) p.caminho = c
    if (onde.linha) {
      p.linha = onde.linha
      p.coluna = onde.coluna
    }
  }
  p.fonte = meta.fonte
  return p
}

export { catalogo, regras }
