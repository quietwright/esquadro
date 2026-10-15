// Compila os schemas XSD oficiais da NF-e num modelo em JSON que o validador do esquadro lê
// sem libxml e sem processar XSD em tempo de execução.
//
//   node scripts/compilar-xsd.mjs <nfe_v4.00.xsd> <saida.js>
//
// Cobre o subconjunto de XSD que os schemas da NF-e usam: element (com type, ref ou tipo
// anônimo), complexType com sequence/choice e attribute, simpleContent/extension, simpleType
// com restriction (enumeration, pattern, length, minLength, maxLength, whiteSpace,
// minInclusive), include, import e unique. Qualquer outra construção aborta a compilação,
// para que uma versão nova do pacote nunca seja compilada pela metade em silêncio.

import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { atributo, elementos, lerXml, texto } from '../src/xml.js'

const XS = 'http://www.w3.org/2001/XMLSchema'
const PREFIXOS = {
  'http://www.portalfiscal.inf.br/nfe': 'nfe',
  'http://www.w3.org/2000/09/xmldsig#': 'ds',
  [XS]: 'xs',
}
const NATIVOS = new Set(['string', 'token', 'ID', 'anyURI', 'base64Binary', 'gYearMonth', 'decimal'])

const [entrada, saida] = process.argv.slice(2)
if (!saida) {
  console.error('uso: node compilar-xsd.mjs <nfe_v4.00.xsd> <saida.js>')
  process.exit(2)
}

// --- Carga: lê o schema principal e tudo que ele inclui ou importa. ---------------------------

const globais = { element: new Map(), complexType: new Map(), simpleType: new Map() }
const arquivos = []
const lidos = new Set()
// Namespace-alvo efetivo de cada schema. Um schema sem targetNamespace incluído por outro
// ("chameleon include", caso do DFeTiposBasicos) assume o namespace de quem o inclui.
const alvos = new Map()

function carregar(arquivo, alvoHerdado = null) {
  if (lidos.has(arquivo)) return
  lidos.add(arquivo)
  const bruto = readFileSync(arquivo)
  arquivos.push({ arquivo: basename(arquivo), sha256: createHash('sha256').update(bruto).digest('hex') })
  const schema = lerXml(bruto.toString('utf8')).raiz
  const alvo = atributo(schema, 'targetNamespace') ?? alvoHerdado
  alvos.set(schema, alvo)
  for (const filho of elementos(schema)) {
    if (filho.ns !== XS) continue
    if (filho.nome === 'include' || filho.nome === 'import') {
      carregar(join(dirname(arquivo), atributo(filho, 'schemaLocation')), filho.nome === 'include' ? alvo : null)
    } else if (filho.nome in globais) {
      globais[filho.nome].set(chave(alvo, atributo(filho, 'name')), filho)
    } else if (filho.nome !== 'annotation') {
      throw new Error(`${basename(arquivo)}: construção global não suportada <${filho.nome}>`)
    }
  }
}

const chave = (ns, local) => `${PREFIXOS[ns] ?? ns}:${local}`

function prefixoParaNs(no, prefixo) {
  for (let n = no; n; n = n.pai) if (n.namespaces.has(prefixo)) return n.namespaces.get(prefixo)
  return null
}

function resolverNome(no, qnome) {
  const i = qnome.indexOf(':')
  const prefixo = i < 0 ? '' : qnome.slice(0, i)
  const local = i < 0 ? qnome : qnome.slice(i + 1)
  // Sem prefixo e sem namespace padrão, o nome é do namespace-alvo efetivo (chameleon).
  const ns = prefixoParaNs(no, prefixo) ?? (prefixo ? null : alvoDe(no))
  if (ns === null) throw new Error(`prefixo não declarado em "${qnome}"`)
  return { ns, local, chave: chave(ns, local) }
}

function alvoDe(no) {
  let n = no
  while (n.pai) n = n.pai
  return alvos.get(n)
}

// --- Compilação -----------------------------------------------------------------------------

const tipos = {}

function filhosXs(no) {
  return elementos(no).filter((f) => f.ns === XS && f.nome !== 'annotation')
}

function documentacao(no) {
  const anotacao = elementos(no).find((f) => f.ns === XS && f.nome === 'annotation')
  const doc = anotacao && elementos(anotacao).find((f) => f.nome === 'documentation')
  return doc ? texto(doc).replace(/\s+/g, ' ').trim() || undefined : undefined
}

function ocorrencias(no) {
  const min = atributo(no, 'minOccurs')
  const max = atributo(no, 'maxOccurs')
  return { min: min === undefined ? 1 : Number(min), max: max === undefined ? 1 : max === 'unbounded' ? null : Number(max) }
}

function referenciaDeTipo(no, qnome) {
  const { ns, local, chave: k } = resolverNome(no, qnome)
  if (ns === XS) {
    if (!NATIVOS.has(local)) throw new Error(`tipo nativo não suportado xs:${local}`)
    return k
  }
  if (!(k in tipos)) {
    if (globais.complexType.has(k)) compilarComplexo(globais.complexType.get(k), k)
    else if (globais.simpleType.has(k)) compilarSimples(globais.simpleType.get(k), k)
    else throw new Error(`tipo não encontrado ${k}`)
  }
  return k
}

