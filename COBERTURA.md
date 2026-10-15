# Cobertura

O catálogo tem **974 regras** de validação da autorização de NF-e e NFC-e, tiradas do MOC 7.0 e das Notas Técnicas vigentes (veja `catalogo/fontes.json`). O esquadro confere **653** delas (67%).

As demais estão abaixo, agrupadas pelo motivo de ficarem de fora. Este arquivo é gerado por `npm run cobertura` a partir do catálogo e do código: não há número escrito à mão.

| | Regras | |
|---|---:|---:|
| Conferidas pelo esquadro | 653 | 67% |
| Consulta bases da SEFAZ | 109 | 11% |
| Outro serviço | 8 | 1% |
| Coberta pelo schema | 9 | 1% |
| Campos fora do schema 010f | 9 | 1% |
| Ambiente de transmissão | 35 | 4% |
| Certificado e assinatura digital | 12 | 1% |
| Implementação futura | 38 | 4% |
| Inscrição estadual e SUFRAMA | 8 | 1% |
| Parâmetro da UF | 12 | 1% |
| QR Code com segredo do contribuinte ou versão antiga | 30 | 3% |
| Tabela ainda não incorporada | 43 | 4% |
| Formato de número de documento | 5 | 1% |
| Pendente | 3 | 0% |
| **Total** | **974** | |

## Consulta bases da SEFAZ (109)

Cadastro de contribuintes, notas já autorizadas, eventos, CSC. Só o autorizador tem esses dados.

