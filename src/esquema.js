// Validação de schema (XSD) a partir do modelo compilado por scripts/compilar-xsd.mjs.
//
// O casamento dos filhos com sequence/choice é guloso e sem retrocesso. Isso é correto para
// schemas que respeitam a Unique Particle Attribution do XSD (cada filho só pode casar com
// uma declaração, olhando apenas para ele), exigência que os schemas oficiais cumprem.

import { caminho, elementos, texto } from './xml.js'

const NAMESPACES = {
  nfe: 'http://www.portalfiscal.inf.br/nfe',
  ds: 'http://www.w3.org/2000/09/xmldsig#',
}

/**
 * Valida um elemento contra uma raiz do modelo.
 * @returns {Array<{caminho: string, linha: number, coluna: number, detalhe: string}>}
 */
export function validarEsquema(modelo, raiz, { nomeRaiz = raiz.nome, assinaturaOpcional = false } = {}) {
  const v = new Validador(modelo, { assinaturaOpcional })
  const tipo = modelo.raizes[nomeRaiz]
  if (!tipo) v.falha(raiz, `elemento raiz <${raiz.nome}> não existe no schema`)
  else if (raiz.ns !== NAMESPACES.nfe) v.falha(raiz, `elemento raiz <${raiz.nome}> fora do namespace ${NAMESPACES.nfe}`)
  else v.elemento(raiz, tipo)
  return v.problemas
}

class Falha {
  constructor(indice, esperados) {
    this.indice = indice
    this.esperados = esperados
  }
}

class Validador {
  constructor(modelo, { assinaturaOpcional = false } = {}) {
    this.modelo = modelo
    // Nota ainda não assinada (validação antes de assinar): ds:Signature passa a ser opcional.
    this.assinaturaOpcional = assinaturaOpcional
    this.problemas = []
    this.regexes = new Map()
    this.primeirosCache = new WeakMap()
    this.anulavelCache = new WeakMap()
  }

  falha(no, detalhe) {
    this.problemas.push({ caminho: caminho(no), linha: no.linha, coluna: no.coluna, detalhe })
  }

  elemento(no, chaveTipo, declaracao) {
    const tipo = this.modelo.tipos[chaveTipo]
    if (!tipo || tipo.t === 's') {
      this.semAtributos(no)
      const filhos = elementos(no)
      if (filhos.length) this.falha(filhos[0], `<${no.nome}> só aceita texto, mas contém o elemento <${filhos[0].nome}>`)
      else this.valor(no, texto(no), chaveTipo, `<${no.nome}>`)
    } else {
      this.atributos(no, tipo)
      if (tipo.texto) {
        const filhos = elementos(no)
        if (filhos.length) this.falha(filhos[0], `<${no.nome}> só aceita texto, mas contém o elemento <${filhos[0].nome}>`)
        else this.valor(no, texto(no), tipo.texto, `<${no.nome}>`)
      } else {
        const solto = no.filhos.find((f) => f.tipo === 'texto' && f.valor.trim())
        if (solto) this.falha(no, `<${no.nome}> não aceita texto direto ("${resumir(solto.valor.trim())}")`)
        this.filhos(no, tipo)
      }
    }
    if (declaracao?.unicos) this.unicos(no, declaracao.unicos)
  }

  semAtributos(no) {
    for (const a of no.atributos) this.falha(no, `atributo "${a.nome}" não permitido em <${no.nome}>`)
  }

  atributos(no, tipo) {
    for (const a of no.atributos) {
      const decl = !a.ns && tipo.atributos.find((d) => d.nome === a.nome)
      if (!decl) {
        this.falha(no, `atributo "${a.nome}" não permitido em <${no.nome}>`)
        continue
      }
      if (decl.fixo !== undefined && a.valor !== decl.fixo) {
        this.falha(no, `atributo "${a.nome}" de <${no.nome}> deve ser "${decl.fixo}", veio "${resumir(a.valor)}"`)
      } else this.valor(no, a.valor, decl.tipo, `atributo "${a.nome}" de <${no.nome}>`)
    }
    for (const decl of tipo.atributos) {
      if (decl.uso === 'required' && !no.atributos.some((a) => a.nome === decl.nome && !a.ns)) {
        this.falha(no, `<${no.nome}> sem o atributo obrigatório "${decl.nome}"`)
      }
    }
  }