function compilarSimples(no, k) {
  tipos[k] = null // marca em andamento
  const [restricao, ...resto] = filhosXs(no)
  if (!restricao || restricao.nome !== 'restriction' || resto.length) {
    throw new Error(`${k}: simpleType só é suportado com uma restriction`)
  }
  const base = referenciaDeTipo(restricao, atributo(restricao, 'base'))
  // Parte das facetas do tipo base: restrição só estreita.
  const herdado = tipos[base] ?? { t: 's', nativo: base }
  const tipo = { ...herdado, padroes: [...(herdado.padroes ?? [])] }
  const enumeracao = []
  const padroes = []
  for (const faceta of filhosXs(restricao)) {
    const valor = atributo(faceta, 'value')
    switch (faceta.nome) {
      case 'enumeration': enumeracao.push(valor); break
      case 'pattern': padroes.push(valor); break
      case 'length': case 'minLength': case 'maxLength': tipo[faceta.nome] = Number(valor); break
      case 'whiteSpace': tipo.whiteSpace = valor; break
      case 'minInclusive': tipo.minInclusive = valor; break
      default: throw new Error(`${k}: faceta não suportada <${faceta.nome}>`)
    }
  }
  if (enumeracao.length) tipo.enumeracao = enumeracao
  // Vários pattern na mesma restriction valem como "ou"; patterns de níveis diferentes, "e".
  if (padroes.length) tipo.padroes.push(padroes)
  if (!tipo.padroes.length) delete tipo.padroes
  tipos[k] = tipo
  return k
}

function compilarComplexo(no, k) {
  tipos[k] = null
  const tipo = { t: 'c', conteudo: null, atributos: [] }
  for (const filho of filhosXs(no)) {
    if (filho.nome === 'sequence' || filho.nome === 'choice') tipo.conteudo = particula(filho, k)
    else if (filho.nome === 'attribute') tipo.atributos.push(compilarAtributo(filho, k))
    else if (filho.nome === 'simpleContent') {
      const [extensao, ...resto] = filhosXs(filho)
      if (!extensao || extensao.nome !== 'extension' || resto.length) throw new Error(`${k}: simpleContent só com extension`)
      tipo.texto = referenciaDeTipo(extensao, atributo(extensao, 'base'))
      for (const a of filhosXs(extensao)) {
        if (a.nome !== 'attribute') throw new Error(`${k}: extension com <${a.nome}>`)
        tipo.atributos.push(compilarAtributo(a, k))
      }
    } else throw new Error(`${k}: complexType com <${filho.nome}> não suportado`)
  }
  tipos[k] = tipo
  return k
}

function compilarAtributo(no, dono) {
  const nome = atributo(no, 'name')
  const a = { nome, uso: atributo(no, 'use') ?? 'optional' }
  const fixo = atributo(no, 'fixed')
  if (fixo !== undefined) a.fixo = fixo
  const tipoNomeado = atributo(no, 'type')
  const anonimo = filhosXs(no).find((f) => f.nome === 'simpleType')
  if (tipoNomeado) a.tipo = referenciaDeTipo(no, tipoNomeado)
  else if (anonimo) a.tipo = compilarSimples(anonimo, `${dono}@${nome}`)
  else a.tipo = 'xs:string'
  return a
}

function particula(no, dono) {
  const itens = []
  for (const filho of filhosXs(no)) {
    if (filho.nome === 'element') itens.push(compilarElemento(filho, dono))
    else if (filho.nome === 'sequence' || filho.nome === 'choice') itens.push(particula(filho, dono))
    else throw new Error(`${dono}: <${filho.nome}> dentro de <${no.nome}> não suportado`)
  }
  return { t: no.nome === 'sequence' ? 'seq' : 'esc', ...ocorrencias(no), itens }
}

function compilarElemento(no, dono) {
  const ref = atributo(no, 'ref')
  if (ref) {
    const { ns, local, chave: k } = resolverNome(no, ref)
    const global = globais.element.get(k)
    if (!global) throw new Error(`elemento global não encontrado ${k}`)
    return { t: 'el', nome: local, ns: PREFIXOS[ns], tipo: tipoDoElemento(global, k), ...ocorrencias(no) }
  }
  const nome = atributo(no, 'name')
  const el = {
    t: 'el',
    nome,
    ns: PREFIXOS[alvoDe(no)],
    tipo: tipoDoElemento(no, `${dono}/${nome}`),
    ...ocorrencias(no),
  }
  const rotulo = documentacao(no)
  if (rotulo) el.rotulo = rotulo
  const unicos = filhosXs(no).filter((f) => f.nome === 'unique')
  if (unicos.length) {
    el.unicos = unicos.map((u) => {
      const seletor = atributo(filhosXs(u).find((f) => f.nome === 'selector'), 'xpath')
      const campo = atributo(filhosXs(u).find((f) => f.nome === 'field'), 'xpath')
      if (seletor !== './*' || !campo.startsWith('@')) throw new Error(`${dono}: unique ${seletor} ${campo} não suportado`)
      return { atributo: campo.slice(1) }
    })
  }
  return el
}

function tipoDoElemento(no, k) {
  const nomeado = atributo(no, 'type')
  if (nomeado) return referenciaDeTipo(no, nomeado)
  const anonimo = filhosXs(no).find((f) => f.nome === 'complexType' || f.nome === 'simpleType')
  if (!anonimo) return 'xs:string'
  return anonimo.nome === 'complexType' ? compilarComplexo(anonimo, k) : compilarSimples(anonimo, k)
}

carregar(entrada)
const raizes = {}
for (const [k, no] of globais.element) {
  if (!k.startsWith('nfe:')) continue
  raizes[k.slice(4)] = tipoDoElemento(no, k)
}

const modelo = { pacote: basename(dirname(entrada)), arquivos, raizes, tipos }
const cabecalho = `// Gerado por scripts/compilar-xsd.mjs a partir do pacote de schemas ${modelo.pacote}.\n// Não editar à mão.\n\n`
writeFileSync(saida, `${cabecalho}export default ${JSON.stringify(modelo, null, 1)}\n`)
console.error(`${modelo.pacote}: ${Object.keys(tipos).length} tipos, raízes ${Object.keys(raizes).join(', ')}`)