| Regra | cStat | Mensagem |
|---|---:|---|
| 1C17-02 | 163 | Emitente possui inscrição estadual ativa no cadastro da UF |
| 1C17-04 | 164 | Emitente com situação irregular na UF |
| 1C17-10 | 230 | IE do emitente não cadastrada |
| 1C17-20 | 231 | IE do emitente não vinculada ao CNPJ |
| 1C17-30 | 622 | IE emitente não vinculada ao CPF |
| 1C17-34 | 203 | Emissor não habilitado para emissão da NF-e |
| 1C17-38 | 781 | Emissor não habilitado para emissão da NFC-e |
| 1C17-40 | 301 | Uso Denegado: Irregularidade fiscal do emitente |
| 1C17-50 | 307 | Emitente bloqueado pela UF de destino, em operação com consumidor final |
| 1C17-60 | 245 | CNPJ Emitente não cadastrado |
| 1C17-70 | 621 | CPF Emitente não cadastrado |
| 1P10-10 | 9493 | CNPJ/CPF do Certificado de Transmissão não é emitente de NF-e ou NFC-e |
| 2AB08-10 | 692 | Existe EPEC registrado para esta Série e Número [Chave EPEC: xxxxxxxxxxx] |
| 2AB08-20 | 691 | Chave de Acesso da NF-e diverge da Chave de Acesso do EPEC [Chave EPEC: xxxxxxxxx] |
| 2AB08-30 | 467 | Dados da NF-e divergentes do EPEC [tag:xxxx] |
| 2AB08-40 | 468 | NF-e com Tipo Emissão = 4, sem EPEC correspondente |
| 2B08-10 | 539 | Duplicidade de NF-e com diferença na Chave de Acesso [chNFe: 99999999999999999999999999999999999999999999][nRec:9999999999999 99] Observação: Na resposta assíncrona, a SEFAZ pode devolver o nREC – Número do Recibo do Lote caso tenha condições. |
| 2B08-20 | 204 | Duplicidade de NF-e [nRec:999999999999999] |
| 2B08-30 | 218 | NF-e já está cancelada na base de dados da SEFAZ [nRec:999999999999999] Observação: Na resposta assíncrona, a SEFAZ pode devolver o nREC – Número do Recibo do Lote caso tenha condições. |
| 2B08-40 | 205 | NF-e está denegada na base de dados da SEFAZ [nRec:999999999999999] Observação: Na resposta assíncrona, a SEFAZ pode devolver o nREC – Número do Recibo do Lote caso tenha condições. |
| 2B08-50 | 635 | NF-e com mesmo número e série já transmitida e aguardando processamento |
| 2P10-10 | 9494 | GTIN inexistente no Cadastro Centralizado de GTIN (CCG) |
| 2P10-20 | 9495 | GTIN existe no CCG com situação inválida. Solicitar ao dono da marca que entre em contato com a GS1 |
| 2P10-30 | 9496 | GTIN existe no CCG, mas dono da marca não autorizou a publicação das informações. Entrar em contato com o dono da marca |
| 2P10-40 | 9497 | GTIN existe no CCG com NCM não cadastrado |
| 2P10-50 | 9498 | GTIN existe no CCG com NCM inválido |
| 3B08-100 | 206 | Numeração da NF-e já está inutilizada na Base de Dados da SEFAZ |
| 3BA02-10 | 267 | Chave de Acesso referenciada inexistente [nRef: xxx] |
| 3BA02-20 | 268 | NF Complementar referencia uma outra NF-e Complementar |
| 3BA02-30 | 686 | NF Complementar referencia uma NF-e cancelada |
| 3BA02-40 | 687 | NF Complementar referencia uma NF-e denegada |
| 3BA02-50 | 545 | NF-e de devolução com valor total superior a NF-e devolvida |
| 3BA02-54 | 546 | NF-e de devolução com valor do ICMS superior a NF-e devolvida |
| 3BA02-58 | 566 | NF-e de devolução com valor do FCP superior a NF-e devolvida |
| 3BA02-64 | 567 | NF-e de devolução com valor do ICMS da UF Destino superior a NF-e devolvida |
| 3BA02-68 | 581 | NF-e de devolução com valor do FCP da UF Destino superior a NF-e devolvida |
| 3BA02-70 | 1095 | Chave de acesso referenciada deve existir e não estar cancelada [nRef: xxx] |
| 3BA02a-10 | 267 | Chave de Acesso referenciada inexistente [nRef: xxx] |
| 3BA15-10 | 688 | NF referenciada de Produtor com IE inexistente [nRef: xxx] |
| 3BA15-20 | 689 | NF referenciada de Produtor com IE não vinculada ao CNPJ/CPF informado [nRef: xxx] |
| 4I54-10 | 357 | Chave de Acesso do grupo de Exportação Indireta inexistente [nRef: xxx] |
| 4I54-20 | 358 | Chave de Acesso do grupo de Exportação Indireta cancelada ou denegada [nRef: xxx] |
| 5AF15-10 | 942 | IE do local de retirada não cadastrada |
| 5AF15-11 | 165 | IE do Local de Retirada com situação irregular na UF |
| 5AF15-12 | 167 | IE do local de retirada não está ativa na UF |
| 5AF15-20 | 943 | IE do local de retirada não vinculada ao CNPJ |
| 5AF15-30 | 944 | IE do local de retirada não vinculada ao CPF |
| 5AF17-10 | 168 | IE do local de retirada não informada |
| 5AF17-20 | 169 | CNPJ do Local de Retirada com situação irregular na UF |
| 5BG15-10 | 171 | IE do local de entrega não cadastrada |
| 5BG15-11 | 173 | IE do Local de Entrega com situação irregular na UF |
| 5BG15-12 | 175 | IE do local de Entrega não está ativa na UF |
| 5BG15-20 | 947 | IE do local de entrega não vinculada ao CNPJ |
| 5BG15-30 | 948 | IE do local de entrega não vinculada ao CPF |
| 5BG17-10 | 176 | IE do local de Entrega não informada |
| 5BG17-20 | 177 | CNPJ do Local de Entrega com situação irregular na UF |
| 5E17-10 | 233 | IE do destinatário não cadastrada |
| 5E17-12 | 300 | Tipo da IE do Destinatário difere de Não Contribuinte no cadastro da UF |
| 5E17-20 | 234 | IE do destinatário não vinculada ao CNPJ |
| 5E17-30 | 624 | IE Destinatário não vinculada ao CPF |
| 5E17-40 | 302 | Uso Denegado: Irregularidade fiscal do destinatário |
| 5E17-43 | 305 | Destinatário bloqueado na UF |
| 5E17-46 | 306 | IE do destinatário não está ativa na UF |
| 5E17-50 | 232 | IE do destinatário não informada |
| 5E17-60 | 303 | Uso Denegado: Destinatário não habilitado a operar na UF |
| 5E17-63 | 305 | Destinatário bloqueado na UF |
| 5E17-65 | 172 | Alerta: Situação do CNPJ destinatário inabilitado no momento da autorização |
| 5E17-80 | 623 | CPF Destinatário não cadastrado |
| 7B09-10 | 479 | Data de Emissão anterior a data de credenciamento ou anterior a Data de Abertura do estabelecimento |
| 7C10-10 | 480 | Código Município do Emitente diverge do cadastrado na UF |
| 7C21-10 | 481 | Código Regime Tributário do emitente diverge do cadastro na SEFAZ |
| 7E10-10 | 482 | Código do Município do Destinatário diverge do cadastrado na UF |
| 7GA01-10 | 486 | Não informado o Grupo de Autorização para UF que exige a identificação do Escritório de Contabilidade na Nota Fiscal |
| 7GA01-20 | 487 | Escritório de Contabilidade não cadastrado na SEFAZ |
| 7ZD02-10 | 974 | CNPJ do responsável técnico diverge do cadastrado |
| 7ZD08-10 | 976 | Identificador do CSRT não cadastrado na SEFAZ |
| 7ZD08-20 | 977 | Identificador do CSRT revogado |
| 7ZD09-10 | 978 | Hash do CSRT diverge do calculado |
| 8C02-10 | 488 | Vendas do Emitente incompatíveis com o Porte da Empresa |
| 9I03-10 | 890 | GTIN inexistente no Cadastro Centralizado de GTIN (CCG) [nItem:999] |
| 9I03-20 | 891 | GTIN incompatível com a NCM [nItem:999; NCM esperada: 99999999] |
| 9I03-30 | 892 | GTIN incompatível com CEST [nItem:999; CEST esperado: 9999999] |
| 9I12-10 | 894 | GTIN da unidade tributável inexistente no Cadastro Centralizado de GTIN (CCG) [nItem:999] |
| 10ZF04-10 | 837 | Guia de trânsito inválida |
| 10ZF04-20 | 838 | Guia de trânsito já utilizada |
| 11BC01-10 | 1146 | NF-e referenciada de pagamento antecipado informada indevidamente |
| 11BC01-20 | 1147 | NF-e referenciada de pagamento antecipado inexistente |
| 11BC01-30 | 1143 | NF-e referenciada de pagamento antecipado deve ser do tipo débito, pagamento antecipado |
| 12C02-10 | 178 | CNPJ [XX.XXX.XXX/XXXX-DV] do emitente não cadastrado na Receita Federal |
| 12C02-20 | 179 | CNPJ [XX.XXX.XXX/XXXX-DV] do emitente com situação irregular na Receita Federal |
| 12C21-20 | 180 | Código Regime Tributário do emitente diverge do cadastro na Receita Federal |
| 12E02-10 | 181 | CNPJ [XX.XXX.XXX/XXXX-DV] do destinatário não cadastrado na Receita Federal |
| 12E02-20 | 182 | CNPJ [XX.XXX.XXX/XXXX-DV] do Destinatário com situação irregular na Receita Federal |
| 12F02-10 | 183 | CNPJ [XX.XXX.XXX/XXXX-DV] do Local de Retirada não cadastrado na Receita Federal |
| 12F02-20 | 184 | CNPJ [XX.XXX.XXX/XXXX-DV] do Local de Retirada com situação irregular na Receita Federal |
| 12G02-10 | 185 | CNPJ [XX.XXX.XXX/XXXX-DV] do Local de Entrega não cadastrado na Receita Federal |
| 12G02-20 | 186 | CNPJ [XX.XXX.XXX/XXXX-DV] do Local de Entrega com situação irregular na Receita Federal |
| BA10-20 | 318 | Contranota de Produtor sem Nota Fiscal referenciada |
| BA10-30 | 319 | Contranota de Produtor não pode referenciar somente Nota Fiscal de entrada |
| BA10-40 | 320 | Contranota de Produtor referencia somente NF de outro emitente |
| BA10-50 | 922 | Contranota de Produtor só pode referenciar NF-e |
| BB05-170 | 1214 | DFe referenciado em operação com ente governamental deve existir e não estar cancelada [nOcor:nnn] |
| BB05-190 | 1216 | DFe referenciado em operação com ente governamental deve ser de fornecimento com pagamento posterior [nOcor:nnn] |
| BB05-200 | 1217 | DFe referenciado em operação com ente governamental deve ser de recebimento do pagamento com fornecimento posterior [nOcor:nnn] |
| C21-20 | 668 | Utilização de PAA não permitida para contribuinte enquadrado no regime normal |
| I70-10 | 465 | Número de Controle da FCI inexistente |
| ZG02-20 | 671 | Provedor de Assinatura e Autorização não existe na base da SEFAZ |
| ZG02-30 | 936 | Emitente não associado ao PAA |
| ZG02-34 | 872 | Série da NF difere da estipulada para este Emitente no PAA Rejeição: Chave do Emitente para o PAA inválida |

