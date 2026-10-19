// Parser de XML 1.0 sem dependências, feito para documentos fiscais.
//
// Diferente de um parser genérico, ele guarda o que a SEFAZ olha e um DOM costuma jogar fora:
// linha e coluna de cada nó, o texto "de edição" entre as tags (espaços, quebras de linha),
// as declarações de namespace e os prefixos usados, e os offsets de início e fim de cada
// elemento no texto original (a assinatura digital é calculada sobre esse trecho).
//
// Não aceita DTD. Documento fiscal não usa, e DTD é a porta de entrada de ataques de entidade.

export class ErroXml extends Error {
  constructor(mensagem, linha, coluna) {
    super(`${mensagem} (linha ${linha}, coluna ${coluna})`)
    this.name = 'ErroXml'
    this.descricao = mensagem
    this.linha = linha
    this.coluna = coluna
  }
}

const NS_XML = 'http://www.w3.org/XML/1998/namespace'
const NS_XMLNS = 'http://www.w3.org/2000/xmlns/'
const ENTIDADES = { lt: '<', gt: '>', amp: '&', apos: "'", quot: '"' }

// NameStartChar e NameChar da especificação XML 1.0 (5ª edição), §2.3.
const INICIO_DE_NOME =
  'A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D' +
  '\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\u{10000}-\\u{EFFFF}'
const RESTO_DE_NOME = INICIO_DE_NOME + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040'
const NOME = new RegExp(`[${INICIO_DE_NOME}:][${RESTO_DE_NOME}:]*`, 'uy')
// Char da especificação, §2.2: tudo menos controles C0 (exceto tab, LF, CR), surrogates soltos,
// U+FFFE e U+FFFF.
const CARACTERE_INVALIDO = /[^\t\n\r -퟿-�\u{10000}-\u{10FFFF}]/u

/**
 * Lê um documento XML.
 * @param {string} texto
 * @returns {Documento}
 */
export function lerXml(texto) {
  return new Leitor(texto).documento()
}

class Leitor {
  constructor(texto) {
    this.texto = texto
    this.pos = 0
    // Posições onde cada linha começa, para converter offset em linha/coluna sob demanda.
    this.inicioDasLinhas = [0]
    for (let i = 0; i < texto.length; i++) if (texto[i] === '\n') this.inicioDasLinhas.push(i + 1)
  }

  localizar(pos) {
    let baixo = 0
    let alto = this.inicioDasLinhas.length - 1
    while (baixo < alto) {
      const meio = (baixo + alto + 1) >> 1
      if (this.inicioDasLinhas[meio] <= pos) baixo = meio
      else alto = meio - 1
    }
    return { linha: baixo + 1, coluna: pos - this.inicioDasLinhas[baixo] + 1 }
  }

  erro(mensagem, pos = this.pos) {
    const { linha, coluna } = this.localizar(pos)
    return new ErroXml(mensagem, linha, coluna)
  }

  vem(s) {
    return this.texto.startsWith(s, this.pos)
  }

  exigir(s) {
    if (!this.vem(s)) throw this.erro(`esperado "${s}"`)
    this.pos += s.length
  }

  espacos() {
    const inicio = this.pos
    while (this.pos < this.texto.length && ' \t\r\n'.includes(this.texto[this.pos])) this.pos++
    return this.pos > inicio
  }

  nome() {
    NOME.lastIndex = this.pos
    const m = NOME.exec(this.texto)
    if (!m) throw this.erro('nome inválido')
    this.pos += m[0].length
    return m[0]
  }

  documento() {
    const doc = { tipo: 'documento', declaracao: null, bom: false, antes: [], raiz: null, depois: [] }
    if (this.texto.charCodeAt(0) === 0xfeff) {
      doc.bom = true
      this.pos = 1
    }
    const invalido = this.texto.match(CARACTERE_INVALIDO)
    if (invalido) {
      const codigo = invalido[0].codePointAt(0).toString(16).toUpperCase().padStart(4, '0')
      throw this.erro(`caractere não permitido em XML (U+${codigo})`, invalido.index)
    }
    if (this.vem('<?xml') && /[\s?]/.test(this.texto[this.pos + 5] ?? '')) doc.declaracao = this.declaracao()
    this.miscelanea(doc.antes)
    if (this.vem('<!DOCTYPE')) throw this.erro('DTD (<!DOCTYPE>) não é aceito')
    if (!this.vem('<')) throw this.erro(this.pos >= this.texto.length ? 'documento vazio' : 'conteúdo antes do elemento raiz')
    doc.raiz = this.elemento(null, new Map([['xml', NS_XML]]))
    this.miscelanea(doc.depois)
    if (this.pos < this.texto.length) throw this.erro('conteúdo depois do elemento raiz')
    return doc
  }

  declaracao() {
    const inicio = this.pos
    this.pos += 5
    const atributos = {}
    while (true) {
      const tinhaEspaco = this.espacos()
      if (this.vem('?>')) break
      if (!tinhaEspaco) throw this.erro('esperado espaço na declaração XML')
      const nome = this.nome()
      this.espacos()
      this.exigir('=')
      this.espacos()
      atributos[nome] = this.valorEntreAspas(false)
    }
    this.pos += 2
    if (!atributos.version) throw this.erro('declaração XML sem "version"', inicio)
    return { versao: atributos.version, codificacao: atributos.encoding ?? null, standalone: atributos.standalone ?? null }
  }

