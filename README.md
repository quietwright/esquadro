# esquadro

Validador offline de NF-e e NFC-e. Diz qual rejeição a SEFAZ vai dar antes de você mandar a
nota, com o código, a mensagem oficial, o campo, a linha do XML e o documento de onde a regra
saiu.

```
$ npx @quietwright/esquadro nota.xml
nota.xml  NF-e 35261011222333000181550010000001231482139077  2 rejeições
   502  Rejeição: Erro na Chave de Acesso - Campo Id não corresponde à concatenação dos campos correspondentes
        Id="NFe3526…139077", mas os campos formam NFe3526…139078
        NFe/infNFe · linha 1, coluna 87
        regra A03-10 · MOC 7.0 Anexo I, p. 74
   610  Rejeição: Total da NF difere do somatório dos Valores que compõe o valor Total da NF. (a critério da UF)
        vNF = 101.00; a composição dos totais dá 100.00 (tolerância de R$ 0,50)
        NFe/infNFe/total/ICMSTot/vNF · linha 1, coluna 2579
        regra W16-10 · NT 2023.001 v1.60, p. 41
```

Sem dependências. Roda em Node 20+ e no navegador.

## Por quê

As regras de validação da NF-e estão espalhadas em PDFs: o Manual de Orientação do Contribuinte
(MOC) e dezenas de Notas Técnicas que mudam regras a cada poucos meses. O schema XSD confere só o
formato; o resto (totais que não fecham, CFOP incompatível com o destino, CST que não cabe no
regime, IBS/CBS da Reforma Tributária) só aparece quando a SEFAZ devolve a rejeição. O esquadro
traz essas regras para o seu teste, o seu CI ou a tela do seu emissor.

## O que ele confere

- **Mensagem e estrutura**: XML bem formado, UTF-8, tamanho, namespace, prefixos, caracteres de
  edição entre as tags.
- **Schema**: o pacote de schemas oficial (010f, com a NT 2025.002 do IBS/CBS e o CNPJ
  alfanumérico), compilado e validado sem libxml. Aponta o elemento e, quando é o caso, o
  caractere culpado (`contém "“" (U+201C)`).
- **Certificado e assinatura**: refaz o cálculo da assinatura como a SEFAZ (C14N, SHA-1 e RSA,
  escritos sem dependências) e diz se a nota mudou depois de assinada (rejeição 297), além de
  validade, uso da chave e CNPJ do certificado (290, 291, 292, 213).
- **Regras de negócio**: **665 das 974 regras** de validação da autorização vigentes, entre elas
  chave de acesso (com o DV do CNPJ alfanumérico), inscrição estadual das 27 UFs, datas, CFOP,
  CST/CSOSN, totais, pagamento, QR Code da NFC-e e o grupo de IBS/CBS por item.

[COBERTURA.md](COBERTURA.md) lista as 974 regras: as conferidas e, para cada uma que fica de fora,
o motivo. A maior parte delas depende do que só a SEFAZ tem, como o cadastro de contribuintes e as
notas já autorizadas, ou do ambiente de envio, como certificado de transmissão, lote e webservice.

## Uso

```sh
npm install @quietwright/esquadro
```

```js
import { validar } from '@quietwright/esquadro'

const r = validar(xml) // string ou Uint8Array (NFe ou nfeProc)
r.valida      // false se houver rejeição obrigatória
r.problemas   // [{ regra, cStat, mensagem, efeito, aplicacao, detalhe, caminho, linha, coluna, fonte }]
```

`aplicacao: 'facultativa'` marca as regras que cada UF decide se aplica. Elas aparecem nos
problemas, mas não tornam a nota inválida.

Regras de data comparam com o instante de recebimento. Por padrão é agora; para simular outro:

```js
validar(xml, { agora: new Date('2026-10-15T13:00:00Z') })
```

A conferência da inscrição estadual também sai sozinha, para formulário de cadastro:

```js
import { problemaNaIe } from '@quietwright/esquadro'

problemaNaIe('110042490114', 'SP') // null: válida
problemaNaIe('110042490115', 'SP') // 'dígito verificador não confere com o cálculo de SP'
```

Na linha de comando:

```sh
esquadro nota.xml outra.xml     # saída legível; código 1 se alguma tiver rejeição
esquadro --json nota.xml        # para CI
cat nota.xml | esquadro -
```

## De onde vêm as regras

Nada aqui foi digitado à mão a partir do manual. `npm run fontes` baixa do Portal da NF-e o MOC, todas as
Notas Técnicas, o pacote de schemas e as tabelas de apoio (CFOP, municípios, países, prefixos
GS1, cClassTrib…), com o sha256 de cada arquivo. `npm run catalogo` extrai as tabelas de regras
dos PDFs lendo a geometria da página (as bordas da tabela e a posição de cada palavra), porque o
texto corrido do PDF mistura células. Texto **riscado** nas NTs é revogado: sai do catálogo, e
linha de regra riscada inteira revoga a regra ([catalogo/revogadas.json](catalogo/revogadas.json)).
As NTs se aplicam por cima do MOC em ordem de publicação, e cada regra guarda o histórico de onde
veio ([catalogo/regras.json](catalogo/regras.json)).

Cada regra implementada tem um teste com uma nota que a viola e, quando há exceções, testes que
provam que elas não disparam.

## Limites

- O esquadro reproduz as regras escritas. Ele não garante autorização: regras que consultam a
  base da SEFAZ (duplicidade, situação cadastral, IE vinculada ao CNPJ) não podem ser checadas
  offline.
- Do certificado, a cadeia até a raiz ICP-Brasil e a revogação não são conferidas: dependem do
  cadastro de autoridades certificadoras e das listas de revogação que a SEFAZ consulta.
- Onde a regra depende de parâmetro da UF (limites de valor, opções de contingência), o esquadro
  usa o padrão nacional ou não acusa.

Achou uma rejeição que o esquadro deixou passar, ou uma acusação que a SEFAZ não faz? Abra uma
issue com o XML (sem dados reais) e o retorno da SEFAZ.

## Licença

MIT. Sem garantia de qualquer tipo; a palavra final é sempre da SEFAZ.