## Outro serviço (8)

Regras de eventos e da consulta de GTIN que aparecem nas tabelas de autorização das NTs.

| Regra | cStat | Mensagem |
|---|---:|---|
| D04 | 491 | O tpEvento informado inválido |
| D05 | 492 | O verEvento informado inválido |
| D06 | 493 | Evento não atende o Schema XML específico |
| G04e | 617 | Chave de Acesso inválida (CNPJ/CPF zerado ou dígito inválido) |
| G06 | 494 | Chave de Acesso inexistente [chNFe:99999999999999999999999999999999 999999999999] |
| G08 | 574 | O autor do evento diverge do emissor da NF-e |
| P10-10 | 9491 | GTIN com dígito verificador inválido |
| P10-20 | 9492 | GTIN não possui prefixo 789 ou 790 (Brasil) |

## Coberta pelo schema (9)

A própria NT diz que o schema XML faz a verificação; o esquadro acusa como falha de schema (D01, cStat 225).

| Regra | cStat | Mensagem |
|---|---:|---|
| YC03-10 | 215 | Falha no esquema XML Observação: Validação realizada pelo Schema XML |
| YC04-20 | 215 | Falha no esquema XML Observação: Validação realizada pelo Schema XML |
| ZX02-232 | 396 | Parâmetro do QR-Code inexistente: [Param: xxx)] |
| ZX02-288 | 396 | Parâmetro do QR-Code inexistente: [Param: xxx) |
| ZX02-292 | 400 | Parâmetro Digest Value no QR-Code não está no formato hexadecimal (Caracteres: “0-9”, “a-f”,“A-F”). |
| ZX02-300 | 396 | Parâmetro do QR-Code inexistente: [Param: xxx] |
| ZX02-312 | 396 | Parâmetro do QR-Code inexistente: [Param: xxx) |
| ZX02-316 | 400 | Parâmetro Hash no QR-Code não está no formato hexadecimal (Caracteres: “0-9”, “a-f”,“A-F”). |
| ZX02-326 | 396 | Parâmetro do QR-Code inexistente: [Param: xxx] |

