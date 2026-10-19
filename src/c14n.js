// Canonical XML 1.0 sem comentários (http://www.w3.org/TR/2001/REC-xml-c14n-20010315), o único
// algoritmo que o schema da NF-e aceita na assinatura. A SEFAZ calcula o hash sobre esta forma,
// não sobre os bytes do arquivo: aspas, ordem de atributos, tags vazias e entidades mudam no
// texto mas não mudam o resultado.

/**
 * Forma canônica de um elemento e seus descendentes, como subconjunto do documento cuja raiz é
 * `raiz` (por padrão, a raiz do documento lido). Os namespaces declarados nos ancestrais até
 * `raiz` entram no elemento de topo, como manda a canonicalização inclusiva.
 *
 * `raiz` existe para a nota dentro de um nfeProc: a assinatura foi feita sobre a NFe sozinha,
 * antes de o protocolo de autorização ser juntado, então os prefixos que o nfeProc declara não
 * contam. O namespace padrão conta: há emissor que tira o xmlns da <NFe> ao montar o nfeProc,
 * e a nota continua no namespace da NF-e, que estava declarado quando ela foi assinada.
 */
export function canonizar(elemento, raiz = topo(elemento)) {
  const herdados = new Map()
  let dentro = false
  const ancestrais = []
  for (let n = elemento.pai; n; n = n.pai) ancestrais.unshift(n)
  for (const a of ancestrais) {
    if (a === raiz) dentro = true
    for (const [p, uri] of a.namespaces) if (dentro || p === '') herdados.set(p, uri)
  }
  const partes = []
  escrever(elemento, herdados, new Map(), partes)
  return partes.join('')
}

function topo(no) {
  while (no.pai) no = no.pai
  return no
}

function escrever(no, escopoPai, renderizadosPai, partes) {
  const escopo = new Map(escopoPai)
  for (const [p, uri] of no.namespaces) escopo.set(p, uri)

  // Declaração sai quando difere da que o ancestral mais próximo na saída já escreveu.
  const renderizados = new Map(renderizadosPai)
  const declaracoes = []
  for (const [p, uri] of escopo) {
    if (p === 'xml') continue
    const anterior = renderizadosPai.get(p)
    if (p === '' && uri === '' && !anterior) continue
    if (anterior === uri) continue
    renderizados.set(p, uri)
    declaracoes.push([p, uri])
  }
  declaracoes.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))

  const atributos = [...no.atributos].sort((a, b) => {
    const nsA = a.ns ?? ''
    const nsB = b.ns ?? ''
    if (nsA !== nsB) return nsA < nsB ? -1 : 1
    return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0
  })

  let abre = `<${no.nomeQualificado}`
  for (const [p, uri] of declaracoes) abre += ` ${p ? `xmlns:${p}` : 'xmlns'}="${escaparAtributo(uri)}"`
  for (const a of atributos) abre += ` ${a.prefixo ? `${a.prefixo}:${a.nome}` : a.nome}="${escaparAtributo(a.valor)}"`
  partes.push(abre + '>')

  for (const f of no.filhos) {
    if (f.tipo === 'elemento') escrever(f, escopo, renderizados, partes)
    else if (f.tipo === 'texto') partes.push(escaparTexto(f.valor))
    else if (f.tipo === 'instrucao') partes.push(`<?${f.alvo}${f.valor ? ' ' + f.valor : ''}?>`)
  }
  partes.push(`</${no.nomeQualificado}>`)
}

function escaparTexto(s) {
  return s.replace(/[&<>\r]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\r': '&#xD;' })[c])
}

function escaparAtributo(s) {
  return s.replace(/[&<"\t\n\r]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', '\t': '&#x9;', '\n': '&#xA;', '\r': '&#xD;' })[c])
}