  // Comentários, instruções de processamento e espaços fora do elemento raiz.
  miscelanea(destino) {
    while (this.pos < this.texto.length) {
      const inicio = this.pos
      if (this.espacos()) destino.push({ tipo: 'texto', valor: this.texto.slice(inicio, this.pos), ...this.localizar(inicio) })
      else if (this.vem('<!--')) destino.push(this.comentario())
      else if (this.vem('<?')) destino.push(this.instrucao())
      else break
    }
  }

  comentario() {
    const inicio = this.pos
    const fim = this.texto.indexOf('-->', this.pos + 4)
    if (fim < 0) throw this.erro('comentário sem fim')
    const valor = this.texto.slice(this.pos + 4, fim)
    if (valor.includes('--') || valor.endsWith('-')) throw this.erro('"--" dentro de comentário', inicio)
    this.pos = fim + 3
    return { tipo: 'comentario', valor, ...this.localizar(inicio) }
  }

  instrucao() {
    const inicio = this.pos
    this.pos += 2
    const alvo = this.nome()
    if (alvo.toLowerCase() === 'xml') throw this.erro('declaração XML fora do início do documento', inicio)
    const fim = this.texto.indexOf('?>', this.pos)
    if (fim < 0) throw this.erro('instrução de processamento sem fim', inicio)
    const valor = this.texto.slice(this.pos, fim).replace(/^\s+/, '')
    this.pos = fim + 2
    return { tipo: 'instrucao', alvo, valor, ...this.localizar(inicio) }
  }

  valorEntreAspas(comEntidades = true) {
    const aspa = this.texto[this.pos]
    if (aspa !== '"' && aspa !== "'") throw this.erro('valor de atributo sem aspas')
    const fim = this.texto.indexOf(aspa, this.pos + 1)
    if (fim < 0) throw this.erro('valor de atributo sem aspas de fechamento')
    const bruto = this.texto.slice(this.pos + 1, fim)
    if (bruto.includes('<')) throw this.erro('"<" dentro de valor de atributo', this.pos + 1 + bruto.indexOf('<'))
    const inicio = this.pos + 1
    this.pos = fim + 1
    if (!comEntidades) return bruto
    // Normalização de valor de atributo (§3.3.3): tab, CR e LF literais viram espaço; os que
    // vêm de referência (&#10;) ficam.
    return this.resolverEntidades(bruto.replace(/\r\n|[\t\n\r]/g, ' '), inicio)
  }