## Campos fora do schema 010f (9)

Regras de campos que ainda não existem no pacote de schemas vigente (010f). Entram quando o pacote que os cria for publicado.

| Regra | cStat | Mensagem |
|---|---:|---|
| I11c-10 | 1278 | Valor Líquido do Produto não informado [nItem: 999] |
| I11c-20 | 1279 | Valor Líquido do Produto difere do calculado [nItem: 999] |
| NB01-10 | 1280 | Grupo do ICMS Previsto no Pagamento Antecipado informado indevidamente [nItem: 999] |
| NB01-20 | 1280 | Grupo do ICMS Previsto no Pagamento Antecipado informado indevidamente [nItem: 999] |
| NB01-30 | 1281 | Grupo do ICMS Previsto no Pagamento Antecipado não informado [nItem: 999] |
| W01a-10 | 1282 | Total Líquido não informado |
| W01a-20 | 1283 | Total Líquido difere do somatório dos itens |
| YC05-10 | 1273 | Meio de pagamento inválido [nPag: 999] |
| YC06-10 | 1274 | CNPJ do recebedor do pagamento inválido [nPag: 999] |

## Ambiente de transmissão (35)

Certificado de transmissão, envelope SOAP, lote, webservice, UF ou ambiente de destino, SVC, PAA. Dependem de como e para onde a nota é enviada.

| Regra | cStat | Mensagem |
|---|---:|---|
| A01 | 280 | Certificado Transmissor inválido |
| A02 | 281 | Certificado Transmissor Data Validade |
| A03 | 283 | Certificado Transmissor - erro Cadeia de Certificação |
| A04 | 286 | Certificado Transmissor erro no acesso a LCR |
| A05 | 284 | Certificado Transmissor revogado |
| A06 | 285 | Certificado Transmissor difere ICP-Brasil |
| A07 | 282 | Certificado Transmissor sem CNPJ/CPF |
| A08 | 832 | CNPJ incorreto na transmissão da NFF |
| B00 | 242 | Mensagem SOAP inválida |
| B02-10 | 226 | Código da UF do Emitente diverge da UF autorizadora |
| B02-20 | 476 | Código da UF diverge da UF da primeira NF-e do Lote |
| B03 | 108 | Serviço Paralisado Momentaneamente (curto prazo) |
| B04 | 109 | Serviço Paralisado sem Previsão |
| B05 | 410 | UF informada no campo cUF não é atendida pelo WebService |
| B06-10 | 702 | NFC-e não é aceita pela UF do Emitente |
| B06-20 | 765 | Lote só poderá conter NF-e ou NFC-e |
| B06-30 | 450 | Modelo da NF-e diferente de 55 |
| B06-40 | 775 | Modelo da NFC-e diferente de 65 |
| B22-20 | 712 | NFC-e com contingência off-line para a UF |
| B22-60 | 713 | Tipo de Emissão diferente de 6 ou 7 para contingência da SVC acessada |
| B22-70 | 783 | NFC-e não é autorizada pela SVC |
| B24-10 | 252 | Ambiente informado diverge do Ambiente de recebimento |
| B25b-30 | 785 | NFC-e com entrega a domicílio não permitida pela UF |
| B26-22 | 631 | Ambiente de autorização não suporta esta operação |
| B26-40 | 571 | Processo de emissão pelo Fisco com Certificado de Transmissão incompatível |
| C02-20 | 560 | CNPJ base/CPF do emitente difere do CNPJ base/CPF da primeira NF-e do lote recebido |
| C02a-30 | 560 | CNPJ Base/CPF do emitente difere do CNPJ Base/CPF da primeira NF-e do lote recebido |
| C12-10 | 247 | Sigla da UF do Emitente diverge da UF autorizadora |
| C17-11 | 166 | UF de autorização não permitida para contribuinte exclusivo do IBS/CBS |
| GAP03a-1 | 764 | Solicitada resposta síncrona para Lote com mais de uma NF-e (indSinc=1) |
| GAP03a-3 | 452 | Solicitada resposta assíncrona para Lote com somente 1 (uma) NF-e |
| GAP03a-4 | 126 | Enviado lote com mais de 1 NFC-e |
| GAP03a-5 | 127 | Enviado lote com mais de 1 NF-e |
| ZG01-10 | 633 | Ambiente de autorização inválido para emissão pelo PAA |
| ZG02-40 | 776 | Emissão por PAA deve ser assinada pelo CNPJ do Provedor de Assinatura |