  filhos(no, tipo) {
    const filhos = elementos(no)
    if (!tipo.conteudo) {
      if (filhos.length) this.falha(filhos[0], `<${no.nome}> não aceita elementos filhos, mas contém <${filhos[0].nome}>`)
      return
    }
    const pares = []
    let fim
    try {
      fim = this.casar(tipo.conteudo, filhos, 0, pares)
    } catch (e) {
      if (!(e instanceof Falha)) throw e
      this.faltaOuInesperado(no, filhos, e.indice, e.esperados, tipo.conteudo)
      fim = null
    }
    if (fim !== null && fim < filhos.length) {
      this.faltaOuInesperado(no, filhos, fim, null, tipo.conteudo)
    }
    // Valida o que casou, mesmo se a estrutura falhou adiante: mais problemas por rodada.
    for (const [filho, decl] of pares) this.elemento(filho, decl.tipo, decl)
  }

  faltaOuInesperado(no, filhos, indice, esperados, conteudo) {
    const proximo = filhos[indice]
    const lista = esperados ? [...esperados].map((k) => `<${k.split(':')[1]}>`) : []
    const sugestao = lista.length ? `; esperado ${lista.length === 1 ? lista[0] : 'um de ' + lista.slice(0, 8).join(', ')}` : ''
    const faltando = lista.length === 1 ? lista[0] : `um de ${lista.slice(0, 8).join(', ')}`
    if (!proximo) {
      this.falha(no, `<${no.nome}> incompleto: falta ${lista.length ? faltando : 'elemento obrigatório'}`)
    } else if (esperados && this.declara(conteudo, chaveDe(proximo))) {
      this.falha(proximo, `falta ${faltando} antes de <${proximo.nome}> em <${no.nome}>`)
    } else if (this.declara(conteudo, chaveDe(proximo))) {
      this.falha(proximo, `elemento <${proximo.nome}> fora de ordem ou repetido além do permitido em <${no.nome}>${sugestao}`)
    } else {
      this.falha(proximo, `elemento <${proximo.nome}> não existe em <${no.nome}>${sugestao}`)
    }
  }

  // Casa a partícula a partir de filhos[i]; devolve o índice seguinte ou lança Falha.
  casar(p, filhos, i, pares) {
    const max = p.max ?? Infinity
    if (p.t === 'el') {
      const k = `${p.ns}:${p.nome}`
      let n = 0
      while (n < max && i < filhos.length && chaveDe(filhos[i]) === k) {
        pares.push([filhos[i], p])
        i++
        n++
      }
      const minimo = this.assinaturaOpcional && k === 'ds:Signature' ? 0 : p.min
      if (n < minimo) throw new Falha(i, new Set([k]))
      return i
    }
    let repeticoes = 0
    while (repeticoes < max) {
      const proximo = filhos[i]
      const podeComecar = proximo && this.primeiros(p).has(chaveDe(proximo))
      if (repeticoes >= p.min && !podeComecar) break
      if (p.t === 'seq') {
        const inicio = i
        for (const item of p.itens) i = this.casar(item, filhos, i, pares)
        repeticoes++
        if (i === inicio) break // sequência vazia: repetir não consome nada
      } else {
        const item = proximo && p.itens.find((it) => this.primeiros(it).has(chaveDe(proximo)))
        if (item) i = this.casar(item, filhos, i, pares)
        else if (p.itens.some((it) => this.anulavel(it))) break
        else throw new Falha(i, this.primeiros(p))
        repeticoes++
      }
    }
    if (repeticoes < p.min && !this.anulavel(p)) throw new Falha(i, this.primeiros(p))
    return i
  }

  primeiros(p) {
    let s = this.primeirosCache.get(p)
    if (s) return s
    s = new Set()
    if (p.t === 'el') s.add(`${p.ns}:${p.nome}`)
    else if (p.t === 'esc') for (const it of p.itens) for (const k of this.primeiros(it)) s.add(k)
    else {
      for (const it of p.itens) {
        for (const k of this.primeiros(it)) s.add(k)
        if (!this.anulavel(it)) break
      }
    }
    this.primeirosCache.set(p, s)
    return s
  }

  anulavel(p) {
    let r = this.anulavelCache.get(p)
    if (r !== undefined) return r
    if (p.min === 0) r = true
    else if (p.t === 'el') r = false
    else if (p.t === 'seq') r = p.itens.every((it) => this.anulavel(it))
    else r = p.itens.some((it) => this.anulavel(it))
    this.anulavelCache.set(p, r)
    return r
  }

  declara(p, k) {
    if (p.t === 'el') return `${p.ns}:${p.nome}` === k
    return p.itens.some((it) => this.declara(it, k))
  }

  unicos(no, unicos) {
    for (const { atributo: nome } of unicos) {
      const vistos = new Map()
      for (const filho of elementos(no)) {
        const valor = filho.atributos.find((a) => a.nome === nome && !a.ns)?.valor
        if (valor === undefined) continue
        if (vistos.has(valor)) this.falha(filho, `atributo "${nome}"="${valor}" repetido em <${no.nome}>`)
        else vistos.set(valor, filho)
      }
    }
  }