  resolverEntidades(bruto, inicio) {
    if (!bruto.includes('&')) return bruto
    return bruto.replace(/&([^;]*);?/g, (todo, nome, deslocamento) => {
      const pos = inicio + deslocamento
      if (!todo.endsWith(';')) throw this.erro('"&" sem ";" (use &amp;)', pos)
      if (nome in ENTIDADES) return ENTIDADES[nome]
      const m = nome.match(/^#(?:x([0-9a-fA-F]+)|([0-9]+))$/)
      if (!m) throw this.erro(`entidade desconhecida "&${nome};"`, pos)
      const codigo = m[1] ? parseInt(m[1], 16) : parseInt(m[2], 10)
      const caractere = codigo <= 0x10ffff ? String.fromCodePoint(codigo) : null
      if (!caractere || CARACTERE_INVALIDO.test(caractere)) throw this.erro(`referência a caractere inválido "&${nome};"`, pos)
      return caractere
    })
  }

  elemento(pai, escopo) {
    const inicio = this.pos
    this.exigir('<')
    const nomeQualificado = this.nome()
    const brutos = []
    while (true) {
      const tinhaEspaco = this.espacos()
      if (this.vem('/>') || this.vem('>')) break
      if (!tinhaEspaco) throw this.erro('esperado espaço entre atributos')
      const posAtributo = this.pos
      const nome = this.nome()
      this.espacos()
      this.exigir('=')
      this.espacos()
      const valor = this.valorEntreAspas()
      if (brutos.some((a) => a.nome === nome)) throw this.erro(`atributo "${nome}" repetido`, posAtributo)
      brutos.push({ nome, valor, pos: posAtributo })
    }

    // Declarações de namespace valem para o próprio elemento e seus descendentes.
    const declarados = new Map()
    for (const { nome, valor, pos } of brutos) {
      if (nome === 'xmlns') declarados.set('', valor)
      else if (nome.startsWith('xmlns:')) {
        const prefixo = nome.slice(6)
        if (!valor) throw this.erro(`prefixo "${prefixo}" declarado com namespace vazio`, pos)
        if (prefixo === 'xmlns' || (prefixo === 'xml') !== (valor === NS_XML)) throw this.erro(`declaração reservada "${nome}"`, pos)
        declarados.set(prefixo, valor)
      }
    }
    if (declarados.size) {
      escopo = new Map(escopo)
      for (const [prefixo, uri] of declarados) escopo.set(prefixo, uri)
    }

    const [prefixo, local] = dividir(nomeQualificado)
    const ns = prefixo ? escopo.get(prefixo) : escopo.get('') || null
    if (prefixo && ns === undefined) throw this.erro(`prefixo "${prefixo}" não declarado`, inicio + 1)

    const elemento = {
      tipo: 'elemento',
      nome: local,
      prefixo,
      ns,
      nomeQualificado,
      atributos: [],
      namespaces: declarados,
      filhos: [],
      pai,
      inicio,
      fim: 0,
      ...this.localizar(inicio),
    }
    for (const { nome, valor, pos } of brutos) {
      if (nome === 'xmlns' || nome.startsWith('xmlns:')) continue
      const [p, l] = dividir(nome)
      const nsAtributo = p ? escopo.get(p) : null
      if (p && nsAtributo === undefined) throw this.erro(`prefixo "${p}" não declarado`, pos)
      if (elemento.atributos.some((a) => a.nome === l && a.ns === nsAtributo)) throw this.erro(`atributo "${nome}" repetido`, pos)
      elemento.atributos.push({ nome: l, prefixo: p, ns: nsAtributo, valor, ...this.localizar(pos) })
    }

    if (this.vem('/>')) {
      this.pos += 2
      elemento.fim = this.pos
      elemento.vazio = true
      return elemento
    }
    this.pos += 1
    this.conteudo(elemento, escopo)
    this.exigir('</')
    const posFechamento = this.pos
    const fechamento = this.nome()
    if (fechamento !== nomeQualificado) {
      throw this.erro(`tag de fechamento </${fechamento}> não corresponde a <${nomeQualificado}>`, posFechamento)
    }
    this.espacos()
    this.exigir('>')
    elemento.fim = this.pos
    return elemento
  }

  conteudo(elemento, escopo) {
    while (true) {
      if (this.pos >= this.texto.length) throw this.erro(`elemento <${elemento.nomeQualificado}> sem fechamento`, elemento.inicio)
      if (this.vem('</')) return
      const inicio = this.pos
      if (this.vem('<!--')) elemento.filhos.push(this.comentario())
      else if (this.vem('<![CDATA[')) {
        const fim = this.texto.indexOf(']]>', this.pos)
        if (fim < 0) throw this.erro('seção CDATA sem fim')
        const valor = this.texto.slice(this.pos + 9, fim).replace(/\r\n?/g, '\n')
        this.pos = fim + 3
        elemento.filhos.push({ tipo: 'texto', valor, cdata: true, ...this.localizar(inicio) })
      } else if (this.vem('<?')) elemento.filhos.push(this.instrucao())
      else if (this.vem('<')) elemento.filhos.push(this.elemento(elemento, escopo))
      else {
        const fim = this.texto.indexOf('<', this.pos)
        const bruto = this.texto.slice(this.pos, fim < 0 ? this.texto.length : fim)
        if (bruto.includes(']]>')) throw this.erro('"]]>" fora de seção CDATA', inicio + bruto.indexOf(']]>'))
        this.pos += bruto.length
        // Fim de linha (§2.11): CRLF e CR sozinho viram LF. Vem antes das entidades, porque um
        // &#13; escrito por referência é um CR de verdade e entra assim na assinatura.
        const valor = this.resolverEntidades(bruto.replace(/\r\n?/g, '\n'), inicio)
        elemento.filhos.push({ tipo: 'texto', valor, ...this.localizar(inicio) })
      }
    }
  }
}

function dividir(nome) {
  const i = nome.indexOf(':')
  return i < 0 ? [null, nome] : [nome.slice(0, i), nome.slice(i + 1)]
}

/** Filhos que são elementos. */
export function elementos(no) {
  return no.filhos.filter((f) => f.tipo === 'elemento')
}

/** Texto do elemento (concatenação dos nós de texto diretos). */
export function texto(no) {
  let s = ''
  for (const f of no.filhos) if (f.tipo === 'texto') s += f.valor
  return s
}

/** Valor de um atributo sem namespace, ou undefined. */
export function atributo(no, nome) {
  return no.atributos.find((a) => a.nome === nome && !a.ns)?.valor
}

/** Caminho legível do elemento: NFe/infNFe/det[2]/prod/xProd. */
export function caminho(no) {
  const partes = []
  for (let n = no; n; n = n.pai) {
    let parte = n.nome
    if (n.pai) {
      const irmaos = elementos(n.pai).filter((e) => e.nome === n.nome && e.ns === n.ns)
      if (irmaos.length > 1) parte += `[${irmaos.indexOf(n) + 1}]`
    }
    partes.unshift(parte)
  }
  return partes.join('/')
}

/**
 * @typedef {object} Documento
 * @property {'documento'} tipo
 * @property {{versao: string, codificacao: string|null, standalone: string|null}|null} declaracao
 * @property {boolean} bom
 * @property {Array<object>} antes
 * @property {object} raiz
 * @property {Array<object>} depois
 */

export { NS_XML, NS_XMLNS }