## Certificado e assinatura digital (12)

Validade e cadeia do certificado e cálculo da assinatura XML.

| Regra | cStat | Mensagem |
|---|---:|---|
| E01 | 290 | Certificado Assinatura inválido |
| E02 | 291 | Certificado Assinatura Data Validade |
| E03 | 292 | Certificado de Assinatura sem CNPJ/CPF |
| E04 | 293 | Certificado Assinatura - erro Cadeia de Certificação |
| E05 | 296 | Certificado Assinatura erro no acesso a LCR |
| E06 | 294 | Certificado Assinatura revogado |
| E07 | 295 | Certificado Assinatura difere ICP-Brasil |
| F01 | 298 | Assinatura difere do padrão do Sistema |
| F02 | 297 | Assinatura difere do calculado |
| F03 | 213 | CNPJ-Base do Emitente difere do CNPJ-Base do Certificado Digital |
| ZG04-10 | 856 | Emissão por PAA com Assinatura RSA inválida |
| ZX02-338 | 583 | Valor da assinatura do qrCode difere do valor calculado |

## Implementação futura (38)

A própria NT diz que a regra ainda não vale.

| Regra | cStat | Mensagem |
|---|---:|---|
| BA02-70 | 954 | Chave de Acesso referenciada não permitida para esta operação[nOcor:nnn] |
| BA02-80 | 954 | Chave de Acesso referenciada não permitida para esta operação[nOcor:nnn] |
| G01-10 | 670 | Local de entrega informado indevidamente |
| I05k-30 | 1167 | Classificação para subapuração do IBS na ZFM não informada [nItem: 999] |
| I13-10 | 735 | NFC-e com Unidade de Tributação inválida [nItem: 999] |
| K01-10 | 840 | NCM de medicamento e não informado o grupo de medicamento (med) [nItem:nnn] |
| LB01-20 | 349 | Número RECOPI não informado |
| N23b-20 | 875 | Percentual de FCPST inválido [nItem: 999] |
| N27d-10 | 860 | Valor do FCP informado difere de base de cálculo*alíquota [nItem: 999] |
| NA17-10 | 816 | Valor do ICMS Interestadual para UF do Remetente difere do calculado [nItem: 999] (Valor Informado: XXX, Valor Calculado:XXX) |
| UB01-10 | 1011 | Não é permitido uso do Imposto Seletivo para esta classificação da operação [nItem: 999] |
| UB01-20 | 1012 | É exigido o uso do Imposto Seletivo para esta classificação da operação [nItem: 999] |
| UB01-30 | 1013 | É exigido o uso do Imposto Seletivo para esta classificação da operação para este NCM [nItem: 999] |
| UB02-10 | 1014 | CST do Imposto Seletivo informado inexistente [nItem: 999] |
| UB03-10 | 1015 | Classificação Tributária do Imposto Seletivo informada inexistente [nItem: 999] |
| UB05-10 | 1103 | Valor da Base de cálculo do Imposto Seletivo difere do somatório dos valores que a compõem [nItem: 999] |
| UB06-10 | 1016 | CST do Imposto Seletivo obriga informação de alíquota de Imposto Seletivo [nItem: 999] |
| UB07-10 | 1017 | Obrigatório informação de alíquota específica de Imposto Seletivo [nItem: 999] |
| UB08-10 | 1018 | Unidade tributável (uTrib) e Quantidade tributável (qTrib) do imposto seletivo não informados [nItem: 999] |
| UB11-10 | 1019 | Valor do Imposto Seletivo difere do calculado [nItem: 999] |
| UB13-40 | 1116 | Grupo gIBSCBSMono não informado [nItem: 999] |
| UB88a-10 | 1223 | Valor do IBS Monofásico Ad Rem retido anteriormente difere do calculado [nItem: 999] |
| UB93a-10 | 1240 | Valor do IBS Monofásico Ad Valorem retido anteriormente difere do calculado [nItem: 999] |
| UB94b-10 | 1244 | Valor do IBS Monofásico Ad Valorem correspondente a diferença em relação ao pBioObrigatorio difere do calculado [nItem: 999] |
| UB98a-10 | 1255 | Valor da CBS Monofásica Ad Rem retido anteriormente difere do calculado [nItem: 999] |
| UB103a-10 | 1268 | Valor da CBS Monofásica Ad Valorem retido anteriormente difere do calculado [nItem: 999] |
| UB104b-10 | 1272 | Valor da CBS Monofásica Ad Valorem correspondente a diferença em relação ao pBioObrigatorio difere do calculado [nItem: 999] |
| UB105a-10 | 1070 | Valor do IBS monofásico difere do calculado [nItem: 999] |
| UB105b-10 | 1071 | Valor da CBS monofásico difere do calculado [nItem: 999] |
| VB01-05 | 1137 | Valor total do Item (vItem) não informado [nItem: 999] |
| VB01-10 | 1105 | Valor total do Item (vItem) difere do somatório dos valores que o compõem [nItem: 999] |
| VB01-20 | 1105 | Valor total do Item (vItem) difere do somatório dos valores que o compõem [nItem: 999] |
| W33-10 | 1075 | Total do Imposto Seletivo difere da soma dos itens |
| W60-05 | 1004 | Valor total da NF-e com IBS / CBS / IS (vNFTot) não informado |
| W60-10 | 1094 | Total da NFe difere da soma do total dos itens da Nota |
| Z02-10 | 949 | NFC-e sem preenchimento das Informações Adicionais de Interesse do Fisco |
| Z02-20 | 950 | Informações Adicionais de Interesse do Fisco abaixo do tamanho mínimo exigido pela UF. |
| ZF05-30 | 839 | Madeira sem documento de origem [nItem: 999] |

