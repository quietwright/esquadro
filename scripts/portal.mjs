// Acesso às listas de documentos do Portal da NF-e, usado por baixar-fontes e vigiar-portal.
//
// O portal responde com um laço de redirecionamento se o cliente não mandar o cookie de teste
// do ASP.NET (AspxAutoDetectCookieSupport), então ele vai em toda requisição.

export const PORTAL = 'https://www.nfe.fazenda.gov.br/portal/'
export const LISTAS = {
  manuais: 'ndIjl+iEFdE=',
  notas: '04BIflQt1aY=',
  esquemas: 'BMPFMBoln3w=',
  diversos: '/NJarYc9nus=',
}

export async function buscar(caminho) {
  const resposta = await fetch(PORTAL + caminho, {
    headers: { cookie: 'AspxAutoDetectCookieSupport=1', 'user-agent': 'esquadro' },
  })
  if (!resposta.ok) throw new Error(`${resposta.status} em ${caminho}`)
  return Buffer.from(await resposta.arrayBuffer())
}

const entidades = { amp: '&', quot: '"', lt: '<', gt: '>', '#39': "'" }
const decodificar = (s) => s.replace(/&(amp|quot|lt|gt|#39);/g, (_, e) => entidades[e])

/** Documentos de uma lista do portal: [{ caminho, titulo }], na ordem em que o portal mostra. */
export async function listar(lista) {
  const pagina = (await buscar(`listaConteudo.aspx?tipoConteudo=${encodeURIComponent(LISTAS[lista])}`)).toString()
  const achados = []
  for (const m of pagina.matchAll(/<a[^>]*href="([^"]*exibirArquivo[^"]*)"[^>]*>(.*?)<\/a>/gs)) {
    const titulo = decodificar(m[2].replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim()
    // O portal escreve o "+" do base64 como espaço no href; o servidor aceita os dois.
    achados.push({ caminho: decodificar(m[1]).replaceAll(' ', '+'), titulo })
  }
  return achados
}
