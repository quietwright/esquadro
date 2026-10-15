// Extrai as tabelas de regras de validação de um PDF da NF-e (MOC Anexo I ou Nota Técnica).
//
//   node scripts/extrair-regras.mjs <pdf> <paginas> <documento> <saida.json>
//   node scripts/extrair-regras.mjs fontes/moc-anexo1.pdf 71-153 "MOC 7.0 Anexo I" catalogo/moc-anexo1.json
//
// O texto corrido do PDF não basta: em parte das NTs o id da regra fica centralizado na
// célula, e as linhas acima dele parecem pertencer à regra anterior. Por isso a extração usa a
// geometria da página: as bordas da tabela (retângulos finos que o pdftocairo exporta em SVG)
// formam a grade, e cada palavra (com posição, do pdftotext -bbox-layout) cai na sua célula.
// Requer poppler (pdftotext e pdftocairo).

import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ID = /^(\d{0,2}[A-Z][A-Za-z0-9.]*-\d+[a-z]?|[A-Z]\d{2}[a-z]?)$/
const cabecalhoNumerado = /^(\d+(?:\.\d+)*)\.?\s+([A-ZÀ-Ú].*)$/
const cabecalhoDeGrupo = /^Grupo ([0-9A-Z]+[a-z]?)[.:]\s+(\S.+)$/
const ruido = [/^Nota Fiscal Eletrônica/, /^MOC 7\.0 – Anexo I/, /^Reforma Tributária – Lei Complementar/, /^NT \d{4}\.\d{3}/, /^Página \d+ \/ \d+$/, /^\d+$/]