## Inscrição estadual e SUFRAMA (8)

Dígito verificador de IE (27 algoritmos, um por UF) e da inscrição SUFRAMA. Pendente: quero casos de teste confiáveis antes de rejeitar IE de alguém.

| Regra | cStat | Mensagem |
|---|---:|---|
| C17-20 | 209 | IE do emitente inválida |
| C18-30 | 211 | IE do substituto inválida |
| C22-20 | 1186 | Inscrição do emitente na Suframa com dígito verificador inválido |
| E17-50 | 210 | IE do destinatário inválida |
| E18-20 | 235 | Inscrição SUFRAMA inválida |
| F15-10 | 971 | IE inválida [local de retirada/entrega] |
| G15-10 | 971 | IE inválida [local de retirada/entrega] |
| X07-20 | 544 | IE do Transportador inválida |

## Parâmetro da UF (12)

Limites de valor e opções que cada SEFAZ configura e não publica em tabela nacional.

| Regra | cStat | Mensagem |
|---|---:|---|
| BB02-10 | 1008 | Nota de compra governamental e alíquota dos outros entes informada incorretamente 1=União 2=Estado 3=Distrito Federal 4=Município 5=Consórcio Público 6=Comitê Gestor do IBS |
| C21-10 | 812 | Regime Tributário SN, com excesso de sublimite não é permitido para Emitentes desta UF |
| I05g-10 | 507 | Grupo de informações sobre o Crédito Presumido não permitido |
| I08-194 | 475 | Operação não permitida para não contribuinte [nItem:999] |
| I08-198 | 475 | Operação não permitida para não contribuinte [nItem:999] |
| N12a-30 | 384 | CSOSN não permitido para a UF [nItem: nnn] |
| W04-20 | 417 | Total do ICMS superior ao valor limite estabelecido |
| W06-20 | 418 | Total do ICMS ST superior ao valor limite estabelecido |
| W16-20 | 628 | Total da NF superior ao valor limite estabelecido pela SEFAZ [Limite] |
| YA04a-20 | 737 | Pagamento com cartão de crédito em sistema de automação não integrado |
| ZB02-20 | 360 | NF-e com Nota de Empenho inválida para a UF. |
| ZB02-30 | 361 | NF-e com Nota de Empenho inexistente na UF. |

## QR Code com segredo do contribuinte ou versão antiga (30)

Hash da versão 2 (usa o CSC, segredo do emitente) e parâmetros da versão 100, extinta em 2018.

