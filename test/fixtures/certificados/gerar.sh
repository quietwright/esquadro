#!/bin/sh
# Gera os certificados de teste. Todos usam a mesma chave (chave.pem), para que a assinatura
# feita nos testes confira com qualquer um deles. Não têm valor jurídico nem cadeia ICP-Brasil.
# Uso: sh test/fixtures/certificados/gerar.sh (a partir da raiz do repositório)
set -e
cd "$(dirname "$0")"
[ -f chave.pem ] || openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out chave.pem

gerar() { # nome cn inicio fim extensões...
  nome=$1 cn=$2 inicio=$3 fim=$4
  shift 4
  {
    printf '[req]\ndistinguished_name = dn\nprompt = no\nx509_extensions = ext\n'
    printf '[dn]\nC = BR\nO = esquadro\nOU = Certificado de teste sem valor juridico\nCN = %s\n[ext]\n' "$cn"
    for e in "$@"; do printf '%s\n' "$e"; done
  } > /tmp/esquadro-cert.cnf
  openssl req -x509 -key chave.pem -out "$nome.pem" -config /tmp/esquadro-cert.cnf \
    -not_before "$inicio" -not_after "$fim" -sha256
  rm /tmp/esquadro-cert.cnf
}

USO='keyUsage = critical,digitalSignature,nonRepudiation,keyEncipherment'
FOLHA='basicConstraints = critical,CA:FALSE'
CNPJ='subjectAltName = otherName:2.16.76.1.3.3;OCTETSTRING:11222333000181'

gerar teste 'EMPRESA DE TESTE LTDA:11222333000181' 20260101000000Z 20360101000000Z "$FOLHA" "$USO" "$CNPJ"
gerar vencido 'EMPRESA DE TESTE LTDA:11222333000181' 20200101000000Z 20210101000000Z "$FOLHA" "$USO" "$CNPJ"
gerar ac 'AC DE TESTE' 20260101000000Z 20360101000000Z 'basicConstraints = critical,CA:TRUE' 'keyUsage = critical,digitalSignature,nonRepudiation,keyCertSign' "$CNPJ"
gerar sem-nao-repudio 'EMPRESA DE TESTE LTDA:11222333000181' 20260101000000Z 20360101000000Z "$FOLHA" 'keyUsage = critical,digitalSignature,keyEncipherment' "$CNPJ"
gerar sem-documento 'EMPRESA DE TESTE LTDA' 20260101000000Z 20360101000000Z "$FOLHA" "$USO"
gerar outra-empresa 'OUTRA EMPRESA LTDA:11444777000161' 20260101000000Z 20360101000000Z "$FOLHA" "$USO" 'subjectAltName = otherName:2.16.76.1.3.3;OCTETSTRING:11444777000161'
# Pessoa física: data de nascimento (8), CPF (11), NIS (11), RG (15), órgão emissor e UF (6).
gerar cpf 'FULANO DE TESTE:12345678909' 20260101000000Z 20360101000000Z "$FOLHA" "$USO" 'subjectAltName = otherName:2.16.76.1.3.1;OCTETSTRING:0101199012345678909000000000000000000000000000000000'
