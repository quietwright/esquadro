// Gerado por scripts/compilar-xsd.mjs a partir do pacote de schemas PL_010f_v1.04.
// Não editar à mão.

export default {
 "pacote": "PL_010f_v1.04",
 "arquivos": [
  {
   "arquivo": "nfe_v4.00.xsd",
   "sha256": "adce3646c13ceb54922ec3142fc1dc45bd4fb839ac35ad583e86c733c07d27df"
  },
  {
   "arquivo": "leiauteNFe_v4.00.xsd",
   "sha256": "2bace939973916d54184ff3e2740041a932de5d79772f3363504504160f22542"
  },
  {
   "arquivo": "xmldsig-core-schema_v1.01.xsd",
   "sha256": "f56744a5f51c03f027de13f39f869307091781a9ef1d91b1ebe14719ce28e1ac"
  },
  {
   "arquivo": "tiposBasico_v4.00.xsd",
   "sha256": "772619c85723e598840667ca66e7298a250442df47eeb94b397d2a333ce62047"
  },
  {
   "arquivo": "DFeTiposBasicos_v1.00.xsd",
   "sha256": "173577a4e3a9dc1d0deced85b89b955b6064bb5a4ae5a96f6727d2da8a694d09"
  }
 ],
 "raizes": {
  "NFe": "nfe:TNFe"
 },
 "tipos": {
  "nfe:TNFe": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "infNFe",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe",
      "min": 1,
      "max": 1,
      "rotulo": "Informações da Nota Fiscal eletrônica",
      "unicos": [
       {
        "atributo": "nItem"
       }
      ]
     },
     {
      "t": "el",
      "nome": "infNFeSupl",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFeSupl",
      "min": 0,
      "max": 1,
      "rotulo": "Informações suplementares Nota Fiscal"
     },
     {
      "t": "el",
      "nome": "Signature",
      "ns": "ds",
      "tipo": "ds:SignatureType",
      "min": 1,
      "max": 1
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "ide",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide",
      "min": 1,
      "max": 1,
      "rotulo": "identificação da NF-e"
     },
     {
      "t": "el",
      "nome": "emit",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/emit",
      "min": 1,
      "max": 1,
      "rotulo": "Identificação do emitente"
     },
     {
      "t": "el",
      "nome": "avulsa",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/avulsa",
      "min": 0,
      "max": 1,
      "rotulo": "Emissão de avulsa, informar os dados do Fisco emitente"
     },
     {
      "t": "el",
      "nome": "dest",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/dest",
      "min": 0,
      "max": 1,
      "rotulo": "Identificação do Destinatário"
     },
     {
      "t": "el",
      "nome": "retirada",
      "ns": "nfe",
      "tipo": "nfe:TLocal",
      "min": 0,
      "max": 1,
      "rotulo": "Identificação do Local de Retirada (informar apenas quando for diferente do endereço do remetente)"
     },
     {
      "t": "el",
      "nome": "entrega",
      "ns": "nfe",
      "tipo": "nfe:TLocal",
      "min": 0,
      "max": 1,
      "rotulo": "Identificação do Local de Entrega (informar apenas quando for diferente do endereço do destinatário)"
     },
     {
      "t": "el",
      "nome": "autXML",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/autXML",
      "min": 0,
      "max": 10,
      "rotulo": "Pessoas autorizadas para o download do XML da NF-e"
     },
     {
      "t": "el",
      "nome": "det",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det",
      "min": 1,
      "max": 990,
      "rotulo": "Dados dos detalhes da NF-e"
     },
     {
      "t": "el",
      "nome": "total",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/total",
      "min": 1,
      "max": 1,
      "rotulo": "Dados dos totais da NF-e"
     },
     {
      "t": "el",
      "nome": "transp",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/transp",
      "min": 1,
      "max": 1,
      "rotulo": "Dados dos transportes da NF-e"
     },
     {
      "t": "el",
      "nome": "cobr",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/cobr",
      "min": 0,
      "max": 1,
      "rotulo": "Dados da cobrança da NF-e"
     },
     {
      "t": "el",
      "nome": "pag",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/pag",
      "min": 1,
      "max": 1,
      "rotulo": "Dados de Pagamento. Obrigatório apenas para (NFC-e) NT 2012/004"
     },
     {
      "t": "el",
      "nome": "infIntermed",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/infIntermed",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de Informações do Intermediador da Transação"
     },
     {
      "t": "el",
      "nome": "infAdic",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/infAdic",
      "min": 0,
      "max": 1,
      "rotulo": "Informações adicionais da NF-e"
     },
     {
      "t": "el",
      "nome": "exporta",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/exporta",
      "min": 0,
      "max": 1,
      "rotulo": "Informações de exportação"
     },
     {
      "t": "el",
      "nome": "compra",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/compra",
      "min": 0,
      "max": 1,
      "rotulo": "Informações de compras (Nota de Empenho, Pedido e Contrato)"
     },
     {
      "t": "el",
      "nome": "cana",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/cana",
      "min": 0,
      "max": 1,
      "rotulo": "Informações de registro aquisições de cana"
     },
     {
      "t": "el",
      "nome": "infRespTec",
      "ns": "nfe",
      "tipo": "nfe:TInfRespTec",
      "min": 0,
      "max": 1,
      "rotulo": "Informações do Responsável Técnico pela emissão do DF-e"
     },
     {
      "t": "el",
      "nome": "infSolicNFF",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/infSolicNFF",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo para informações da solicitação da NFF"
     },
     {
      "t": "el",
      "nome": "agropecuario",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/agropecuario",
      "min": 0,
      "max": 1,
      "rotulo": "Produtos Agropecurários Animais, Vegetais e Florestais"
     },
     {
      "t": "el",
      "nome": "infPAA",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/infPAA",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de Informação do Provedor de Assinatura e Autorização"
     }
    ]
   },
   "atributos": [
    {
     "nome": "versao",
     "uso": "required",
     "tipo": "nfe:TVerNFe"
    },
    {
     "nome": "Id",
     "uso": "required",
     "tipo": "nfe:TNFe/infNFe@Id"
    }
   ]
  },
  "nfe:TNFe/infNFe/ide": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "cUF",
      "ns": "nfe",
      "tipo": "nfe:TCodUfIBGE",
      "min": 1,
      "max": 1,
      "rotulo": "Código da UF do emitente do Documento Fiscal. Utilizar a Tabela do IBGE."
     },
     {
      "t": "el",
      "nome": "cNF",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide/cNF",
      "min": 1,
      "max": 1,
      "rotulo": "Código numérico que compõe a Chave de Acesso. Número aleatório gerado pelo emitente para cada NF-e."
     },
     {
      "t": "el",
      "nome": "natOp",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide/natOp",
      "min": 1,
      "max": 1,
      "rotulo": "Descrição da Natureza da Operação"
     },
     {
      "t": "el",
      "nome": "mod",
      "ns": "nfe",
      "tipo": "nfe:TMod",
      "min": 1,
      "max": 1,
      "rotulo": "Código do modelo do Documento Fiscal. 55 = NF-e; 65 = NFC-e."
     },
     {
      "t": "el",
      "nome": "serie",
      "ns": "nfe",
      "tipo": "nfe:TSerie",
      "min": 1,
      "max": 1,
      "rotulo": "Série do Documento Fiscal"
     },
     {
      "t": "el",
      "nome": "nNF",
      "ns": "nfe",
      "tipo": "nfe:TNF",
      "min": 1,
      "max": 1,
      "rotulo": "Número do Documento Fiscal"
     },
     {
      "t": "el",
      "nome": "dhEmi",
      "ns": "nfe",
      "tipo": "nfe:TDateTimeUTC",
      "min": 1,
      "max": 1,
      "rotulo": "Data e Hora de emissão do Documento Fiscal (AAAA-MM-DDThh:mm:ssTZD) ex.: 2012-09-01T13:00:00-03:00"
     },
     {
      "t": "el",
      "nome": "dhSaiEnt",
      "ns": "nfe",
      "tipo": "nfe:TDateTimeUTC",
      "min": 0,
      "max": 1,
      "rotulo": "Data e Hora da saída ou de entrada da mercadoria / produto (AAAA-MM-DDTHH:mm:ssTZD)"
     },
     {
      "t": "el",
      "nome": "dPrevEntrega",
      "ns": "nfe",
      "tipo": "nfe:TData",
      "min": 0,
      "max": 1,
      "rotulo": "Data da previsão de entrega ou disponibilização do bem (AAAA-MM-DD)"
     },
     {
      "t": "el",
      "nome": "tpNF",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide/tpNF",
      "min": 1,
      "max": 1,
      "rotulo": "Tipo do Documento Fiscal (0 - entrada; 1 - saída)"
     },
     {
      "t": "el",
      "nome": "idDest",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide/idDest",
      "min": 1,
      "max": 1,
      "rotulo": "Identificador de Local de destino da operação (1-Interna;2-Interestadual;3-Exterior)"
     },
     {
      "t": "el",
      "nome": "cMunFG",
      "ns": "nfe",
      "tipo": "nfe:TCodMunIBGE",
      "min": 1,
      "max": 1,
      "rotulo": "Código do Município de Ocorrência do Fato Gerador (utilizar a tabela do IBGE)"
     },
     {
      "t": "el",
      "nome": "cMunFGIBS",
      "ns": "nfe",
      "tipo": "nfe:TCodMunIBGE",
      "min": 0,
      "max": 1,
      "rotulo": "Informar o município de ocorrência do fato gerador do fato gerador do IBS / CBS. Campo preenchido somente quando \"indPres = 5 (Operação presencial, fora do estabelecimento)\", e não estiver preenchido o endereço do destinatário (grupo: E05) nem o local de entrega (grupo: G01)."
     },
     {
      "t": "el",
      "nome": "tpImp",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide/tpImp",
      "min": 1,
      "max": 1,
      "rotulo": "Formato de impressão do DANFE: 0 - Sem DANFE; 1 - DANFE Retrato; 2 - DANFE Paisagem; 3 - DANFE Simplificado; 4 - DANFE NFC-e; 5 - DANFE NFC-e em mensagem eletrônica; 6 - DANFE Simplificado Tipo 2 (nas condições do Ajuste SINIEF 13/26)."
     },
     {
      "t": "el",
      "nome": "tpEmis",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide/tpEmis",
      "min": 1,
      "max": 1,
      "rotulo": "Forma de emissão da NF-e: 1 - Normal; 2 - Contingência FS; 3 - Regime Especial NFF (NT 2021.002); 4 - Contingência DPEC; 5 - Contingência FSDA; 6 - Contingência SVC - AN; 7 - Contingência SVC - RS; 9 - Contingência off-line da NFC-e e da NF-e com DANFE Simplificado Tipo 2."
     },
     {
      "t": "el",
      "nome": "cDV",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide/cDV",
      "min": 1,
      "max": 1,
      "rotulo": "Digito Verificador da Chave de Acesso da NF-e"
     },
     {
      "t": "el",
      "nome": "tpAmb",
      "ns": "nfe",
      "tipo": "nfe:TAmb",
      "min": 1,
      "max": 1,
      "rotulo": "Identificação do Ambiente: 1 - Produção 2 - Homologação"
     },
     {
      "t": "el",
      "nome": "finNFe",
      "ns": "nfe",
      "tipo": "nfe:TFinNFe",
      "min": 1,
      "max": 1,
      "rotulo": "Finalidade da emissão da NF-e: 1 - NFe normal 2 - NFe complementar 3 - NFe de ajuste 4 - Devolução/Retorno 5 - Nota de crédito 6 - Nota de débito"
     },
     {
      "t": "el",
      "nome": "tpNFDebito",
      "ns": "nfe",
      "tipo": "nfe:TTpNFDebito",
      "min": 0,
      "max": 1,
      "rotulo": "Tipo de Nota de Débito"
     },
     {
      "t": "el",
      "nome": "tpNFCredito",
      "ns": "nfe",
      "tipo": "nfe:TTpNFCredito",
      "min": 0,
      "max": 1,
      "rotulo": "Tipo de Nota de Crédito"
     },
     {
      "t": "el",
      "nome": "indFinal",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide/indFinal",
      "min": 1,
      "max": 1,
      "rotulo": "Indica operação com consumidor final (0-Não;1-Consumidor Final)"
     },
     {
      "t": "el",
      "nome": "indPres",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide/indPres",
      "min": 1,
      "max": 1,
      "rotulo": "Indicador de presença do comprador no estabelecimento comercial no momento da oepração: 0 - Não se aplica (ex.: Nota Fiscal complementar ou de ajuste); 1 - Operação presencial; 2 - Operação não presencial, internet; 3 - Operação não presencial, teleatendimento; 4 - Operação não presencial com NFC-e e NFe com DANFE Simplificado Tipo 2 (com entrega); 5 - Operação presencial, fora do estabelecimento; 9 - Operação não presencial, outros."
     },
     {
      "t": "el",
      "nome": "indIntermed",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide/indIntermed",
      "min": 0,
      "max": 1,
      "rotulo": "Indicador de intermediador/marketplace 0=Operação sem intermediador (em site ou plataforma própria) 1=Operação em site ou plataforma de terceiros (intermediadores/marketplace)"
     },
     {
      "t": "el",
      "nome": "cIndOp",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide/cIndOp",
      "min": 0,
      "max": 1,
      "rotulo": "Código indicador do local da operação de fornecimento"
     },
     {
      "t": "el",
      "nome": "procEmi",
      "ns": "nfe",
      "tipo": "nfe:TProcEmi",
      "min": 1,
      "max": 1,
      "rotulo": "Processo de emissão utilizado com a seguinte codificação: 0 - emissão de NF-e com aplicativo do contribuinte; 1 - emissão de NF-e avulsa pelo Fisco; 2 - emissão de NF-e avulsa, pelo contribuinte com seu certificado digital, através do site do Fisco; 3 - emissão de NF-e pelo contribuinte com aplicativo fornecido pelo Fisco; 4 - emissão de NF-e por Provedor de Assinatura e Autorização - PAA."
     },
     {
      "t": "el",
      "nome": "verProc",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide/verProc",
      "min": 1,
      "max": 1,
      "rotulo": "versão do aplicativo utilizado no processo de emissão"
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "dhCont",
        "ns": "nfe",
        "tipo": "nfe:TDateTimeUTC",
        "min": 1,
        "max": 1,
        "rotulo": "Informar a data e hora de entrada em contingência contingência no formato (AAAA-MM-DDThh:mm:ssTZD) ex.: 2012-09-01T13:00:00-03:00."
       },
       {
        "t": "el",
        "nome": "xJust",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/ide/xJust",
        "min": 1,
        "max": 1,
        "rotulo": "Informar a Justificativa da entrada"
       }
      ]
     },
     {
      "t": "el",
      "nome": "NFref",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide/NFref",
      "min": 0,
      "max": 999,
      "rotulo": "Grupo de infromações da NF referenciada"
     },
     {
      "t": "el",
      "nome": "gCompraGov",
      "ns": "nfe",
      "tipo": "nfe:TCompraGov",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de Compras Governamentais"
     },
     {
      "t": "el",
      "nome": "gPagAntecipado",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide/gPagAntecipado",
      "min": 0,
      "max": 1,
      "rotulo": "Informado para abater as parcelas de antecipação de pagamento, conforme Art. 10. § 4º"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TCodUfIBGE": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "31",
    "32",
    "33",
    "35",
    "41",
    "42",
    "43",
    "50",
    "51",
    "52",
    "53"
   ]
  },
  "nfe:TNFe/infNFe/ide/cNF": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{8}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/ide/natOp": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TString": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TMod": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "55",
    "65"
   ]
  },
  "nfe:TSerie": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "0|[1-9]{1}[0-9]{0,2}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNF": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[1-9]{1}[0-9]{0,8}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TDateTimeUTC": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "(((20(([02468][048])|([13579][26]))-02-29))|(20[0-9][0-9])-((((0[1-9])|(1[0-2]))-((0[1-9])|(1\\d)|(2[0-8])))|((((0[13578])|(1[02]))-31)|(((0[1,3-9])|(1[0-2]))-(29|30)))))T(20|21|22|23|[0-1]\\d):[0-5]\\d:[0-5]\\d([\\-,\\+](0[0-9]|10|11):00|([\\+](12):00))"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TData": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "(((20(([02468][048])|([13579][26]))-02-29))|(20[0-9][0-9])-((((0[1-9])|(1[0-2]))-((0[1-9])|(1\\d)|(2[0-8])))|((((0[13578])|(1[02]))-31)|(((0[1,3-9])|(1[0-2]))-(29|30)))))"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/ide/tpNF": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1"
   ]
  },
  "nfe:TNFe/infNFe/ide/idDest": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "1",
    "2",
    "3"
   ]
  },
  "nfe:TCodMunIBGE": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{7}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/ide/tpImp": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6"
   ]
  },
  "nfe:TNFe/infNFe/ide/tpEmis": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "9"
   ]
  },
  "nfe:TNFe/infNFe/ide/cDV": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{1}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TAmb": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "1",
    "2"
   ]
  },
  "nfe:TFinNFe": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6"
   ]
  },
  "nfe:TTpNFDebito": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08"
   ]
  },
  "nfe:TTpNFCredito": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06"
   ]
  },
  "nfe:TNFe/infNFe/ide/indFinal": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1"
   ]
  },
  "nfe:TNFe/infNFe/ide/indPres": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "9"
   ]
  },
  "nfe:TNFe/infNFe/ide/indIntermed": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1"
   ]
  },
  "nfe:TNFe/infNFe/ide/cIndOp": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{6}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TProcEmi": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3",
    "4"
   ]
  },
  "nfe:TNFe/infNFe/ide/verProc": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 20
  },
  "nfe:TNFe/infNFe/ide/xJust": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 15,
   "maxLength": 256
  },
  "nfe:TNFe/infNFe/ide/NFref": {
   "t": "c",
   "conteudo": {
    "t": "esc",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "refNFe",
      "ns": "nfe",
      "tipo": "nfe:TChNFe",
      "min": 1,
      "max": 1,
      "rotulo": "Chave de acesso das NF-e referenciadas. Chave de acesso compostas por Código da UF (tabela do IBGE) + AAMM da emissão + CNPJ do Emitente + modelo, série e número da NF-e Referenciada + Código Numérico + DV."
     },
     {
      "t": "el",
      "nome": "refNFeSig",
      "ns": "nfe",
      "tipo": "nfe:TChNFe",
      "min": 1,
      "max": 1,
      "rotulo": "Referencia uma NF-e (modelo 55) emitida anteriormente pela sua Chave de Acesso com código numérico zerado, permitindo manter o sigilo da NF-e referenciada."
     },
     {
      "t": "el",
      "nome": "refNF",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide/NFref/refNF",
      "min": 1,
      "max": 1,
      "rotulo": "Dados da NF modelo 1/1A referenciada ou NF modelo 2 referenciada"
     },
     {
      "t": "el",
      "nome": "refNFP",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide/NFref/refNFP",
      "min": 1,
      "max": 1,
      "rotulo": "Grupo com as informações NF de produtor referenciada"
     },
     {
      "t": "el",
      "nome": "refCTe",
      "ns": "nfe",
      "tipo": "nfe:TChNFe",
      "min": 1,
      "max": 1,
      "rotulo": "Utilizar esta TAG para referenciar um CT-e emitido anteriormente, vinculada a NF-e atual"
     },
     {
      "t": "el",
      "nome": "refECF",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide/NFref/refECF",
      "min": 1,
      "max": 1,
      "rotulo": "Grupo do Cupom Fiscal vinculado à NF-e"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TChNFe": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{6}[0-9A-Z]{12}[0-9]{26}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 44
  },
  "nfe:TNFe/infNFe/ide/NFref/refNF": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "cUF",
      "ns": "nfe",
      "tipo": "nfe:TCodUfIBGE",
      "min": 1,
      "max": 1,
      "rotulo": "Código da UF do emitente do Documento Fiscal. Utilizar a Tabela do IBGE."
     },
     {
      "t": "el",
      "nome": "AAMM",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide/NFref/refNF/AAMM",
      "min": 1,
      "max": 1,
      "rotulo": "AAMM da emissão"
     },
     {
      "t": "el",
      "nome": "CNPJ",
      "ns": "nfe",
      "tipo": "nfe:TCnpj",
      "min": 1,
      "max": 1,
      "rotulo": "CNPJ do emitente do documento fiscal referenciado"
     },
     {
      "t": "el",
      "nome": "mod",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide/NFref/refNF/mod",
      "min": 1,
      "max": 1,
      "rotulo": "Código do modelo do Documento Fiscal. Utilizar 01 para NF modelo 1/1A e 02 para NF modelo 02"
     },
     {
      "t": "el",
      "nome": "serie",
      "ns": "nfe",
      "tipo": "nfe:TSerie",
      "min": 1,
      "max": 1,
      "rotulo": "Série do Documento Fiscal, informar zero se inexistente"
     },
     {
      "t": "el",
      "nome": "nNF",
      "ns": "nfe",
      "tipo": "nfe:TNF",
      "min": 1,
      "max": 1,
      "rotulo": "Número do Documento Fiscal"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/ide/NFref/refNF/AAMM": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{2}[0]{1}[1-9]{1}|[0-9]{2}[1]{1}[0-2]{1}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TCnpj": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9A-Z]{12}[0-9]{2}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 14
  },
  "nfe:TNFe/infNFe/ide/NFref/refNF/mod": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "01",
    "02"
   ]
  },
  "nfe:TNFe/infNFe/ide/NFref/refNFP": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "cUF",
      "ns": "nfe",
      "tipo": "nfe:TCodUfIBGE",
      "min": 1,
      "max": 1,
      "rotulo": "Código da UF do emitente do Documento FiscalUtilizar a Tabela do IBGE (Anexo IV - Tabela de UF, Município e País)"
     },
     {
      "t": "el",
      "nome": "AAMM",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide/NFref/refNFP/AAMM",
      "min": 1,
      "max": 1,
      "rotulo": "AAMM da emissão da NF de produtor"
     },
     {
      "t": "esc",
      "min": 1,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "CNPJ",
        "ns": "nfe",
        "tipo": "nfe:TCnpj",
        "min": 1,
        "max": 1,
        "rotulo": "CNPJ do emitente da NF de produtor"
       },
       {
        "t": "el",
        "nome": "CPF",
        "ns": "nfe",
        "tipo": "nfe:TCpf",
        "min": 1,
        "max": 1,
        "rotulo": "CPF do emitente da NF de produtor"
       }
      ]
     },
     {
      "t": "el",
      "nome": "IE",
      "ns": "nfe",
      "tipo": "nfe:TIeDest",
      "min": 1,
      "max": 1,
      "rotulo": "IE do emitente da NF de Produtor"
     },
     {
      "t": "el",
      "nome": "mod",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide/NFref/refNFP/mod",
      "min": 1,
      "max": 1,
      "rotulo": "Código do modelo do Documento Fiscal - utilizar 04 para NF de produtor ou 01 para NF Avulsa"
     },
     {
      "t": "el",
      "nome": "serie",
      "ns": "nfe",
      "tipo": "nfe:TSerie",
      "min": 1,
      "max": 1,
      "rotulo": "Série do Documento Fiscal, informar zero se inexistentesérie"
     },
     {
      "t": "el",
      "nome": "nNF",
      "ns": "nfe",
      "tipo": "nfe:TNF",
      "min": 1,
      "max": 1,
      "rotulo": "Número do Documento Fiscal - 1 – 999999999"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/ide/NFref/refNFP/AAMM": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{2}[0]{1}[1-9]{1}|[0-9]{2}[1]{1}[0-2]{1}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TCpf": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{11}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 11
  },
  "nfe:TIeDest": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "ISENTO|[0-9]{2,14}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 14
  },
  "nfe:TNFe/infNFe/ide/NFref/refNFP/mod": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "01",
    "04"
   ]
  },
  "nfe:TNFe/infNFe/ide/NFref/refECF": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "mod",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide/NFref/refECF/mod",
      "min": 1,
      "max": 1,
      "rotulo": "Código do modelo do Documento Fiscal Preencher com \"2B\", quando se tratar de Cupom Fiscal emitido por máquina registradora (não ECF), com \"2C\", quando se tratar de Cupom Fiscal PDV, ou \"2D\", quando se tratar de Cupom Fiscal (emitido por ECF)"
     },
     {
      "t": "el",
      "nome": "nECF",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide/NFref/refECF/nECF",
      "min": 1,
      "max": 1,
      "rotulo": "Informar o número de ordem seqüencial do ECF que emitiu o Cupom Fiscal vinculado à NF-e"
     },
     {
      "t": "el",
      "nome": "nCOO",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/ide/NFref/refECF/nCOO",
      "min": 1,
      "max": 1,
      "rotulo": "Informar o Número do Contador de Ordem de Operação - COO vinculado à NF-e"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/ide/NFref/refECF/mod": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "2B",
    "2C",
    "2D"
   ]
  },
  "nfe:TNFe/infNFe/ide/NFref/refECF/nECF": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{1,3}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/ide/NFref/refECF/nCOO": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{1,6}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TCompraGov": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "tpEnteGov",
      "ns": "nfe",
      "tipo": "nfe:TEnteGov",
      "min": 1,
      "max": 1,
      "rotulo": "Para administração pública direta e suas autarquias e fundações: 1=União 2=Estados 3=Distrito Federal 4=Municípios 5=Consórcio Público 6=Comitê Gestor do IBS"
     },
     {
      "t": "el",
      "nome": "pRedutor",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Percentual de redução de alíquota em compra governamental"
     },
     {
      "t": "el",
      "nome": "tpOperGov",
      "ns": "nfe",
      "tipo": "nfe:TOperCompraGov",
      "min": 1,
      "max": 1,
      "rotulo": "Tipo da operação com ente governamental: 1 – Fornecimento com pagamento posterior; 2 - Recebimento do pagamento com fornecimento já realizado; 3 – Fornecimento com pagamento já realizado; 4 – Recebimento do pagamento com fornecimento posterior;"
     },
     {
      "t": "el",
      "nome": "refDFeAnt",
      "ns": "nfe",
      "tipo": "nfe:TChDFeRTC",
      "min": 0,
      "max": 99,
      "rotulo": "Chave de acesso do documento fiscal anterior. Deverá ser informado para tpOperGov 2 e 3 e vedado para os tipos 1 e 4. No caso do tpOperGov 2 aceitará apenas uma chave referenciada, no tipo 3 poderá aceitar múltiplas chaves Obs: a chave de acesso deverá ser de um emitente com o mesmo CNPJ base"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TEnteGov": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6"
   ]
  },
  "nfe:TDec_0302_04RTC": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "0|0\\.[0-9]{2,4}|[1-9]{1}[0-9]{0,2}(\\.[0-9]{2,4})?"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TOperCompraGov": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "1",
    "2",
    "3",
    "4"
   ]
  },
  "nfe:TChDFeRTC": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{6}[A-Z0-9]{12}[0-9]{26}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 44
  },
  "nfe:TNFe/infNFe/ide/gPagAntecipado": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "refNFe",
      "ns": "nfe",
      "tipo": "nfe:TChNFe",
      "min": 1,
      "max": 99,
      "rotulo": "Chave de acesso da NF-e de antecipação de pagamento"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/emit": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "esc",
      "min": 1,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "CNPJ",
        "ns": "nfe",
        "tipo": "nfe:TCnpj",
        "min": 1,
        "max": 1,
        "rotulo": "Número do CNPJ do emitente"
       },
       {
        "t": "el",
        "nome": "CPF",
        "ns": "nfe",
        "tipo": "nfe:TCpf",
        "min": 1,
        "max": 1,
        "rotulo": "Número do CPF do emitente"
       }
      ]
     },
     {
      "t": "el",
      "nome": "xNome",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/emit/xNome",
      "min": 1,
      "max": 1,
      "rotulo": "Razão Social ou Nome do emitente"
     },
     {
      "t": "el",
      "nome": "xFant",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/emit/xFant",
      "min": 0,
      "max": 1,
      "rotulo": "Nome fantasia"
     },
     {
      "t": "el",
      "nome": "enderEmit",
      "ns": "nfe",
      "tipo": "nfe:TEnderEmi",
      "min": 1,
      "max": 1,
      "rotulo": "Endereço do emitente"
     },
     {
      "t": "el",
      "nome": "IE",
      "ns": "nfe",
      "tipo": "nfe:TIe",
      "min": 0,
      "max": 1,
      "rotulo": "Inscrição Estadual do Emitente"
     },
     {
      "t": "el",
      "nome": "IEST",
      "ns": "nfe",
      "tipo": "nfe:TIeST",
      "min": 0,
      "max": 1,
      "rotulo": "Inscricao Estadual do Substituto Tributário"
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "IM",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/emit/IM",
        "min": 1,
        "max": 1,
        "rotulo": "Inscrição Municipal"
       },
       {
        "t": "el",
        "nome": "CNAE",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/emit/CNAE",
        "min": 0,
        "max": 1,
        "rotulo": "CNAE Fiscal"
       }
      ]
     },
     {
      "t": "el",
      "nome": "CRT",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/emit/CRT",
      "min": 1,
      "max": 1,
      "rotulo": "Código de Regime Tributário. Este campo será obrigatoriamente preenchido com: 1 – Simples Nacional; 2 – Simples Nacional – excesso de sublimite de receita bruta; 3 – Regime Normal. 4 - Simples Nacional - Microempreendedor individual - MEI"
     },
     {
      "t": "el",
      "nome": "ISUFEmit",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/emit/ISUFEmit",
      "min": 0,
      "max": 1,
      "rotulo": "Inscrição do emitente na Suframa"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/emit/xNome": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 2
  },
  "nfe:TNFe/infNFe/emit/xFant": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 1
  },
  "nfe:TEnderEmi": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "xLgr",
      "ns": "nfe",
      "tipo": "nfe:TEnderEmi/xLgr",
      "min": 1,
      "max": 1,
      "rotulo": "Logradouro"
     },
     {
      "t": "el",
      "nome": "nro",
      "ns": "nfe",
      "tipo": "nfe:TEnderEmi/nro",
      "min": 1,
      "max": 1,
      "rotulo": "Número"
     },
     {
      "t": "el",
      "nome": "xCpl",
      "ns": "nfe",
      "tipo": "nfe:TEnderEmi/xCpl",
      "min": 0,
      "max": 1,
      "rotulo": "Complemento"
     },
     {
      "t": "el",
      "nome": "xBairro",
      "ns": "nfe",
      "tipo": "nfe:TEnderEmi/xBairro",
      "min": 1,
      "max": 1,
      "rotulo": "Bairro"
     },
     {
      "t": "el",
      "nome": "cMun",
      "ns": "nfe",
      "tipo": "nfe:TCodMunIBGE",
      "min": 1,
      "max": 1,
      "rotulo": "Código do município"
     },
     {
      "t": "el",
      "nome": "xMun",
      "ns": "nfe",
      "tipo": "nfe:TEnderEmi/xMun",
      "min": 1,
      "max": 1,
      "rotulo": "Nome do município"
     },
     {
      "t": "el",
      "nome": "UF",
      "ns": "nfe",
      "tipo": "nfe:TUfEmi",
      "min": 1,
      "max": 1,
      "rotulo": "Sigla da UF"
     },
     {
      "t": "el",
      "nome": "CEP",
      "ns": "nfe",
      "tipo": "nfe:TEnderEmi/CEP",
      "min": 1,
      "max": 1,
      "rotulo": "CEP - NT 2011/004"
     },
     {
      "t": "el",
      "nome": "cPais",
      "ns": "nfe",
      "tipo": "nfe:TEnderEmi/cPais",
      "min": 0,
      "max": 1,
      "rotulo": "Código do país"
     },
     {
      "t": "el",
      "nome": "xPais",
      "ns": "nfe",
      "tipo": "nfe:TEnderEmi/xPais",
      "min": 0,
      "max": 1,
      "rotulo": "Nome do país"
     },
     {
      "t": "el",
      "nome": "fone",
      "ns": "nfe",
      "tipo": "nfe:TEnderEmi/fone",
      "min": 0,
      "max": 1,
      "rotulo": "Preencher com Código DDD + número do telefone (v.2.0)"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TEnderEmi/xLgr": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 2
  },
  "nfe:TEnderEmi/nro": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 1
  },
  "nfe:TEnderEmi/xCpl": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 1
  },
  "nfe:TEnderEmi/xBairro": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 2
  },
  "nfe:TEnderEmi/xMun": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 2
  },
  "nfe:TUfEmi": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "AC",
    "AL",
    "AM",
    "AP",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MG",
    "MS",
    "MT",
    "PA",
    "PB",
    "PE",
    "PI",
    "PR",
    "RJ",
    "RN",
    "RO",
    "RR",
    "RS",
    "SC",
    "SE",
    "SP",
    "TO"
   ]
  },
  "nfe:TEnderEmi/CEP": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{8}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TEnderEmi/cPais": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "enumeracao": [
    "1058"
   ]
  },
  "nfe:TEnderEmi/xPais": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "enumeracao": [
    "Brasil",
    "BRASIL"
   ]
  },
  "nfe:TEnderEmi/fone": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{6,14}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TIe": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{2,14}|ISENTO"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 14
  },
  "nfe:TIeST": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{2,14}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 14
  },
  "nfe:TNFe/infNFe/emit/IM": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 15
  },
  "nfe:TNFe/infNFe/emit/CNAE": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{7}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/emit/CRT": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "1",
    "2",
    "3",
    "4"
   ]
  },
  "nfe:TNFe/infNFe/emit/ISUFEmit": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{8,9}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/avulsa": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "CNPJ",
      "ns": "nfe",
      "tipo": "nfe:TCnpj",
      "min": 1,
      "max": 1,
      "rotulo": "CNPJ do Órgão emissor"
     },
     {
      "t": "el",
      "nome": "xOrgao",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/avulsa/xOrgao",
      "min": 1,
      "max": 1,
      "rotulo": "Órgão emitente"
     },
     {
      "t": "el",
      "nome": "matr",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/avulsa/matr",
      "min": 1,
      "max": 1,
      "rotulo": "Matrícula do agente"
     },
     {
      "t": "el",
      "nome": "xAgente",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/avulsa/xAgente",
      "min": 1,
      "max": 1,
      "rotulo": "Nome do agente"
     },
     {
      "t": "el",
      "nome": "fone",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/avulsa/fone",
      "min": 0,
      "max": 1,
      "rotulo": "Telefone"
     },
     {
      "t": "el",
      "nome": "UF",
      "ns": "nfe",
      "tipo": "nfe:TUfEmi",
      "min": 1,
      "max": 1,
      "rotulo": "Sigla da Unidade da Federação"
     },
     {
      "t": "el",
      "nome": "nDAR",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/avulsa/nDAR",
      "min": 0,
      "max": 1,
      "rotulo": "Número do Documento de Arrecadação de Receita"
     },
     {
      "t": "el",
      "nome": "dEmi",
      "ns": "nfe",
      "tipo": "nfe:TData",
      "min": 0,
      "max": 1,
      "rotulo": "Data de emissão do DAR (AAAA-MM-DD)"
     },
     {
      "t": "el",
      "nome": "vDAR",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor Total constante no DAR"
     },
     {
      "t": "el",
      "nome": "repEmi",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/avulsa/repEmi",
      "min": 1,
      "max": 1,
      "rotulo": "Repartição Fiscal emitente"
     },
     {
      "t": "el",
      "nome": "dPag",
      "ns": "nfe",
      "tipo": "nfe:TData",
      "min": 0,
      "max": 1,
      "rotulo": "Data de pagamento do DAR (AAAA-MM-DD)"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/avulsa/xOrgao": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 1
  },
  "nfe:TNFe/infNFe/avulsa/matr": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TNFe/infNFe/avulsa/xAgente": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 1
  },
  "nfe:TNFe/infNFe/avulsa/fone": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{6,14}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/avulsa/nDAR": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TDec_1302": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "0|0\\.[0-9]{2}|[1-9]{1}[0-9]{0,12}(\\.[0-9]{2})?"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/avulsa/repEmi": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TNFe/infNFe/dest": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "esc",
      "min": 1,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "CNPJ",
        "ns": "nfe",
        "tipo": "nfe:TCnpj",
        "min": 1,
        "max": 1,
        "rotulo": "Número do CNPJ"
       },
       {
        "t": "el",
        "nome": "CPF",
        "ns": "nfe",
        "tipo": "nfe:TCpf",
        "min": 1,
        "max": 1,
        "rotulo": "Número do CPF"
       },
       {
        "t": "el",
        "nome": "idEstrangeiro",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/dest/idEstrangeiro",
        "min": 1,
        "max": 1,
        "rotulo": "Identificador do destinatário, em caso de comprador estrangeiro"
       }
      ]
     },
     {
      "t": "el",
      "nome": "xNome",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/dest/xNome",
      "min": 0,
      "max": 1,
      "rotulo": "Razão Social ou nome do destinatário"
     },
     {
      "t": "el",
      "nome": "enderDest",
      "ns": "nfe",
      "tipo": "nfe:TEndereco",
      "min": 0,
      "max": 1,
      "rotulo": "Dados do endereço"
     },
     {
      "t": "el",
      "nome": "indIEDest",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/dest/indIEDest",
      "min": 1,
      "max": 1,
      "rotulo": "Indicador da IE do destinatário: 1 – Contribuinte ICMSpagamento à vista; 2 – Contribuinte isento de inscrição; 9 – Não Contribuinte"
     },
     {
      "t": "el",
      "nome": "IE",
      "ns": "nfe",
      "tipo": "nfe:TIeDestNaoIsento",
      "min": 0,
      "max": 1,
      "rotulo": "Inscrição Estadual (obrigatório nas operações com contribuintes do ICMS)"
     },
     {
      "t": "el",
      "nome": "ISUF",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/dest/ISUF",
      "min": 0,
      "max": 1,
      "rotulo": "Inscrição na SUFRAMA (Obrigatório nas operações com as áreas com benefícios de incentivos fiscais sob controle da SUFRAMA) PL_005d - 11/08/09 - alterado para aceitar 8 ou 9 dígitos"
     },
     {
      "t": "el",
      "nome": "IM",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/dest/IM",
      "min": 0,
      "max": 1,
      "rotulo": "Inscrição Municipal do tomador do serviço"
     },
     {
      "t": "el",
      "nome": "email",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/dest/email",
      "min": 0,
      "max": 1,
      "rotulo": "Informar o e-mail do destinatário. O campo pode ser utilizado para informar o e-mail de recepção da NF-e indicada pelo destinatário"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/dest/idEstrangeiro": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "([!-ÿ]{0}|[!-ÿ]{5,20})?"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/dest/xNome": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 2
  },
  "nfe:TEndereco": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "xLgr",
      "ns": "nfe",
      "tipo": "nfe:TEndereco/xLgr",
      "min": 1,
      "max": 1,
      "rotulo": "Logradouro"
     },
     {
      "t": "el",
      "nome": "nro",
      "ns": "nfe",
      "tipo": "nfe:TEndereco/nro",
      "min": 1,
      "max": 1,
      "rotulo": "Número"
     },
     {
      "t": "el",
      "nome": "xCpl",
      "ns": "nfe",
      "tipo": "nfe:TEndereco/xCpl",
      "min": 0,
      "max": 1,
      "rotulo": "Complemento"
     },
     {
      "t": "el",
      "nome": "xBairro",
      "ns": "nfe",
      "tipo": "nfe:TEndereco/xBairro",
      "min": 1,
      "max": 1,
      "rotulo": "Bairro"
     },
     {
      "t": "el",
      "nome": "cMun",
      "ns": "nfe",
      "tipo": "nfe:TCodMunIBGE",
      "min": 1,
      "max": 1,
      "rotulo": "Código do município (utilizar a tabela do IBGE), informar 9999999 para operações com o exterior."
     },
     {
      "t": "el",
      "nome": "xMun",
      "ns": "nfe",
      "tipo": "nfe:TEndereco/xMun",
      "min": 1,
      "max": 1,
      "rotulo": "Nome do município, informar EXTERIOR para operações com o exterior."
     },
     {
      "t": "el",
      "nome": "UF",
      "ns": "nfe",
      "tipo": "nfe:TUf",
      "min": 1,
      "max": 1,
      "rotulo": "Sigla da UF, informar EX para operações com o exterior."
     },
     {
      "t": "el",
      "nome": "CEP",
      "ns": "nfe",
      "tipo": "nfe:TEndereco/CEP",
      "min": 0,
      "max": 1,
      "rotulo": "CEP"
     },
     {
      "t": "el",
      "nome": "cPais",
      "ns": "nfe",
      "tipo": "nfe:TEndereco/cPais",
      "min": 0,
      "max": 1,
      "rotulo": "Código de Pais"
     },
     {
      "t": "el",
      "nome": "xPais",
      "ns": "nfe",
      "tipo": "nfe:TEndereco/xPais",
      "min": 0,
      "max": 1,
      "rotulo": "Nome do país"
     },
     {
      "t": "el",
      "nome": "fone",
      "ns": "nfe",
      "tipo": "nfe:TEndereco/fone",
      "min": 0,
      "max": 1,
      "rotulo": "Telefone, preencher com Código DDD + número do telefone , nas operações com exterior é permtido informar o código do país + código da localidade + número do telefone"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TEndereco/xLgr": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 2
  },
  "nfe:TEndereco/nro": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 1
  },
  "nfe:TEndereco/xCpl": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 1
  },
  "nfe:TEndereco/xBairro": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 2
  },
  "nfe:TEndereco/xMun": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 2
  },
  "nfe:TUf": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "AC",
    "AL",
    "AM",
    "AP",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MG",
    "MS",
    "MT",
    "PA",
    "PB",
    "PE",
    "PI",
    "PR",
    "RJ",
    "RN",
    "RO",
    "RR",
    "RS",
    "SC",
    "SE",
    "SP",
    "TO",
    "EX"
   ]
  },
  "nfe:TEndereco/CEP": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{8}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TEndereco/cPais": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{1,4}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TEndereco/xPais": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 2
  },
  "nfe:TEndereco/fone": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{6,14}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/dest/indIEDest": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "1",
    "2",
    "9"
   ]
  },
  "nfe:TIeDestNaoIsento": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{2,14}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 14
  },
  "nfe:TNFe/infNFe/dest/ISUF": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{8,9}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/dest/IM": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 15
  },
  "nfe:TNFe/infNFe/dest/email": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TLocal": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "esc",
      "min": 1,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "CNPJ",
        "ns": "nfe",
        "tipo": "nfe:TCnpjOpc",
        "min": 1,
        "max": 1,
        "rotulo": "CNPJ"
       },
       {
        "t": "el",
        "nome": "CPF",
        "ns": "nfe",
        "tipo": "nfe:TCpf",
        "min": 1,
        "max": 1,
        "rotulo": "CPF (v2.0)"
       }
      ]
     },
     {
      "t": "el",
      "nome": "xNome",
      "ns": "nfe",
      "tipo": "nfe:TLocal/xNome",
      "min": 0,
      "max": 1,
      "rotulo": "Razão Social ou Nome do Expedidor/Recebedor"
     },
     {
      "t": "el",
      "nome": "xLgr",
      "ns": "nfe",
      "tipo": "nfe:TLocal/xLgr",
      "min": 1,
      "max": 1,
      "rotulo": "Logradouro"
     },
     {
      "t": "el",
      "nome": "nro",
      "ns": "nfe",
      "tipo": "nfe:TLocal/nro",
      "min": 1,
      "max": 1,
      "rotulo": "Número"
     },
     {
      "t": "el",
      "nome": "xCpl",
      "ns": "nfe",
      "tipo": "nfe:TLocal/xCpl",
      "min": 0,
      "max": 1,
      "rotulo": "Complemento"
     },
     {
      "t": "el",
      "nome": "xBairro",
      "ns": "nfe",
      "tipo": "nfe:TLocal/xBairro",
      "min": 1,
      "max": 1,
      "rotulo": "Bairro"
     },
     {
      "t": "el",
      "nome": "cMun",
      "ns": "nfe",
      "tipo": "nfe:TCodMunIBGE",
      "min": 1,
      "max": 1,
      "rotulo": "Código do município (utilizar a tabela do IBGE)"
     },
     {
      "t": "el",
      "nome": "xMun",
      "ns": "nfe",
      "tipo": "nfe:TLocal/xMun",
      "min": 1,
      "max": 1,
      "rotulo": "Nome do município"
     },
     {
      "t": "el",
      "nome": "UF",
      "ns": "nfe",
      "tipo": "nfe:TUf",
      "min": 1,
      "max": 1,
      "rotulo": "Sigla da UF"
     },
     {
      "t": "el",
      "nome": "CEP",
      "ns": "nfe",
      "tipo": "nfe:TLocal/CEP",
      "min": 0,
      "max": 1,
      "rotulo": "CEP"
     },
     {
      "t": "el",
      "nome": "cPais",
      "ns": "nfe",
      "tipo": "nfe:TLocal/cPais",
      "min": 0,
      "max": 1,
      "rotulo": "Código de Pais"
     },
     {
      "t": "el",
      "nome": "xPais",
      "ns": "nfe",
      "tipo": "nfe:TLocal/xPais",
      "min": 0,
      "max": 1,
      "rotulo": "Nome do país"
     },
     {
      "t": "el",
      "nome": "fone",
      "ns": "nfe",
      "tipo": "nfe:TLocal/fone",
      "min": 0,
      "max": 1,
      "rotulo": "Telefone, preencher com Código DDD + número do telefone , nas operações com exterior é permtido informar o código do país + código da localidade + número do telefone"
     },
     {
      "t": "el",
      "nome": "email",
      "ns": "nfe",
      "tipo": "nfe:TLocal/email",
      "min": 0,
      "max": 1,
      "rotulo": "Informar o e-mail do expedidor/Recebedor. O campo pode ser utilizado para informar o e-mail de recepção da NF-e indicada pelo expedidor"
     },
     {
      "t": "el",
      "nome": "IE",
      "ns": "nfe",
      "tipo": "nfe:TIe",
      "min": 0,
      "max": 1,
      "rotulo": "Inscrição Estadual (v2.0)"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TCnpjOpc": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{0}|[0-9A-Z]{12}[0-9]{2}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 14
  },
  "nfe:TLocal/xNome": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 2
  },
  "nfe:TLocal/xLgr": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 2
  },
  "nfe:TLocal/nro": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 1
  },
  "nfe:TLocal/xCpl": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 1
  },
  "nfe:TLocal/xBairro": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 2
  },
  "nfe:TLocal/xMun": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 2
  },
  "nfe:TLocal/CEP": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{8}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TLocal/cPais": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{1,4}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TLocal/xPais": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 2
  },
  "nfe:TLocal/fone": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{6,14}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TLocal/email": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TNFe/infNFe/autXML": {
   "t": "c",
   "conteudo": {
    "t": "esc",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "CNPJ",
      "ns": "nfe",
      "tipo": "nfe:TCnpj",
      "min": 1,
      "max": 1,
      "rotulo": "CNPJ Autorizado"
     },
     {
      "t": "el",
      "nome": "CPF",
      "ns": "nfe",
      "tipo": "nfe:TCpf",
      "min": 1,
      "max": 1,
      "rotulo": "CPF Autorizado"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "prod",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod",
      "min": 1,
      "max": 1,
      "rotulo": "Dados dos produtos e serviços da NF-e"
     },
     {
      "t": "el",
      "nome": "imposto",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto",
      "min": 1,
      "max": 1,
      "rotulo": "Tributos incidentes nos produtos ou serviços da NF-e"
     },
     {
      "t": "el",
      "nome": "impostoDevol",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/impostoDevol",
      "min": 0,
      "max": 1
     },
     {
      "t": "el",
      "nome": "infAdProd",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/infAdProd",
      "min": 0,
      "max": 1,
      "rotulo": "Informações adicionais do produto (norma referenciada, informações complementares, etc)"
     },
     {
      "t": "el",
      "nome": "obsItem",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/obsItem",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de observações de uso livre (para o item da NF-e)"
     },
     {
      "t": "el",
      "nome": "vItem",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor total do Item, correspondente à sua participação no total da nota. A soma dos itens deverá corresponder ao total da nota."
     },
     {
      "t": "el",
      "nome": "DFeReferenciado",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/DFeReferenciado",
      "min": 0,
      "max": 1,
      "rotulo": "Referenciamento de item de outros DFe"
     }
    ]
   },
   "atributos": [
    {
     "nome": "nItem",
     "uso": "required",
     "tipo": "nfe:TNFe/infNFe/det@nItem"
    }
   ]
  },
  "nfe:TNFe/infNFe/det/prod": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "cProd",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/cProd",
      "min": 1,
      "max": 1,
      "rotulo": "Código do produto ou serviço. Preencher com CFOP caso se trate de itens não relacionados com mercadorias/produto e que o contribuinte não possua codificação própria Formato ”CFOP9999”."
     },
     {
      "t": "el",
      "nome": "cEAN",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/cEAN",
      "min": 1,
      "max": 1,
      "rotulo": "GTIN (Global Trade Item Number) do produto, antigo código EAN ou código de barras"
     },
     {
      "t": "el",
      "nome": "cBarra",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/cBarra",
      "min": 0,
      "max": 1,
      "rotulo": "Codigo de barras diferente do padrão GTIN"
     },
     {
      "t": "el",
      "nome": "xProd",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/xProd",
      "min": 1,
      "max": 1,
      "rotulo": "Descrição do produto ou serviço"
     },
     {
      "t": "el",
      "nome": "NCM",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/NCM",
      "min": 1,
      "max": 1,
      "rotulo": "Código NCM (8 posições), será permitida a informação do gênero (posição do capítulo do NCM) quando a operação não for de comércio exterior (importação/exportação) ou o produto não seja tributado pelo IPI. Em caso de item de serviço ou item que não tenham produto (Ex. transferência de crédito, crédito do ativo imobilizado, etc.), informar o código 00 (zeros) (v2.0)"
     },
     {
      "t": "el",
      "nome": "NVE",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/NVE",
      "min": 0,
      "max": 8,
      "rotulo": "Nomenclatura de Valor aduaneio e Estatístico"
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "CEST",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/prod/CEST",
        "min": 1,
        "max": 1,
        "rotulo": "Codigo especificador da Substuicao Tributaria - CEST, que identifica a mercadoria sujeita aos regimes de substituicao tributária e de antecipação do recolhimento do imposto"
       },
       {
        "t": "el",
        "nome": "indEscala",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/prod/indEscala",
        "min": 0,
        "max": 1
       },
       {
        "t": "el",
        "nome": "CNPJFab",
        "ns": "nfe",
        "tipo": "nfe:TCnpj",
        "min": 0,
        "max": 1,
        "rotulo": "CNPJ do Fabricante da Mercadoria, obrigatório para produto em escala NÃO relevante."
       }
      ]
     },
     {
      "t": "el",
      "nome": "cBenef",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/cBenef",
      "min": 0,
      "max": 1
     },
     {
      "t": "el",
      "nome": "gCred",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/gCred",
      "min": 0,
      "max": 4,
      "rotulo": "Grupo de informações sobre o CréditoPresumido"
     },
     {
      "t": "el",
      "nome": "tpCredPresIBSZFM",
      "ns": "nfe",
      "tipo": "nfe:TTpCredPresIBSZFM",
      "min": 0,
      "max": 1,
      "rotulo": "Classificação para subapuração do IBS na ZFM"
     },
     {
      "t": "el",
      "nome": "EXTIPI",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/EXTIPI",
      "min": 0,
      "max": 1,
      "rotulo": "Código EX TIPI (3 posições)"
     },
     {
      "t": "el",
      "nome": "CFOP",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/CFOP",
      "min": 1,
      "max": 1,
      "rotulo": "Cfop"
     },
     {
      "t": "el",
      "nome": "uCom",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/uCom",
      "min": 1,
      "max": 1,
      "rotulo": "Unidade comercial"
     },
     {
      "t": "el",
      "nome": "qCom",
      "ns": "nfe",
      "tipo": "nfe:TDec_1104v",
      "min": 1,
      "max": 1,
      "rotulo": "Quantidade Comercial do produto, alterado para aceitar de 0 a 4 casas decimais e 11 inteiros."
     },
     {
      "t": "el",
      "nome": "vUnCom",
      "ns": "nfe",
      "tipo": "nfe:TDec_1110v",
      "min": 1,
      "max": 1,
      "rotulo": "Valor unitário de comercialização - alterado para aceitar 0 a 10 casas decimais e 11 inteiros"
     },
     {
      "t": "el",
      "nome": "vProd",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor bruto do produto ou serviço."
     },
     {
      "t": "el",
      "nome": "cEANTrib",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/cEANTrib",
      "min": 1,
      "max": 1,
      "rotulo": "GTIN (Global Trade Item Number) da unidade tributável, antigo código EAN ou código de barras"
     },
     {
      "t": "el",
      "nome": "cBarraTrib",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/cBarraTrib",
      "min": 0,
      "max": 1,
      "rotulo": "Código de barras da unidade tributável diferente do padrão GTIN"
     },
     {
      "t": "el",
      "nome": "uTrib",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/uTrib",
      "min": 1,
      "max": 1,
      "rotulo": "Unidade Tributável"
     },
     {
      "t": "el",
      "nome": "qTrib",
      "ns": "nfe",
      "tipo": "nfe:TDec_1104v",
      "min": 1,
      "max": 1,
      "rotulo": "Quantidade Tributável - alterado para aceitar de 0 a 4 casas decimais e 11 inteiros"
     },
     {
      "t": "el",
      "nome": "vUnTrib",
      "ns": "nfe",
      "tipo": "nfe:TDec_1110v",
      "min": 1,
      "max": 1,
      "rotulo": "Valor unitário de tributação - alterado para aceitar 0 a 10 casas decimais e 11 inteiros"
     },
     {
      "t": "el",
      "nome": "vFrete",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Valor Total do Frete"
     },
     {
      "t": "el",
      "nome": "vSeg",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Valor Total do Seguro"
     },
     {
      "t": "el",
      "nome": "vDesc",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Valor do Desconto"
     },
     {
      "t": "el",
      "nome": "vOutro",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Outras despesas acessórias"
     },
     {
      "t": "el",
      "nome": "indTot",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/indTot",
      "min": 1,
      "max": 1,
      "rotulo": "Este campo deverá ser preenchido com: 0 – o valor do item (vProd) não compõe o valor total da NF-e (vProd) 1 – o valor do item (vProd) compõe o valor total da NF-e (vProd)"
     },
     {
      "t": "el",
      "nome": "indBemMovelUsado",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/indBemMovelUsado",
      "min": 0,
      "max": 1,
      "rotulo": "Indicador de fornecimento de bem móvel usado: 1-Bem Móvel Usado"
     },
     {
      "t": "el",
      "nome": "DI",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/DI",
      "min": 0,
      "max": 100,
      "rotulo": "Declaração de Importação (NT 2011/004)"
     },
     {
      "t": "el",
      "nome": "detExport",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/detExport",
      "min": 0,
      "max": 500,
      "rotulo": "Detalhe da exportação"
     },
     {
      "t": "el",
      "nome": "xPed",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/xPed",
      "min": 0,
      "max": 1,
      "rotulo": "pedido de compra - Informação de interesse do emissor para controle do B2B."
     },
     {
      "t": "el",
      "nome": "nItemPed",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/nItemPed",
      "min": 0,
      "max": 1,
      "rotulo": "Número do Item do Pedido de Compra - Identificação do número do item do pedido de Compra"
     },
     {
      "t": "el",
      "nome": "nFCI",
      "ns": "nfe",
      "tipo": "nfe:TGuid",
      "min": 0,
      "max": 1,
      "rotulo": "Número de controle da FCI - Ficha de Conteúdo de Importação."
     },
     {
      "t": "el",
      "nome": "rastro",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/rastro",
      "min": 0,
      "max": 500
     },
     {
      "t": "el",
      "nome": "infProdNFF",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/infProdNFF",
      "min": 0,
      "max": 1,
      "rotulo": "Informações mais detalhadas do produto (usada na NFF)"
     },
     {
      "t": "el",
      "nome": "infProdEmb",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/infProdEmb",
      "min": 0,
      "max": 1,
      "rotulo": "Informações mais detalhadas do produto (usada na NFF)"
     },
     {
      "t": "esc",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "veicProd",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/prod/veicProd",
        "min": 1,
        "max": 1,
        "rotulo": "Veículos novos"
       },
       {
        "t": "el",
        "nome": "med",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/prod/med",
        "min": 1,
        "max": 1,
        "rotulo": "grupo do detalhamento de Medicamentos e de matérias-primas farmacêuticas"
       },
       {
        "t": "el",
        "nome": "arma",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/prod/arma",
        "min": 1,
        "max": 500,
        "rotulo": "Armamentos"
       },
       {
        "t": "el",
        "nome": "comb",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/prod/comb",
        "min": 1,
        "max": 1,
        "rotulo": "Informar apenas para operações com combustíveis líquidos"
       },
       {
        "t": "el",
        "nome": "nRECOPI",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/prod/nRECOPI",
        "min": 1,
        "max": 1,
        "rotulo": "Número do RECOPI"
       }
      ]
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/prod/cProd": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 1
  },
  "nfe:TNFe/infNFe/det/prod/cEAN": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "SEM GTIN|[0-9]{0}|[0-9]{8}|[0-9]{12,14}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/cBarra": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 30,
   "minLength": 3
  },
  "nfe:TNFe/infNFe/det/prod/xProd": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 120,
   "minLength": 1
  },
  "nfe:TNFe/infNFe/det/prod/NCM": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{2}|[0-9]{8}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/NVE": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[A-Z]{2}[0-9]{4}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/CEST": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{7}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/indEscala": {
   "t": "s",
   "nativo": "xs:string",
   "enumeracao": [
    "S",
    "N"
   ]
  },
  "nfe:TNFe/infNFe/det/prod/cBenef": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "([!-ÿ]{8}|[!-ÿ]{10}|SEM CBENEF)?"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/gCred": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "cCredPresumido",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/gCred/cCredPresumido",
      "min": 1,
      "max": 1,
      "rotulo": "Código de Benefício Fiscal de Crédito Presumido na UF aplicado ao item"
     },
     {
      "t": "el",
      "nome": "pCredPresumido",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Percentual do Crédito Presumido"
     },
     {
      "t": "el",
      "nome": "vCredPresumido",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do Crédito Presumido"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/prod/gCred/cCredPresumido": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{8}|[!-ÿ]{10}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TDec_0302a04": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "0|0\\.[0-9]{2,4}|[1-9]{1}[0-9]{0,2}(\\.[0-9]{2,4})?"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TTpCredPresIBSZFM": {
   "t": "s",
   "nativo": "xs:string",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3",
    "4"
   ]
  },
  "nfe:TNFe/infNFe/det/prod/EXTIPI": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{2,3}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/CFOP": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[1,2,3,5,6,7]{1}[0-9]{3}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/uCom": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 6,
   "minLength": 1
  },
  "nfe:TDec_1104v": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "0|0\\.[0-9]{1,4}|[1-9]{1}[0-9]{0,10}|[1-9]{1}[0-9]{0,10}(\\.[0-9]{1,4})?"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TDec_1110v": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "0|0\\.[0-9]{1,10}|[1-9]{1}[0-9]{0,10}|[1-9]{1}[0-9]{0,10}(\\.[0-9]{1,10})?"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/cEANTrib": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "SEM GTIN|[0-9]{0}|[0-9]{8}|[0-9]{12,14}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/cBarraTrib": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 30,
   "minLength": 3
  },
  "nfe:TNFe/infNFe/det/prod/uTrib": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 6,
   "minLength": 1
  },
  "nfe:TDec_1302Opc": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "0\\.[0-9]{1}[1-9]{1}|0\\.[1-9]{1}[0-9]{1}|[1-9]{1}[0-9]{0,12}(\\.[0-9]{2})?"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/indTot": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1"
   ]
  },
  "nfe:TNFe/infNFe/det/prod/indBemMovelUsado": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "1"
   ]
  },
  "nfe:TNFe/infNFe/det/prod/DI": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "nDI",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/DI/nDI",
      "min": 1,
      "max": 1,
      "rotulo": "Número do Documento de Importação (DI, DSI, DIRE, DUImp) (NT2011/004)"
     },
     {
      "t": "el",
      "nome": "dDI",
      "ns": "nfe",
      "tipo": "nfe:TData",
      "min": 1,
      "max": 1,
      "rotulo": "Data de registro da DI/DSI/DA (AAAA-MM-DD)"
     },
     {
      "t": "el",
      "nome": "xLocDesemb",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/DI/xLocDesemb",
      "min": 1,
      "max": 1,
      "rotulo": "Local do desembaraço aduaneiro"
     },
     {
      "t": "el",
      "nome": "UFDesemb",
      "ns": "nfe",
      "tipo": "nfe:TUfEmi",
      "min": 1,
      "max": 1,
      "rotulo": "UF onde ocorreu o desembaraço aduaneiro"
     },
     {
      "t": "el",
      "nome": "dDesemb",
      "ns": "nfe",
      "tipo": "nfe:TData",
      "min": 1,
      "max": 1,
      "rotulo": "Data do desembaraço aduaneiro (AAAA-MM-DD)"
     },
     {
      "t": "el",
      "nome": "tpViaTransp",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/DI/tpViaTransp",
      "min": 1,
      "max": 1,
      "rotulo": "Via de transporte internacional informada na DI ou na Declaração Única de Importação (DUImp): 1-Maritima;2-Fluvial;3-Lacustre;4-Aerea;5-Postal;6-Ferroviaria;7-Rodoviaria;8-Conduto;9-Meios Proprios;10-Entrada/Saida Ficta; 11-Courier;12-Em maos;13-Por reboque."
     },
     {
      "t": "el",
      "nome": "vAFRMM",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor Adicional ao frete para renovação de marinha mercante"
     },
     {
      "t": "el",
      "nome": "tpIntermedio",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/DI/tpIntermedio",
      "min": 1,
      "max": 1,
      "rotulo": "Forma de Importação quanto a intermediação 1-por conta propria;2-por conta e ordem;3-encomenda"
     },
     {
      "t": "esc",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "CNPJ",
        "ns": "nfe",
        "tipo": "nfe:TCnpj",
        "min": 1,
        "max": 1,
        "rotulo": "CNPJ do adquirente ou do encomendante"
       },
       {
        "t": "el",
        "nome": "CPF",
        "ns": "nfe",
        "tipo": "nfe:TCpf",
        "min": 1,
        "max": 1,
        "rotulo": "CPF do adquirente ou do encomendante"
       }
      ]
     },
     {
      "t": "el",
      "nome": "UFTerceiro",
      "ns": "nfe",
      "tipo": "nfe:TUfEmi",
      "min": 0,
      "max": 1,
      "rotulo": "Sigla da UF do adquirente ou do encomendante"
     },
     {
      "t": "el",
      "nome": "cExportador",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/DI/cExportador",
      "min": 1,
      "max": 1,
      "rotulo": "Código do exportador (usado nos sistemas internos de informação do emitente da NF-e)"
     },
     {
      "t": "el",
      "nome": "adi",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/DI/adi",
      "min": 1,
      "max": 999,
      "rotulo": "Adições (NT 2011/004)"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/prod/DI/nDI": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 15
  },
  "nfe:TNFe/infNFe/det/prod/DI/xLocDesemb": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TNFe/infNFe/det/prod/DI/tpViaTransp": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13"
   ]
  },
  "nfe:TNFe/infNFe/det/prod/DI/tpIntermedio": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "1",
    "2",
    "3"
   ]
  },
  "nfe:TNFe/infNFe/det/prod/DI/cExportador": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TNFe/infNFe/det/prod/DI/adi": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "nAdicao",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/DI/adi/nAdicao",
      "min": 0,
      "max": 1,
      "rotulo": "Número da Adição"
     },
     {
      "t": "el",
      "nome": "nSeqAdic",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/DI/adi/nSeqAdic",
      "min": 1,
      "max": 1,
      "rotulo": "Número seqüencial do item"
     },
     {
      "t": "el",
      "nome": "cFabricante",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/DI/adi/cFabricante",
      "min": 1,
      "max": 1,
      "rotulo": "Código do fabricante estrangeiro (usado nos sistemas internos de informação do emitente da NF-e)"
     },
     {
      "t": "el",
      "nome": "vDescDI",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Valor do desconto do item"
     },
     {
      "t": "el",
      "nome": "nDraw",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/DI/adi/nDraw",
      "min": 0,
      "max": 1,
      "rotulo": "Número do ato concessório de Drawback"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/prod/DI/adi/nAdicao": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[1-9]{1}[0-9]{0,2}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/DI/adi/nSeqAdic": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[1-9]{1}[0-9]{0,4}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/DI/adi/cFabricante": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TNFe/infNFe/det/prod/DI/adi/nDraw": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 20
  },
  "nfe:TNFe/infNFe/det/prod/detExport": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "nDraw",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/detExport/nDraw",
      "min": 0,
      "max": 1,
      "rotulo": "Número do ato concessório de Drawback"
     },
     {
      "t": "el",
      "nome": "exportInd",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/detExport/exportInd",
      "min": 0,
      "max": 1,
      "rotulo": "Exportação indireta"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/prod/detExport/nDraw": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 20
  },
  "nfe:TNFe/infNFe/det/prod/detExport/exportInd": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "nRE",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/detExport/exportInd/nRE",
      "min": 1,
      "max": 1,
      "rotulo": "Registro de exportação"
     },
     {
      "t": "el",
      "nome": "chNFe",
      "ns": "nfe",
      "tipo": "nfe:TChNFe",
      "min": 1,
      "max": 1,
      "rotulo": "Chave de acesso da NF-e recebida para exportação"
     },
     {
      "t": "el",
      "nome": "qExport",
      "ns": "nfe",
      "tipo": "nfe:TDec_1104v",
      "min": 1,
      "max": 1,
      "rotulo": "Quantidade do item efetivamente exportado"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/prod/detExport/exportInd/nRE": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{0,12}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/xPed": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 15
  },
  "nfe:TNFe/infNFe/det/prod/nItemPed": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{1,6}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TGuid": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/rastro": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "nLote",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/rastro/nLote",
      "min": 1,
      "max": 1,
      "rotulo": "Número do lote do produto."
     },
     {
      "t": "el",
      "nome": "qLote",
      "ns": "nfe",
      "tipo": "nfe:TDec_0803v",
      "min": 1,
      "max": 1,
      "rotulo": "Quantidade de produto no lote."
     },
     {
      "t": "el",
      "nome": "dFab",
      "ns": "nfe",
      "tipo": "nfe:TData",
      "min": 1,
      "max": 1,
      "rotulo": "Data de fabricação/produção. Formato \"AAAA-MM-DD\"."
     },
     {
      "t": "el",
      "nome": "dVal",
      "ns": "nfe",
      "tipo": "nfe:TData",
      "min": 1,
      "max": 1,
      "rotulo": "Data de validade. Informar o último dia do mês caso a validade não especifique o dia. Formato \"AAAA-MM-DD\"."
     },
     {
      "t": "el",
      "nome": "cAgreg",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/rastro/cAgreg",
      "min": 0,
      "max": 1
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/prod/rastro/nLote": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 20
  },
  "nfe:TDec_0803v": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "0|0\\.[0-9]{3}|[1-9]{1}[0-9]{0,7}(\\.[0-9]{1,3})?"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/rastro/cAgreg": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 20
  },
  "nfe:TNFe/infNFe/det/prod/infProdNFF": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "cProdFisco",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/infProdNFF/cProdFisco",
      "min": 1,
      "max": 1,
      "rotulo": "Código Fiscal do Produto"
     },
     {
      "t": "el",
      "nome": "cOperNFF",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/infProdNFF/cOperNFF",
      "min": 1,
      "max": 1,
      "rotulo": "Código da operação selecionada na NFF e relacionada ao item"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/prod/infProdNFF/cProdFisco": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "length": 14
  },
  "nfe:TNFe/infNFe/det/prod/infProdNFF/cOperNFF": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{1,5}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/infProdEmb": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "xEmb",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/infProdEmb/xEmb",
      "min": 1,
      "max": 1,
      "rotulo": "Embalagem do produto"
     },
     {
      "t": "el",
      "nome": "qVolEmb",
      "ns": "nfe",
      "tipo": "nfe:TDec_0803v",
      "min": 1,
      "max": 1,
      "rotulo": "Volume do produto na embalagem"
     },
     {
      "t": "el",
      "nome": "uEmb",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/infProdEmb/uEmb",
      "min": 1,
      "max": 1,
      "rotulo": "Unidade de Medida da Embalagem"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/prod/infProdEmb/xEmb": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 8,
   "minLength": 1
  },
  "nfe:TNFe/infNFe/det/prod/infProdEmb/uEmb": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 8,
   "minLength": 1
  },
  "nfe:TNFe/infNFe/det/prod/veicProd": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "tpOp",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/veicProd/tpOp",
      "min": 1,
      "max": 1,
      "rotulo": "Tipo da Operação (1 - Venda concessionária; 2 - Faturamento direto; 3 - Venda direta; 0 - Outros)"
     },
     {
      "t": "el",
      "nome": "chassi",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/veicProd/chassi",
      "min": 1,
      "max": 1,
      "rotulo": "Chassi do veículo - VIN (código-identificação-veículo)"
     },
     {
      "t": "el",
      "nome": "cCor",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/veicProd/cCor",
      "min": 1,
      "max": 1,
      "rotulo": "Cor do veículo (código de cada montadora)"
     },
     {
      "t": "el",
      "nome": "xCor",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/veicProd/xCor",
      "min": 1,
      "max": 1,
      "rotulo": "Descrição da cor"
     },
     {
      "t": "el",
      "nome": "pot",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/veicProd/pot",
      "min": 1,
      "max": 1,
      "rotulo": "Potência máxima do motor do veículo em cavalo vapor (CV). (potência-veículo)"
     },
     {
      "t": "el",
      "nome": "cilin",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/veicProd/cilin",
      "min": 1,
      "max": 1,
      "rotulo": "Capacidade voluntária do motor expressa em centímetros cúbicos (CC). (cilindradas)"
     },
     {
      "t": "el",
      "nome": "pesoL",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/veicProd/pesoL",
      "min": 1,
      "max": 1,
      "rotulo": "Peso líquido"
     },
     {
      "t": "el",
      "nome": "pesoB",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/veicProd/pesoB",
      "min": 1,
      "max": 1,
      "rotulo": "Peso bruto"
     },
     {
      "t": "el",
      "nome": "nSerie",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/veicProd/nSerie",
      "min": 1,
      "max": 1,
      "rotulo": "Serial (série)"
     },
     {
      "t": "el",
      "nome": "tpComb",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/veicProd/tpComb",
      "min": 1,
      "max": 1,
      "rotulo": "Tipo de combustível-Tabela RENAVAM: 01-Álcool; 02-Gasolina; 03-Diesel; 16-Álcool/Gas.; 17-Gas./Álcool/GNV; 18-Gasolina/Elétrico"
     },
     {
      "t": "el",
      "nome": "nMotor",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/veicProd/nMotor",
      "min": 1,
      "max": 1,
      "rotulo": "Número do motor"
     },
     {
      "t": "el",
      "nome": "CMT",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/veicProd/CMT",
      "min": 1,
      "max": 1,
      "rotulo": "CMT-Capacidade Máxima de Tração - em Toneladas 4 casas decimais"
     },
     {
      "t": "el",
      "nome": "dist",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/veicProd/dist",
      "min": 1,
      "max": 1,
      "rotulo": "Distância entre eixos"
     },
     {
      "t": "el",
      "nome": "anoMod",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/veicProd/anoMod",
      "min": 1,
      "max": 1,
      "rotulo": "Ano Modelo de Fabricação"
     },
     {
      "t": "el",
      "nome": "anoFab",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/veicProd/anoFab",
      "min": 1,
      "max": 1,
      "rotulo": "Ano de Fabricação"
     },
     {
      "t": "el",
      "nome": "tpPint",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/veicProd/tpPint",
      "min": 1,
      "max": 1,
      "rotulo": "Tipo de pintura"
     },
     {
      "t": "el",
      "nome": "tpVeic",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/veicProd/tpVeic",
      "min": 1,
      "max": 1,
      "rotulo": "Tipo de veículo (utilizar tabela RENAVAM)"
     },
     {
      "t": "el",
      "nome": "espVeic",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/veicProd/espVeic",
      "min": 1,
      "max": 1,
      "rotulo": "Espécie de veículo (utilizar tabela RENAVAM)"
     },
     {
      "t": "el",
      "nome": "VIN",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/veicProd/VIN",
      "min": 1,
      "max": 1,
      "rotulo": "Informa-se o veículo tem VIN (chassi) remarcado. R-Remarcado N-NormalVIN"
     },
     {
      "t": "el",
      "nome": "condVeic",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/veicProd/condVeic",
      "min": 1,
      "max": 1,
      "rotulo": "Condição do veículo (1 - acabado; 2 - inacabado; 3 - semi-acabado)"
     },
     {
      "t": "el",
      "nome": "cMod",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/veicProd/cMod",
      "min": 1,
      "max": 1,
      "rotulo": "Código Marca Modelo (utilizar tabela RENAVAM)"
     },
     {
      "t": "el",
      "nome": "cCorDENATRAN",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/veicProd/cCorDENATRAN",
      "min": 1,
      "max": 1,
      "rotulo": "Código da Cor Segundo as regras de pré-cadastro do DENATRAN: 01-AMARELO;02-AZUL;03-BEGE;04-BRANCA;05-CINZA;06-DOURADA;07-GRENA 08-LARANJA;09-MARROM;10-PRATA;11-PRETA;12-ROSA;13-ROXA;14-VERDE;15-VERMELHA;16-FANTASIA"
     },
     {
      "t": "el",
      "nome": "lota",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/veicProd/lota",
      "min": 1,
      "max": 1,
      "rotulo": "Quantidade máxima de permitida de passageiros sentados, inclusive motorista."
     },
     {
      "t": "el",
      "nome": "tpRest",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/veicProd/tpRest",
      "min": 1,
      "max": 1,
      "rotulo": "Restrição 0 - Não há; 1 - Alienação Fiduciária; 2 - Arrendamento Mercantil; 3 - Reserva de Domínio; 4 - Penhor de Veículos; 9 - outras."
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/prod/veicProd/tpOp": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3"
   ]
  },
  "nfe:TNFe/infNFe/det/prod/veicProd/chassi": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[A-Z0-9]+"
    ]
   ],
   "length": 17,
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/veicProd/cCor": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 4
  },
  "nfe:TNFe/infNFe/det/prod/veicProd/xCor": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 40
  },
  "nfe:TNFe/infNFe/det/prod/veicProd/pot": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 4
  },
  "nfe:TNFe/infNFe/det/prod/veicProd/cilin": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 4
  },
  "nfe:TNFe/infNFe/det/prod/veicProd/pesoL": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 9
  },
  "nfe:TNFe/infNFe/det/prod/veicProd/pesoB": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 9
  },
  "nfe:TNFe/infNFe/det/prod/veicProd/nSerie": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 9
  },
  "nfe:TNFe/infNFe/det/prod/veicProd/tpComb": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 2
  },
  "nfe:TNFe/infNFe/det/prod/veicProd/nMotor": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 21
  },
  "nfe:TNFe/infNFe/det/prod/veicProd/CMT": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 9
  },
  "nfe:TNFe/infNFe/det/prod/veicProd/dist": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 4
  },
  "nfe:TNFe/infNFe/det/prod/veicProd/anoMod": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{4}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/veicProd/anoFab": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{4}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/veicProd/tpPint": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "length": 1
  },
  "nfe:TNFe/infNFe/det/prod/veicProd/tpVeic": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{1,2}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/veicProd/espVeic": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{1}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/veicProd/VIN": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "length": 1,
   "enumeracao": [
    "R",
    "N"
   ]
  },
  "nfe:TNFe/infNFe/det/prod/veicProd/condVeic": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "1",
    "2",
    "3"
   ]
  },
  "nfe:TNFe/infNFe/det/prod/veicProd/cMod": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{1,6}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/veicProd/cCorDENATRAN": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{1,2}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 2
  },
  "nfe:TNFe/infNFe/det/prod/veicProd/lota": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{1,3}"
    ]
   ],
   "minLength": 1,
   "maxLength": 3,
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/veicProd/tpRest": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3",
    "4",
    "9"
   ]
  },
  "nfe:TNFe/infNFe/det/prod/med": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "cProdANVISA",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/med/cProdANVISA",
      "min": 1,
      "max": 1,
      "rotulo": "Utilizar o número do registro ANVISA ou preencher com o literal “ISENTO”, no caso de medicamento isento de registro na ANVISA."
     },
     {
      "t": "el",
      "nome": "xMotivoIsencao",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/med/xMotivoIsencao",
      "min": 0,
      "max": 1,
      "rotulo": "Obs.: Para medicamento isento de registro na ANVISA, informar o número da decisão que o isenta, como por exemplo o número da Resolução da Diretoria Colegiada da ANVISA (RDC)."
     },
     {
      "t": "el",
      "nome": "vPMC",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Preço Máximo ao Consumidor."
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/prod/med/cProdANVISA": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ],
    [
     "[0-9]{11}|[0-9]{13}|ISENTO"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/med/xMotivoIsencao": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 255
  },
  "nfe:TNFe/infNFe/det/prod/arma": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "tpArma",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/arma/tpArma",
      "min": 1,
      "max": 1,
      "rotulo": "Indicador do tipo de arma de fogo (0 - Uso permitido; 1 - Uso restrito)"
     },
     {
      "t": "el",
      "nome": "nSerie",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/arma/nSerie",
      "min": 1,
      "max": 1,
      "rotulo": "Número de série da arma"
     },
     {
      "t": "el",
      "nome": "nCano",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/arma/nCano",
      "min": 1,
      "max": 1,
      "rotulo": "Número de série do cano"
     },
     {
      "t": "el",
      "nome": "descr",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/arma/descr",
      "min": 1,
      "max": 1,
      "rotulo": "Descrição completa da arma, compreendendo: calibre, marca, capacidade, tipo de funcionamento, comprimento e demais elementos que permitam a sua perfeita identificação."
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/prod/arma/tpArma": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1"
   ]
  },
  "nfe:TNFe/infNFe/det/prod/arma/nSerie": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 15
  },
  "nfe:TNFe/infNFe/det/prod/arma/nCano": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 15
  },
  "nfe:TNFe/infNFe/det/prod/arma/descr": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 256
  },
  "nfe:TNFe/infNFe/det/prod/comb": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "cProdANP",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/comb/cProdANP",
      "min": 1,
      "max": 1,
      "rotulo": "Código de produto da ANP. codificação de produtos do SIMP (http://www.anp.gov.br)"
     },
     {
      "t": "el",
      "nome": "descANP",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/comb/descANP",
      "min": 1,
      "max": 1,
      "rotulo": "Descrição do Produto conforme ANP. Utilizar a descrição de produtos do Sistema de Informações de Movimentação de Produtos - SIMP (http://www.anp.gov.br/simp/)."
     },
     {
      "t": "el",
      "nome": "pGLP",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04Max100",
      "min": 0,
      "max": 1,
      "rotulo": "Percentual do GLP derivado do petróleo no produto GLP (cProdANP=210203001). Informar em número decimal o percentual do GLP derivado de petróleo no produto GLP. Valores 0 a 100."
     },
     {
      "t": "el",
      "nome": "pGNn",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04Max100",
      "min": 0,
      "max": 1,
      "rotulo": "Percentual de gás natural nacional - GLGNn para o produto GLP (cProdANP=210203001). Informar em número decimal o percentual do Gás Natural Nacional - GLGNn para o produto GLP. Valores de 0 a 100."
     },
     {
      "t": "el",
      "nome": "pGNi",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04Max100",
      "min": 0,
      "max": 1,
      "rotulo": "Percentual de gás natural importado GLGNi para o produto GLP (cProdANP=210203001). Informar em número deciaml o percentual do Gás Natural Importado - GLGNi para o produto GLP. Valores de 0 a 100."
     },
     {
      "t": "el",
      "nome": "vPart",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor de partida (cProdANP=210203001). Deve ser informado neste campo o valor por quilograma sem ICMS."
     },
     {
      "t": "el",
      "nome": "CODIF",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/comb/CODIF",
      "min": 0,
      "max": 1,
      "rotulo": "Código de autorização / registro do CODIF. Informar apenas quando a UF utilizar o CODIF (Sistema de Controle do Diferimento do Imposto nas Operações com AEAC - Álcool Etílico Anidro Combustível)."
     },
     {
      "t": "el",
      "nome": "qTemp",
      "ns": "nfe",
      "tipo": "nfe:TDec_1204temperatura",
      "min": 0,
      "max": 1,
      "rotulo": "Quantidade de combustível faturada à temperatura ambiente. Informar quando a quantidade faturada informada no campo qCom (I10) tiver sido ajustada para uma temperatura diferente da ambiente."
     },
     {
      "t": "el",
      "nome": "UFCons",
      "ns": "nfe",
      "tipo": "nfe:TUf",
      "min": 1,
      "max": 1,
      "rotulo": "Sigla da UF de Consumo"
     },
     {
      "t": "el",
      "nome": "CIDE",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/comb/CIDE",
      "min": 0,
      "max": 1,
      "rotulo": "CIDE Combustíveis"
     },
     {
      "t": "el",
      "nome": "encerrante",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/comb/encerrante",
      "min": 0,
      "max": 1,
      "rotulo": "Informações do grupo de \"encerrante\""
     },
     {
      "t": "el",
      "nome": "pBio",
      "ns": "nfe",
      "tipo": "nfe:TDec_03v00a04Max100Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Percentual do índice de mistura do Biodiesel (B100) no Óleo Diesel B instituído pelo órgão regulamentador"
     },
     {
      "t": "el",
      "nome": "origComb",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/comb/origComb",
      "min": 0,
      "max": 30,
      "rotulo": "Grupo indicador da origem do combustível"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/prod/comb/cProdANP": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{9}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/comb/descANP": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 2,
   "maxLength": 95
  },
  "nfe:TDec_0302a04Max100": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "0(\\.[0-9]{2,4})?|[1-9]{1}[0-9]{0,1}(\\.[0-9]{2,4})?|100(\\.0{2,4})?"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/comb/CODIF": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{1,21}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TDec_1204temperatura": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "0\\.[1-9]{1}[0-9]{3}|0\\.[0-9]{3}[1-9]{1}|0\\.[0-9]{2}[1-9]{1}[0-9]{1}|0\\.[0-9]{1}[1-9]{1}[0-9]{2}|[1-9]{1}[0-9]{0,11}(\\.[0-9]{4})?"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/comb/CIDE": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "qBCProd",
      "ns": "nfe",
      "tipo": "nfe:TDec_1204v",
      "min": 1,
      "max": 1,
      "rotulo": "BC do CIDE ( Quantidade comercializada)"
     },
     {
      "t": "el",
      "nome": "vAliqProd",
      "ns": "nfe",
      "tipo": "nfe:TDec_1104",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota do CIDE (em reais)"
     },
     {
      "t": "el",
      "nome": "vCIDE",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do CIDE"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TDec_1204v": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "0|0\\.[0-9]{1,4}|[1-9]{1}[0-9]{0,11}|[1-9]{1}[0-9]{0,11}(\\.[0-9]{1,4})?"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TDec_1104": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "0|0\\.[0-9]{4}|[1-9]{1}[0-9]{0,10}(\\.[0-9]{4})?"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/comb/encerrante": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "nBico",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/comb/encerrante/nBico",
      "min": 1,
      "max": 1,
      "rotulo": "Numero de identificação do Bico utilizado no abastecimento"
     },
     {
      "t": "el",
      "nome": "nBomba",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/comb/encerrante/nBomba",
      "min": 0,
      "max": 1,
      "rotulo": "Numero de identificação da bomba ao qual o bico está interligado"
     },
     {
      "t": "el",
      "nome": "nTanque",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/comb/encerrante/nTanque",
      "min": 1,
      "max": 1,
      "rotulo": "Numero de identificação do tanque ao qual o bico está interligado"
     },
     {
      "t": "el",
      "nome": "vEncIni",
      "ns": "nfe",
      "tipo": "nfe:TDec_1203",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do Encerrante no ínicio do abastecimento"
     },
     {
      "t": "el",
      "nome": "vEncFin",
      "ns": "nfe",
      "tipo": "nfe:TDec_1203",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do Encerrante no final do abastecimento"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/prod/comb/encerrante/nBico": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{1,3}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/comb/encerrante/nBomba": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{1,3}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/comb/encerrante/nTanque": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{1,3}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TDec_1203": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "0|0\\.[0-9]{3}|[1-9]{1}[0-9]{0,11}(\\.[0-9]{3})?"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TDec_03v00a04Max100Opc": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "0(\\.[1-9][0-9]{0,3})|0(\\.[0][1-9][0-9]{0,2})|0(\\.[0][0][1-9][0-9]{0,1})|0(\\.[0][0][0][1-9])|100(\\.[0]{1,4})?|[1-9]{1}[0-9]{0,1}(\\.[0-9]{1,4})?"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/prod/comb/origComb": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "indImport",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/prod/comb/origComb/indImport",
      "min": 1,
      "max": 1,
      "rotulo": "Indicador de importação 0=Nacional; 1=Importado;"
     },
     {
      "t": "el",
      "nome": "cUFOrig",
      "ns": "nfe",
      "tipo": "nfe:TCodUfIBGE",
      "min": 1,
      "max": 1,
      "rotulo": "UF de origem do produtor ou do importado"
     },
     {
      "t": "el",
      "nome": "pOrig",
      "ns": "nfe",
      "tipo": "nfe:TDec_03v00a04Max100Opc",
      "min": 1,
      "max": 1,
      "rotulo": "Percentual originário para a UF"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/prod/comb/origComb/indImport": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1"
   ]
  },
  "nfe:TNFe/infNFe/det/prod/nRECOPI": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{20}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 20
  },
  "nfe:TNFe/infNFe/det/imposto": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vTotTrib",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor estimado total de impostos federais, estaduais e municipais"
     },
     {
      "t": "esc",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "seq",
        "min": 1,
        "max": 1,
        "itens": [
         {
          "t": "el",
          "nome": "ICMS",
          "ns": "nfe",
          "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS",
          "min": 1,
          "max": 1,
          "rotulo": "Dados do ICMS Normal e ST"
         },
         {
          "t": "el",
          "nome": "IPI",
          "ns": "nfe",
          "tipo": "nfe:TIpi",
          "min": 0,
          "max": 1
         },
         {
          "t": "el",
          "nome": "II",
          "ns": "nfe",
          "tipo": "nfe:TNFe/infNFe/det/imposto/II",
          "min": 0,
          "max": 1,
          "rotulo": "Dados do Imposto de Importação"
         }
        ]
       },
       {
        "t": "seq",
        "min": 1,
        "max": 1,
        "itens": [
         {
          "t": "el",
          "nome": "IPI",
          "ns": "nfe",
          "tipo": "nfe:TIpi",
          "min": 0,
          "max": 1
         },
         {
          "t": "el",
          "nome": "ISSQN",
          "ns": "nfe",
          "tipo": "nfe:TNFe/infNFe/det/imposto/ISSQN",
          "min": 1,
          "max": 1,
          "rotulo": "ISSQN"
         }
        ]
       }
      ]
     },
     {
      "t": "el",
      "nome": "PIS",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/PIS",
      "min": 0,
      "max": 1,
      "rotulo": "Dados do PIS"
     },
     {
      "t": "el",
      "nome": "PISST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/PISST",
      "min": 0,
      "max": 1,
      "rotulo": "Dados do PIS Substituição Tributária"
     },
     {
      "t": "el",
      "nome": "COFINS",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/COFINS",
      "min": 0,
      "max": 1,
      "rotulo": "Dados do COFINS"
     },
     {
      "t": "el",
      "nome": "COFINSST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/COFINSST",
      "min": 0,
      "max": 1,
      "rotulo": "Dados do COFINS da Substituição Tributaria;"
     },
     {
      "t": "el",
      "nome": "ICMSUFDest",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMSUFDest",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo a ser informado nas vendas interestarduais para consumidor final, não contribuinte de ICMS"
     },
     {
      "t": "el",
      "nome": "IS",
      "ns": "nfe",
      "tipo": "nfe:TIS",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de informações do Imposto Seletivo"
     },
     {
      "t": "el",
      "nome": "IBSCBS",
      "ns": "nfe",
      "tipo": "nfe:TTribNFe",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de informações dos tributos IBS, CBS e Imposto Seletivo"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS": {
   "t": "c",
   "conteudo": {
    "t": "esc",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "ICMS00",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS00",
      "min": 1,
      "max": 1,
      "rotulo": "Tributação pelo ICMS 00 - Tributada integralmente"
     },
     {
      "t": "el",
      "nome": "ICMS02",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS02",
      "min": 1,
      "max": 1,
      "rotulo": "Tributação monofásica própria sobre combustíveis"
     },
     {
      "t": "el",
      "nome": "ICMS10",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS10",
      "min": 1,
      "max": 1,
      "rotulo": "Tributação pelo ICMS 10 - Tributada e com cobrança do ICMS por substituição tributária"
     },
     {
      "t": "el",
      "nome": "ICMS15",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS15",
      "min": 1,
      "max": 1,
      "rotulo": "Tributação monofásica própria e com responsabilidade pela retenção sobre combustíveis"
     },
     {
      "t": "el",
      "nome": "ICMS20",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS20",
      "min": 1,
      "max": 1,
      "rotulo": "Tributção pelo ICMS 20 - Com redução de base de cálculo"
     },
     {
      "t": "el",
      "nome": "ICMS30",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS30",
      "min": 1,
      "max": 1,
      "rotulo": "Tributação pelo ICMS 30 - Isenta ou não tributada e com cobrança do ICMS por substituição tributária"
     },
     {
      "t": "el",
      "nome": "ICMS40",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS40",
      "min": 1,
      "max": 1,
      "rotulo": "Tributação pelo ICMS 40 - Isenta 41 - Não tributada 50 - Suspensão"
     },
     {
      "t": "el",
      "nome": "ICMS51",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS51",
      "min": 1,
      "max": 1,
      "rotulo": "Tributção pelo ICMS 51 - Diferimento. A exigência do preenchimento das informações do ICMS diferido fica à critério de cada UF."
     },
     {
      "t": "el",
      "nome": "ICMS53",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS53",
      "min": 1,
      "max": 1,
      "rotulo": "Tributação monofásica sobre combustíveis com recolhimento diferido"
     },
     {
      "t": "el",
      "nome": "ICMS60",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS60",
      "min": 1,
      "max": 1,
      "rotulo": "Tributação pelo ICMS 60 - ICMS cobrado anteriormente por substituição tributária"
     },
     {
      "t": "el",
      "nome": "ICMS61",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS61",
      "min": 1,
      "max": 1,
      "rotulo": "Tributação monofásica sobre combustíveis cobrada anteriormente;"
     },
     {
      "t": "el",
      "nome": "ICMS70",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS70",
      "min": 1,
      "max": 1,
      "rotulo": "Tributação pelo ICMS 70 - Com redução de base de cálculo e cobrança do ICMS por substituição tributária"
     },
     {
      "t": "el",
      "nome": "ICMS90",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS90",
      "min": 1,
      "max": 1,
      "rotulo": "Tributação pelo ICMS 90 - Outras"
     },
     {
      "t": "el",
      "nome": "ICMSPart",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSPart",
      "min": 1,
      "max": 1,
      "rotulo": "Partilha do ICMS entre a UF de origem e UF de destino ou a UF definida na legislação Operação interestadual para consumidor final com partilha do ICMS devido na operação entre a UF de origem e a UF do destinatário ou ou a UF definida na legislação. (Ex. UF da concessionária de entrega do veículos)"
     },
     {
      "t": "el",
      "nome": "ICMSST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSST",
      "min": 1,
      "max": 1,
      "rotulo": "Grupo de informação do ICMSST devido para a UF de destino, nas operações interestaduais de produtos que tiveram retenção antecipada de ICMS por ST na UF do remetente. Repasse via Substituto Tributário."
     },
     {
      "t": "el",
      "nome": "ICMSSN101",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN101",
      "min": 1,
      "max": 1,
      "rotulo": "Tributação do ICMS pelo SIMPLES NACIONAL e CSOSN=101 (v.2.0)"
     },
     {
      "t": "el",
      "nome": "ICMSSN102",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN102",
      "min": 1,
      "max": 1,
      "rotulo": "Tributação do ICMS pelo SIMPLES NACIONAL e CSOSN=102, 103, 300 ou 400 (v.2.0))"
     },
     {
      "t": "el",
      "nome": "ICMSSN201",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN201",
      "min": 1,
      "max": 1,
      "rotulo": "Tributação do ICMS pelo SIMPLES NACIONAL e CSOSN=201 (v.2.0)"
     },
     {
      "t": "el",
      "nome": "ICMSSN202",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN202",
      "min": 1,
      "max": 1,
      "rotulo": "Tributação do ICMS pelo SIMPLES NACIONAL e CSOSN=202 ou 203 (v.2.0)"
     },
     {
      "t": "el",
      "nome": "ICMSSN500",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN500",
      "min": 1,
      "max": 1,
      "rotulo": "Tributação do ICMS pelo SIMPLES NACIONAL,CRT=1 – Simples Nacional e CSOSN=500 (v.2.0)"
     },
     {
      "t": "el",
      "nome": "ICMSSN900",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN900",
      "min": 1,
      "max": 1,
      "rotulo": "Tributação do ICMS pelo SIMPLES NACIONAL, CRT=1 – Simples Nacional, CRT=4 - MEI e CSOSN=900 (v2.0)"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS00": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "orig",
      "ns": "nfe",
      "tipo": "nfe:Torig",
      "min": 1,
      "max": 1,
      "rotulo": "origem da mercadoria: 0 - Nacional 1 - Estrangeira - Importação direta 2 - Estrangeira - Adquirida no mercado interno"
     },
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS00/CST",
      "min": 1,
      "max": 1,
      "rotulo": "Tributção pelo ICMS 00 - Tributada integralmente"
     },
     {
      "t": "el",
      "nome": "modBC",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS00/modBC",
      "min": 1,
      "max": 1,
      "rotulo": "Modalidade de determinação da BC do ICMS: 0 - Margem Valor Agregado (%); 1 - Pauta (valor); 2 - Preço Tabelado Máximo (valor); 3 - Valor da Operação."
     },
     {
      "t": "el",
      "nome": "vBC",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da BC do ICMS"
     },
     {
      "t": "el",
      "nome": "pICMS",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota do ICMS"
     },
     {
      "t": "el",
      "nome": "vICMS",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do ICMS"
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "pFCP",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 1,
        "max": 1,
        "rotulo": "Percentual de ICMS relativo ao Fundo de Combate à Pobreza (FCP)."
       },
       {
        "t": "el",
        "nome": "vFCP",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do ICMS relativo ao Fundo de Combate à Pobreza (FCP)."
       }
      ]
     }
    ]
   },
   "atributos": []
  },
  "nfe:Torig": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS00/CST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "00"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS00/modBC": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3"
   ]
  },
  "nfe:TDec_0302a04Opc": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "0\\.[0-9]{2,4}|[1-9]{1}[0-9]{0,2}(\\.[0-9]{2,4})?"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS02": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "orig",
      "ns": "nfe",
      "tipo": "nfe:Torig",
      "min": 1,
      "max": 1,
      "rotulo": "origem da mercadoria"
     },
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS02/CST",
      "min": 1,
      "max": 1,
      "rotulo": "Tributção pelo ICMS 02= Tributação monofásica própria sobre combustíveis;"
     },
     {
      "t": "el",
      "nome": "qBCMono",
      "ns": "nfe",
      "tipo": "nfe:TDec_1104v",
      "min": 0,
      "max": 1,
      "rotulo": "Quantidade tributada."
     },
     {
      "t": "el",
      "nome": "adRemICMS",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota ad rem do imposto."
     },
     {
      "t": "el",
      "nome": "vICMSMono",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do ICMS própri"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS02/CST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "02"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS10": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "orig",
      "ns": "nfe",
      "tipo": "nfe:Torig",
      "min": 1,
      "max": 1,
      "rotulo": "origem da mercadoria: 0 - Nacional 1 - Estrangeira - Importação direta 2 - Estrangeira - Adquirida no mercado interno"
     },
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS10/CST",
      "min": 1,
      "max": 1,
      "rotulo": "10 - Tributada e com cobrança do ICMS por substituição tributária"
     },
     {
      "t": "el",
      "nome": "modBC",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS10/modBC",
      "min": 1,
      "max": 1,
      "rotulo": "Modalidade de determinação da BC do ICMS: 0 - Margem Valor Agregado (%); 1 - Pauta (valor); 2 - Preço Tabelado Máximo (valor); 3 - Valor da Operação."
     },
     {
      "t": "el",
      "nome": "vBC",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da BC do ICMS"
     },
     {
      "t": "el",
      "nome": "pICMS",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota do ICMS"
     },
     {
      "t": "el",
      "nome": "vICMS",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do ICMS"
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vBCFCP",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor da Base de cálculo do FCP."
       },
       {
        "t": "el",
        "nome": "pFCP",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 1,
        "max": 1,
        "rotulo": "Percentual de ICMS relativo ao Fundo de Combate à Pobreza (FCP)."
       },
       {
        "t": "el",
        "nome": "vFCP",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do ICMS relativo ao Fundo de Combate à Pobreza (FCP)."
       }
      ]
     },
     {
      "t": "el",
      "nome": "modBCST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS10/modBCST",
      "min": 1,
      "max": 1,
      "rotulo": "Modalidade de determinação da BC do ICMS ST: 0 – Preço tabelado ou máximo sugerido; 1 - Lista Negativa (valor); 2 - Lista Positiva (valor); 3 - Lista Neutra (valor); 4 - Margem Valor Agregado (%); 5 - Pauta (valor) 6-Valor da Operação;"
     },
     {
      "t": "el",
      "nome": "pMVAST",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Percentual da Margem de Valor Adicionado ICMS ST"
     },
     {
      "t": "el",
      "nome": "pRedBCST",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Percentual de redução da BC ICMS ST"
     },
     {
      "t": "el",
      "nome": "vBCST",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da BC do ICMS ST"
     },
     {
      "t": "el",
      "nome": "pICMSST",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota do ICMS ST"
     },
     {
      "t": "el",
      "nome": "vICMSST",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do ICMS ST"
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vBCFCPST",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor da Base de cálculo do FCP retido por substituicao tributaria."
       },
       {
        "t": "el",
        "nome": "pFCPST",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 1,
        "max": 1,
        "rotulo": "Percentual de FCP retido por substituição tributária."
       },
       {
        "t": "el",
        "nome": "vFCPST",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do FCP retido por substituição tributária."
       }
      ]
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vICMSSTDeson",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do ICMS-ST desonerado."
       },
       {
        "t": "el",
        "nome": "motDesICMSST",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS10/motDesICMSST",
        "min": 1,
        "max": 1,
        "rotulo": "Motivo da desoneração do ICMS-ST: 3-Uso na agropecuária; 9-Outros; 12-Fomento agropecuário."
       }
      ]
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS10/CST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "10"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS10/modBC": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS10/modBCST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS10/motDesICMSST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "3",
    "9",
    "12"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS15": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "orig",
      "ns": "nfe",
      "tipo": "nfe:Torig",
      "min": 1,
      "max": 1,
      "rotulo": "origem da mercadoria"
     },
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS15/CST",
      "min": 1,
      "max": 1,
      "rotulo": "Tributção pelo ICMS 15= Tributação monofásica própria e com responsabilidade pela retenção sobre combustíveis;"
     },
     {
      "t": "el",
      "nome": "qBCMono",
      "ns": "nfe",
      "tipo": "nfe:TDec_1104v",
      "min": 0,
      "max": 1,
      "rotulo": "Quantidade tributada."
     },
     {
      "t": "el",
      "nome": "adRemICMS",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota ad rem do imposto."
     },
     {
      "t": "el",
      "nome": "vICMSMono",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do ICMS próprio"
     },
     {
      "t": "el",
      "nome": "qBCMonoReten",
      "ns": "nfe",
      "tipo": "nfe:TDec_1104v",
      "min": 0,
      "max": 1,
      "rotulo": "Quantidade tributada sujeita a retenção."
     },
     {
      "t": "el",
      "nome": "adRemICMSReten",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota ad rem do imposto com retenção."
     },
     {
      "t": "el",
      "nome": "vICMSMonoReten",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do ICMS com retenção"
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "pRedAdRem",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302Max100",
        "min": 1,
        "max": 1,
        "rotulo": "Percentual de redução do valor da alíquota ad rem do ICMS."
       },
       {
        "t": "el",
        "nome": "motRedAdRem",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS15/motRedAdRem",
        "min": 1,
        "max": 1,
        "rotulo": "Motivo da redução do adrem 1= Transporte coletivo de passageiros; 9=Outros;"
       }
      ]
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS15/CST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "15"
   ]
  },
  "nfe:TDec_0302Max100": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "0(\\.[0-9]{2})?|100(\\.00)?|[1-9]{1}[0-9]{0,1}(\\.[0-9]{2})?"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS15/motRedAdRem": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "1",
    "9"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS20": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "orig",
      "ns": "nfe",
      "tipo": "nfe:Torig",
      "min": 1,
      "max": 1,
      "rotulo": "origem da mercadoria: 0 - Nacional 1 - Estrangeira - Importação direta 2 - Estrangeira - Adquirida no mercado interno"
     },
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS20/CST",
      "min": 1,
      "max": 1,
      "rotulo": "Tributção pelo ICMS 20 - Com redução de base de cálculo"
     },
     {
      "t": "el",
      "nome": "modBC",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS20/modBC",
      "min": 1,
      "max": 1,
      "rotulo": "Modalidade de determinação da BC do ICMS: 0 - Margem Valor Agregado (%); 1 - Pauta (valor); 2 - Preço Tabelado Máximo (valor); 3 - Valor da Operação."
     },
     {
      "t": "el",
      "nome": "pRedBC",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Percentual de redução da BC"
     },
     {
      "t": "el",
      "nome": "vBC",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da BC do ICMS"
     },
     {
      "t": "el",
      "nome": "pICMS",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota do ICMS"
     },
     {
      "t": "el",
      "nome": "vICMS",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do ICMS"
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vBCFCP",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor da Base de cálculo do FCP."
       },
       {
        "t": "el",
        "nome": "pFCP",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 1,
        "max": 1,
        "rotulo": "Percentual de ICMS relativo ao Fundo de Combate à Pobreza (FCP)."
       },
       {
        "t": "el",
        "nome": "vFCP",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do ICMS relativo ao Fundo de Combate à Pobreza (FCP)."
       }
      ]
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vICMSDeson",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do ICMS de desoneração"
       },
       {
        "t": "el",
        "nome": "motDesICMS",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS20/motDesICMS",
        "min": 1,
        "max": 1,
        "rotulo": "Motivo da desoneração do ICMS:3-Uso na agropecuária;9-Outros; 10=Deficiente Condutor (Convênio ICMS 38/12); 11=Deficiente Não Condutor (Convênio ICMS 38/12); 12-Fomento agropecuário"
       },
       {
        "t": "el",
        "nome": "indDeduzDeson",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS20/indDeduzDeson",
        "min": 0,
        "max": 1,
        "rotulo": "Indica se o valor do ICMS desonerado (vICMSDeson) deduz do valor do item (vProd): 0=Valor do ICMS desonerado (vICMSDeson) não deduz do valor do item (vProd) / total da NF-e; 1=Valor do ICMS desonerado (vICMSDeson) deduz do valor do item (vProd) / total da NF-e."
       }
      ]
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS20/CST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "20"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS20/modBC": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS20/motDesICMS": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "3",
    "9",
    "10",
    "11",
    "12"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS20/indDeduzDeson": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS30": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "orig",
      "ns": "nfe",
      "tipo": "nfe:Torig",
      "min": 1,
      "max": 1,
      "rotulo": "origem da mercadoria: 0 - Nacional 1 - Estrangeira - Importação direta 2 - Estrangeira - Adquirida no mercado interno"
     },
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS30/CST",
      "min": 1,
      "max": 1,
      "rotulo": "Tributção pelo ICMS 30 - Isenta ou não tributada e com cobrança do ICMS por substituição tributária"
     },
     {
      "t": "el",
      "nome": "modBCST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS30/modBCST",
      "min": 1,
      "max": 1,
      "rotulo": "Modalidade de determinação da BC do ICMS ST: 0 – Preço tabelado ou máximo sugerido; 1 - Lista Negativa (valor); 2 - Lista Positiva (valor); 3 - Lista Neutra (valor); 4 - Margem Valor Agregado (%); 5 - Pauta (valor). 6 - Valor da Operação"
     },
     {
      "t": "el",
      "nome": "pMVAST",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Percentual da Margem de Valor Adicionado ICMS ST"
     },
     {
      "t": "el",
      "nome": "pRedBCST",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Percentual de redução da BC ICMS ST"
     },
     {
      "t": "el",
      "nome": "vBCST",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da BC do ICMS ST"
     },
     {
      "t": "el",
      "nome": "pICMSST",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota do ICMS ST"
     },
     {
      "t": "el",
      "nome": "vICMSST",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do ICMS ST"
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vBCFCPST",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor da Base de cálculo do FCP."
       },
       {
        "t": "el",
        "nome": "pFCPST",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 1,
        "max": 1,
        "rotulo": "Percentual de FCP retido por substituição tributária."
       },
       {
        "t": "el",
        "nome": "vFCPST",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do FCP retido por substituição tributária."
       }
      ]
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vICMSDeson",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do ICMS de desoneração"
       },
       {
        "t": "el",
        "nome": "motDesICMS",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS30/motDesICMS",
        "min": 1,
        "max": 1,
        "rotulo": "Motivo da desoneração do ICMS:6-Utilitários Motocicleta AÁrea Livre;7-SUFRAMA;9-Outros"
       },
       {
        "t": "el",
        "nome": "indDeduzDeson",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS30/indDeduzDeson",
        "min": 0,
        "max": 1,
        "rotulo": "Indica se o valor do ICMS desonerado (vICMSDeson) deduz do valor do item (vProd): 0=Valor do ICMS desonerado (vICMSDeson) não deduz do valor do item (vProd) / total da NF-e; 1=Valor do ICMS desonerado (vICMSDeson) deduz do valor do item (vProd) / total da NF-e."
       }
      ]
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS30/CST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "30"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS30/modBCST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS30/motDesICMS": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "6",
    "7",
    "9"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS30/indDeduzDeson": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS40": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "orig",
      "ns": "nfe",
      "tipo": "nfe:Torig",
      "min": 1,
      "max": 1,
      "rotulo": "origem da mercadoria: 0 - Nacional 1 - Estrangeira - Importação direta 2 - Estrangeira - Adquirida no mercado interno"
     },
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS40/CST",
      "min": 1,
      "max": 1,
      "rotulo": "Tributação pelo ICMS 40 - Isenta 41 - Não tributada 50 - Suspensão 51 - Diferimento"
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vICMSDeson",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "O valor do ICMS será informado apenas nas operações com veículos beneficiados com a desoneração condicional do ICMS."
       },
       {
        "t": "el",
        "nome": "motDesICMS",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS40/motDesICMS",
        "min": 1,
        "max": 1,
        "rotulo": "Este campo será preenchido quando o campo anterior estiver preenchido. Informar o motivo da desoneração: 1 – Táxi; 3 – Produtor Agropecuário; 4 – Frotista/Locadora; 5 – Diplomático/Consular; 6 – Utilitários e Motocicletas da Amazônia Ocidental e Áreas de Livre Comércio (Resolução 714/88 e 790/94 – CONTRAN e suas alterações); 7 – SUFRAMA; 8 - Venda a órgão Público; 9 – Outros 10- Deficiente Condutor 11- Deficiente não condutor 16 - Olimpíadas Rio 2016 90 - Solicitado pelo Fisco"
       },
       {
        "t": "el",
        "nome": "indDeduzDeson",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS40/indDeduzDeson",
        "min": 0,
        "max": 1,
        "rotulo": "Indica se o valor do ICMS desonerado (vICMSDeson) deduz do valor do item (vProd): 0=Valor do ICMS desonerado (vICMSDeson) não deduz do valor do item (vProd) / total da NF-e; 1=Valor do ICMS desonerado (vICMSDeson) deduz do valor do item (vProd) / total da NF-e."
       }
      ]
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS40/CST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "40",
    "41",
    "50"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS40/motDesICMS": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "1",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "16",
    "90"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS40/indDeduzDeson": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS51": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "orig",
      "ns": "nfe",
      "tipo": "nfe:Torig",
      "min": 1,
      "max": 1,
      "rotulo": "origem da mercadoria: 0 - Nacional 1 - Estrangeira - Importação direta 2 - Estrangeira - Adquirida no mercado interno"
     },
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS51/CST",
      "min": 1,
      "max": 1,
      "rotulo": "Tributação pelo ICMS 51 - Tributação com Diferimento"
     },
     {
      "t": "el",
      "nome": "modBC",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS51/modBC",
      "min": 0,
      "max": 1,
      "rotulo": "Modalidade de determinação da BC do ICMS: 0 - Margem Valor Agregado (%); 1 - Pauta (valor); 2 - Preço Tabelado Máximo (valor); 3 - Valor da Operação."
     },
     {
      "t": "el",
      "nome": "pRedBC",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 0,
      "max": 1,
      "rotulo": "Percentual de redução da BC"
     },
     {
      "t": "el",
      "nome": "cBenefRBC",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS51/cBenefRBC",
      "min": 0,
      "max": 1,
      "rotulo": "Código de Benefício Fiscal na UF aplicado ao item quando houver RBC."
     },
     {
      "t": "el",
      "nome": "vBC",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor da BC do ICMS"
     },
     {
      "t": "el",
      "nome": "pICMS",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 0,
      "max": 1,
      "rotulo": "Alíquota do imposto"
     },
     {
      "t": "el",
      "nome": "vICMSOp",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor do ICMS da Operação"
     },
     {
      "t": "el",
      "nome": "pDif",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04Max100",
      "min": 0,
      "max": 1,
      "rotulo": "Percentual do diferemento"
     },
     {
      "t": "el",
      "nome": "vICMSDif",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor do ICMS da diferido"
     },
     {
      "t": "el",
      "nome": "vICMS",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor do ICMS"
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vBCFCP",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor da Base de cálculo do FCP."
       },
       {
        "t": "el",
        "nome": "pFCP",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 1,
        "max": 1,
        "rotulo": "Percentual de ICMS relativo ao Fundo de Combate à Pobreza (FCP)."
       },
       {
        "t": "el",
        "nome": "vFCP",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do ICMS relativo ao Fundo de Combate à Pobreza (FCP)."
       }
      ]
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "pFCPDif",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 1,
        "max": 1,
        "rotulo": "Percentual do diferimento do ICMS relativo ao Fundo de Combate à Pobreza (FCP)."
       },
       {
        "t": "el",
        "nome": "vFCPDif",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do ICMS relativo ao Fundo de Combate à Pobreza (FCP) diferido."
       },
       {
        "t": "el",
        "nome": "vFCPEfet",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 0,
        "max": 1,
        "rotulo": "Valor efetivo do ICMS relativo ao Fundo de Combate à Pobreza (FCP)."
       }
      ]
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS51/CST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "51"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS51/modBC": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS51/cBenefRBC": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{8}|[!-ÿ]{10}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS53": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "orig",
      "ns": "nfe",
      "tipo": "nfe:Torig",
      "min": 1,
      "max": 1,
      "rotulo": "origem da mercadoria"
     },
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS53/CST",
      "min": 1,
      "max": 1,
      "rotulo": "Tributção pelo ICMS 53= Tributação monofásica sobre combustíveis com recolhimento diferido;"
     },
     {
      "t": "el",
      "nome": "qBCMono",
      "ns": "nfe",
      "tipo": "nfe:TDec_1104v",
      "min": 0,
      "max": 1,
      "rotulo": "Quantidade tributada."
     },
     {
      "t": "el",
      "nome": "adRemICMS",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 0,
      "max": 1,
      "rotulo": "Alíquota ad rem do imposto."
     },
     {
      "t": "el",
      "nome": "vICMSMonoOp",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor do ICMS da operação"
     },
     {
      "t": "el",
      "nome": "pDif",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04Max100",
      "min": 0,
      "max": 1,
      "rotulo": "Percentual do diferemento"
     },
     {
      "t": "el",
      "nome": "vICMSMonoDif",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor do ICMS diferido"
     },
     {
      "t": "el",
      "nome": "vICMSMono",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor do ICMS próprio devido"
     },
     {
      "t": "el",
      "nome": "qBCMonoDif",
      "ns": "nfe",
      "tipo": "nfe:TDec_1104v",
      "min": 0,
      "max": 1,
      "rotulo": "Quantidade tributada diferida."
     },
     {
      "t": "el",
      "nome": "adRemICMSDif",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 0,
      "max": 1,
      "rotulo": "Alíquota ad rem do imposto diferido"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS53/CST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "53"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS60": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "orig",
      "ns": "nfe",
      "tipo": "nfe:Torig",
      "min": 1,
      "max": 1,
      "rotulo": "origem da mercadoria: 0 - Nacional 1 - Estrangeira - Importação direta 2 - Estrangeira - Adquirida no mercado interno"
     },
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS60/CST",
      "min": 1,
      "max": 1,
      "rotulo": "Tributação pelo ICMS 60 - ICMS cobrado anteriormente por substituição tributária"
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vBCSTRet",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor da BC do ICMS ST retido anteriormente"
       },
       {
        "t": "el",
        "nome": "pST",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 1,
        "max": 1,
        "rotulo": "Aliquota suportada pelo consumidor final."
       },
       {
        "t": "el",
        "nome": "vICMSSubstituto",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 0,
        "max": 1,
        "rotulo": "Valor do ICMS Próprio do Substituto cobrado em operação anterior"
       },
       {
        "t": "el",
        "nome": "vICMSSTRet",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do ICMS ST retido anteriormente"
       }
      ]
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vBCFCPSTRet",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor da Base de cálculo do FCP retido anteriormente por ST."
       },
       {
        "t": "el",
        "nome": "pFCPSTRet",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 1,
        "max": 1,
        "rotulo": "Percentual de FCP retido anteriormente por substituição tributária."
       },
       {
        "t": "el",
        "nome": "vFCPSTRet",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do FCP retido por substituição tributária."
       }
      ]
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "pRedBCEfet",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 1,
        "max": 1,
        "rotulo": "Percentual de redução da base de cálculo efetiva."
       },
       {
        "t": "el",
        "nome": "vBCEfet",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor da base de cálculo efetiva."
       },
       {
        "t": "el",
        "nome": "pICMSEfet",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 1,
        "max": 1,
        "rotulo": "Alíquota do ICMS efetiva."
       },
       {
        "t": "el",
        "nome": "vICMSEfet",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do ICMS efetivo."
       }
      ]
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS60/CST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "60"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS61": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "orig",
      "ns": "nfe",
      "tipo": "nfe:Torig",
      "min": 1,
      "max": 1,
      "rotulo": "origem da mercadoria"
     },
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS61/CST",
      "min": 1,
      "max": 1,
      "rotulo": "Tributção pelo ICMS 61= Tributação monofásica sobre combustíveis cobrada anteriormente"
     },
     {
      "t": "el",
      "nome": "qBCMonoRet",
      "ns": "nfe",
      "tipo": "nfe:TDec_1104v",
      "min": 0,
      "max": 1,
      "rotulo": "Quantidade tributada retida anteriormente"
     },
     {
      "t": "el",
      "nome": "adRemICMSRet",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota ad rem do imposto retido anteriormente"
     },
     {
      "t": "el",
      "nome": "vICMSMonoRet",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do ICMS retido anteriormente"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS61/CST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "61"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS70": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "orig",
      "ns": "nfe",
      "tipo": "nfe:Torig",
      "min": 1,
      "max": 1,
      "rotulo": "origem da mercadoria: 0 - Nacional 1 - Estrangeira - Importação direta 2 - Estrangeira - Adquirida no mercado interno"
     },
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS70/CST",
      "min": 1,
      "max": 1,
      "rotulo": "Tributção pelo ICMS 70 - Com redução de base de cálculo e cobrança do ICMS por substituição tributária"
     },
     {
      "t": "el",
      "nome": "modBC",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS70/modBC",
      "min": 1,
      "max": 1,
      "rotulo": "Modalidade de determinação da BC do ICMS: 0 - Margem Valor Agregado (%); 1 - Pauta (valor); 2 - Preço Tabelado Máximo (valor); 3 - Valor da Operação."
     },
     {
      "t": "el",
      "nome": "pRedBC",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Percentual de redução da BC"
     },
     {
      "t": "el",
      "nome": "vBC",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da BC do ICMS"
     },
     {
      "t": "el",
      "nome": "pICMS",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota do ICMS"
     },
     {
      "t": "el",
      "nome": "vICMS",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do ICMS"
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vBCFCP",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor da Base de cálculo do FCP."
       },
       {
        "t": "el",
        "nome": "pFCP",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 1,
        "max": 1,
        "rotulo": "Percentual de ICMS relativo ao Fundo de Combate à Pobreza (FCP)."
       },
       {
        "t": "el",
        "nome": "vFCP",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do ICMS relativo ao Fundo de Combate à Pobreza (FCP)."
       }
      ]
     },
     {
      "t": "el",
      "nome": "modBCST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS70/modBCST",
      "min": 1,
      "max": 1,
      "rotulo": "Modalidade de determinação da BC do ICMS ST: 0 – Preço tabelado ou máximo sugerido; 1 - Lista Negativa (valor); 2 - Lista Positiva (valor); 3 - Lista Neutra (valor); 4 - Margem Valor Agregado (%); 5 - Pauta (valor); 6 - Valor da Operação."
     },
     {
      "t": "el",
      "nome": "pMVAST",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Percentual da Margem de Valor Adicionado ICMS ST"
     },
     {
      "t": "el",
      "nome": "pRedBCST",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Percentual de redução da BC ICMS ST"
     },
     {
      "t": "el",
      "nome": "vBCST",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da BC do ICMS ST"
     },
     {
      "t": "el",
      "nome": "pICMSST",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota do ICMS ST"
     },
     {
      "t": "el",
      "nome": "vICMSST",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do ICMS ST"
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vBCFCPST",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor da Base de cálculo do FCP retido por substituição tributária."
       },
       {
        "t": "el",
        "nome": "pFCPST",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 1,
        "max": 1,
        "rotulo": "Percentual de FCP retido por substituição tributária."
       },
       {
        "t": "el",
        "nome": "vFCPST",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do FCP retido por substituição tributária."
       }
      ]
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vICMSDeson",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do ICMS de desoneração"
       },
       {
        "t": "el",
        "nome": "motDesICMS",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS70/motDesICMS",
        "min": 1,
        "max": 1,
        "rotulo": "Motivo da desoneração do ICMS:3-Uso na agropecuária;9-Outros;12-Fomento agropecuário"
       },
       {
        "t": "el",
        "nome": "indDeduzDeson",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS70/indDeduzDeson",
        "min": 0,
        "max": 1,
        "rotulo": "Indica se o valor do ICMS desonerado (vICMSDeson) deduz do valor do item (vProd): 0=Valor do ICMS desonerado (vICMSDeson) não deduz do valor do item (vProd) / total da NF-e; 1=Valor do ICMS desonerado (vICMSDeson) deduz do valor do item (vProd) / total da NF-e."
       }
      ]
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vICMSSTDeson",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do ICMS-ST desonerado."
       },
       {
        "t": "el",
        "nome": "motDesICMSST",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS70/motDesICMSST",
        "min": 1,
        "max": 1,
        "rotulo": "Motivo da desoneração do ICMS-ST: 3-Uso na agropecuária; 9-Outros; 12-Fomento agropecuário."
       }
      ]
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS70/CST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "70"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS70/modBC": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS70/modBCST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS70/motDesICMS": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "3",
    "9",
    "12"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS70/indDeduzDeson": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS70/motDesICMSST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "3",
    "9",
    "12"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS90": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "orig",
      "ns": "nfe",
      "tipo": "nfe:Torig",
      "min": 1,
      "max": 1,
      "rotulo": "origem da mercadoria: 0 - Nacional 1 - Estrangeira - Importação direta 2 - Estrangeira - Adquirida no mercado interno"
     },
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS90/CST",
      "min": 1,
      "max": 1,
      "rotulo": "Tributção pelo ICMS 90 - Outras"
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "modBC",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS90/modBC",
        "min": 1,
        "max": 1,
        "rotulo": "Modalidade de determinação da BC do ICMS: 0 - Margem Valor Agregado (%); 1 - Pauta (valor); 2 - Preço Tabelado Máximo (valor); 3 - Valor da Operação."
       },
       {
        "t": "el",
        "nome": "vBC",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor da BC do ICMS"
       },
       {
        "t": "el",
        "nome": "pRedBC",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 0,
        "max": 1,
        "rotulo": "Percentual de redução da BC"
       },
       {
        "t": "el",
        "nome": "cBenefRBC",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS90/cBenefRBC",
        "min": 0,
        "max": 1,
        "rotulo": "Código de Benefício Fiscal na UF aplicado ao item quando houver RBC."
       },
       {
        "t": "el",
        "nome": "pICMS",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04",
        "min": 1,
        "max": 1,
        "rotulo": "Alíquota do ICMS"
       },
       {
        "t": "seq",
        "min": 0,
        "max": 1,
        "itens": [
         {
          "t": "el",
          "nome": "vICMSOp",
          "ns": "nfe",
          "tipo": "nfe:TDec_1302",
          "min": 1,
          "max": 1,
          "rotulo": "Valor do ICMS da Operação"
         },
         {
          "t": "el",
          "nome": "pDif",
          "ns": "nfe",
          "tipo": "nfe:TDec_0302a04Max100",
          "min": 1,
          "max": 1,
          "rotulo": "Percentual do diferemento"
         },
         {
          "t": "el",
          "nome": "vICMSDif",
          "ns": "nfe",
          "tipo": "nfe:TDec_1302",
          "min": 1,
          "max": 1,
          "rotulo": "Valor do ICMS da diferido"
         }
        ]
       },
       {
        "t": "el",
        "nome": "vICMS",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do ICMS"
       },
       {
        "t": "seq",
        "min": 0,
        "max": 1,
        "itens": [
         {
          "t": "el",
          "nome": "vBCFCP",
          "ns": "nfe",
          "tipo": "nfe:TDec_1302",
          "min": 1,
          "max": 1,
          "rotulo": "Valor da Base de cálculo do FCP."
         },
         {
          "t": "el",
          "nome": "pFCP",
          "ns": "nfe",
          "tipo": "nfe:TDec_0302a04Opc",
          "min": 1,
          "max": 1,
          "rotulo": "Percentual de ICMS relativo ao Fundo de Combate à Pobreza (FCP)."
         },
         {
          "t": "el",
          "nome": "vFCP",
          "ns": "nfe",
          "tipo": "nfe:TDec_1302",
          "min": 1,
          "max": 1,
          "rotulo": "Valor do ICMS relativo ao Fundo de Combate à Pobreza (FCP)."
         }
        ]
       },
       {
        "t": "seq",
        "min": 0,
        "max": 1,
        "itens": [
         {
          "t": "el",
          "nome": "pFCPDif",
          "ns": "nfe",
          "tipo": "nfe:TDec_0302a04Opc",
          "min": 1,
          "max": 1,
          "rotulo": "Percentual do diferimento do ICMS relativo ao Fundo de Combate à Pobreza (FCP)."
         },
         {
          "t": "el",
          "nome": "vFCPDif",
          "ns": "nfe",
          "tipo": "nfe:TDec_1302",
          "min": 1,
          "max": 1,
          "rotulo": "Valor do ICMS relativo ao Fundo de Combate à Pobreza (FCP) diferido."
         },
         {
          "t": "el",
          "nome": "vFCPEfet",
          "ns": "nfe",
          "tipo": "nfe:TDec_1302",
          "min": 0,
          "max": 1,
          "rotulo": "Valor efetivo do ICMS relativo ao Fundo de Combate à Pobreza (FCP)."
         }
        ]
       }
      ]
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "modBCST",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS90/modBCST",
        "min": 1,
        "max": 1,
        "rotulo": "Modalidade de determinação da BC do ICMS ST: 0 – Preço tabelado ou máximo sugerido; 1 - Lista Negativa (valor); 2 - Lista Positiva (valor); 3 - Lista Neutra (valor); 4 - Margem Valor Agregado (%); 5 - Pauta (valor); 6 - Valor da Operação."
       },
       {
        "t": "el",
        "nome": "pMVAST",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 0,
        "max": 1,
        "rotulo": "Percentual da Margem de Valor Adicionado ICMS ST"
       },
       {
        "t": "el",
        "nome": "pRedBCST",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 0,
        "max": 1,
        "rotulo": "Percentual de redução da BC ICMS ST"
       },
       {
        "t": "el",
        "nome": "vBCST",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor da BC do ICMS ST"
       },
       {
        "t": "el",
        "nome": "pICMSST",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04",
        "min": 1,
        "max": 1,
        "rotulo": "Alíquota do ICMS ST"
       },
       {
        "t": "el",
        "nome": "vICMSST",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do ICMS ST"
       },
       {
        "t": "seq",
        "min": 0,
        "max": 1,
        "itens": [
         {
          "t": "el",
          "nome": "vBCFCPST",
          "ns": "nfe",
          "tipo": "nfe:TDec_1302",
          "min": 1,
          "max": 1,
          "rotulo": "Valor da Base de cálculo do FCP."
         },
         {
          "t": "el",
          "nome": "pFCPST",
          "ns": "nfe",
          "tipo": "nfe:TDec_0302a04Opc",
          "min": 1,
          "max": 1,
          "rotulo": "Percentual de FCP retido por substituição tributária."
         },
         {
          "t": "el",
          "nome": "vFCPST",
          "ns": "nfe",
          "tipo": "nfe:TDec_1302",
          "min": 1,
          "max": 1,
          "rotulo": "Valor do FCP retido por substituição tributária."
         }
        ]
       }
      ]
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vICMSDeson",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do ICMS de desoneração"
       },
       {
        "t": "el",
        "nome": "motDesICMS",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS90/motDesICMS",
        "min": 1,
        "max": 1,
        "rotulo": "Motivo da desoneração do ICMS:3-Uso na agropecuária;9-Outros;12-Fomento agropecuário"
       },
       {
        "t": "el",
        "nome": "indDeduzDeson",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS90/indDeduzDeson",
        "min": 0,
        "max": 1,
        "rotulo": "Indica se o valor do ICMS desonerado (vICMSDeson) deduz do valor do item (vProd): 0=Valor do ICMS desonerado (vICMSDeson) não deduz do valor do item (vProd) / total da NF-e; 1=Valor do ICMS desonerado (vICMSDeson) deduz do valor do item (vProd) / total da NF-e."
       }
      ]
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vICMSSTDeson",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do ICMS-ST desonerado."
       },
       {
        "t": "el",
        "nome": "motDesICMSST",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS90/motDesICMSST",
        "min": 1,
        "max": 1,
        "rotulo": "Motivo da desoneração do ICMS-ST: 3-Uso na agropecuária; 9-Outros; 12-Fomento agropecuário."
       }
      ]
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS90/CST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "90"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS90/modBC": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS90/cBenefRBC": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{8}|[!-ÿ]{10}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS90/modBCST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS90/motDesICMS": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "3",
    "9",
    "12"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS90/indDeduzDeson": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMS90/motDesICMSST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "3",
    "9",
    "12"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSPart": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "orig",
      "ns": "nfe",
      "tipo": "nfe:Torig",
      "min": 1,
      "max": 1,
      "rotulo": "origem da mercadoria: 0 - Nacional 1 - Estrangeira - Importação direta 2 - Estrangeira - Adquirida no mercado interno"
     },
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSPart/CST",
      "min": 1,
      "max": 1,
      "rotulo": "Tributação pelo ICMS 10 - Tributada e com cobrança do ICMS por substituição tributária; 20 – Redução de base de cálculo 90 – Outros."
     },
     {
      "t": "el",
      "nome": "modBC",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSPart/modBC",
      "min": 1,
      "max": 1,
      "rotulo": "Modalidade de determinação da BC do ICMS: 0 - Margem Valor Agregado (%); 1 - Pauta (valor); 2 - Preço Tabelado Máximo (valor); 3 - Valor da Operação."
     },
     {
      "t": "el",
      "nome": "vBC",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da BC do ICMS"
     },
     {
      "t": "el",
      "nome": "pRedBC",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Percentual de redução da BC"
     },
     {
      "t": "el",
      "nome": "pICMS",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota do ICMS"
     },
     {
      "t": "el",
      "nome": "vICMS",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do ICMS"
     },
     {
      "t": "el",
      "nome": "modBCST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSPart/modBCST",
      "min": 1,
      "max": 1,
      "rotulo": "Modalidade de determinação da BC do ICMS ST: 0 – Preço tabelado ou máximo sugerido; 1 - Lista Negativa (valor); 2 - Lista Positiva (valor); 3 - Lista Neutra (valor); 4 - Margem Valor Agregado (%); 5 - Pauta (valor). 6 - Valor da Operação"
     },
     {
      "t": "el",
      "nome": "pMVAST",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Percentual da Margem de Valor Adicionado ICMS ST"
     },
     {
      "t": "el",
      "nome": "pRedBCST",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Percentual de redução da BC ICMS ST"
     },
     {
      "t": "el",
      "nome": "vBCST",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da BC do ICMS ST"
     },
     {
      "t": "el",
      "nome": "pICMSST",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota do ICMS ST"
     },
     {
      "t": "el",
      "nome": "vICMSST",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do ICMS ST"
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vBCFCPST",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor da Base de cálculo do FCP retido por substituicao tributaria."
       },
       {
        "t": "el",
        "nome": "pFCPST",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 1,
        "max": 1,
        "rotulo": "Percentual de FCP retido por substituição tributária."
       },
       {
        "t": "el",
        "nome": "vFCPST",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do FCP retido por substituição tributária."
       }
      ]
     },
     {
      "t": "el",
      "nome": "pBCOp",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04Opc",
      "min": 1,
      "max": 1,
      "rotulo": "Percentual para determinação do valor da Base de Cálculo da operação própria."
     },
     {
      "t": "el",
      "nome": "UFST",
      "ns": "nfe",
      "tipo": "nfe:TUf",
      "min": 1,
      "max": 1,
      "rotulo": "Sigla da UF para qual é devido o ICMS ST da operação."
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vICMSDeson",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do ICMS de desoneração"
       },
       {
        "t": "el",
        "nome": "motDesICMS",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSPart/motDesICMS",
        "min": 1,
        "max": 1,
        "rotulo": "Motivo da desoneração do ICMS:9-Outros;10=Deficiente Condutor (Convênio ICMS 38/12) 11=Deficiente Não Condutor (Convênio ICMS 38/12)"
       },
       {
        "t": "el",
        "nome": "indDeduzDeson",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSPart/indDeduzDeson",
        "min": 0,
        "max": 1,
        "rotulo": "Indica se o valor do ICMS desonerado (vICMSDeson) deduz do valor do item (vProd): 0=Valor do ICMS desonerado (vICMSDeson) não deduz do valor do item (vProd) / total da NF-e; 1=Valor do ICMS desonerado (vICMSDeson) deduz do valor do item (vProd) / total da NF-e."
       }
      ]
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSPart/CST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "10",
    "20",
    "90"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSPart/modBC": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSPart/modBCST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSPart/motDesICMS": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "9",
    "10",
    "11"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSPart/indDeduzDeson": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSST": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "orig",
      "ns": "nfe",
      "tipo": "nfe:Torig",
      "min": 1,
      "max": 1,
      "rotulo": "origem da mercadoria: 0 - Nacional 1 - Estrangeira - Importação direta 2 - Estrangeira - Adquirida no mercado interno"
     },
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSST/CST",
      "min": 1,
      "max": 1,
      "rotulo": "Tributção pelo ICMS 41-Não Tributado. 60-Cobrado anteriormente por substituição tributária."
     },
     {
      "t": "el",
      "nome": "vBCSTRet",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Informar o valor da BC do ICMS ST retido na UF remetente"
     },
     {
      "t": "el",
      "nome": "pST",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Aliquota suportada pelo consumidor final."
     },
     {
      "t": "el",
      "nome": "vICMSSubstituto",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor do ICMS Próprio do Substituto cobrado em operação anterior"
     },
     {
      "t": "el",
      "nome": "vICMSSTRet",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Informar o valor do ICMS ST retido na UF remetente (iv2.0))"
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vBCFCPSTRet",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Informar o valor da Base de Cálculo do FCP retido anteriormente por ST."
       },
       {
        "t": "el",
        "nome": "pFCPSTRet",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 1,
        "max": 1,
        "rotulo": "Percentual relativo ao Fundo de Combate à Pobreza (FCP) retido por substituição tributária."
       },
       {
        "t": "el",
        "nome": "vFCPSTRet",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do ICMS relativo ao Fundo de Combate à Pobreza (FCP) retido por substituição tributária."
       }
      ]
     },
     {
      "t": "el",
      "nome": "vBCSTDest",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Informar o valor da BC do ICMS ST da UF destino"
     },
     {
      "t": "el",
      "nome": "vICMSSTDest",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Informar o valor da BC do ICMS ST da UF destino (v2.0)"
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "pRedBCEfet",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 1,
        "max": 1,
        "rotulo": "Percentual de redução da base de cálculo efetiva."
       },
       {
        "t": "el",
        "nome": "vBCEfet",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor da base de cálculo efetiva."
       },
       {
        "t": "el",
        "nome": "pICMSEfet",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 1,
        "max": 1,
        "rotulo": "Alíquota do ICMS efetivo."
       },
       {
        "t": "el",
        "nome": "vICMSEfet",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do ICMS efetivo."
       }
      ]
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSST/CST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "41",
    "60"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN101": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "orig",
      "ns": "nfe",
      "tipo": "nfe:Torig",
      "min": 1,
      "max": 1,
      "rotulo": "origem da mercadoria: 0 - Nacional 1 - Estrangeira - Importação direta 2 - Estrangeira - Adquirida no mercado interno (v2.0)"
     },
     {
      "t": "el",
      "nome": "CSOSN",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN101/CSOSN",
      "min": 1,
      "max": 1,
      "rotulo": "101- Tributada pelo Simples Nacional com permissão de crédito. (v.2.0)"
     },
     {
      "t": "el",
      "nome": "pCredSN",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota aplicável de cálculo do crédito (Simples Nacional). (v2.0)"
     },
     {
      "t": "el",
      "nome": "vCredICMSSN",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor crédito do ICMS que pode ser aproveitado nos termos do art. 23 da LC 123 (Simples Nacional) (v2.0)"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN101/CSOSN": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "101"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN102": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "orig",
      "ns": "nfe",
      "tipo": "nfe:Torig",
      "min": 0,
      "max": 1,
      "rotulo": "origem da mercadoria: 0 - Nacional 1 - Estrangeira - Importação direta 2 - Estrangeira - Adquirida no mercado interno (v2.0)"
     },
     {
      "t": "el",
      "nome": "CSOSN",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN102/CSOSN",
      "min": 1,
      "max": 1,
      "rotulo": "102- Tributada pelo Simples Nacional sem permissão de crédito. 103 – Isenção do ICMS no Simples Nacional para faixa de receita bruta. 300 – Imune. 400 – Não tributda pelo Simples Nacional (v.2.0) (v.2.0)"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN102/CSOSN": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "102",
    "103",
    "300",
    "400"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN201": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "orig",
      "ns": "nfe",
      "tipo": "nfe:Torig",
      "min": 1,
      "max": 1,
      "rotulo": "Origem da mercadoria: 0 – Nacional; 1 – Estrangeira – Importação direta; 2 – Estrangeira – Adquirida no mercado interno. (v2.0)"
     },
     {
      "t": "el",
      "nome": "CSOSN",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN201/CSOSN",
      "min": 1,
      "max": 1,
      "rotulo": "201- Tributada pelo Simples Nacional com permissão de crédito e com cobrança do ICMS por Substituição Tributária (v.2.0)"
     },
     {
      "t": "el",
      "nome": "modBCST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN201/modBCST",
      "min": 1,
      "max": 1,
      "rotulo": "Modalidade de determinação da BC do ICMS ST: 0 – Preço tabelado ou máximo sugerido; 1 - Lista Negativa (valor); 2 - Lista Positiva (valor); 3 - Lista Neutra (valor); 4 - Margem Valor Agregado (%); 5 - Pauta (valor). (v2.0) 6 - Valor da Operação"
     },
     {
      "t": "el",
      "nome": "pMVAST",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Percentual da Margem de Valor Adicionado ICMS ST (v2.0)"
     },
     {
      "t": "el",
      "nome": "pRedBCST",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Percentual de redução da BC ICMS ST (v2.0)"
     },
     {
      "t": "el",
      "nome": "vBCST",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da BC do ICMS ST (v2.0)"
     },
     {
      "t": "el",
      "nome": "pICMSST",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota do ICMS ST (v2.0)"
     },
     {
      "t": "el",
      "nome": "vICMSST",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do ICMS ST (v2.0)"
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vBCFCPST",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor da Base de cálculo do FCP."
       },
       {
        "t": "el",
        "nome": "pFCPST",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 1,
        "max": 1,
        "rotulo": "Percentual de FCP retido por substituição tributária."
       },
       {
        "t": "el",
        "nome": "vFCPST",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do FCP retido por substituição tributária."
       }
      ]
     },
     {
      "t": "el",
      "nome": "pCredSN",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota aplicável de cálculo do crédito (Simples Nacional). (v2.0)"
     },
     {
      "t": "el",
      "nome": "vCredICMSSN",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor crédito do ICMS que pode ser aproveitado nos termos do art. 23 da LC 123 (Simples Nacional) (v2.0)"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN201/CSOSN": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "201"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN201/modBCST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN202": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "orig",
      "ns": "nfe",
      "tipo": "nfe:Torig",
      "min": 1,
      "max": 1,
      "rotulo": "Origem da mercadoria: 0 – Nacional; 1 – Estrangeira – Importação direta; 2 – Estrangeira – Adquirida no mercado interno. (v2.0)"
     },
     {
      "t": "el",
      "nome": "CSOSN",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN202/CSOSN",
      "min": 1,
      "max": 1,
      "rotulo": "202- Tributada pelo Simples Nacional sem permissão de crédito e com cobrança do ICMS por Substituição Tributária; 203- Isenção do ICMS nos Simples Nacional para faixa de receita bruta e com cobrança do ICMS por Substituição Tributária (v.2.0)"
     },
     {
      "t": "el",
      "nome": "modBCST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN202/modBCST",
      "min": 1,
      "max": 1,
      "rotulo": "Modalidade de determinação da BC do ICMS ST: 0 – Preço tabelado ou máximo sugerido; 1 - Lista Negativa (valor); 2 - Lista Positiva (valor); 3 - Lista Neutra (valor); 4 - Margem Valor Agregado (%); 5 - Pauta (valor). (v2.0) 6 - Valor da Operação"
     },
     {
      "t": "el",
      "nome": "pMVAST",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Percentual da Margem de Valor Adicionado ICMS ST (v2.0)"
     },
     {
      "t": "el",
      "nome": "pRedBCST",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Percentual de redução da BC ICMS ST (v2.0)"
     },
     {
      "t": "el",
      "nome": "vBCST",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da BC do ICMS ST (v2.0)"
     },
     {
      "t": "el",
      "nome": "pICMSST",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota do ICMS ST (v2.0)"
     },
     {
      "t": "el",
      "nome": "vICMSST",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do ICMS ST (v2.0)"
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vBCFCPST",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor da Base de cálculo do FCP."
       },
       {
        "t": "el",
        "nome": "pFCPST",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 1,
        "max": 1,
        "rotulo": "Percentual de FCP retido por substituição tributária."
       },
       {
        "t": "el",
        "nome": "vFCPST",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do FCP retido por substituição tributária."
       }
      ]
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN202/CSOSN": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "202",
    "203"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN202/modBCST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN500": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "orig",
      "ns": "nfe",
      "tipo": "nfe:Torig",
      "min": 1,
      "max": 1,
      "rotulo": "origem da mercadoria: 0 - Nacional 1 - Estrangeira - Importação direta 2 - Estrangeira - Adquirida no mercado interno"
     },
     {
      "t": "el",
      "nome": "CSOSN",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN500/CSOSN",
      "min": 1,
      "max": 1,
      "rotulo": "500 – ICMS cobrado anterirmente por substituição tributária (substituído) ou por antecipação (v.2.0)"
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vBCSTRet",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor da BC do ICMS ST retido anteriormente (v2.0)"
       },
       {
        "t": "el",
        "nome": "pST",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 1,
        "max": 1,
        "rotulo": "Aliquota suportada pelo consumidor final."
       },
       {
        "t": "el",
        "nome": "vICMSSubstituto",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 0,
        "max": 1,
        "rotulo": "Valor do ICMS próprio do substituto"
       },
       {
        "t": "el",
        "nome": "vICMSSTRet",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do ICMS ST retido anteriormente (v2.0)"
       }
      ]
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vBCFCPSTRet",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor da Base de cálculo do FCP retido anteriormente."
       },
       {
        "t": "el",
        "nome": "pFCPSTRet",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 1,
        "max": 1,
        "rotulo": "Percentual de FCP retido anteriormente por substituição tributária."
       },
       {
        "t": "el",
        "nome": "vFCPSTRet",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do FCP retido por substituição tributária."
       }
      ]
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "pRedBCEfet",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 1,
        "max": 1,
        "rotulo": "Percentual de redução da base de cálculo efetiva."
       },
       {
        "t": "el",
        "nome": "vBCEfet",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor da base de cálculo efetiva."
       },
       {
        "t": "el",
        "nome": "pICMSEfet",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 1,
        "max": 1,
        "rotulo": "Alíquota do ICMS efetiva."
       },
       {
        "t": "el",
        "nome": "vICMSEfet",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do ICMS efetivo."
       }
      ]
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN500/CSOSN": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "500"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN900": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "orig",
      "ns": "nfe",
      "tipo": "nfe:Torig",
      "min": 0,
      "max": 1,
      "rotulo": "origem da mercadoria: 0 - Nacional 1 - Estrangeira - Importação direta 2 - Estrangeira - Adquirida no mercado interno"
     },
     {
      "t": "el",
      "nome": "CSOSN",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN900/CSOSN",
      "min": 1,
      "max": 1,
      "rotulo": "Tributação pelo ICMS 900 - Outros(v2.0)"
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "modBC",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN900/modBC",
        "min": 1,
        "max": 1,
        "rotulo": "Modalidade de determinação da BC do ICMS: 0 - Margem Valor Agregado (%); 1 - Pauta (valor); 2 - Preço Tabelado Máximo (valor); 3 - Valor da Operação."
       },
       {
        "t": "el",
        "nome": "vBC",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor da BC do ICMS"
       },
       {
        "t": "el",
        "nome": "pRedBC",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 0,
        "max": 1,
        "rotulo": "Percentual de redução da BC"
       },
       {
        "t": "el",
        "nome": "pICMS",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04",
        "min": 1,
        "max": 1,
        "rotulo": "Alíquota do ICMS"
       },
       {
        "t": "el",
        "nome": "vICMS",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do ICMS"
       }
      ]
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "modBCST",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN900/modBCST",
        "min": 1,
        "max": 1,
        "rotulo": "Modalidade de determinação da BC do ICMS ST: 0 – Preço tabelado ou máximo sugerido; 1 - Lista Negativa (valor); 2 - Lista Positiva (valor); 3 - Lista Neutra (valor); 4 - Margem Valor Agregado (%); 5 - Pauta (valor). 6 - Valor da Operação"
       },
       {
        "t": "el",
        "nome": "pMVAST",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 0,
        "max": 1,
        "rotulo": "Percentual da Margem de Valor Adicionado ICMS ST"
       },
       {
        "t": "el",
        "nome": "pRedBCST",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04Opc",
        "min": 0,
        "max": 1,
        "rotulo": "Percentual de redução da BC ICMS ST"
       },
       {
        "t": "el",
        "nome": "vBCST",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor da BC do ICMS ST"
       },
       {
        "t": "el",
        "nome": "pICMSST",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04",
        "min": 1,
        "max": 1,
        "rotulo": "Alíquota do ICMS ST"
       },
       {
        "t": "el",
        "nome": "vICMSST",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do ICMS ST"
       },
       {
        "t": "seq",
        "min": 0,
        "max": 1,
        "itens": [
         {
          "t": "el",
          "nome": "vBCFCPST",
          "ns": "nfe",
          "tipo": "nfe:TDec_1302",
          "min": 1,
          "max": 1,
          "rotulo": "Valor da Base de cálculo do FCP."
         },
         {
          "t": "el",
          "nome": "pFCPST",
          "ns": "nfe",
          "tipo": "nfe:TDec_0302a04Opc",
          "min": 1,
          "max": 1,
          "rotulo": "Percentual de FCP retido por substituição tributária."
         },
         {
          "t": "el",
          "nome": "vFCPST",
          "ns": "nfe",
          "tipo": "nfe:TDec_1302",
          "min": 1,
          "max": 1,
          "rotulo": "Valor do FCP retido por substituição tributária."
         }
        ]
       }
      ]
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "pCredSN",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302a04",
        "min": 1,
        "max": 1,
        "rotulo": "Alíquota aplicável de cálculo do crédito (Simples Nacional). (v2.0)"
       },
       {
        "t": "el",
        "nome": "vCredICMSSN",
        "ns": "nfe",
        "tipo": "nfe:TDec_1302",
        "min": 1,
        "max": 1,
        "rotulo": "Valor crédito do ICMS que pode ser aproveitado nos termos do art. 23 da LC 123 (Simples Nacional) (v2.0)"
       }
      ]
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN900/CSOSN": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "900"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN900/modBC": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMS/ICMSSN900/modBCST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6"
   ]
  },
  "nfe:TIpi": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "CNPJProd",
      "ns": "nfe",
      "tipo": "nfe:TCnpj",
      "min": 0,
      "max": 1,
      "rotulo": "CNPJ do produtor da mercadoria, quando diferente do emitente. Somente para os casos de exportação direta ou indireta."
     },
     {
      "t": "el",
      "nome": "cSelo",
      "ns": "nfe",
      "tipo": "nfe:TIpi/cSelo",
      "min": 0,
      "max": 1,
      "rotulo": "Código do selo de controle do IPI"
     },
     {
      "t": "el",
      "nome": "qSelo",
      "ns": "nfe",
      "tipo": "nfe:TIpi/qSelo",
      "min": 0,
      "max": 1,
      "rotulo": "Quantidade de selo de controle do IPI"
     },
     {
      "t": "el",
      "nome": "cEnq",
      "ns": "nfe",
      "tipo": "nfe:TIpi/cEnq",
      "min": 1,
      "max": 1,
      "rotulo": "Código de Enquadramento Legal do IPI (tabela a ser criada pela RFB)"
     },
     {
      "t": "esc",
      "min": 1,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "IPITrib",
        "ns": "nfe",
        "tipo": "nfe:TIpi/IPITrib",
        "min": 1,
        "max": 1
       },
       {
        "t": "el",
        "nome": "IPINT",
        "ns": "nfe",
        "tipo": "nfe:TIpi/IPINT",
        "min": 1,
        "max": 1
       }
      ]
     }
    ]
   },
   "atributos": []
  },
  "nfe:TIpi/cSelo": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TIpi/qSelo": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{1,12}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TIpi/cEnq": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 3
  },
  "nfe:TIpi/IPITrib": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TIpi/IPITrib/CST",
      "min": 1,
      "max": 1,
      "rotulo": "Código da Situação Tributária do IPI: 00-Entrada com recuperação de crédito 49 - Outras entradas 50-Saída tributada 99-Outras saídas"
     },
     {
      "t": "esc",
      "min": 1,
      "max": 1,
      "itens": [
       {
        "t": "seq",
        "min": 1,
        "max": 1,
        "itens": [
         {
          "t": "el",
          "nome": "vBC",
          "ns": "nfe",
          "tipo": "nfe:TDec_1302",
          "min": 1,
          "max": 1,
          "rotulo": "Valor da BC do IPI"
         },
         {
          "t": "el",
          "nome": "pIPI",
          "ns": "nfe",
          "tipo": "nfe:TDec_0302a04",
          "min": 1,
          "max": 1,
          "rotulo": "Alíquota do IPI"
         }
        ]
       },
       {
        "t": "seq",
        "min": 1,
        "max": 1,
        "itens": [
         {
          "t": "el",
          "nome": "qUnid",
          "ns": "nfe",
          "tipo": "nfe:TDec_1204v",
          "min": 1,
          "max": 1,
          "rotulo": "Quantidade total na unidade padrão para tributação"
         },
         {
          "t": "el",
          "nome": "vUnid",
          "ns": "nfe",
          "tipo": "nfe:TDec_1104",
          "min": 1,
          "max": 1,
          "rotulo": "Valor por Unidade Tributável. Informar o valor do imposto Pauta por unidade de medida."
         }
        ]
       }
      ]
     },
     {
      "t": "el",
      "nome": "vIPI",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do IPI"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TIpi/IPITrib/CST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "00",
    "49",
    "50",
    "99"
   ]
  },
  "nfe:TIpi/IPINT": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TIpi/IPINT/CST",
      "min": 1,
      "max": 1,
      "rotulo": "Código da Situação Tributária do IPI: 01-Entrada tributada com alíquota zero 02-Entrada isenta 03-Entrada não-tributada 04-Entrada imune 05-Entrada com suspensão 51-Saída tributada com alíquota zero 52-Saída isenta 53-Saída não-tributada 54-Saída imune 55-Saída com suspensão"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TIpi/IPINT/CST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "01",
    "02",
    "03",
    "04",
    "05",
    "51",
    "52",
    "53",
    "54",
    "55"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/II": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vBC",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Base da BC do Imposto de Importação"
     },
     {
      "t": "el",
      "nome": "vDespAdu",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor das despesas aduaneiras"
     },
     {
      "t": "el",
      "nome": "vII",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do Imposto de Importação"
     },
     {
      "t": "el",
      "nome": "vIOF",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do Imposto sobre Operações Financeiras"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/ISSQN": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vBC",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da BC do ISSQN"
     },
     {
      "t": "el",
      "nome": "vAliq",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota do ISSQN"
     },
     {
      "t": "el",
      "nome": "vISSQN",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da do ISSQN"
     },
     {
      "t": "el",
      "nome": "cMunFG",
      "ns": "nfe",
      "tipo": "nfe:TCodMunIBGE",
      "min": 1,
      "max": 1,
      "rotulo": "Informar o município de ocorrência do fato gerador do ISSQN. Utilizar a Tabela do IBGE (Anexo VII - Tabela de UF, Município e País). “Atenção, não vincular com os campos B12, C10 ou E10” v2.0"
     },
     {
      "t": "el",
      "nome": "cListServ",
      "ns": "nfe",
      "tipo": "nfe:TCListServ",
      "min": 1,
      "max": 1,
      "rotulo": "Informar o Item da lista de serviços da LC 116/03 em que se classifica o serviço."
     },
     {
      "t": "el",
      "nome": "vDeducao",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Valor dedução para redução da base de cálculo"
     },
     {
      "t": "el",
      "nome": "vOutro",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Valor outras retenções"
     },
     {
      "t": "el",
      "nome": "vDescIncond",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Valor desconto incondicionado"
     },
     {
      "t": "el",
      "nome": "vDescCond",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Valor desconto condicionado"
     },
     {
      "t": "el",
      "nome": "vISSRet",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Valor Retenção ISS"
     },
     {
      "t": "el",
      "nome": "indISS",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ISSQN/indISS",
      "min": 1,
      "max": 1,
      "rotulo": "Exibilidade do ISS:1-Exigível;2-Não incidente;3-Isenção;4-Exportação;5-Imunidade;6-Exig.Susp. Judicial;7-Exig.Susp. ADM"
     },
     {
      "t": "el",
      "nome": "cServico",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ISSQN/cServico",
      "min": 0,
      "max": 1,
      "rotulo": "Código do serviço prestado dentro do município"
     },
     {
      "t": "el",
      "nome": "cMun",
      "ns": "nfe",
      "tipo": "nfe:TCodMunIBGE",
      "min": 0,
      "max": 1,
      "rotulo": "Código do Município de Incidência do Imposto"
     },
     {
      "t": "el",
      "nome": "cPais",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ISSQN/cPais",
      "min": 0,
      "max": 1,
      "rotulo": "Código de Pais"
     },
     {
      "t": "el",
      "nome": "nProcesso",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ISSQN/nProcesso",
      "min": 0,
      "max": 1,
      "rotulo": "Número do Processo administrativo ou judicial de suspenção do processo"
     },
     {
      "t": "el",
      "nome": "indIncentivo",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ISSQN/indIncentivo",
      "min": 1,
      "max": 1,
      "rotulo": "Indicador de Incentivo Fiscal. 1=Sim; 2=Não"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TCListServ": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{2}.[0-9]{2}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/imposto/ISSQN/indISS": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ISSQN/cServico": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 20
  },
  "nfe:TNFe/infNFe/det/imposto/ISSQN/cPais": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{1,4}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/imposto/ISSQN/nProcesso": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 30
  },
  "nfe:TNFe/infNFe/det/imposto/ISSQN/indIncentivo": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "1",
    "2"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/PIS": {
   "t": "c",
   "conteudo": {
    "t": "esc",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "PISAliq",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/PIS/PISAliq",
      "min": 1,
      "max": 1,
      "rotulo": "Código de Situação Tributária do PIS. 01 – Operação Tributável - Base de Cálculo = Valor da Operação Alíquota Normal (Cumulativo/Não Cumulativo); 02 - Operação Tributável - Base de Calculo = Valor da Operação (Alíquota Diferenciada);"
     },
     {
      "t": "el",
      "nome": "PISQtde",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/PIS/PISQtde",
      "min": 1,
      "max": 1,
      "rotulo": "Código de Situação Tributária do PIS. 03 - Operação Tributável - Base de Calculo = Quantidade Vendida x Alíquota por Unidade de Produto;"
     },
     {
      "t": "el",
      "nome": "PISNT",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/PIS/PISNT",
      "min": 1,
      "max": 1,
      "rotulo": "Código de Situação Tributária do PIS. 04 - Operação Tributável - Tributação Monofásica - (Alíquota Zero); 06 - Operação Tributável - Alíquota Zero; 07 - Operação Isenta da contribuição; 08 - Operação Sem Incidência da contribuição; 09 - Operação com suspensão da contribuição;"
     },
     {
      "t": "el",
      "nome": "PISOutr",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/PIS/PISOutr",
      "min": 1,
      "max": 1,
      "rotulo": "Código de Situação Tributária do PIS. 99 - Outras Operações."
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/PIS/PISAliq": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/PIS/PISAliq/CST",
      "min": 1,
      "max": 1,
      "rotulo": "Código de Situação Tributária do PIS. 01 – Operação Tributável - Base de Cálculo = Valor da Operação Alíquota Normal (Cumulativo/Não Cumulativo); 02 - Operação Tributável - Base de Calculo = Valor da Operação (Alíquota Diferenciada);"
     },
     {
      "t": "el",
      "nome": "vBC",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da BC do PIS"
     },
     {
      "t": "el",
      "nome": "pPIS",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota do PIS (em percentual)"
     },
     {
      "t": "el",
      "nome": "vPIS",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do PIS"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/PIS/PISAliq/CST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "01",
    "02"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/PIS/PISQtde": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/PIS/PISQtde/CST",
      "min": 1,
      "max": 1,
      "rotulo": "Código de Situação Tributária do PIS. 03 - Operação Tributável - Base de Calculo = Quantidade Vendida x Alíquota por Unidade de Produto;"
     },
     {
      "t": "el",
      "nome": "qBCProd",
      "ns": "nfe",
      "tipo": "nfe:TDec_1204v",
      "min": 1,
      "max": 1,
      "rotulo": "Quantidade Vendida (NT2011/004)"
     },
     {
      "t": "el",
      "nome": "vAliqProd",
      "ns": "nfe",
      "tipo": "nfe:TDec_1104v",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota do PIS (em reais) (NT2011/004)"
     },
     {
      "t": "el",
      "nome": "vPIS",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do PIS"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/PIS/PISQtde/CST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "03"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/PIS/PISNT": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/PIS/PISNT/CST",
      "min": 1,
      "max": 1,
      "rotulo": "Código de Situação Tributária do PIS. 04 - Operação Tributável - Tributação Monofásica - (Alíquota Zero); 05 - Operação Tributável (ST); 06 - Operação Tributável - Alíquota Zero; 07 - Operação Isenta da contribuição; 08 - Operação Sem Incidência da contribuição; 09 - Operação com suspensão da contribuição;"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/PIS/PISNT/CST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "04",
    "05",
    "06",
    "07",
    "08",
    "09"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/PIS/PISOutr": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/PIS/PISOutr/CST",
      "min": 1,
      "max": 1,
      "rotulo": "Código de Situação Tributária do PIS. 99 - Outras Operações."
     },
     {
      "t": "esc",
      "min": 1,
      "max": 1,
      "itens": [
       {
        "t": "seq",
        "min": 1,
        "max": 1,
        "itens": [
         {
          "t": "el",
          "nome": "vBC",
          "ns": "nfe",
          "tipo": "nfe:TDec_1302",
          "min": 1,
          "max": 1,
          "rotulo": "Valor da BC do PIS"
         },
         {
          "t": "el",
          "nome": "pPIS",
          "ns": "nfe",
          "tipo": "nfe:TDec_0302a04",
          "min": 1,
          "max": 1,
          "rotulo": "Alíquota do PIS (em percentual)"
         }
        ]
       },
       {
        "t": "seq",
        "min": 1,
        "max": 1,
        "itens": [
         {
          "t": "el",
          "nome": "qBCProd",
          "ns": "nfe",
          "tipo": "nfe:TDec_1204v",
          "min": 1,
          "max": 1,
          "rotulo": "Quantidade Vendida (NT2011/004)"
         },
         {
          "t": "el",
          "nome": "vAliqProd",
          "ns": "nfe",
          "tipo": "nfe:TDec_1104v",
          "min": 1,
          "max": 1,
          "rotulo": "Alíquota do PIS (em reais) (NT2011/004)"
         }
        ]
       }
      ]
     },
     {
      "t": "el",
      "nome": "vPIS",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do PIS"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/PIS/PISOutr/CST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "60",
    "61",
    "62",
    "63",
    "64",
    "65",
    "66",
    "67",
    "70",
    "71",
    "72",
    "73",
    "74",
    "75",
    "98",
    "99"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/PISST": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "esc",
      "min": 1,
      "max": 1,
      "itens": [
       {
        "t": "seq",
        "min": 1,
        "max": 1,
        "itens": [
         {
          "t": "el",
          "nome": "vBC",
          "ns": "nfe",
          "tipo": "nfe:TDec_1302Opc",
          "min": 1,
          "max": 1,
          "rotulo": "Valor da BC do PIS ST"
         },
         {
          "t": "el",
          "nome": "pPIS",
          "ns": "nfe",
          "tipo": "nfe:TDec_0302a04",
          "min": 1,
          "max": 1,
          "rotulo": "Alíquota do PIS ST (em percentual)"
         }
        ]
       },
       {
        "t": "seq",
        "min": 1,
        "max": 1,
        "itens": [
         {
          "t": "el",
          "nome": "qBCProd",
          "ns": "nfe",
          "tipo": "nfe:TDec_1204",
          "min": 1,
          "max": 1,
          "rotulo": "Quantidade Vendida"
         },
         {
          "t": "el",
          "nome": "vAliqProd",
          "ns": "nfe",
          "tipo": "nfe:TDec_1104",
          "min": 1,
          "max": 1,
          "rotulo": "Alíquota do PIS ST (em reais)"
         }
        ]
       }
      ]
     },
     {
      "t": "el",
      "nome": "vPIS",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do PIS ST"
     },
     {
      "t": "el",
      "nome": "indSomaPISST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/PISST/indSomaPISST",
      "min": 0,
      "max": 1,
      "rotulo": "Indica se o valor do PISST compõe o valor total da NF-e"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TDec_1204": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "0|0\\.[0-9]{1,4}|[1-9]{1}[0-9]{0,11}|[1-9]{1}[0-9]{0,11}(\\.[0-9]{4})?"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det/imposto/PISST/indSomaPISST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/COFINS": {
   "t": "c",
   "conteudo": {
    "t": "esc",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "COFINSAliq",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/COFINS/COFINSAliq",
      "min": 1,
      "max": 1,
      "rotulo": "Código de Situação Tributária do COFINS. 01 – Operação Tributável - Base de Cálculo = Valor da Operação Alíquota Normal (Cumulativo/Não Cumulativo); 02 - Operação Tributável - Base de Calculo = Valor da Operação (Alíquota Diferenciada);"
     },
     {
      "t": "el",
      "nome": "COFINSQtde",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/COFINS/COFINSQtde",
      "min": 1,
      "max": 1,
      "rotulo": "Código de Situação Tributária do COFINS. 03 - Operação Tributável - Base de Calculo = Quantidade Vendida x Alíquota por Unidade de Produto;"
     },
     {
      "t": "el",
      "nome": "COFINSNT",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/COFINS/COFINSNT",
      "min": 1,
      "max": 1,
      "rotulo": "Código de Situação Tributária do COFINS: 04 - Operação Tributável - Tributação Monofásica - (Alíquota Zero); 06 - Operação Tributável - Alíquota Zero; 07 - Operação Isenta da contribuição; 08 - Operação Sem Incidência da contribuição; 09 - Operação com suspensão da contribuição;"
     },
     {
      "t": "el",
      "nome": "COFINSOutr",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/COFINS/COFINSOutr",
      "min": 1,
      "max": 1,
      "rotulo": "Código de Situação Tributária do COFINS: 49 - Outras Operações de Saída 50 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Tributada no Mercado Interno 51 - Operação com Direito a Crédito – Vinculada Exclusivamente a Receita Não Tributada no Mercado Interno 52 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita de Exportação 53 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno 54 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas no Mercado Interno e de Exportação 55 - Operação com Direito a Crédito - Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação 56 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno, e de Exportação 60 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Tributada no Mercado Interno 61 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno 62 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita de Exportação 63 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno 64 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas no Mercado Interno e de Exportação 65 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação 66 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno, e de Exportação 67 - Crédito Presumido - Outras Operações 70 - Operação de Aquisição sem Direito a Crédito 71 - Operação de Aquisição com Isenção 72 - Operação de Aquisição com Suspensão 73 - Operação de Aquisição a Alíquota Zero 74 - Operação de Aquisição sem Incidência da Contribuição 75 - Operação de Aquisição por Substituição Tributária 98 - Outras Operações de Entrada 99 - Outras Operações."
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/COFINS/COFINSAliq": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/COFINS/COFINSAliq/CST",
      "min": 1,
      "max": 1,
      "rotulo": "Código de Situação Tributária do COFINS. 01 – Operação Tributável - Base de Cálculo = Valor da Operação Alíquota Normal (Cumulativo/Não Cumulativo); 02 - Operação Tributável - Base de Calculo = Valor da Operação (Alíquota Diferenciada);"
     },
     {
      "t": "el",
      "nome": "vBC",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da BC do COFINS"
     },
     {
      "t": "el",
      "nome": "pCOFINS",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota do COFINS (em percentual)"
     },
     {
      "t": "el",
      "nome": "vCOFINS",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do COFINS"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/COFINS/COFINSAliq/CST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "01",
    "02"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/COFINS/COFINSQtde": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/COFINS/COFINSQtde/CST",
      "min": 1,
      "max": 1,
      "rotulo": "Código de Situação Tributária do COFINS. 03 - Operação Tributável - Base de Calculo = Quantidade Vendida x Alíquota por Unidade de Produto;"
     },
     {
      "t": "el",
      "nome": "qBCProd",
      "ns": "nfe",
      "tipo": "nfe:TDec_1204v",
      "min": 1,
      "max": 1,
      "rotulo": "Quantidade Vendida (NT2011/004)"
     },
     {
      "t": "el",
      "nome": "vAliqProd",
      "ns": "nfe",
      "tipo": "nfe:TDec_1104v",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota do COFINS (em reais) (NT2011/004)"
     },
     {
      "t": "el",
      "nome": "vCOFINS",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do COFINS"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/COFINS/COFINSQtde/CST": {
   "t": "s",
   "nativo": "xs:string",
   "enumeracao": [
    "03"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/COFINS/COFINSNT": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/COFINS/COFINSNT/CST",
      "min": 1,
      "max": 1,
      "rotulo": "Código de Situação Tributária do COFINS: 04 - Operação Tributável - Tributação Monofásica - (Alíquota Zero); 05 - Operação Tributável (ST); 06 - Operação Tributável - Alíquota Zero; 07 - Operação Isenta da contribuição; 08 - Operação Sem Incidência da contribuição; 09 - Operação com suspensão da contribuição;"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/COFINS/COFINSNT/CST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "04",
    "05",
    "06",
    "07",
    "08",
    "09"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/COFINS/COFINSOutr": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/COFINS/COFINSOutr/CST",
      "min": 1,
      "max": 1,
      "rotulo": "Código de Situação Tributária do COFINS: 49 - Outras Operações de Saída 50 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Tributada no Mercado Interno 51 - Operação com Direito a Crédito – Vinculada Exclusivamente a Receita Não Tributada no Mercado Interno 52 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita de Exportação 53 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno 54 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas no Mercado Interno e de Exportação 55 - Operação com Direito a Crédito - Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação 56 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno, e de Exportação 60 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Tributada no Mercado Interno 61 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno 62 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita de Exportação 63 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno 64 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas no Mercado Interno e de Exportação 65 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação 66 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno, e de Exportação 67 - Crédito Presumido - Outras Operações 70 - Operação de Aquisição sem Direito a Crédito 71 - Operação de Aquisição com Isenção 72 - Operação de Aquisição com Suspensão 73 - Operação de Aquisição a Alíquota Zero 74 - Operação de Aquisição sem Incidência da Contribuição 75 - Operação de Aquisição por Substituição Tributária 98 - Outras Operações de Entrada 99 - Outras Operações."
     },
     {
      "t": "esc",
      "min": 1,
      "max": 1,
      "itens": [
       {
        "t": "seq",
        "min": 1,
        "max": 1,
        "itens": [
         {
          "t": "el",
          "nome": "vBC",
          "ns": "nfe",
          "tipo": "nfe:TDec_1302",
          "min": 1,
          "max": 1,
          "rotulo": "Valor da BC do COFINS"
         },
         {
          "t": "el",
          "nome": "pCOFINS",
          "ns": "nfe",
          "tipo": "nfe:TDec_0302a04",
          "min": 1,
          "max": 1,
          "rotulo": "Alíquota do COFINS (em percentual)"
         }
        ]
       },
       {
        "t": "seq",
        "min": 1,
        "max": 1,
        "itens": [
         {
          "t": "el",
          "nome": "qBCProd",
          "ns": "nfe",
          "tipo": "nfe:TDec_1204v",
          "min": 1,
          "max": 1,
          "rotulo": "Quantidade Vendida (NT2011/004)"
         },
         {
          "t": "el",
          "nome": "vAliqProd",
          "ns": "nfe",
          "tipo": "nfe:TDec_1104v",
          "min": 1,
          "max": 1,
          "rotulo": "Alíquota do COFINS (em reais) (NT2011/004)"
         }
        ]
       }
      ]
     },
     {
      "t": "el",
      "nome": "vCOFINS",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do COFINS"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/COFINS/COFINSOutr/CST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "60",
    "61",
    "62",
    "63",
    "64",
    "65",
    "66",
    "67",
    "70",
    "71",
    "72",
    "73",
    "74",
    "75",
    "98",
    "99"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/COFINSST": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "esc",
      "min": 1,
      "max": 1,
      "itens": [
       {
        "t": "seq",
        "min": 1,
        "max": 1,
        "itens": [
         {
          "t": "el",
          "nome": "vBC",
          "ns": "nfe",
          "tipo": "nfe:TDec_1302",
          "min": 1,
          "max": 1,
          "rotulo": "Valor da BC do COFINS ST"
         },
         {
          "t": "el",
          "nome": "pCOFINS",
          "ns": "nfe",
          "tipo": "nfe:TDec_0302a04",
          "min": 1,
          "max": 1,
          "rotulo": "Alíquota do COFINS ST(em percentual)"
         }
        ]
       },
       {
        "t": "seq",
        "min": 1,
        "max": 1,
        "itens": [
         {
          "t": "el",
          "nome": "qBCProd",
          "ns": "nfe",
          "tipo": "nfe:TDec_1204",
          "min": 1,
          "max": 1,
          "rotulo": "Quantidade Vendida"
         },
         {
          "t": "el",
          "nome": "vAliqProd",
          "ns": "nfe",
          "tipo": "nfe:TDec_1104",
          "min": 1,
          "max": 1,
          "rotulo": "Alíquota do COFINS ST(em reais)"
         }
        ]
       }
      ]
     },
     {
      "t": "el",
      "nome": "vCOFINS",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do COFINS ST"
     },
     {
      "t": "el",
      "nome": "indSomaCOFINSST",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/COFINSST/indSomaCOFINSST",
      "min": 0,
      "max": 1,
      "rotulo": "Indica se o valor da COFINS ST compõe o valor total da NFe"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/COFINSST/indSomaCOFINSST": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1"
   ]
  },
  "nfe:TNFe/infNFe/det/imposto/ICMSUFDest": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vBCUFDest",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da Base de Cálculo do ICMS na UF do destinatário."
     },
     {
      "t": "el",
      "nome": "vBCFCPUFDest",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor da Base de Cálculo do FCP na UF do destinatário."
     },
     {
      "t": "el",
      "nome": "pFCPUFDest",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 0,
      "max": 1,
      "rotulo": "Percentual adicional inserido na alíquota interna da UF de destino, relativo ao Fundo de Combate à Pobreza (FCP) naquela UF."
     },
     {
      "t": "el",
      "nome": "pICMSUFDest",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota adotada nas operações internas na UF do destinatário para o produto / mercadoria."
     },
     {
      "t": "el",
      "nome": "pICMSInter",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/imposto/ICMSUFDest/pICMSInter",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota interestadual das UF envolvidas: - 4% alíquota interestadual para produtos importados; - 7% para os Estados de origem do Sul e Sudeste (exceto ES), destinado para os Estados do Norte e Nordeste ou ES; - 12% para os demais casos."
     },
     {
      "t": "el",
      "nome": "pICMSInterPart",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Percentual de partilha para a UF do destinatário: - 40% em 2016; - 60% em 2017; - 80% em 2018; - 100% a partir de 2019."
     },
     {
      "t": "el",
      "nome": "vFCPUFDest",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor do ICMS relativo ao Fundo de Combate à Pobreza (FCP) da UF de destino."
     },
     {
      "t": "el",
      "nome": "vICMSUFDest",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do ICMS de partilha para a UF do destinatário."
     },
     {
      "t": "el",
      "nome": "vICMSUFRemet",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do ICMS de partilha para a UF do remetente. Nota: A partir de 2019, este valor será zero."
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/imposto/ICMSUFDest/pICMSInter": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "4.00",
    "7.00",
    "12.00"
   ]
  },
  "nfe:TIS": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "CSTIS",
      "ns": "nfe",
      "tipo": "nfe:TCST",
      "min": 1,
      "max": 1,
      "rotulo": "Código Situação Tributária do Imposto Seletivo"
     },
     {
      "t": "el",
      "nome": "cClassTribIS",
      "ns": "nfe",
      "tipo": "nfe:TcClassTrib",
      "min": 1,
      "max": 1
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vBCIS",
        "ns": "nfe",
        "tipo": "nfe:TDec1302RTC",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do BC"
       },
       {
        "t": "el",
        "nome": "pIS",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302_04RTC",
        "min": 1,
        "max": 1,
        "rotulo": "Alíquota do Imposto Seletivo (percentual)"
       },
       {
        "t": "el",
        "nome": "adRemIS",
        "ns": "nfe",
        "tipo": "nfe:TDec_0302_04RTC",
        "min": 0,
        "max": 1,
        "rotulo": "Alíquota do Imposto Seletivo (por valor)"
       },
       {
        "t": "seq",
        "min": 0,
        "max": 1,
        "itens": [
         {
          "t": "el",
          "nome": "uTrib",
          "ns": "nfe",
          "tipo": "nfe:TIS/uTrib",
          "min": 1,
          "max": 1,
          "rotulo": "Unidade de medida apropriada especificada em Lei Ordinaria para fins de apuração do Imposto Seletivo"
         },
         {
          "t": "el",
          "nome": "qTrib",
          "ns": "nfe",
          "tipo": "nfe:TDec_1104OpRTC",
          "min": 1,
          "max": 1,
          "rotulo": "Quantidade com abse no campo uTrib informado"
         }
        ]
       },
       {
        "t": "el",
        "nome": "vIS",
        "ns": "nfe",
        "tipo": "nfe:TDec1302RTC",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do Imposto Seletivo calculado"
       }
      ]
     }
    ]
   },
   "atributos": []
  },
  "nfe:TCST": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "\\d{3}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TcClassTrib": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "\\d{6}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TDec1302RTC": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "0|0\\.[0-9]{2}|[1-9]{1}[0-9]{0,12}(\\.[0-9]{2})?"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TIS/uTrib": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 6
  },
  "nfe:TStringRTC": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TDec_1104OpRTC": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "0\\.[1-9]{1}[0-9]{3}|0\\.[0-9]{3}[1-9]{1}|0\\.[0-9]{2}[1-9]{1}[0-9]{1}|0\\.[0-9]{1}[1-9]{1}[0-9]{2}|[1-9]{1}[0-9]{0,10}(\\.[0-9]{4})?"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TTribNFe": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "CST",
      "ns": "nfe",
      "tipo": "nfe:TCST",
      "min": 1,
      "max": 1,
      "rotulo": "Código Situação Tributária do IBS/CBS"
     },
     {
      "t": "el",
      "nome": "cClassTrib",
      "ns": "nfe",
      "tipo": "nfe:TcClassTrib",
      "min": 1,
      "max": 1
     },
     {
      "t": "el",
      "nome": "indDoacao",
      "ns": "nfe",
      "tipo": "nfe:TIndDoacao",
      "min": 0,
      "max": 1,
      "rotulo": "Indica se a operação é de doação"
     },
     {
      "t": "esc",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "gIBSCBS",
        "ns": "nfe",
        "tipo": "nfe:TCIBS_NFe",
        "min": 1,
        "max": 1
       },
       {
        "t": "el",
        "nome": "gIBSCBSMono",
        "ns": "nfe",
        "tipo": "nfe:TMonofasia",
        "min": 1,
        "max": 1,
        "rotulo": "Grupo de Informações do IBS e CBS em operações com imposto monofásico (CST 620)"
       },
       {
        "t": "el",
        "nome": "gTransfCred",
        "ns": "nfe",
        "tipo": "nfe:TTransfCred",
        "min": 1,
        "max": 1,
        "rotulo": "Informar essa opção da Choice para o CST 800"
       },
       {
        "t": "el",
        "nome": "gAjusteCompet",
        "ns": "nfe",
        "tipo": "nfe:TAjusteCompet",
        "min": 1,
        "max": 1,
        "rotulo": "Informar essa opção da Choice para o CST 811"
       }
      ]
     },
     {
      "t": "el",
      "nome": "gEstornoCred",
      "ns": "nfe",
      "tipo": "nfe:TEstornoCred",
      "min": 0,
      "max": 1,
      "rotulo": "Informado conforme indicador no cClassTrib"
     },
     {
      "t": "esc",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "gCredPresOper",
        "ns": "nfe",
        "tipo": "nfe:TCredPresOper",
        "min": 1,
        "max": 1,
        "rotulo": "Crédito Presumido da Operação. Informado conforme indicador no cClassTrib."
       },
       {
        "t": "el",
        "nome": "gCredPresIBSZFM",
        "ns": "nfe",
        "tipo": "nfe:TCredPresIBSZFM",
        "min": 1,
        "max": 1,
        "rotulo": "Classificação de acordo com o art. 450, § 1º, da LC 214/25 para o cálculo do crédito presumido na ZFM. Informado conforme indicador no cClassTrib."
       }
      ]
     }
    ]
   },
   "atributos": []
  },
  "nfe:TIndDoacao": {
   "t": "s",
   "nativo": "xs:string",
   "enumeracao": [
    "1"
   ]
  },
  "nfe:TCIBS_NFe": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vBC",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do BC"
     },
     {
      "t": "seq",
      "min": 1,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "gIBSUF",
        "ns": "nfe",
        "tipo": "nfe:TCIBS_NFe/gIBSUF",
        "min": 1,
        "max": 1,
        "rotulo": "Grupo de informações do IBS na UF"
       },
       {
        "t": "el",
        "nome": "gIBSMun",
        "ns": "nfe",
        "tipo": "nfe:TCIBS_NFe/gIBSMun",
        "min": 1,
        "max": 1,
        "rotulo": "Grupo de Informações do IBS no Município"
       },
       {
        "t": "el",
        "nome": "vIBS",
        "ns": "nfe",
        "tipo": "nfe:TDec1302RTC",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do IBS"
       }
      ]
     },
     {
      "t": "el",
      "nome": "gCBS",
      "ns": "nfe",
      "tipo": "nfe:TCIBS_NFe/gCBS",
      "min": 1,
      "max": 1,
      "rotulo": "Grupo de Tributação da CBS"
     },
     {
      "t": "el",
      "nome": "gTribRegular",
      "ns": "nfe",
      "tipo": "nfe:TTribRegular",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de informações da Tributação Regular. Informar como seria a tributação caso não cumprida a condição resolutória/suspensiva. Exemplo 1: Art. 442, §4. Operações com ZFM e ALC. Exemplo 2: Operações com suspensão do tributo."
     },
     {
      "t": "el",
      "nome": "gTribCompraGov",
      "ns": "nfe",
      "tipo": "nfe:TTribCompraGov",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de informações da composição do valor do IBS e da CBS em compras governamental"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TCIBS_NFe/gIBSUF": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "pIBSUF",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Aliquota do IBS de competência das UF (em percentual)"
     },
     {
      "t": "el",
      "nome": "gDif",
      "ns": "nfe",
      "tipo": "nfe:TDif",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de campos do Diferimento"
     },
     {
      "t": "el",
      "nome": "gDevTrib",
      "ns": "nfe",
      "tipo": "nfe:TDevTrib",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de Informações da devolução de tributos"
     },
     {
      "t": "el",
      "nome": "gRed",
      "ns": "nfe",
      "tipo": "nfe:TRed",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de campos da redução de aliquota"
     },
     {
      "t": "el",
      "nome": "vIBSUF",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do IBS de competência das UF"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TDif": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "pDif",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Percentual do diferimento"
     },
     {
      "t": "el",
      "nome": "vDif",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do diferimento"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TDevTrib": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "pDevTrib",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 0,
      "max": 1,
      "rotulo": "Percentual de devolução do tributo, conforme LC 214/25 art. 118."
     },
     {
      "t": "el",
      "nome": "vDevTrib",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do tributo devolvido (\"cashback\" de desconto na própria Nota Fiscal / Fatura)"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TRed": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "pRedAliq",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Percentual de redução de aliquota do cClassTrib"
     },
     {
      "t": "el",
      "nome": "pAliqEfet",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Aliquota Efetiva que será aplicada a Base de Calculo (em percentual)"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TCIBS_NFe/gIBSMun": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "pIBSMun",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Aliquota do IBS Municipal (em percentual)"
     },
     {
      "t": "el",
      "nome": "gDif",
      "ns": "nfe",
      "tipo": "nfe:TDif",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de campos do Diferimento"
     },
     {
      "t": "el",
      "nome": "gDevTrib",
      "ns": "nfe",
      "tipo": "nfe:TDevTrib",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de Informações da devolução de tributos"
     },
     {
      "t": "el",
      "nome": "gRed",
      "ns": "nfe",
      "tipo": "nfe:TRed",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de campos da redução de aliquota"
     },
     {
      "t": "el",
      "nome": "vIBSMun",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do IBS Municipal"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TCIBS_NFe/gCBS": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "pCBS",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Aliquota da CBS (em percentual)"
     },
     {
      "t": "el",
      "nome": "gDif",
      "ns": "nfe",
      "tipo": "nfe:TDif",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de campos do Diferimento"
     },
     {
      "t": "el",
      "nome": "gDevTrib",
      "ns": "nfe",
      "tipo": "nfe:TDevTrib",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de Informações da devolução de tributos"
     },
     {
      "t": "el",
      "nome": "gRed",
      "ns": "nfe",
      "tipo": "nfe:TRed",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de campos da redução de aliquota"
     },
     {
      "t": "el",
      "nome": "gALCZFMCBS",
      "ns": "nfe",
      "tipo": "nfe:TALCZFMCBS_NFe",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de operações em áreas incentivadas (ALC/ZFM) - CBS (alíquota zero)"
     },
     {
      "t": "el",
      "nome": "vCBS",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da CBS"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TALCZFMCBS_NFe": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "tpALCZFMCBS",
      "ns": "nfe",
      "tipo": "nfe:TALCZFMCBS_NFe/tpALCZFMCBS",
      "min": 1,
      "max": 1,
      "rotulo": "Tipo de aplicação da alíquota zero da CBS."
     },
     {
      "t": "el",
      "nome": "nProcSuframa",
      "ns": "nfe",
      "tipo": "nfe:TALCZFMCBS_NFe/nProcSuframa",
      "min": 0,
      "max": 1,
      "rotulo": "Número do processo na Suframa para o item comercializado."
     },
     {
      "t": "el",
      "nome": "pAliqEfetRegCBS",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Percentual efetivo sem a redução"
     },
     {
      "t": "el",
      "nome": "vTribRegCBS",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor efetivo sem a redução"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TALCZFMCBS_NFe/tpALCZFMCBS": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "1",
    "2"
   ]
  },
  "nfe:TALCZFMCBS_NFe/nProcSuframa": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 8,
   "maxLength": 12
  },
  "nfe:TTribRegular": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "CSTReg",
      "ns": "nfe",
      "tipo": "nfe:TCST",
      "min": 1,
      "max": 1,
      "rotulo": "Código da Situação Tributária do IBS e CBS"
     },
     {
      "t": "el",
      "nome": "cClassTribReg",
      "ns": "nfe",
      "tipo": "nfe:TcClassTrib",
      "min": 1,
      "max": 1,
      "rotulo": "Informar qual seria o cClassTrib caso não cumprida a condição resolutória/suspensiva"
     },
     {
      "t": "el",
      "nome": "pAliqEfetRegIBSUF",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota do IBS da UF"
     },
     {
      "t": "el",
      "nome": "vTribRegIBSUF",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do IBS da UF"
     },
     {
      "t": "el",
      "nome": "pAliqEfetRegIBSMun",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota do IBS do Município"
     },
     {
      "t": "el",
      "nome": "vTribRegIBSMun",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do IBS do Município"
     },
     {
      "t": "el",
      "nome": "pAliqEfetRegCBS",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota da CBS"
     },
     {
      "t": "el",
      "nome": "vTribRegCBS",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da CBS"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TTribCompraGov": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "pAliqIBSUF",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 1,
      "max": 1
     },
     {
      "t": "el",
      "nome": "vTribIBSUF",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor que seria devido a UF, sem aplicação do Art. 473. da LC 214/2025"
     },
     {
      "t": "el",
      "nome": "pAliqIBSMun",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 1,
      "max": 1
     },
     {
      "t": "el",
      "nome": "vTribIBSMun",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor que seria devido ao município, sem aplicação do Art. 473. da LC 214/2025"
     },
     {
      "t": "el",
      "nome": "pAliqCBS",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 1,
      "max": 1
     },
     {
      "t": "el",
      "nome": "vTribCBS",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor que seria devido a CBS, sem aplicação do Art. 473. da LC 214/2025"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TMonofasia": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "esc",
        "min": 1,
        "max": 1,
        "itens": [
         {
          "t": "el",
          "nome": "gIBSMonoAdRem",
          "ns": "nfe",
          "tipo": "nfe:TMonofasia/gIBSMonoAdRem",
          "min": 0,
          "max": 1,
          "rotulo": "Grupo de informações da Tributação Monofásica Ad Rem do IBS"
         },
         {
          "t": "el",
          "nome": "gIBSMonoAdValorem",
          "ns": "nfe",
          "tipo": "nfe:TMonofasia/gIBSMonoAdValorem",
          "min": 0,
          "max": 1,
          "rotulo": "Grupo de informações da Tributação Monofásica Ad Valorem do IBS"
         }
        ]
       }
      ]
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "esc",
        "min": 1,
        "max": 1,
        "itens": [
         {
          "t": "el",
          "nome": "gCBSMonoAdRem",
          "ns": "nfe",
          "tipo": "nfe:TMonofasia/gCBSMonoAdRem",
          "min": 0,
          "max": 1,
          "rotulo": "Grupo de informações da Tributação Monofásica Ad Rem da CBS"
         },
         {
          "t": "el",
          "nome": "gCBSMonoAdValorem",
          "ns": "nfe",
          "tipo": "nfe:TMonofasia/gCBSMonoAdValorem",
          "min": 0,
          "max": 1,
          "rotulo": "Grupo de informações da Tributação Monofásica Ad Valorem da CBS"
         }
        ]
       }
      ]
     },
     {
      "t": "el",
      "nome": "vTotIBSMonoItem",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Total de IBS Monofásico."
     },
     {
      "t": "el",
      "nome": "vTotCBSMonoItem",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Total da CBS Monofásica."
     }
    ]
   },
   "atributos": []
  },
  "nfe:TMonofasia/gIBSMonoAdRem": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "gMonoPadrao",
      "ns": "nfe",
      "tipo": "nfe:TMonofasia/gIBSMonoAdRem/gMonoPadrao",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de informações da Tributação Monofásica Padrão"
     },
     {
      "t": "el",
      "nome": "gMonoReten",
      "ns": "nfe",
      "tipo": "nfe:TMonofasia/gIBSMonoAdRem/gMonoReten",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de informações da Tributação Monofásica Sujeita à Retenção"
     },
     {
      "t": "el",
      "nome": "gMonoRet",
      "ns": "nfe",
      "tipo": "nfe:TMonofasia/gIBSMonoAdRem/gMonoRet",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de informações da Tributação Monofásica Retida Anteriormente"
     },
     {
      "t": "el",
      "nome": "gpBioDiferenca",
      "ns": "nfe",
      "tipo": "nfe:TMonofasia/gIBSMonoAdRem/gpBioDiferenca",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de informações sobre mistura de EAC com gasolina A em percentual inferior ou superior ao obrigatório"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TMonofasia/gIBSMonoAdRem/gMonoPadrao": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "qBCMono",
      "ns": "nfe",
      "tipo": "nfe:TDec1104RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Quantidade tributada na monofasia"
     },
     {
      "t": "el",
      "nome": "adRemIBS",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota ad rem do IBS"
     },
     {
      "t": "el",
      "nome": "vIBSMono",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do IBS monofásico"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TDec1104RTC": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "0|0\\.[0-9]{4}|[1-9]{1}[0-9]{0,10}(\\.[0-9]{4})?"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TMonofasia/gIBSMonoAdRem/gMonoReten": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "qBCMonoReten",
      "ns": "nfe",
      "tipo": "nfe:TDec1104RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Quantidade tributada sujeita à retenção na monofasia"
     },
     {
      "t": "el",
      "nome": "adRemIBSReten",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota ad rem do IBS sujeito à retenção"
     },
     {
      "t": "el",
      "nome": "vIBSMonoReten",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do IBS monofásico sujeito à retenção"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TMonofasia/gIBSMonoAdRem/gMonoRet": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vIBSMonoRet",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do IBS retido anteriormente"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TMonofasia/gIBSMonoAdRem/gpBioDiferenca": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "qBCBioComb",
      "ns": "nfe",
      "tipo": "nfe:TDec1104RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Quantidade de Biocombustível (EAC) a recolher ou a ressarcir"
     },
     {
      "t": "el",
      "nome": "vIBSDiferenca",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do IBS correspondente a diferença em relação ao pBioObrigatorio"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TMonofasia/gIBSMonoAdValorem": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "gMonoPadrao",
      "ns": "nfe",
      "tipo": "nfe:TMonofasia/gIBSMonoAdValorem/gMonoPadrao",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de informações da Tributação Monofásica Padrão"
     },
     {
      "t": "el",
      "nome": "gMonoReten",
      "ns": "nfe",
      "tipo": "nfe:TMonofasia/gIBSMonoAdValorem/gMonoReten",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de informações da Tributação Monofásica Sujeita à Retenção"
     },
     {
      "t": "el",
      "nome": "gMonoRet",
      "ns": "nfe",
      "tipo": "nfe:TMonofasia/gIBSMonoAdValorem/gMonoRet",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de informações da Tributação Monofásica Retida Anteriormente"
     },
     {
      "t": "el",
      "nome": "gpBioDiferenca",
      "ns": "nfe",
      "tipo": "nfe:TMonofasia/gIBSMonoAdValorem/gpBioDiferenca",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de informações sobre mistura de EAC com gasolina A em percentual inferior ou superior ao obrigatório"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TMonofasia/gIBSMonoAdValorem/gMonoPadrao": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vBCMono",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor tributado na monofasia"
     },
     {
      "t": "el",
      "nome": "pAliqMonoUF",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota ad valorem do IBS Estadual"
     },
     {
      "t": "el",
      "nome": "vIBSMonoUF",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do IBS monofásico Estadual"
     },
     {
      "t": "el",
      "nome": "pAliqMonoMun",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota ad valorem do IBS Municipal"
     },
     {
      "t": "el",
      "nome": "vIBSMonoMun",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do IBS monofásico do Municipal"
     },
     {
      "t": "el",
      "nome": "vIBSMono",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do IBS monofásico"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TMonofasia/gIBSMonoAdValorem/gMonoReten": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vBCMonoReten",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor tributado sujeito à retenção na monofasia"
     },
     {
      "t": "el",
      "nome": "pAliqMonoReten",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota ad valorem do IBS sujeito à retenção"
     },
     {
      "t": "el",
      "nome": "vIBSMonoReten",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do IBS monofásico sujeito à retenção"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TMonofasia/gIBSMonoAdValorem/gMonoRet": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vIBSMonoRet",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do IBS retido anteriormente"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TMonofasia/gIBSMonoAdValorem/gpBioDiferenca": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "qBCBioComb",
      "ns": "nfe",
      "tipo": "nfe:TDec1104RTC",
      "min": 1,
      "max": 1
     },
     {
      "t": "el",
      "nome": "vIBSDiferenca",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1
     }
    ]
   },
   "atributos": []
  },
  "nfe:TMonofasia/gCBSMonoAdRem": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "gMonoPadrao",
      "ns": "nfe",
      "tipo": "nfe:TMonofasia/gCBSMonoAdRem/gMonoPadrao",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de informações da Tributação Monofásica Padrão"
     },
     {
      "t": "el",
      "nome": "gMonoReten",
      "ns": "nfe",
      "tipo": "nfe:TMonofasia/gCBSMonoAdRem/gMonoReten",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de informações da Tributação Monofásica Sujeita à Retenção"
     },
     {
      "t": "el",
      "nome": "gMonoRet",
      "ns": "nfe",
      "tipo": "nfe:TMonofasia/gCBSMonoAdRem/gMonoRet",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de informações da Tributação Monofásica Retida Anteriormente"
     },
     {
      "t": "el",
      "nome": "gpBioDiferenca",
      "ns": "nfe",
      "tipo": "nfe:TMonofasia/gCBSMonoAdRem/gpBioDiferenca",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de informações sobre mistura de EAC com gasolina A em percentual inferior ou superior ao obrigatório"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TMonofasia/gCBSMonoAdRem/gMonoPadrao": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "qBCMono",
      "ns": "nfe",
      "tipo": "nfe:TDec1104RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Quantidade tributada na monofasia"
     },
     {
      "t": "el",
      "nome": "adRemCBS",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota ad rem da CBS"
     },
     {
      "t": "el",
      "nome": "vCBSMono",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da CBS monofásica"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TMonofasia/gCBSMonoAdRem/gMonoReten": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "qBCMonoReten",
      "ns": "nfe",
      "tipo": "nfe:TDec1104RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Quantidade tributada sujeita à retenção na monofasia"
     },
     {
      "t": "el",
      "nome": "adRemCBSReten",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota ad rem da CBS sujeita à retenção"
     },
     {
      "t": "el",
      "nome": "vCBSMonoReten",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da CBS monofásica sujeita à retenção"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TMonofasia/gCBSMonoAdRem/gMonoRet": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vCBSMonoRet",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da CBS retida anteriormente"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TMonofasia/gCBSMonoAdRem/gpBioDiferenca": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "qBCBioComb",
      "ns": "nfe",
      "tipo": "nfe:TDec1104RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Quantidade de Biocombustível (EAC) a recolher ou a ressarcir"
     },
     {
      "t": "el",
      "nome": "vCBSDiferenca",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da CBS correspondente a diferença em relação ao pBioObrigatorio"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TMonofasia/gCBSMonoAdValorem": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "gMonoPadrao",
      "ns": "nfe",
      "tipo": "nfe:TMonofasia/gCBSMonoAdValorem/gMonoPadrao",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de informações da Tributação Monofásica Padrão"
     },
     {
      "t": "el",
      "nome": "gMonoReten",
      "ns": "nfe",
      "tipo": "nfe:TMonofasia/gCBSMonoAdValorem/gMonoReten",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de informações da Tributação Monofásica Sujeita à Retenção"
     },
     {
      "t": "el",
      "nome": "gMonoRet",
      "ns": "nfe",
      "tipo": "nfe:TMonofasia/gCBSMonoAdValorem/gMonoRet",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de informações da Tributação Monofásica Retida Anteriormente"
     },
     {
      "t": "el",
      "nome": "gpBioDiferenca",
      "ns": "nfe",
      "tipo": "nfe:TMonofasia/gCBSMonoAdValorem/gpBioDiferenca",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de informações sobre mistura de EAC com gasolina A em percentual inferior ou superior ao obrigatório"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TMonofasia/gCBSMonoAdValorem/gMonoPadrao": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vBCMono",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor tributado na monofasia"
     },
     {
      "t": "el",
      "nome": "pAliqMonoCBS",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota ad valorem da CBS"
     },
     {
      "t": "el",
      "nome": "vCBSMono",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da CBS monofásica"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TMonofasia/gCBSMonoAdValorem/gMonoReten": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vBCMonoReten",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor tributado sujeito à retenção na monofasia"
     },
     {
      "t": "el",
      "nome": "pAliqMonoReten",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota ad valorem da CBS sujeita à retenção"
     },
     {
      "t": "el",
      "nome": "vCBSMonoReten",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da CBS monofásica sujeita à retenção"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TMonofasia/gCBSMonoAdValorem/gMonoRet": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vCBSMonoRet",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da CBS retida anteriormente"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TMonofasia/gCBSMonoAdValorem/gpBioDiferenca": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "qBCBioComb",
      "ns": "nfe",
      "tipo": "nfe:TDec1104RTC",
      "min": 1,
      "max": 1
     },
     {
      "t": "el",
      "nome": "vCBSDiferenca",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1
     }
    ]
   },
   "atributos": []
  },
  "nfe:TTransfCred": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vIBS",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do IBS a ser transferido"
     },
     {
      "t": "el",
      "nome": "vCBS",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da CBS a ser transferida"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TAjusteCompet": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "competApur",
      "ns": "nfe",
      "tipo": "nfe:TCompetApur",
      "min": 1,
      "max": 1,
      "rotulo": "Ano e mês referência do período de apuração (AAAA-MM)"
     },
     {
      "t": "el",
      "nome": "vIBS",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do IBS"
     },
     {
      "t": "el",
      "nome": "vCBS",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da CBS"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TCompetApur": {
   "t": "s",
   "nativo": "xs:gYearMonth",
   "minInclusive": "2025-01"
  },
  "nfe:TEstornoCred": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vIBSEstCred",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do IBS a ser estornado"
     },
     {
      "t": "el",
      "nome": "vCBSEstCred",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da CBS a ser estornada"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TCredPresOper": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vBCCredPres",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da Base de Cálculo do Crédito Presumido da Operação"
     },
     {
      "t": "el",
      "nome": "cCredPres",
      "ns": "nfe",
      "tipo": "nfe:TcCredPres",
      "min": 1,
      "max": 1,
      "rotulo": "Código de Classificação do Crédito Presumido do IBS e da CBS"
     },
     {
      "t": "el",
      "nome": "gIBSCredPres",
      "ns": "nfe",
      "tipo": "nfe:TCredPres",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de Informações do Crédito Presumido referente ao IBS, quando aproveitado pelo emitente do documento."
     },
     {
      "t": "el",
      "nome": "gCBSCredPres",
      "ns": "nfe",
      "tipo": "nfe:TCredPres",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de Informações do Crédito Presumido referente a CBS, quando aproveitado pelo emitente do documento."
     }
    ]
   },
   "atributos": []
  },
  "nfe:TcCredPres": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "\\d{2}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TCredPres": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "pCredPres",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302_04RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Percentual do Crédito Presumido"
     },
     {
      "t": "esc",
      "min": 1,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "vCredPres",
        "ns": "nfe",
        "tipo": "nfe:TDec1302RTC",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do Crédito Presumido"
       },
       {
        "t": "el",
        "nome": "vCredPresCondSus",
        "ns": "nfe",
        "tipo": "nfe:TDec1302RTC",
        "min": 1,
        "max": 1,
        "rotulo": "Valor do Crédito Presumido Condição Suspensiva, preencher apenas para cCredPres que possui indicação de Condição Suspensiva"
       }
      ]
     }
    ]
   },
   "atributos": []
  },
  "nfe:TCredPresIBSZFM": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "competApur",
      "ns": "nfe",
      "tipo": "nfe:TCompetApur",
      "min": 1,
      "max": 1,
      "rotulo": "Ano e mês referência do período de apuração (AAAA-MM)"
     },
     {
      "t": "el",
      "nome": "tpCredPresIBSZFM",
      "ns": "nfe",
      "tipo": "nfe:TTpCredPresIBSZFM",
      "min": 1,
      "max": 1,
      "rotulo": "Classificação de acordo com o art. 450, § 1º, da LC 214/25 para o cálculo do crédito presumido na ZFM"
     },
     {
      "t": "el",
      "nome": "vCredPresIBSZFM",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do crédito presumido calculado sobre o saldo devedor apurado"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/impostoDevol": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "pDevol",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302Max100",
      "min": 1,
      "max": 1,
      "rotulo": "Percentual de mercadoria devolvida"
     },
     {
      "t": "el",
      "nome": "IPI",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/impostoDevol/IPI",
      "min": 1,
      "max": 1,
      "rotulo": "Informação de IPI devolvido"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/impostoDevol/IPI": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vIPIDevol",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do IPI devolvido"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/infAdProd": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 500
  },
  "nfe:TNFe/infNFe/det/obsItem": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "obsCont",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/obsItem/obsCont",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de observações de uso livre (para o item da NF-e)"
     },
     {
      "t": "el",
      "nome": "obsFisco",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/obsItem/obsFisco",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de observações de uso livre (para o item da NF-e)"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/obsItem/obsCont": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "xTexto",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/obsItem/obsCont/xTexto",
      "min": 1,
      "max": 1
     }
    ]
   },
   "atributos": [
    {
     "nome": "xCampo",
     "uso": "required",
     "tipo": "nfe:TNFe/infNFe/det/obsItem/obsCont@xCampo"
    }
   ]
  },
  "nfe:TNFe/infNFe/det/obsItem/obsCont/xTexto": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TNFe/infNFe/det/obsItem/obsCont@xCampo": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 20
  },
  "nfe:TNFe/infNFe/det/obsItem/obsFisco": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "xTexto",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/obsItem/obsFisco/xTexto",
      "min": 1,
      "max": 1
     }
    ]
   },
   "atributos": [
    {
     "nome": "xCampo",
     "uso": "required",
     "tipo": "nfe:TNFe/infNFe/det/obsItem/obsFisco@xCampo"
    }
   ]
  },
  "nfe:TNFe/infNFe/det/obsItem/obsFisco/xTexto": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TNFe/infNFe/det/obsItem/obsFisco@xCampo": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 20
  },
  "nfe:TNFe/infNFe/det/DFeReferenciado": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "chaveAcesso",
      "ns": "nfe",
      "tipo": "nfe:TChNFe",
      "min": 1,
      "max": 1,
      "rotulo": "Chave de Acesso do DFe referenciado"
     },
     {
      "t": "el",
      "nome": "nItem",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/det/DFeReferenciado/nItem",
      "min": 0,
      "max": 1,
      "rotulo": "Número do item do documento referenciado. Corresponde ao atributo nItem do elemento det do documento original."
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/det/DFeReferenciado/nItem": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[1-9]{1}[0-9]{0,1}|[1-8]{1}[0-9]{2}|[9]{1}[0-8]{1}[0-9]{1}|[9]{1}[9]{1}[0]{1}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/det@nItem": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[1-9]{1}[0-9]{0,1}|[1-8]{1}[0-9]{2}|[9]{1}[0-8]{1}[0-9]{1}|[9]{1}[9]{1}[0]{1}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/total": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "ICMSTot",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/total/ICMSTot",
      "min": 1,
      "max": 1,
      "rotulo": "Totais referentes ao ICMS"
     },
     {
      "t": "el",
      "nome": "ISSQNtot",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/total/ISSQNtot",
      "min": 0,
      "max": 1,
      "rotulo": "Totais referentes ao ISSQN"
     },
     {
      "t": "el",
      "nome": "retTrib",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/total/retTrib",
      "min": 0,
      "max": 1,
      "rotulo": "Retenção de Tributos Federais"
     },
     {
      "t": "el",
      "nome": "ISTot",
      "ns": "nfe",
      "tipo": "nfe:TISTot",
      "min": 0,
      "max": 1,
      "rotulo": "Valores totais da NF com Imposto Seletivo"
     },
     {
      "t": "el",
      "nome": "IBSCBSTot",
      "ns": "nfe",
      "tipo": "nfe:TIBSCBSMonoTot",
      "min": 0,
      "max": 1,
      "rotulo": "Valores totais da NF com IBS / CBS"
     },
     {
      "t": "el",
      "nome": "vNFTot",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor Total da NF considerando os impostos por fora IBS, CBS e IS"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/total/ICMSTot": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vBC",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "BC do ICMS"
     },
     {
      "t": "el",
      "nome": "vICMS",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor Total do ICMS"
     },
     {
      "t": "el",
      "nome": "vICMSDeson",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor Total do ICMS desonerado"
     },
     {
      "t": "el",
      "nome": "vFCPUFDest",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor total do ICMS relativo ao Fundo de Combate à Pobreza (FCP) para a UF de destino."
     },
     {
      "t": "el",
      "nome": "vICMSUFDest",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor total do ICMS de partilha para a UF do destinatário"
     },
     {
      "t": "el",
      "nome": "vICMSUFRemet",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor total do ICMS de partilha para a UF do remetente"
     },
     {
      "t": "el",
      "nome": "vFCP",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor Total do FCP (Fundo de Combate à Pobreza)."
     },
     {
      "t": "el",
      "nome": "vBCST",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "BC do ICMS ST"
     },
     {
      "t": "el",
      "nome": "vST",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor Total do ICMS ST"
     },
     {
      "t": "el",
      "nome": "vFCPST",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor Total do FCP (Fundo de Combate à Pobreza) retido por substituição tributária."
     },
     {
      "t": "el",
      "nome": "vFCPSTRet",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor Total do FCP (Fundo de Combate à Pobreza) retido anteriormente por substituição tributária."
     },
     {
      "t": "el",
      "nome": "qBCMono",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor total da quantidade tributada do ICMS monofásico próprio"
     },
     {
      "t": "el",
      "nome": "vICMSMono",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor total do ICMS monofásico próprio"
     },
     {
      "t": "el",
      "nome": "qBCMonoReten",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor total da quantidade tributada do ICMS monofásico sujeito a retenção"
     },
     {
      "t": "el",
      "nome": "vICMSMonoReten",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor total do ICMS monofásico sujeito a retenção"
     },
     {
      "t": "el",
      "nome": "qBCMonoRet",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor total da quantidade tributada do ICMS monofásico retido anteriormente"
     },
     {
      "t": "el",
      "nome": "vICMSMonoRet",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor do ICMS monofásico retido anteriormente"
     },
     {
      "t": "el",
      "nome": "vProd",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor Total dos produtos e serviços"
     },
     {
      "t": "el",
      "nome": "vFrete",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor Total do Frete"
     },
     {
      "t": "el",
      "nome": "vSeg",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor Total do Seguro"
     },
     {
      "t": "el",
      "nome": "vDesc",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor Total do Desconto"
     },
     {
      "t": "el",
      "nome": "vII",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor Total do II"
     },
     {
      "t": "el",
      "nome": "vIPI",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor Total do IPI"
     },
     {
      "t": "el",
      "nome": "vIPIDevol",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor Total do IPI devolvido. Deve ser informado quando preenchido o Grupo Tributos Devolvidos na emissão de nota finNFe=4 (devolução) nas operações com não contribuintes do IPI. Corresponde ao total da soma dos campos id: UA04."
     },
     {
      "t": "el",
      "nome": "vPIS",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do PIS"
     },
     {
      "t": "el",
      "nome": "vCOFINS",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do COFINS"
     },
     {
      "t": "el",
      "nome": "vOutro",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Outras Despesas acessórias"
     },
     {
      "t": "el",
      "nome": "vNF",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor Total da NF-e"
     },
     {
      "t": "el",
      "nome": "vTotTrib",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor estimado total de impostos federais, estaduais e municipais"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/total/ISSQNtot": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vServ",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Valor Total dos Serviços sob não-incidência ou não tributados pelo ICMS"
     },
     {
      "t": "el",
      "nome": "vBC",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Base de Cálculo do ISS"
     },
     {
      "t": "el",
      "nome": "vISS",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Valor Total do ISS"
     },
     {
      "t": "el",
      "nome": "vPIS",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Valor do PIS sobre serviços"
     },
     {
      "t": "el",
      "nome": "vCOFINS",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Valor do COFINS sobre serviços"
     },
     {
      "t": "el",
      "nome": "dCompet",
      "ns": "nfe",
      "tipo": "nfe:TData",
      "min": 1,
      "max": 1,
      "rotulo": "Data da prestação do serviço (AAAA-MM-DD)"
     },
     {
      "t": "el",
      "nome": "vDeducao",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Valor dedução para redução da base de cálculo"
     },
     {
      "t": "el",
      "nome": "vOutro",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Valor outras retenções"
     },
     {
      "t": "el",
      "nome": "vDescIncond",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Valor desconto incondicionado"
     },
     {
      "t": "el",
      "nome": "vDescCond",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Valor desconto condicionado"
     },
     {
      "t": "el",
      "nome": "vISSRet",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Valor Total Retenção ISS"
     },
     {
      "t": "el",
      "nome": "cRegTrib",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/total/ISSQNtot/cRegTrib",
      "min": 0,
      "max": 1,
      "rotulo": "Código do regime especial de tributação"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/total/ISSQNtot/cRegTrib": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6"
   ]
  },
  "nfe:TNFe/infNFe/total/retTrib": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vRetPIS",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Valor Retido de PIS"
     },
     {
      "t": "el",
      "nome": "vRetCOFINS",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Valor Retido de COFINS"
     },
     {
      "t": "el",
      "nome": "vRetCSLL",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Valor Retido de CSLL"
     },
     {
      "t": "el",
      "nome": "vBCIRRF",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Base de Cálculo do IRRF"
     },
     {
      "t": "el",
      "nome": "vIRRF",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Valor Retido de IRRF"
     },
     {
      "t": "el",
      "nome": "vBCRetPrev",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Base de Cálculo da Retenção da Previdêncica Social"
     },
     {
      "t": "el",
      "nome": "vRetPrev",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 0,
      "max": 1,
      "rotulo": "Valor da Retenção da Previdêncica Social"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TISTot": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vIS",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor Total do Imposto Seletivo"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TIBSCBSMonoTot": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vBCIBSCBS",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Total Base de Calculo"
     },
     {
      "t": "el",
      "nome": "gIBS",
      "ns": "nfe",
      "tipo": "nfe:TIBSCBSMonoTot/gIBS",
      "min": 0,
      "max": 1,
      "rotulo": "Totalização do IBS"
     },
     {
      "t": "el",
      "nome": "gCBS",
      "ns": "nfe",
      "tipo": "nfe:TIBSCBSMonoTot/gCBS",
      "min": 0,
      "max": 1,
      "rotulo": "Totalização da CBS"
     },
     {
      "t": "el",
      "nome": "gMono",
      "ns": "nfe",
      "tipo": "nfe:TIBSCBSMonoTot/gMono",
      "min": 0,
      "max": 1,
      "rotulo": "Totais da Monofasia"
     },
     {
      "t": "el",
      "nome": "gEstornoCred",
      "ns": "nfe",
      "tipo": "nfe:TIBSCBSMonoTot/gEstornoCred",
      "min": 0,
      "max": 1,
      "rotulo": "Totalização do estorno de crédito"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TIBSCBSMonoTot/gIBS": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "gIBSUF",
      "ns": "nfe",
      "tipo": "nfe:TIBSCBSMonoTot/gIBS/gIBSUF",
      "min": 1,
      "max": 1,
      "rotulo": "Totalização do IBS de competência da UF"
     },
     {
      "t": "el",
      "nome": "gIBSMun",
      "ns": "nfe",
      "tipo": "nfe:TIBSCBSMonoTot/gIBS/gIBSMun",
      "min": 1,
      "max": 1,
      "rotulo": "Totalização do IBS de competência Municipal"
     },
     {
      "t": "el",
      "nome": "vIBS",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor total do IBS"
     },
     {
      "t": "el",
      "nome": "vCredPres",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Total do Crédito Presumido"
     },
     {
      "t": "el",
      "nome": "vCredPresCondSus",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Total do Crédito Presumido Condição Suspensiva"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TIBSCBSMonoTot/gIBS/gIBSUF": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vDif",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Total do Diferimento"
     },
     {
      "t": "el",
      "nome": "vDevTrib",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Total de devoluções de tributos"
     },
     {
      "t": "el",
      "nome": "vIBSUF",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor total do IBS Estadual"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TIBSCBSMonoTot/gIBS/gIBSMun": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vDif",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Total do Diferimento"
     },
     {
      "t": "el",
      "nome": "vDevTrib",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Total de devoluções de tributos"
     },
     {
      "t": "el",
      "nome": "vIBSMun",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor total do IBS Municipal"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TIBSCBSMonoTot/gCBS": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vDif",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Total do Diferimento"
     },
     {
      "t": "el",
      "nome": "vDevTrib",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Total de devoluções de tributos"
     },
     {
      "t": "el",
      "nome": "vCBS",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor total da CBS"
     },
     {
      "t": "el",
      "nome": "vCredPres",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Total do Crédito Presumido"
     },
     {
      "t": "el",
      "nome": "vCredPresCondSus",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Total do Crédito Presumido Condição Suspensiva"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TIBSCBSMonoTot/gMono": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vIBSMono",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor total do IBS monofásico"
     },
     {
      "t": "el",
      "nome": "vCBSMono",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor total da CBS monofásica"
     },
     {
      "t": "el",
      "nome": "vIBSMonoReten",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor total do IBS monofásico sujeito a retenção"
     },
     {
      "t": "el",
      "nome": "vCBSMonoReten",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor total da CBS monofásica sujeita a retenção"
     },
     {
      "t": "el",
      "nome": "vIBSMonoRet",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do IBS monofásico retido anteriormente"
     },
     {
      "t": "el",
      "nome": "vCBSMonoRet",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da CBS monofásica retida anteriormente"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TIBSCBSMonoTot/gEstornoCred": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vIBSEstCred",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor total do IBS estornado"
     },
     {
      "t": "el",
      "nome": "vCBSEstCred",
      "ns": "nfe",
      "tipo": "nfe:TDec1302RTC",
      "min": 1,
      "max": 1,
      "rotulo": "Valor total da CBS estornada"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/transp": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "modFrete",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/transp/modFrete",
      "min": 1,
      "max": 1,
      "rotulo": "Modalidade do frete 0- Contratação do Frete por conta do Remetente (CIF); 1- Contratação do Frete por conta do destinatário/remetente (FOB); 2- Contratação do Frete por conta de terceiros; 3- Transporte próprio por conta do remetente; 4- Transporte próprio por conta do destinatário; 9- Sem Ocorrência de transporte."
     },
     {
      "t": "el",
      "nome": "transporta",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/transp/transporta",
      "min": 0,
      "max": 1,
      "rotulo": "Dados do transportador"
     },
     {
      "t": "el",
      "nome": "retTransp",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/transp/retTransp",
      "min": 0,
      "max": 1,
      "rotulo": "Dados da retenção ICMS do Transporte"
     },
     {
      "t": "esc",
      "min": 1,
      "max": 1,
      "itens": [
       {
        "t": "seq",
        "min": 0,
        "max": 1,
        "itens": [
         {
          "t": "el",
          "nome": "veicTransp",
          "ns": "nfe",
          "tipo": "nfe:TVeiculo",
          "min": 0,
          "max": 1,
          "rotulo": "Dados do veículo"
         },
         {
          "t": "el",
          "nome": "reboque",
          "ns": "nfe",
          "tipo": "nfe:TVeiculo",
          "min": 0,
          "max": 5,
          "rotulo": "Dados do reboque/Dolly (v2.0)"
         }
        ]
       },
       {
        "t": "el",
        "nome": "vagao",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/transp/vagao",
        "min": 0,
        "max": 1,
        "rotulo": "Identificação do vagão (v2.0)"
       },
       {
        "t": "el",
        "nome": "balsa",
        "ns": "nfe",
        "tipo": "nfe:TNFe/infNFe/transp/balsa",
        "min": 0,
        "max": 1,
        "rotulo": "Identificação da balsa (v2.0)"
       }
      ]
     },
     {
      "t": "el",
      "nome": "vol",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/transp/vol",
      "min": 0,
      "max": 5000,
      "rotulo": "Dados dos volumes"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/transp/modFrete": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3",
    "4",
    "9"
   ]
  },
  "nfe:TNFe/infNFe/transp/transporta": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "esc",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "CNPJ",
        "ns": "nfe",
        "tipo": "nfe:TCnpj",
        "min": 1,
        "max": 1,
        "rotulo": "CNPJ do transportador"
       },
       {
        "t": "el",
        "nome": "CPF",
        "ns": "nfe",
        "tipo": "nfe:TCpf",
        "min": 1,
        "max": 1,
        "rotulo": "CPF do transportador"
       }
      ]
     },
     {
      "t": "el",
      "nome": "xNome",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/transp/transporta/xNome",
      "min": 0,
      "max": 1,
      "rotulo": "Razão Social ou nome do transportador"
     },
     {
      "t": "el",
      "nome": "IE",
      "ns": "nfe",
      "tipo": "nfe:TIeDest",
      "min": 0,
      "max": 1,
      "rotulo": "Inscrição Estadual (v2.0)"
     },
     {
      "t": "el",
      "nome": "xEnder",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/transp/transporta/xEnder",
      "min": 0,
      "max": 1,
      "rotulo": "Endereço completo"
     },
     {
      "t": "el",
      "nome": "xMun",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/transp/transporta/xMun",
      "min": 0,
      "max": 1,
      "rotulo": "Nome do munícipio"
     },
     {
      "t": "el",
      "nome": "UF",
      "ns": "nfe",
      "tipo": "nfe:TUf",
      "min": 0,
      "max": 1,
      "rotulo": "Sigla da UF"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/transp/transporta/xNome": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 2
  },
  "nfe:TNFe/infNFe/transp/transporta/xEnder": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TNFe/infNFe/transp/transporta/xMun": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 1
  },
  "nfe:TNFe/infNFe/transp/retTransp": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "vServ",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do Serviço"
     },
     {
      "t": "el",
      "nome": "vBCRet",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "BC da Retenção do ICMS"
     },
     {
      "t": "el",
      "nome": "pICMSRet",
      "ns": "nfe",
      "tipo": "nfe:TDec_0302a04",
      "min": 1,
      "max": 1,
      "rotulo": "Alíquota da Retenção"
     },
     {
      "t": "el",
      "nome": "vICMSRet",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do ICMS Retido"
     },
     {
      "t": "el",
      "nome": "CFOP",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/transp/retTransp/CFOP",
      "min": 1,
      "max": 1,
      "rotulo": "Código Fiscal de Operações e Prestações"
     },
     {
      "t": "el",
      "nome": "cMunFG",
      "ns": "nfe",
      "tipo": "nfe:TCodMunIBGE",
      "min": 1,
      "max": 1,
      "rotulo": "Código do Município de Ocorrência do Fato Gerador (utilizar a tabela do IBGE)"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/transp/retTransp/CFOP": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[1,2,3,5,6,7]{1}[0-9]{3}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TVeiculo": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "placa",
      "ns": "nfe",
      "tipo": "nfe:TVeiculo/placa",
      "min": 1,
      "max": 1,
      "rotulo": "Placa do veículo (NT2011/004)"
     },
     {
      "t": "el",
      "nome": "UF",
      "ns": "nfe",
      "tipo": "nfe:TUf",
      "min": 0,
      "max": 1,
      "rotulo": "Sigla da UF"
     },
     {
      "t": "el",
      "nome": "RNTC",
      "ns": "nfe",
      "tipo": "nfe:TVeiculo/RNTC",
      "min": 0,
      "max": 1,
      "rotulo": "Registro Nacional de Transportador de Carga (ANTT)"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TVeiculo/placa": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[A-Z]{2,3}[0-9]{4}|[A-Z]{3,4}[0-9]{3}|[A-Z0-9]{7}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TVeiculo/RNTC": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 20
  },
  "nfe:TNFe/infNFe/transp/vagao": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 20
  },
  "nfe:TNFe/infNFe/transp/balsa": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 20
  },
  "nfe:TNFe/infNFe/transp/vol": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "qVol",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/transp/vol/qVol",
      "min": 0,
      "max": 1,
      "rotulo": "Quantidade de volumes transportados"
     },
     {
      "t": "el",
      "nome": "esp",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/transp/vol/esp",
      "min": 0,
      "max": 1,
      "rotulo": "Espécie dos volumes transportados"
     },
     {
      "t": "el",
      "nome": "marca",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/transp/vol/marca",
      "min": 0,
      "max": 1,
      "rotulo": "Marca dos volumes transportados"
     },
     {
      "t": "el",
      "nome": "nVol",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/transp/vol/nVol",
      "min": 0,
      "max": 1,
      "rotulo": "Numeração dos volumes transportados"
     },
     {
      "t": "el",
      "nome": "pesoL",
      "ns": "nfe",
      "tipo": "nfe:TDec_1203",
      "min": 0,
      "max": 1,
      "rotulo": "Peso líquido (em kg)"
     },
     {
      "t": "el",
      "nome": "pesoB",
      "ns": "nfe",
      "tipo": "nfe:TDec_1203",
      "min": 0,
      "max": 1,
      "rotulo": "Peso bruto (em kg)"
     },
     {
      "t": "el",
      "nome": "lacres",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/transp/vol/lacres",
      "min": 0,
      "max": 5000
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/transp/vol/qVol": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{1,15}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/transp/vol/esp": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TNFe/infNFe/transp/vol/marca": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TNFe/infNFe/transp/vol/nVol": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TNFe/infNFe/transp/vol/lacres": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "nLacre",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/transp/vol/lacres/nLacre",
      "min": 1,
      "max": 1,
      "rotulo": "Número dos Lacres"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/transp/vol/lacres/nLacre": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TNFe/infNFe/cobr": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "fat",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/cobr/fat",
      "min": 0,
      "max": 1,
      "rotulo": "Dados da fatura"
     },
     {
      "t": "el",
      "nome": "dup",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/cobr/dup",
      "min": 0,
      "max": 120,
      "rotulo": "Dados das duplicatas NT 2011/004"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/cobr/fat": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "nFat",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/cobr/fat/nFat",
      "min": 0,
      "max": 1,
      "rotulo": "Número da fatura"
     },
     {
      "t": "el",
      "nome": "vOrig",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor original da fatura"
     },
     {
      "t": "el",
      "nome": "vDesc",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor do desconto da fatura"
     },
     {
      "t": "el",
      "nome": "vLiq",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor líquido da fatura"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/cobr/fat/nFat": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TNFe/infNFe/cobr/dup": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "nDup",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/cobr/dup/nDup",
      "min": 0,
      "max": 1,
      "rotulo": "Número da duplicata"
     },
     {
      "t": "el",
      "nome": "dVenc",
      "ns": "nfe",
      "tipo": "nfe:TData",
      "min": 0,
      "max": 1,
      "rotulo": "Data de vencimento da duplicata (AAAA-MM-DD)"
     },
     {
      "t": "el",
      "nome": "vDup",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302Opc",
      "min": 1,
      "max": 1,
      "rotulo": "Valor da duplicata"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/cobr/dup/nDup": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 1
  },
  "nfe:TNFe/infNFe/pag": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "detPag",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/pag/detPag",
      "min": 1,
      "max": 100,
      "rotulo": "Grupo de detalhamento da forma de pagamento."
     },
     {
      "t": "el",
      "nome": "vTroco",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 0,
      "max": 1,
      "rotulo": "Valor do Troco."
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/pag/detPag": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "indPag",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/pag/detPag/indPag",
      "min": 0,
      "max": 1,
      "rotulo": "Indicador da Forma de Pagamento:0-Pagamento à Vista;1-Pagamento à Prazo;"
     },
     {
      "t": "el",
      "nome": "tPag",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/pag/detPag/tPag",
      "min": 1,
      "max": 1,
      "rotulo": "Forma de Pagamento:"
     },
     {
      "t": "el",
      "nome": "xPag",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/pag/detPag/xPag",
      "min": 0,
      "max": 1,
      "rotulo": "Descrição do Meio de Pagamento"
     },
     {
      "t": "el",
      "nome": "vPag",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor do Pagamento. Esta tag poderá ser omitida quando a tag tPag=90 (Sem Pagamento), caso contrário deverá ser preenchida."
     },
     {
      "t": "el",
      "nome": "dPag",
      "ns": "nfe",
      "tipo": "nfe:TData",
      "min": 0,
      "max": 1,
      "rotulo": "Data do Pagamento"
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "CNPJPag",
        "ns": "nfe",
        "tipo": "nfe:TCnpj",
        "min": 1,
        "max": 1,
        "rotulo": "CNPJ transacional do pagamento - Preencher informando o CNPJ do estabelecimento onde o pagamento foi processado/transacionado/recebido quando a emissão do documento fiscal ocorrer em estabelecimento distinto"
       },
       {
        "t": "el",
        "nome": "UFPag",
        "ns": "nfe",
        "tipo": "nfe:TUfEmi",
        "min": 1,
        "max": 1,
        "rotulo": "UF do CNPJ do estabelecimento onde o pagamento foi processado/transacionado/recebido."
       }
      ]
     },
     {
      "t": "el",
      "nome": "card",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/pag/detPag/card",
      "min": 0,
      "max": 1,
      "rotulo": "Grupo de Cartões, PIX, Boletos e outros Pagamentos Eletrônicos"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/pag/detPag/indPag": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1"
   ]
  },
  "nfe:TNFe/infNFe/pag/detPag/tPag": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{2}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/pag/detPag/xPag": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 2,
   "maxLength": 60
  },
  "nfe:TNFe/infNFe/pag/detPag/card": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "tpIntegra",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/pag/detPag/card/tpIntegra",
      "min": 1,
      "max": 1,
      "rotulo": "Tipo de Integração do processo de pagamento com o sistema de automação da empresa: 1 - Pagamento integrado com o sistema de automação da empresa (Ex.: equipamento TEF, Comércio Eletrônico, POS Integrado); 2 - Pagamento não integrado com o sistema de automação da empresa (Ex.: equipamento POS Simples)."
     },
     {
      "t": "el",
      "nome": "CNPJ",
      "ns": "nfe",
      "tipo": "nfe:TCnpj",
      "min": 0,
      "max": 1,
      "rotulo": "CNPJ da instituição de pagamento"
     },
     {
      "t": "el",
      "nome": "tBand",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/pag/detPag/card/tBand",
      "min": 0,
      "max": 1,
      "rotulo": "Bandeira da operadora de cartão"
     },
     {
      "t": "el",
      "nome": "cAut",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/pag/detPag/card/cAut",
      "min": 0,
      "max": 1,
      "rotulo": "Número de autorização da operação com cartões, PIX, boletos e outros pagamentos eletrônicos"
     },
     {
      "t": "el",
      "nome": "CNPJReceb",
      "ns": "nfe",
      "tipo": "nfe:TCnpj",
      "min": 0,
      "max": 1,
      "rotulo": "CNPJ do beneficiário do pagamento"
     },
     {
      "t": "el",
      "nome": "idTermPag",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/pag/detPag/card/idTermPag",
      "min": 0,
      "max": 1,
      "rotulo": "Identificador do terminal de pagamento"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/pag/detPag/card/tpIntegra": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "1",
    "2"
   ]
  },
  "nfe:TNFe/infNFe/pag/detPag/card/tBand": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{2}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/pag/detPag/card/cAut": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 128
  },
  "nfe:TNFe/infNFe/pag/detPag/card/idTermPag": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 40
  },
  "nfe:TNFe/infNFe/infIntermed": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "CNPJ",
      "ns": "nfe",
      "tipo": "nfe:TCnpj",
      "min": 1,
      "max": 1,
      "rotulo": "CNPJ do Intermediador da Transação (agenciador, plataforma de delivery, marketplace e similar) de serviços e de negócios."
     },
     {
      "t": "el",
      "nome": "idCadIntTran",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/infIntermed/idCadIntTran",
      "min": 1,
      "max": 1,
      "rotulo": "Identificador cadastrado no intermediador"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/infIntermed/idCadIntTran": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 2,
   "maxLength": 60
  },
  "nfe:TNFe/infNFe/infAdic": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "infAdFisco",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/infAdic/infAdFisco",
      "min": 0,
      "max": 1,
      "rotulo": "Informações adicionais de interesse do Fisco (v2.0)"
     },
     {
      "t": "el",
      "nome": "infCpl",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/infAdic/infCpl",
      "min": 0,
      "max": 1,
      "rotulo": "Informações complementares de interesse do Contribuinte"
     },
     {
      "t": "el",
      "nome": "obsCont",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/infAdic/obsCont",
      "min": 0,
      "max": 10,
      "rotulo": "Campo de uso livre do contribuinte informar o nome do campo no atributo xCampo e o conteúdo do campo no xTexto"
     },
     {
      "t": "el",
      "nome": "obsFisco",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/infAdic/obsFisco",
      "min": 0,
      "max": 10,
      "rotulo": "Campo de uso exclusivo do Fisco informar o nome do campo no atributo xCampo e o conteúdo do campo no xTexto"
     },
     {
      "t": "el",
      "nome": "procRef",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/infAdic/procRef",
      "min": 0,
      "max": 100,
      "rotulo": "Grupo de informações do processo referenciado"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/infAdic/infAdFisco": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 2000,
   "minLength": 1
  },
  "nfe:TNFe/infNFe/infAdic/infCpl": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 5000,
   "minLength": 1
  },
  "nfe:TNFe/infNFe/infAdic/obsCont": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "xTexto",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/infAdic/obsCont/xTexto",
      "min": 1,
      "max": 1
     }
    ]
   },
   "atributos": [
    {
     "nome": "xCampo",
     "uso": "required",
     "tipo": "nfe:TNFe/infNFe/infAdic/obsCont@xCampo"
    }
   ]
  },
  "nfe:TNFe/infNFe/infAdic/obsCont/xTexto": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TNFe/infNFe/infAdic/obsCont@xCampo": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 20
  },
  "nfe:TNFe/infNFe/infAdic/obsFisco": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "xTexto",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/infAdic/obsFisco/xTexto",
      "min": 1,
      "max": 1
     }
    ]
   },
   "atributos": [
    {
     "nome": "xCampo",
     "uso": "required",
     "tipo": "nfe:TNFe/infNFe/infAdic/obsFisco@xCampo"
    }
   ]
  },
  "nfe:TNFe/infNFe/infAdic/obsFisco/xTexto": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TNFe/infNFe/infAdic/obsFisco@xCampo": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 20
  },
  "nfe:TNFe/infNFe/infAdic/procRef": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "nProc",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/infAdic/procRef/nProc",
      "min": 1,
      "max": 1,
      "rotulo": "Indentificador do processo ou ato concessório"
     },
     {
      "t": "el",
      "nome": "indProc",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/infAdic/procRef/indProc",
      "min": 1,
      "max": 1,
      "rotulo": "Origem do processo, informar com: 0 - SEFAZ; 1 - Justiça Federal; 2 - Justiça Estadual; 3 - Secex/RFB; 4 - CONFAZ; 9 - Outros."
     },
     {
      "t": "el",
      "nome": "tpAto",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/infAdic/procRef/tpAto",
      "min": 0,
      "max": 1,
      "rotulo": "Tipo do ato concessório Para origem do Processo na SEFAZ (indProc=0), informar o tipo de ato concessório: 08 - Termo de Acordo; 10 - Regime Especial; 12 - Autorização específica; 14 - Ajuste SINIEF; 15 - Convênio ICMS."
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/infAdic/procRef/nProc": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TNFe/infNFe/infAdic/procRef/indProc": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "0",
    "1",
    "2",
    "3",
    "4",
    "9"
   ]
  },
  "nfe:TNFe/infNFe/infAdic/procRef/tpAto": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "08",
    "10",
    "12",
    "14",
    "15"
   ]
  },
  "nfe:TNFe/infNFe/exporta": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "UFSaidaPais",
      "ns": "nfe",
      "tipo": "nfe:TUfEmi",
      "min": 1,
      "max": 1,
      "rotulo": "Sigla da UF de Embarque ou de transposição de fronteira"
     },
     {
      "t": "el",
      "nome": "xLocExporta",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/exporta/xLocExporta",
      "min": 1,
      "max": 1,
      "rotulo": "Local de Embarque ou de transposição de fronteira"
     },
     {
      "t": "el",
      "nome": "xLocDespacho",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/exporta/xLocDespacho",
      "min": 0,
      "max": 1,
      "rotulo": "Descrição do local de despacho"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/exporta/xLocExporta": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TNFe/infNFe/exporta/xLocDespacho": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TNFe/infNFe/compra": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "xNEmp",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/compra/xNEmp",
      "min": 0,
      "max": 1,
      "rotulo": "Informação da Nota de Empenho de compras públicas (NT2011/004)"
     },
     {
      "t": "el",
      "nome": "xPed",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/compra/xPed",
      "min": 0,
      "max": 1,
      "rotulo": "Informação do pedido"
     },
     {
      "t": "el",
      "nome": "xCont",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/compra/xCont",
      "min": 0,
      "max": 1,
      "rotulo": "Informação do contrato"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/compra/xNEmp": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 22
  },
  "nfe:TNFe/infNFe/compra/xPed": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TNFe/infNFe/compra/xCont": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TNFe/infNFe/cana": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "safra",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/cana/safra",
      "min": 1,
      "max": 1,
      "rotulo": "Identificação da safra"
     },
     {
      "t": "el",
      "nome": "ref",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/cana/ref",
      "min": 1,
      "max": 1,
      "rotulo": "Mês e Ano de Referência, formato: MM/AAAA"
     },
     {
      "t": "el",
      "nome": "forDia",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/cana/forDia",
      "min": 1,
      "max": 31,
      "rotulo": "Fornecimentos diários",
      "unicos": [
       {
        "atributo": "dia"
       }
      ]
     },
     {
      "t": "el",
      "nome": "qTotMes",
      "ns": "nfe",
      "tipo": "nfe:TDec_1110v",
      "min": 1,
      "max": 1,
      "rotulo": "Total do mês"
     },
     {
      "t": "el",
      "nome": "qTotAnt",
      "ns": "nfe",
      "tipo": "nfe:TDec_1110v",
      "min": 1,
      "max": 1,
      "rotulo": "Total Anterior"
     },
     {
      "t": "el",
      "nome": "qTotGer",
      "ns": "nfe",
      "tipo": "nfe:TDec_1110v",
      "min": 1,
      "max": 1,
      "rotulo": "Total Geral"
     },
     {
      "t": "el",
      "nome": "deduc",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/cana/deduc",
      "min": 0,
      "max": 10,
      "rotulo": "Deduções - Taxas e Contribuições"
     },
     {
      "t": "el",
      "nome": "vFor",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor dos fornecimentos"
     },
     {
      "t": "el",
      "nome": "vTotDed",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor Total das Deduções"
     },
     {
      "t": "el",
      "nome": "vLiqFor",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "Valor Líquido dos fornecimentos"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/cana/safra": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 4,
   "maxLength": 9
  },
  "nfe:TNFe/infNFe/cana/ref": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "(0[1-9]|1[0-2])([/][2][0-9][0-9][0-9])"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/cana/forDia": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "qtde",
      "ns": "nfe",
      "tipo": "nfe:TDec_1110v",
      "min": 1,
      "max": 1,
      "rotulo": "Quantidade em quilogramas - peso líquido"
     }
    ]
   },
   "atributos": [
    {
     "nome": "dia",
     "uso": "required",
     "tipo": "nfe:TNFe/infNFe/cana/forDia@dia"
    }
   ]
  },
  "nfe:TNFe/infNFe/cana/forDia@dia": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[1-9]|[1][0-9]|[2][0-9]|[3][0-1]"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe/cana/deduc": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "xDed",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/cana/deduc/xDed",
      "min": 1,
      "max": 1,
      "rotulo": "Descrição da Dedução"
     },
     {
      "t": "el",
      "nome": "vDed",
      "ns": "nfe",
      "tipo": "nfe:TDec_1302",
      "min": 1,
      "max": 1,
      "rotulo": "valor da dedução"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/cana/deduc/xDed": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 60
  },
  "nfe:TInfRespTec": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "CNPJ",
      "ns": "nfe",
      "tipo": "nfe:TCnpjOpc",
      "min": 1,
      "max": 1,
      "rotulo": "CNPJ"
     },
     {
      "t": "el",
      "nome": "xContato",
      "ns": "nfe",
      "tipo": "nfe:TInfRespTec/xContato",
      "min": 1,
      "max": 1,
      "rotulo": "Informar o nome da pessoa a ser contatada na empresa desenvolvedora do sistema utilizado na emissão do documento fiscal eletrônico."
     },
     {
      "t": "el",
      "nome": "email",
      "ns": "nfe",
      "tipo": "nfe:TInfRespTec/email",
      "min": 1,
      "max": 1,
      "rotulo": "Informar o e-mail da pessoa a ser contatada na empresa desenvolvedora do sistema."
     },
     {
      "t": "el",
      "nome": "fone",
      "ns": "nfe",
      "tipo": "nfe:TInfRespTec/fone",
      "min": 1,
      "max": 1,
      "rotulo": "Informar o telefone da pessoa a ser contatada na empresa desenvolvedora do sistema. Preencher com o Código DDD + número do telefone."
     },
     {
      "t": "seq",
      "min": 0,
      "max": 1,
      "itens": [
       {
        "t": "el",
        "nome": "idCSRT",
        "ns": "nfe",
        "tipo": "nfe:TInfRespTec/idCSRT",
        "min": 1,
        "max": 1,
        "rotulo": "Identificador do CSRT utilizado para montar o hash do CSRT"
       },
       {
        "t": "el",
        "nome": "hashCSRT",
        "ns": "nfe",
        "tipo": "nfe:TInfRespTec/hashCSRT",
        "min": 1,
        "max": 1,
        "rotulo": "O hashCSRT é o resultado da função hash (SHA-1 – Base64) do CSRT fornecido pelo fisco mais a Chave de Acesso da NFe."
       }
      ]
     }
    ]
   },
   "atributos": []
  },
  "nfe:TInfRespTec/xContato": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 60,
   "minLength": 2
  },
  "nfe:TInfRespTec/email": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 6,
   "maxLength": 60
  },
  "nfe:TInfRespTec/fone": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{6,14}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TInfRespTec/idCSRT": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{2}"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TInfRespTec/hashCSRT": {
   "t": "s",
   "nativo": "xs:base64Binary",
   "length": 20
  },
  "nfe:TNFe/infNFe/infSolicNFF": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "xSolic",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/infSolicNFF/xSolic",
      "min": 1,
      "max": 1,
      "rotulo": "Solicitação do pedido de emissão da NFF"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/infSolicNFF/xSolic": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 2,
   "maxLength": 5000
  },
  "nfe:TNFe/infNFe/agropecuario": {
   "t": "c",
   "conteudo": {
    "t": "esc",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "defensivo",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/agropecuario/defensivo",
      "min": 1,
      "max": 20,
      "rotulo": "Defensivo Agrícola / Agrotóxico"
     },
     {
      "t": "el",
      "nome": "guiaTransito",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/agropecuario/guiaTransito",
      "min": 1,
      "max": 1,
      "rotulo": "Guias De Trânsito de produtos agropecurários animais, vegetais e de origem florestal."
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/agropecuario/defensivo": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "nReceituario",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/agropecuario/defensivo/nReceituario",
      "min": 1,
      "max": 1,
      "rotulo": "Número do Receituário ou Receita do Defensivo / Agrotóxico"
     },
     {
      "t": "el",
      "nome": "CPFRespTec",
      "ns": "nfe",
      "tipo": "nfe:TCpf",
      "min": 1,
      "max": 1,
      "rotulo": "CPF do Responsável Técnico pelo receituário"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/agropecuario/defensivo/nReceituario": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "maxLength": 30,
   "minLength": 1
  },
  "nfe:TNFe/infNFe/agropecuario/guiaTransito": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "tpGuia",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/agropecuario/guiaTransito/tpGuia",
      "min": 1,
      "max": 1,
      "rotulo": "Tipo da Guia: 1 - GTA; 2 - TTA; 3 - DTA; 4 - ATV; 5 - PTV; 6 - GTV; 7 - Guia Florestal (DOF, SisFlora - PA e MT, SIAM - MG)"
     },
     {
      "t": "el",
      "nome": "UFGuia",
      "ns": "nfe",
      "tipo": "nfe:TUfEmi",
      "min": 1,
      "max": 1
     },
     {
      "t": "el",
      "nome": "serieGuia",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/agropecuario/guiaTransito/serieGuia",
      "min": 0,
      "max": 1,
      "rotulo": "Série da Guia"
     },
     {
      "t": "el",
      "nome": "nGuia",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/agropecuario/guiaTransito/nGuia",
      "min": 1,
      "max": 1,
      "rotulo": "Número da Guia"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/agropecuario/guiaTransito/tpGuia": {
   "t": "s",
   "nativo": "xs:string",
   "whiteSpace": "preserve",
   "enumeracao": [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7"
   ]
  },
  "nfe:TNFe/infNFe/agropecuario/guiaTransito/serieGuia": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 1,
   "maxLength": 9
  },
  "nfe:TNFe/infNFe/agropecuario/guiaTransito/nGuia": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[0-9]{1,9}"
    ]
   ]
  },
  "nfe:TNFe/infNFe/infPAA": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "CNPJPAA",
      "ns": "nfe",
      "tipo": "nfe:TCnpj",
      "min": 1,
      "max": 1,
      "rotulo": "CNPJ do Provedor de Assinatura e Autorização"
     },
     {
      "t": "el",
      "nome": "PAASignature",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFe/infPAA/PAASignature",
      "min": 1,
      "max": 1,
      "rotulo": "Assinatura RSA do Emitente para DFe gerados por PAA"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFe/infPAA/PAASignature": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "SignatureValue",
      "ns": "nfe",
      "tipo": "xs:base64Binary",
      "min": 1,
      "max": 1,
      "rotulo": "Assinatura digital padrão RSA"
     },
     {
      "t": "el",
      "nome": "RSAKeyValue",
      "ns": "nfe",
      "tipo": "nfe:TRSAKeyValueType",
      "min": 1,
      "max": 1,
      "rotulo": "Chave Publica no padrão XML RSA Key"
     }
    ]
   },
   "atributos": []
  },
  "nfe:TRSAKeyValueType": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "Modulus",
      "ns": "nfe",
      "tipo": "xs:base64Binary",
      "min": 1,
      "max": 1
     },
     {
      "t": "el",
      "nome": "Exponent",
      "ns": "nfe",
      "tipo": "xs:base64Binary",
      "min": 1,
      "max": 1
     }
    ]
   },
   "atributos": []
  },
  "nfe:TVerNFe": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "4\\.00"
    ]
   ],
   "whiteSpace": "preserve"
  },
  "nfe:TNFe/infNFe@Id": {
   "t": "s",
   "nativo": "xs:ID",
   "padroes": [
    [
     "NFe[0-9]{6}[0-9A-Z]{12}[0-9]{26}"
    ]
   ]
  },
  "nfe:TNFe/infNFeSupl": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "qrCode",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFeSupl/qrCode",
      "min": 1,
      "max": 1,
      "rotulo": "Texto com o QR-Code impresso no DANFE NFC-e"
     },
     {
      "t": "el",
      "nome": "urlChave",
      "ns": "nfe",
      "tipo": "nfe:TNFe/infNFeSupl/urlChave",
      "min": 1,
      "max": 1,
      "rotulo": "Informar a URL da \"Consulta por chave de acesso da NFC-e\". A mesma URL que deve estar informada no DANFE NFC-e para consulta por chave de acesso."
     }
    ]
   },
   "atributos": []
  },
  "nfe:TNFe/infNFeSupl/qrCode": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "((HTTPS?|https?)://.*\\?chNFe=[0-9]{6}[0-9A-Z]{12}[0-9]{26}&nVersao=100&tpAmb=[1-2](&cDest=([A-Za-z0-9.:+-/)(]{0}|[A-Za-z0-9.:+-/)(]{5,20})?)?&dhEmi=[A-Fa-f0-9]{50}&vNF=(0|0\\.[0-9]{2}|[1-9]{1}[0-9]{0,12}(\\.[0-9]{2})?)&vICMS=(0|0\\.[0-9]{2}|[1-9]{1}[0-9]{0,12}(\\.[0-9]{2})?)&digVal=[A-Fa-f0-9]{56}&cIdToken=[0-9]{6}&cHashQRCode=[A-Fa-f0-9]{40})",
     "((HTTPS?|https?)://.*\\?p=([0-9]{6}[0-9A-Z]{12}[0-9]{16}(1|3|4)[0-9]{9})\\|[2]\\|[1-2]\\|(0|[1-9]{1}([0-9]{1,5})?)\\|[A-Fa-f0-9]{40})",
     "((HTTPS?|https?)://.*\\?p=([0-9]{6}[0-9A-Z]{12}[0-9]{16}9[0-9]{9})\\|[2]\\|[1-2]\\|([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-1]{1})\\|(0|0\\.[0-9]{2}|[1-9]{1}[0-9]{0,12}(\\.[0-9]{2})?)\\|[A-Fa-f0-9]{56}\\|(0|[1-9]{1}([0-9]{1,5})?)\\|[A-Fa-f0-9]{40})",
     "((HTTPS?|https?)://.*\\?p=([0-9]{6}[0-9A-Z]{12}[0-9]{16}(1|3|4)[0-9]{9})\\|[3]\\|[1-2])",
     "((HTTPS?|https?)://.*\\?p=([0-9]{6}[0-9A-Z]{12}[0-9]{16}(9)[0-9]{9})\\|[3]\\|[1-2]\\|([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-1]{1})\\|(0|0\\.[0-9]{2}|[1-9]{1}[0-9]{0,12}(\\.[0-9]{2})?)\\|((1|2|3)?)\\|((([0-9A-Z]{12}[0-9]{2})|([0-9]{11}))?)\\|([a-zA-Z0-9+/]+[=]{0,2}))"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 60,
   "maxLength": 1000
  },
  "nfe:TNFe/infNFeSupl/urlChave": {
   "t": "s",
   "nativo": "xs:string",
   "padroes": [
    [
     "[!-ÿ]{1}[ -ÿ]{0,}[!-ÿ]{1}|[!-ÿ]{1}"
    ]
   ],
   "whiteSpace": "preserve",
   "minLength": 21,
   "maxLength": 85
  },
  "ds:SignatureType": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "SignedInfo",
      "ns": "ds",
      "tipo": "ds:SignedInfoType",
      "min": 1,
      "max": 1
     },
     {
      "t": "el",
      "nome": "SignatureValue",
      "ns": "ds",
      "tipo": "ds:SignatureValueType",
      "min": 1,
      "max": 1
     },
     {
      "t": "el",
      "nome": "KeyInfo",
      "ns": "ds",
      "tipo": "ds:KeyInfoType",
      "min": 1,
      "max": 1
     }
    ]
   },
   "atributos": [
    {
     "nome": "Id",
     "uso": "optional",
     "tipo": "xs:ID"
    }
   ]
  },
  "ds:SignedInfoType": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "CanonicalizationMethod",
      "ns": "ds",
      "tipo": "ds:SignedInfoType/CanonicalizationMethod",
      "min": 1,
      "max": 1
     },
     {
      "t": "el",
      "nome": "SignatureMethod",
      "ns": "ds",
      "tipo": "ds:SignedInfoType/SignatureMethod",
      "min": 1,
      "max": 1
     },
     {
      "t": "el",
      "nome": "Reference",
      "ns": "ds",
      "tipo": "ds:ReferenceType",
      "min": 1,
      "max": 1
     }
    ]
   },
   "atributos": [
    {
     "nome": "Id",
     "uso": "optional",
     "tipo": "xs:ID"
    }
   ]
  },
  "ds:SignedInfoType/CanonicalizationMethod": {
   "t": "c",
   "conteudo": null,
   "atributos": [
    {
     "nome": "Algorithm",
     "uso": "required",
     "fixo": "http://www.w3.org/TR/2001/REC-xml-c14n-20010315",
     "tipo": "xs:anyURI"
    }
   ]
  },
  "ds:SignedInfoType/SignatureMethod": {
   "t": "c",
   "conteudo": null,
   "atributos": [
    {
     "nome": "Algorithm",
     "uso": "required",
     "fixo": "http://www.w3.org/2000/09/xmldsig#rsa-sha1",
     "tipo": "xs:anyURI"
    }
   ]
  },
  "ds:ReferenceType": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "Transforms",
      "ns": "ds",
      "tipo": "ds:TransformsType",
      "min": 1,
      "max": 1,
      "unicos": [
       {
        "atributo": "Algorithm"
       }
      ]
     },
     {
      "t": "el",
      "nome": "DigestMethod",
      "ns": "ds",
      "tipo": "ds:ReferenceType/DigestMethod",
      "min": 1,
      "max": 1
     },
     {
      "t": "el",
      "nome": "DigestValue",
      "ns": "ds",
      "tipo": "ds:DigestValueType",
      "min": 1,
      "max": 1
     }
    ]
   },
   "atributos": [
    {
     "nome": "Id",
     "uso": "optional",
     "tipo": "xs:ID"
    },
    {
     "nome": "URI",
     "uso": "required",
     "tipo": "ds:ReferenceType@URI"
    },
    {
     "nome": "Type",
     "uso": "optional",
     "tipo": "xs:anyURI"
    }
   ]
  },
  "ds:TransformsType": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "Transform",
      "ns": "ds",
      "tipo": "ds:TransformType",
      "min": 2,
      "max": 2
     }
    ]
   },
   "atributos": []
  },
  "ds:TransformType": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 0,
    "max": null,
    "itens": [
     {
      "t": "el",
      "nome": "XPath",
      "ns": "ds",
      "tipo": "xs:string",
      "min": 1,
      "max": 1
     }
    ]
   },
   "atributos": [
    {
     "nome": "Algorithm",
     "uso": "required",
     "tipo": "ds:TTransformURI"
    }
   ]
  },
  "ds:TTransformURI": {
   "t": "s",
   "nativo": "xs:anyURI",
   "enumeracao": [
    "http://www.w3.org/2000/09/xmldsig#enveloped-signature",
    "http://www.w3.org/TR/2001/REC-xml-c14n-20010315"
   ]
  },
  "ds:ReferenceType/DigestMethod": {
   "t": "c",
   "conteudo": null,
   "atributos": [
    {
     "nome": "Algorithm",
     "uso": "required",
     "fixo": "http://www.w3.org/2000/09/xmldsig#sha1",
     "tipo": "xs:anyURI"
    }
   ]
  },
  "ds:DigestValueType": {
   "t": "s",
   "nativo": "xs:base64Binary"
  },
  "ds:ReferenceType@URI": {
   "t": "s",
   "nativo": "xs:anyURI",
   "minLength": 2
  },
  "ds:SignatureValueType": {
   "t": "c",
   "conteudo": null,
   "atributos": [
    {
     "nome": "Id",
     "uso": "optional",
     "tipo": "xs:ID"
    }
   ],
   "texto": "xs:base64Binary"
  },
  "ds:KeyInfoType": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "X509Data",
      "ns": "ds",
      "tipo": "ds:X509DataType",
      "min": 1,
      "max": 1
     }
    ]
   },
   "atributos": [
    {
     "nome": "Id",
     "uso": "optional",
     "tipo": "xs:ID"
    }
   ]
  },
  "ds:X509DataType": {
   "t": "c",
   "conteudo": {
    "t": "seq",
    "min": 1,
    "max": 1,
    "itens": [
     {
      "t": "el",
      "nome": "X509Certificate",
      "ns": "ds",
      "tipo": "xs:base64Binary",
      "min": 1,
      "max": 1
     }
    ]
   },
   "atributos": []
  }
 }
}