| Regra | cStat | Mensagem |
|---|---:|---|
| ZX02-20 | 395 | Endereço do site da UF da Consulta via QR-Code diverge do previsto |
| ZX02-22 | 813 | QR-Code com sequência de escape para o e-comercial. Usar CDATA |
| ZX02-24 | 396 | Parâmetro do QR-Code inexistente (chAcesso) |
| ZX02-28 | 397 | Parâmetro do QR-Code divergente da Nota Fiscal (chAcesso) |
| ZX02-32 | 396 | Parâmetro do QR-Code inexistente (nVersao) |
| ZX02-40 | 396 | Parâmetro do QR-Code inexistente (tpAmp) |
| ZX02-44 | 397 | Parâmetro do QR-Code divergente da Nota Fiscal (tpAmb) |
| ZX02-48 | 396 | Parâmetro do QR-Code inexistente (cDest) |
| ZX02-52 | 399 | Parâmetro de Identificação do destinatário no QR-Code para Nota Fiscal sem identificação do destinatário |
| ZX02-56 | 397 | Parâmetro do QR-Code divergente da Nota Fiscal (cDest) |
| ZX02-60 | 396 | Parâmetro do QR-Code inexistente (dhEmi) |
| ZX02-64 | 400 | Parâmetro do QR-Code não está no formato hexadecimal (dhEmi) |
| ZX02-68 | 397 | Parâmetro do QR-Code divergente da Nota Fiscal (dhEmi) |
| ZX02-72 | 396 | Parâmetro do QR-Code inexistente (vNF) |
| ZX02-76 | 397 | Parâmetro do QR-Code divergente da Nota Fiscal (vNF) |
| ZX02-80 | 396 | Parâmetro do QR-Code inexistente (vICMS) |
| ZX02-84 | 397 | Parâmetro do QR-Code divergente da Nota Fiscal (vICMS) |
| ZX02-88 | 396 | Parâmetro do QR-Code inexistente (digVal) |
| ZX02-92 | 400 | Parâmetro do QR-Code não está no formato hexadecimal (digVal) |
| ZX02-96 | 397 | Parâmetro do QR-Code divergente da Nota Fiscal (digVal) |
| ZX02-100 | 396 | Parâmetro do QR-Code inexistente (cIdToken) |
| ZX02-104 | 462 | Código Identificador do CSC no QR-Code não cadastrado na SEFAZ |
| ZX02-108 | 463 | Código Identificador do CSC no QR-Code foi revogado pela empresa |
| ZX02-112 | 396 | Parâmetro do QR-Code inexistente (cHashQRCode) |
| ZX02-116 | 400 | Parâmetro do QR-Code não está no formato hexadecimal (cHashQRCode) |
| ZX02-120 | 464 | Código de Hash no QR-Code difere do calculado |
| ZX02-296 | 397 | Parâmetro do QR-Code divergente da Nota Fiscal: [Param: xxx)] |
| ZX02-304 | 462 | Parâmetro Código Identificador do CSC no QR-Code não cadastrado na SEFAZ. |
| ZX02-308 | 463 | Parâmetro Código Identificador do CSC no QR-Code foi revogado pela empresa anteriormente a Data de Emissão. |
| ZX02-320 | 464 | Parâmetro Hash no QR-Code diverge do calculado |

## Tabela ainda não incorporada (43)

Dependem de tabela que o esquadro ainda não traz: NCM, enquadramento do IPI, cBenef por UF, unidades de medida, URLs do QR Code por UF, índice de biocombustível, indicadores de CST mais novos.