const decodificar = (s) =>
  s.replace(/&(amp|lt|gt|quot|apos|#(\d+));/g, (_, e, n) => (n ? String.fromCodePoint(Number(n)) : { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }[e]))

// --- Leitura do PDF ---------------------------------------------------------------------------

export function palavrasPorPagina(pdf, primeira, ultima) {
  const args = ['-bbox-layout', '-f', String(primeira)]
  if (ultima) args.push('-l', String(ultima))
  const html = execFileSync('pdftotext', [...args, pdf, '-'], { encoding: 'utf8', maxBuffer: 256 << 20 })
  return html.split('<page ').slice(1).map((pagina) => {
    const altura = Number(pagina.match(/height="([\d.]+)"/)?.[1] ?? 842)
    const palavras = [...pagina.matchAll(/<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">([^<]*)<\/word>/g)].map((m) => ({
      x0: Number(m[1]),
      y0: Number(m[2]),
      x1: Number(m[3]),
      y1: Number(m[4]),
      texto: decodificar(m[5]),
    }))
    // Cabeçalho e rodapé corridos (título da NT, "Página N / M"): mudam de documento para
    // documento, então são reconhecidos pela posição, nas margens da página.
    for (const p of palavras) p.margem = p.y1 < 57 || p.y0 > altura - 45
    return palavras
  })
}

// Bordas de tabela: retângulos preenchidos finos (ou traços) no SVG de cada página. Uma
// chamada por página: no SVG de várias páginas, as que estão em paisagem vêm com uma rotação
// num grupo externo, e no de página única já saem na orientação do texto do pdftotext.
export function bordasPorPagina(pdf, primeira, ultima) {
  const total = Number(execFileSync('pdfinfo', [pdf], { encoding: 'utf8' }).match(/Pages:\s+(\d+)/)[1])
  const fim = Math.min(ultima ?? total, total)
  const pasta = mkdtempSync(join(tmpdir(), 'esquadro-'))
  try {
    const resultado = []
    for (let pagina = primeira; pagina <= fim; pagina++) {
      const arquivo = join(pasta, `p${pagina}.svg`)
      execFileSync('pdftocairo', ['-svg', '-f', String(pagina), '-l', String(pagina), pdf, arquivo])
      resultado.push(bordasDoSvg(readFileSync(arquivo, 'utf8')))
    }
    return resultado
  } finally {
    rmSync(pasta, { recursive: true, force: true })
  }
}

function bordasDoSvg(svg) {
  const corpo = svg.slice(svg.lastIndexOf('</defs>') + 1)
  const horizontais = []
  const verticais = []
  for (const m of corpo.matchAll(/<path([^>]*?)d="([^"]+)"([^>]*)\/>/g)) {
    const atributos = m[1] + m[3]
    const transformacao = atributos.match(/transform="matrix\(([^)]+)\)"/)
    const [a, b, c, d, e, f] = transformacao ? transformacao[1].split(/[ ,]+/).map(Number) : [1, 0, 0, 1, 0, 0]
    const pontos = [...m[2].matchAll(/(-?[\d.]+) (-?[\d.]+)/g)].map((p) => {
      const x = Number(p[1])
      const y = Number(p[2])
      return [a * x + c * y + e, b * x + d * y + f]
    })
    if (pontos.length < 2) continue
    const xs = pontos.map((p) => p[0])
    const ys = pontos.map((p) => p[1])
    const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]
    const tracado = /stroke="/.test(atributos) && !/stroke="none"/.test(atributos)
    if ((y1 - y0 < 1.6 || (tracado && y1 - y0 < 0.1)) && x1 - x0 > 3) horizontais.push({ y: (y0 + y1) / 2, x0, x1 })
    else if ((x1 - x0 < 1.6 || (tracado && x1 - x0 < 0.1)) && y1 - y0 > 3) verticais.push({ x: (x0 + x1) / 2, y0, y1 })
  }
  // Borda de verdade vai de uma vertical a outra. Traço solto dentro da célula é texto riscado
  // (as NTs mostram assim o que foi revogado) e não pode virar divisória.
  // Linha que atravessa quase a página toda também é borda, mesmo sem verticais nas pontas:
  // algumas NTs não desenham as verticais em parte das linhas da tabela.
  const encosta = (x, y) => verticais.some((v) => Math.abs(v.x - x) < 2 && v.y0 - 2 <= y && y <= v.y1 + 2)
  // A largura é a da linha inteira (segmentos na mesma altura somados de ponta a ponta), porque
  // as bordas vêm em segmentos por coluna e um risco longo pode ser do tamanho de uma coluna.
  const extensao = new Map()
  for (const h of horizontais) {
    const k = Math.round(h.y * 2)
    const e = extensao.get(k) ?? { x0: Infinity, x1: -Infinity }
    extensao.set(k, { x0: Math.min(e.x0, h.x0), x1: Math.max(e.x1, h.x1) })
  }
  const larguraDaLinha = (h) => {
    const e = extensao.get(Math.round(h.y * 2))
    return e.x1 - e.x0
  }
  const largura = Math.max(0, ...[...extensao.values()].map((e) => e.x1 - e.x0))
  const bordas = horizontais.filter((h) => (encosta(h.x0, h.y) && encosta(h.x1, h.y)) || larguraDaLinha(h) > largura * 0.85)
  const riscos = horizontais.filter((h) => !bordas.includes(h))
  return { horizontais: bordas, verticais, riscos }
}

// --- Montagem da grade ----------------------------------------------------------------------

// Agrupa palavras em linhas de texto (mesma altura, com folga) e as ordena.
function linhas(palavras) {
  const ordenadas = [...palavras].sort((p, q) => p.y0 - q.y0 || p.x0 - q.x0)
  const resultado = []
  for (const p of ordenadas) {
    const linha = resultado.find((l) => Math.abs(l.y0 - p.y0) < 2.5)
    if (linha) linha.palavras.push(p)
    else resultado.push({ y0: p.y0, palavras: [p] })
  }
  for (const l of resultado) l.palavras.sort((p, q) => p.x0 - q.x0)
  return resultado.sort((a, b) => a.y0 - b.y0)
}

const textoDe = (palavras) =>
  linhas(palavras.filter((p) => !p.riscada))
    .map((l) => l.palavras.map((p) => p.texto).join(' '))
    .join('\n')