  // Valida um valor textual contra um tipo simples (nativo ou restrição).
  valor(no, bruto, chaveTipo, onde) {
    const tipo = this.modelo.tipos[chaveTipo]
    const nativo = tipo ? tipo.nativo : chaveTipo
    const espacos = tipo?.whiteSpace ?? (nativo === 'xs:string' ? 'preserve' : 'collapse')
    const valor = normalizar(bruto, espacos)
    const erroNativo = verificarNativo(nativo, valor)
    if (erroNativo) return this.falha(no, `${onde}: ${erroNativo} ("${resumir(valor)}")`)
    if (!tipo) return
    const tamanho = [...valor].length
    if (tipo.length !== undefined && tamanho !== tipo.length) {
      return this.falha(no, `${onde}: tamanho ${tamanho}, deve ter exatamente ${tipo.length} ("${resumir(valor)}")`)
    }
    if (tipo.minLength !== undefined && tamanho < tipo.minLength) {
      return this.falha(no, `${onde}: tamanho ${tamanho}, mínimo ${tipo.minLength} ("${resumir(valor)}")`)
    }
    if (tipo.maxLength !== undefined && tamanho > tipo.maxLength) {
      return this.falha(no, `${onde}: tamanho ${tamanho}, máximo ${tipo.maxLength} ("${resumir(valor)}")`)
    }
    if (tipo.enumeracao && !tipo.enumeracao.includes(valor)) {
      const opcoes = tipo.enumeracao.length <= 12 ? `; aceitos: ${tipo.enumeracao.join(', ')}` : ''
      return this.falha(no, `${onde}: valor "${resumir(valor)}" não permitido${opcoes}`)
    }
    for (const grupo of tipo.padroes ?? []) {
      if (!grupo.some((p) => this.regex(p).test(valor))) {
        const invalido = caractereForaDoPadrao(valor)
        const dica = invalido ? `; contém "${invalido}" (U+${invalido.codePointAt(0).toString(16).toUpperCase().padStart(4, '0')}), fora do conjunto aceito` : ''
        return this.falha(no, `${onde}: valor "${resumir(valor)}" fora do formato ${grupo.join(' | ')}${dica}`)
      }
    }
    // Datas (gYearMonth: AAAA-MM) comparam como texto; números, como número.
    const abaixoDoMinimo =
      tipo.minInclusive !== undefined &&
      (nativo === 'xs:gYearMonth' ? valor < tipo.minInclusive : !(Number(valor) >= Number(tipo.minInclusive)))
    if (abaixoDoMinimo) {
      return this.falha(no, `${onde}: valor ${valor} menor que o mínimo ${tipo.minInclusive}`)
    }
  }

  regex(padrao) {
    let r = this.regexes.get(padrao)
    if (!r) {
      r = new RegExp(`^(?:${padrao})$`, 'u')
      this.regexes.set(padrao, r)
    }
    return r
  }
}

function chaveDe(no) {
  if (no.ns === NAMESPACES.nfe) return `nfe:${no.nome}`
  if (no.ns === NAMESPACES.ds) return `ds:${no.nome}`
  return `${no.ns ?? ''}:${no.nome}`
}

function normalizar(s, espacos) {
  if (espacos === 'preserve') return s
  const trocado = s.replace(/[\t\n\r]/g, ' ')
  return espacos === 'replace' ? trocado : trocado.replace(/ +/g, ' ').trim()
}

function verificarNativo(nativo, valor) {
  switch (nativo) {
    case 'xs:base64Binary':
      return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(valor.replace(/ /g, ''))
        ? null
        : 'não é base64 válido'
    case 'xs:gYearMonth':
      return /^-?\d{4,}-(0[1-9]|1[0-2])(Z|[+-]\d{2}:\d{2})?$/.test(valor) ? null : 'não é ano-mês (AAAA-MM)'
    case 'xs:ID':
      return /^[\p{L}_][\p{L}\p{N}._\-]*$/u.test(valor) ? null : 'não é um ID XML válido'
    case 'xs:decimal':
      return /^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(valor) ? null : 'não é número decimal'
    default:
      return null
  }
}

// Os tipos texto da NF-e aceitam só Latin-1 imprimível ([!-ÿ]). O caractere culpado costuma ser
// aspas curvas, travessão ou emoji vindos de copiar e colar; vale apontar qual.
function caractereForaDoPadrao(valor) {
  for (const c of valor) if (c.codePointAt(0) > 0xff || c.codePointAt(0) < 0x20) return c
  return null
}

function resumir(s) {
  return s.length > 60 ? s.slice(0, 57) + '...' : s
}