| Regra | cStat | Mensagem |
|---|---:|---|
| B25d-20 | 1102 | Código indicador do local de operação de fornecimento não permitido neste modelo de DFe |
| I05-20 | 778 | Informado NCM inexistente[nItem:nnn] |
| I05-30 | 779 | NFC-e com NCM incompatível [nItem: 999] |
| I05c-10 | 446 | Informado CEST inexistente [nItem:999] |
| I05h-10 | 664 | Informado código de crédito presumido (cCredPresumido) incorreto, inexistente ou incompatível na UF [nItem: nnn] |
| I09-10 | 734 | NFC-e com Unidade de Comercialização inválida [nItem: 999] |
| I14-10 | 817 | Unidade Tributável incompatível com o NCM informado na operação com Comércio Exterior [nItem: 999] |
| LA11-10 | 378 | Grupo de Combustível sem a informação de Encerrante [nItem: nnn] |
| N12-85 | 930 | CST com benefício fiscal e não informado o código de benefício fiscal [nItem: nnn] |
| N12-86 | 928 | Informado código de benefício fiscal para CST sem benefício fiscal [nItem: nnn] |
| N12-90 | 934 | Não informado valor do ICMS desonerado ou o Motivo de desoneração [nItem: nnn] |
| N12-94 | 931 | Informado código de benefício fiscal incompatível com CST e UF [nItem: nnn] |
| N12-98 | 946 | Informado código de benefício fiscal incorreto ou inexistente na UF [nItem: nnn] |
| N14a-20 | 666 | Informado código de benefício fiscal de redução de BC (cBenefRBC) incorreto, inexistente ou incompatível na UF [nItem: nnn] |
| O06-10 | 387 | Código de Enquadramento Legal do IPI inválido [nItem:nnn] |
| UB13-44 | 1131 | Grupo de transferência de crédito informado indevidamente [nItem: 999] |
| UB13-45 | 1132 | Grupo de transferência de crédito não informado [nItem: 999] |
| UB14-30 | 1043 | Índice de mistura do Biocombustível inferior ao obrigatório para esta Classificação Tributária do IBS e CBS [nItem: 999] |
| UB14-50 | 1059 | Índice de mistura do Biocombustível superior ao obrigatório para esta Classificação Tributária do IBS e CBS [nItem: 999] |
| UB27-10 | 1034 | Percentual de redução de alíquota da UF não é válido para este cClassTrib [nItem: 999] |
| UB46-10 | 1046 | Percentual de redução de alíquota do Município não é válido para este cClassTrib [nItem: 999] |
| UB56-20 | 1037 | Alíquota da CBS inválida [nItem: 999] |
| UB65-10 | 1063 | Percentual de redução de alíquota da CBS não é válido para este cClassTrib [nItem: 999] |
| UB66a-20 | 1191 | Grupo de operações em áreas incentivadas (ALC/ZFM) - CBS (alíquota zero) não permitido [nItem: 999] |
| UB89a-10 | 1226 | Quantidade de Biocombustível (EAC) a recolher ou a ressarcir do IBS Monofásico Ad Rem difere do calculado [nItem: 999] |
| UB89b-10 | 1227 | Valor do IBS Monofásico Ad Rem correspondente a diferença em relação ao pBioObrigatorio difere do calculado [nItem: 999] |
| UB94a-10 | 1243 | Quantidade de Biocombustível (EAC) a recolher ou a ressarcir do IBS Monofásico Ad Valorem difere do calculado [nItem: 999] |
| UB99a-10 | 1256 | Quantidade de Biocombustível (EAC) a recolher ou a ressarcir da CBS Monofásica Ad Rem difere do calculado [nItem: 999] |
| UB99b-10 | 1257 | Valor da CBS Monofásica Ad Rem correspondente a diferença em relação ao pBioObrigatorio difere do calculado [nItem: 999] |
| UB104a-10 | 1271 | Quantidade de Biocombustível (EAC) a recolher ou a ressarcir da CBS Monofásica Ad Valorem difere do calculado [nItem: 999] |
| UB112-10 | 1169 | Grupo de Ajuste de Competência informado indevidamente [nItem: 999] |
| UB112-20 | 1170 | Grupo de Ajuste de Competência não informado [nItem: 999] |
| UB131-20 | 1134 | CST do IBS/CBS informado não permite informação do grupo para apropriação de crédito presumido de IBS sobre o saldo devedor na ZFM [nItem: 999] |
| UB131-30 | 1135 | CST do IBS/CBS informado exige a informação do grupo para apropriação de crédito presumido de IBS sobre o saldo devedor na ZFM [nItem: 999] |
| X04-10 | 362 | Venda de combustível sem informação do Transportador |
| Z13-10 | 941 | Número do Regime especial inválido. |
| ZF02-10 | 835 | Em algum item da NF-e foi informado produto agrotóxico e não informado número da receita do defensivo agrícola. [nItem: 999] |
| ZF02-20 | 309 | Nenhum item da NF-e é defensivo agrícola e informada receita de agrotóxico. |
| ZF05-10 | 836 | Não informada Guia de Trânsito Animal [nItem: 999] |
| ZF05-14 | 310 | Informação indevida de Guia de Trânsito Animal |
| ZF05-20 | 311 | Não Informada Guia de Trânsito Vegetal [nItem: 999] |
| ZF05-24 | 312 | Informação Indevida de Guia de Trânsito Vegetal |
| ZX03-20 | 878 | Endereço do site da UF da Consulta por chave de acesso diverge do previsto |

## Formato de número de documento (5)

DI, drawback, registro de exportação e RECOPI: o MOC remete a regras de formação que não estão nos documentos baixados.

| Regra | cStat | Mensagem |
|---|---:|---|
| I19-10 | 329 | Número da DI /DSI inválido |
| I29a-20 | 335 | Número do processo de drawback na importação inválido |
| I51-20 | 339 | Número do processo de drawback na exportação inválido |
| I53-10 | 341 | Número do registro de exportação inválido |
| LB01-30 | 350 | Número RECOPI inválido |

## Pendente (3)

Ainda não implementadas.

| Regra | cStat | Mensagem |
|---|---:|---|
| B28-40 | 569 | Data de entrada em contingência muito atrasada |
| VC02-40 | 679 | Chave de Acesso referenciada com Modelo inválido [nItem:nnn] |
| ZX02-236 | 398 | Parâmetro Versão informada no QR-Code diverge do previsto [Param: xxx]. |