// Cada palavra cai na célula delimitada pelas bordas mais próximas que a cercam.
export function celulas(palavras, { horizontais, verticais }) {
  // Posições de coluna da página, para as faixas em que as verticais não foram desenhadas.
  const colunasDaPagina = [...new Set(verticais.map((v) => Math.round(v.x * 2) / 2))].sort((a, b) => a - b)
  const dentro = new Map()
  const fora = []
  for (const p of palavras) {
    const cx = (p.x0 + p.x1) / 2
    const cy = (p.y0 + p.y1) / 2
    // A faixa da linha vem de qualquer borda horizontal naquela altura: às vezes falta o
    // segmento justamente da coluna da palavra.
    let acima = null
    let abaixo = null
    for (const h of horizontais) {
      if (h.y <= cy && (!acima || h.y > acima.y)) acima = h
      if (h.y >= cy && (!abaixo || h.y < abaixo.y)) abaixo = h
    }
    let esquerda = null
    let direita = null
    for (const v of verticais) {
      if (!(v.y0 - 1 <= cy && cy <= v.y1 + 1)) continue
      if (v.x <= cx && (!esquerda || v.x > esquerda.x)) esquerda = v
      if (v.x >= cx && (!direita || v.x < direita.x)) direita = v
    }
    let colunaEsquerda = esquerda?.x
    // Só dentro da tabela: alguma vertical (de qualquer coluna) passa por essa altura.
    const naTabela = verticais.some((v) => v.y0 - 1 <= cy && cy <= v.y1 + 1)
    if (acima && abaixo && (!esquerda || !direita) && colunasDaPagina.length >= 3 && naTabela) {
      const antes = colunasDaPagina.filter((x) => x <= cx)
      const depois = colunasDaPagina.filter((x) => x >= cx)
      if (antes.length && depois.length) {
        colunaEsquerda = antes.at(-1)
        esquerda = direita = true
      }
    }
    if (!acima || !abaixo || !esquerda || !direita) {
      fora.push(p)
      continue
    }
    const linha = Math.round(acima.y * 2) / 2
    const coluna = Math.round(colunaEsquerda * 2) / 2
    if (!dentro.has(linha)) dentro.set(linha, { y: linha, celulas: new Map() })
    const l = dentro.get(linha)
    if (!l.celulas.has(coluna)) l.celulas.set(coluna, [])
    l.celulas.get(coluna).push(p)
  }
  return { linhas: [...dentro.values()], fora }
}

// Algumas tabelas põem várias regras numa só linha da grade, sem borda entre elas: a célula do
// id tem um id por regra. Nesse caso a linha é dividida na altura de cada id (o texto dessas
// sub-linhas começa junto do id).
function dividirPorIds(linha) {
  const colunas = [...linha.celulas.entries()].sort((a, b) => a[0] - b[0])
  if (!colunas.length) return [linha]
  const linhasDoId = linhas(colunas[0][1].filter((p) => !p.riscada))
  const ids = linhasDoId.filter((l) => ID.test(l.palavras.map((p) => p.texto).join('')))
  // Uma linha só, com o id no topo: nada a dividir. Se houver texto acima do primeiro id (um
  // cabeçalho sem borda inferior, por exemplo), ele vira uma sub-linha separada.
  if (!ids.length || (ids.length === 1 && linhasDoId[0] === ids[0])) return [linha]
  const cortes = ids.map((l) => l.y0 - 1)
  if (linhasDoId[0] !== ids[0]) cortes.unshift(-Infinity)
  return cortes.map((corte, i) => {
    const fim = cortes[i + 1] ?? Infinity
    const celulas = new Map()
    for (const [x, ps] of colunas) {
      const parte = ps.filter((p) => p.y0 >= corte && p.y0 < fim)
      if (parte.length) celulas.set(x, parte)
    }
    return { y: linha.y + i * 0.01, celulas }
  })
}

// Palavra cortada ao meio por um traço: texto revogado, que a NT mantém visível riscado.
function riscada(p, riscos) {
  const meio = (p.y0 + p.y1) / 2
  const altura = p.y1 - p.y0
  return riscos.some((r) => {
    const sobreposicao = Math.min(p.x1, r.x1) - Math.max(p.x0, r.x0)
    return Math.abs(r.y - meio) < altura * 0.3 && sobreposicao > (p.x1 - p.x0) * 0.6
  })
}

