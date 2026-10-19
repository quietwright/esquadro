// O mínimo de criptografia para conferir a assinatura de uma NF-e: SHA-1, base64 e verificação
// RSA PKCS#1 v1.5. Escrito à mão, sem node:crypto, para o validador continuar síncrono e rodar
// igual no Node e no navegador. Só verifica: nada aqui usa chave privada.

/** SHA-1 (FIPS 180-4) de uma sequência de bytes. */
export function sha1(bytes) {
  const tamanho = bytes.length
  const blocos = ((tamanho + 8) >> 6) + 1
  const m = new Uint8Array(blocos * 64)
  m.set(bytes)
  m[tamanho] = 0x80
  const bits = tamanho * 8
  const visao = new DataView(m.buffer)
  visao.setUint32(m.length - 8, Math.floor(bits / 2 ** 32))
  visao.setUint32(m.length - 4, bits >>> 0)

  let h0 = 0x67452301
  let h1 = 0xefcdab89
  let h2 = 0x98badcfe
  let h3 = 0x10325476
  let h4 = 0xc3d2e1f0
  const w = new Uint32Array(80)
  for (let b = 0; b < m.length; b += 64) {
    for (let i = 0; i < 16; i++) w[i] = visao.getUint32(b + i * 4)
    for (let i = 16; i < 80; i++) {
      const x = w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16]
      w[i] = (x << 1) | (x >>> 31)
    }
    let a = h0
    let bb = h1
    let c = h2
    let d = h3
    let e = h4
    for (let i = 0; i < 80; i++) {
      let f
      let k
      if (i < 20) {
        f = (bb & c) | (~bb & d)
        k = 0x5a827999
      } else if (i < 40) {
        f = bb ^ c ^ d
        k = 0x6ed9eba1
      } else if (i < 60) {
        f = (bb & c) | (bb & d) | (c & d)
        k = 0x8f1bbcdc
      } else {
        f = bb ^ c ^ d
        k = 0xca62c1d6
      }
      const t = (((a << 5) | (a >>> 27)) + f + e + k + w[i]) >>> 0
      e = d
      d = c
      c = (bb << 30) | (bb >>> 2)
      bb = a
      a = t
    }
    h0 = (h0 + a) >>> 0
    h1 = (h1 + bb) >>> 0
    h2 = (h2 + c) >>> 0
    h3 = (h3 + d) >>> 0
    h4 = (h4 + e) >>> 0
  }
  const saida = new Uint8Array(20)
  const v = new DataView(saida.buffer)
  ;[h0, h1, h2, h3, h4].forEach((h, i) => v.setUint32(i * 4, h))
  return saida
}

const ALFABETO = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

/** Base64 para bytes. Ignora espaços e quebras de linha; devolve null se não for base64. */
export function deBase64(texto) {
  const limpo = texto.replace(/[\s]/g, '')
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(limpo) || limpo.length % 4 === 1) return null
  const semPad = limpo.replace(/=+$/, '')
  const saida = new Uint8Array(Math.floor((semPad.length * 3) / 4))
  let acumulado = 0
  let nBits = 0
  let j = 0
  for (const c of semPad) {
    acumulado = (acumulado << 6) | ALFABETO.indexOf(c)
    nBits += 6
    if (nBits >= 8) {
      nBits -= 8
      saida[j++] = (acumulado >> nBits) & 0xff
    }
  }
  return saida
}

export function paraBase64(bytes) {
  let s = ''
  for (let i = 0; i < bytes.length; i += 3) {
    const n = (bytes[i] << 16) | ((bytes[i + 1] ?? 0) << 8) | (bytes[i + 2] ?? 0)
    s += ALFABETO[(n >> 18) & 63] + ALFABETO[(n >> 12) & 63]
    s += i + 1 < bytes.length ? ALFABETO[(n >> 6) & 63] : '='
    s += i + 2 < bytes.length ? ALFABETO[n & 63] : '='
  }
  return s
}

export function paraBigInt(bytes) {
  let n = 0n
  for (const b of bytes) n = (n << 8n) | BigInt(b)
  return n
}

function potenciaModular(base, expoente, modulo) {
  let resultado = 1n
  base %= modulo
  while (expoente > 0n) {
    if (expoente & 1n) resultado = (resultado * base) % modulo
    base = (base * base) % modulo
    expoente >>= 1n
  }
  return resultado
}

// DigestInfo DER de SHA-1 (RFC 8017, §9.2, nota 1), que vem antes do hash no bloco assinado.
const PREFIXO_SHA1 = [0x30, 0x21, 0x30, 0x09, 0x06, 0x05, 0x2b, 0x0e, 0x03, 0x02, 0x1a, 0x05, 0x00, 0x04, 0x14]

/**
 * Confere uma assinatura RSASSA-PKCS1-v1_5 com SHA-1 (RFC 8017, §8.2.2).
 * @param {{n: bigint, e: bigint}} chave  Chave pública.
 * @param {Uint8Array} assinatura
 * @param {Uint8Array} hash  SHA-1 da mensagem assinada.
 */
export function rsaSha1Confere(chave, assinatura, hash) {
  const k = Math.ceil(chave.n.toString(16).length / 2)
  if (assinatura.length !== k) return false
  const s = paraBigInt(assinatura)
  if (s >= chave.n) return false
  let m = potenciaModular(s, chave.e, chave.n).toString(16)
  m = m.padStart(k * 2, '0')
  const esperado = [0x00, 0x01]
  const t = [...PREFIXO_SHA1, ...hash]
  for (let i = 0; i < k - t.length - 3; i++) esperado.push(0xff)
  esperado.push(0x00, ...t)
  return esperado.every((b, i) => parseInt(m.slice(i * 2, i * 2 + 2), 16) === b)
}
