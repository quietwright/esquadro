import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { validar } from '../src/index.js'
import { contexto } from '../src/regras/contexto.js'
import { chaveSemDv } from '../src/regras/ide.js'
import { dvChave } from '../src/regras/util.js'
import { lerXml } from '../src/xml.js'

export const NFE_55 = readFileSync(new URL('./fixtures/nfe-55.xml', import.meta.url), 'utf8')

// Instante de recebimento simulado: 1 minuto depois da emissão da fixture.
export const AGORA = new Date('2026-10-15T13:01:00Z')

/** Aplica trocas [de, para] na fixture; cada `de` precisa existir. */
export function nota(trocas = [], base = NFE_55) {
  let xml = base
  for (const [de, para] of trocas) {
    assert.ok(xml.includes(de), `a nota não contém ${de}`)
    xml = xml.replace(de, para)
  }
  return xml
}

/** Refaz a chave de acesso (Id, cDV e a referência da assinatura) a partir dos campos. */
export function comChave(xml) {
  const doc = lerXml(xml)
  const ctx = contexto(doc.raiz.nome === 'NFe' ? doc.raiz : doc.raiz.filhos.find((f) => f.nome === 'NFe'))
  const corpo = chaveSemDv(ctx)
  const chave = corpo + dvChave(corpo)
  return xml
    .replace(/<cDV>\d<\/cDV>/, `<cDV>${chave.at(-1)}</cDV>`)
    .replaceAll(`NFe${ctx.chave}`, `NFe${chave}`)
}

/** Põe (ou refaz) o QR Code versão 3 online com a chave atual da nota. */
export function comQrCode(xml) {
  const chave = /Id="NFe(\w{44})"/.exec(xml)[1]
  const tpAmb = /<tpAmb>(\d)</.exec(xml)[1]
  const supl = `<infNFeSupl><qrCode>https://www.homologacao.nfce.fazenda.sp.gov.br/qrcode?p=${chave}|3|${tpAmb}</qrCode><urlChave>https://www.homologacao.nfce.fazenda.sp.gov.br/consulta</urlChave></infNFeSupl>`
  return xml.replace(/<infNFeSupl>.*<\/infNFeSupl>/, '').replace('</infNFe>', `</infNFe>${supl}`)
}

// NFC-e derivada da fixture: modelo 65, DANFE NFC-e, sem destinatário identificado e com QR Code.
export const NFCE = comQrCode(
  comChave(
    nota([
      ['<mod>55</mod>', '<mod>65</mod>'],
      ['<tpImp>1</tpImp>', '<tpImp>4</tpImp>'],
      [/<dest>.*<\/dest>/.exec(NFE_55)[0], ''],
    ]),
  ),
)

export function validarNota(xml, opcoes = {}) {
  return validar(xml, { agora: AGORA, ...opcoes })
}

/** Ids das regras acusadas; falha o teste se a nota não passou do schema. */
export function acusadas(xml, opcoes) {
  const r = validarNota(xml, opcoes)
  const esquema = r.problemas.filter((p) => p.regra === 'D01')
  assert.deepEqual(esquema, [], 'a variação precisa continuar válida no schema')
  return r.problemas.map((p) => p.regra)
}