// Papéis das colunas de uma linha de regra, deduzidos do conteúdo: id na primeira célula,
// modelo (55, 65, 55/65) se houver, o texto da regra até a célula de aplicação
// (Obrig./Facul.), depois código, efeito e mensagem. Não depende do cabeçalho, que em algumas
// NTs não tem borda própria ou vem com rótulos diferentes.
function inferirPapeis(textos) {
  if (textos.length < 3) return null
  const id = textos[0][1].replace(/\s+/g, '')
  if (!ID.test(id)) return null
  const iAplic = textos.findIndex(([, t], i) => i > 0 && /^(Obrig|Facul)[a-zçó]*\.?(\s+\d{3,4})?(\s+(Rej|Den|Alerta)[.,]?)?$/.test(t.replace(/\s+/g, ' ').trim()))
  if (iAplic < 0) return null
  const papeis = new Map([[textos[0][0], 'id']])
  let i = 1
  let modelo = ''
  if (/^(55\/65|55|65)$/.test(textos[1][1].replace(/\s+/g, ''))) {
    modelo = textos[1][1].replace(/\s+/g, '')
    papeis.set(textos[1][0], 'modelo')
    i = 2
  }
  const regra = []
  for (; i < iAplic; i++) {
    regra.push(textos[i][1])
    papeis.set(textos[i][0], 'regra')
  }
  const controle = []
  const mensagem = []
  for (let j = iAplic; j < textos.length; j++) {
    const t = textos[j][1].replace(/\s+/g, ' ').trim()
    // Célula vazia antes da mensagem é de controle cujo conteúdo foi riscado (o código vigente
    // pode vir na continuação).
    // Fragmento curto em célula própria antes da mensagem ("XXX" no lugar do efeito, sobra de
    // palavra) também fica no controle, para não sujar a mensagem.
    const fragmento = t.length <= 3 && j < textos.length - 1
    if (!mensagem.length && (t === '' || fragmento || (/^((Obrig|Facul)[a-zçó]*\.?|\d{3,4}|Rej[.,]?|Den\.?|Alerta)( |$)/.test(t) && t.length < 24))) {
      controle.push(t)
      papeis.set(textos[j][0], 'controle')
    } else {
      mensagem.push(textos[j][1])
      papeis.set(textos[j][0], 'mensagem')
    }
  }
  const controleTexto = controle.join(' ')
  return { papeis, campos: { id, modelo, regra: regra.join('\n'), controle: controleTexto, mensagem: mensagem.join('\n') } }
}

// Papel de cada coluna, pelo texto do cabeçalho.
function papelDoCabecalho(texto) {
  const t = texto.replace(/\s+/g, ' ').trim()
  if (/^(#|Campo(-Seq)?|Campo Seq|Id)$/i.test(t)) return 'id'
  if (/^Modelo$/i.test(t)) return 'modelo'
  if (/^Regra de Valida[çc][ãa]o$/i.test(t)) return 'regra'
  if (/^Aplic\.? ?Msg$/i.test(t)) return 'aplicmsg'
  if (/^Aplic/i.test(t)) return 'aplic'
  if (/^Msg$/i.test(t)) return 'msg'
  if (/^Efeito$/i.test(t)) return 'efeito'
  if (/^Descri[çc][ãa]o( do)? Erro$/i.test(t)) return 'mensagem'
  return null
}

// --- Extração ---------------------------------------------------------------------------------

export function extrair(pdf, documento, primeira = 1, ultima = null) {
  const paginas = palavrasPorPagina(pdf, primeira, ultima)
  const bordas = bordasPorPagina(pdf, primeira, ultima)
  const regras = []
  let secao = null
  let grupo = null
  let servicoAtual = 'autorizacao'
  let papeis = null // coluna (x) -> papel, herdado entre páginas quando não há cabeçalho
  let atual = null

  // Cabeçalho corrido: linha de texto no topo que se repete em várias páginas do documento.
  const noTopo = paginas.map((ps) => new Set(linhas(ps.filter((p) => p.y0 < 110)).map((l) => l.palavras.map((p) => p.texto).join(' '))))
  const frequencia = new Map()
  for (const conjunto of noTopo) for (const t of conjunto) frequencia.set(t, (frequencia.get(t) ?? 0) + 1)
  const corrido = (t) => paginas.length >= 3 && (frequencia.get(t) ?? 0) >= Math.max(3, paginas.length * 0.3)

  paginas.forEach((todas, i) => {
    const pagina = primeira + i
    const base = bordas[i] ?? { horizontais: [], verticais: [], riscos: [] }
    // Traço que corta palavras pelo meio é risco, mesmo atravessando a linha inteira da tabela
    // (linha revogada riscada célula por célula); borda de verdade passa entre as linhas de texto.
    const cortaTexto = (h) => todas.some((p) => riscada(p, [h]))
    const geometria = {
      ...base,
      horizontais: base.horizontais.filter((h) => !cortaTexto(h)),
      riscos: [...base.riscos, ...base.horizontais.filter(cortaTexto)],
    }
    for (const p of todas) p.riscada = riscada(p, geometria.riscos)
    const grade = celulas(todas, geometria)
    // Fluxo da página em ordem vertical: linhas de texto fora da grade (títulos) e linhas da grade.
    const fluxo = [
      ...linhas(grade.fora.filter((p) => !p.riscada && !p.margem)).map((l) => ({ y: l.y0, titulo: l.palavras.map((p) => p.texto).join(' ') })),
      ...grade.linhas.flatMap(dividirPorIds).map((l) => ({ y: l.y, linha: l })),
    ].sort((a, b) => a.y - b.y)

    for (const item of fluxo) {
      if (item.titulo !== undefined) {
        const t = item.titulo.trim()
        if (!t || ruido.some((r) => r.test(t)) || /\.{4}/.test(t) || (item.y < 110 && corrido(t))) continue
        const g = t.match(cabecalhoDeGrupo)
        const n = t.match(cabecalhoNumerado)
        if (g) {
          grupo = `${g[1]}. ${g[2]}`
          atual = null
        } else if (n && n[2].length < 120) {
          if (/^Banco de Dados/.test(n[2])) grupo = `${n[1]}. ${n[2]}`
          else {
            secao = `${n[1]} ${n[2]}`
            servicoAtual = servico(n[2]) ?? (n[1].includes('.') ? servicoAtual : 'autorizacao')
            grupo = null
          }
          atual = null
        } else {
          // Texto corrido fora de tabela encerra a regra em andamento.
          atual = null
        }
        continue
      }

      const colunas = [...item.linha.celulas.entries()].sort((a, b) => a[0] - b[0])
      const textos = colunas.map(([x, ps]) => [x, textoDe(ps)])
      // Cabeçalho: várias células com exatamente os rótulos das colunas. Só procurar "Regra de
      // Validação" não basta, porque o texto de algumas regras cita essas palavras.
      const rotulos = textos.map(([, t]) => papelDoCabecalho(t)).filter(Boolean)
      if (rotulos.includes('regra') && rotulos.length >= 3) continue
      // Linha cujo id está todo riscado: regra revogada. Descarta a linha inteira, inclusive o
      // que sobrou sem risco nela (referências a NTs, por exemplo).
      const primeira = colunas[0]?.[1] ?? []
      if (primeira.length && primeira.every((p) => p.riscada) && ID.test(primeira.map((p) => p.texto).join(''))) {
        regras.push({ id: primeira.map((p) => p.texto).join(''), documento, pagina, servico: servicoAtual, revogada: true })
        atual = null
        continue
      }

      const linhaDeRegra = inferirPapeis(textos)
      if (linhaDeRegra) {
        papeis = linhaDeRegra.papeis
        const { id, modelo, regra, controle, mensagem } = linhaDeRegra.campos
        // O código pode faltar aqui (riscado, com o vigente na continuação da página seguinte).
        const m = controle.match(/(Obrig|Facul)[a-zçó]*\.?\s*(\d{3,4})?\s*(Rej|Den|Alerta)?/)
        atual = {
          id,
          documento,
          secao,
          grupo,
          modelos: /^(55\/65|55|65)$/.test(modelo) ? modelo.split('/') : null,
          aplicacao: m[1] === 'Obrig' ? 'obrigatoria' : 'facultativa',
          cStat: m[2] ? Number(m[2]) : null,
          efeito: m[3] ? { Rej: 'rejeicao', Den: 'denegacao', Alerta: 'alerta' }[m[3]] : null,
          regra: [regra],
          mensagem: [mensagem],
          pagina,
          servico: servicoAtual,
        }
        regras.push(atual)
        continue
      }
      // Linha sem id: a regra continua (em geral, da página anterior). Cada célula vai para o
      // papel da coluna mais próxima à esquerda na última linha de regra.
      if (!atual || !papeis) continue
      for (const [x, t] of textos) {
        const candidatas = [...papeis.keys()].filter((c) => c <= x + 3)
        const papel = candidatas.length ? papeis.get(Math.max(...candidatas)) : null
        if (papel === 'regra') atual.regra.push(t)
        else if (papel === 'mensagem') atual.mensagem.push(t)
        else if (papel === 'controle' && atual.cStat === null) {
          const codigo = t.match(/\b(\d{3,4})\b/)
          if (codigo) atual.cStat = Number(codigo[1])
        }
      }
    }
  })

  const juntar = (partes) =>
    partes
      .join(' ')
      .replace(/\s+/g, ' ')
      .replace(/(\w)- (\w)/g, '$1-$2')
      .trim()

  // Sem código nem na continuação: linha que não é regra de verdade.
  for (let i = regras.length - 1; i >= 0; i--) if (regras[i].cStat === null) regras.splice(i, 1)
  for (const r of regras) {
    if (r.revogada) continue
    r.regra = juntar(r.regra)
    r.mensagem = juntar(r.mensagem)
    if (!r.efeito) {
      r.efeito = /^Uso Denegado/i.test(r.mensagem) ? 'denegacao' : /^Alerta/i.test(r.mensagem) ? 'alerta' : 'rejeicao'
    }
    // Regras com prefixo numérico (1C17-10, 3BA02-10…) consultam bases da SEFAZ.
    r.consultaBaseSefaz = /^\d/.test(r.id)
  }
  // O mesmo id em linhas seguidas do mesmo serviço são variantes por webservice (D01: 225 na
  // autorização, 215 nos demais). Fica a primeira, que no MOC é a da autorização.
  const unicas = []
  for (const r of regras) {
    if (r.revogada) {
      unicas.push(r)
      continue
    }
    const anterior = unicas.find((u) => u.id === r.id && u.servico === r.servico && !u.revogada)
    if (!anterior) unicas.push(r)
    else (anterior.variantes ??= []).push({ cStat: r.cStat, regra: r.regra, mensagem: r.mensagem })
  }
  return unicas
}

// Serviço do webservice a que a seção se refere; null quando o título não diz.
function servico(titulo) {
  if (/Evento/i.test(titulo)) return 'evento'
  if (/Inutiliza/i.test(titulo)) return 'inutilizacao'
  if (/Consulta|Status do Servi|Distribui/i.test(titulo)) return 'consulta'
  if (/Autoriza|Regras de Valida/i.test(titulo)) return 'autorizacao'
  return null
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [pdf, paginas, documento, saida] = process.argv.slice(2)
  if (!saida) {
    console.error('uso: node extrair-regras.mjs <pdf> <primeira-ultima> <documento> <saida.json>')
    process.exit(2)
  }
  const [primeira, ultima] = paginas.split('-').map(Number)
  const regras = extrair(pdf, documento, primeira, ultima)
  writeFileSync(saida, JSON.stringify(regras, null, 1) + '\n')
  console.error(`${documento}: ${regras.length} regras`)
}
