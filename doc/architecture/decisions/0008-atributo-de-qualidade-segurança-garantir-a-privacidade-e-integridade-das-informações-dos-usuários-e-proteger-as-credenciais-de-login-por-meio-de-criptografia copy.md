# 8. Atributo de qualidade - Segurança: garantir a privacidade e integridade das informações dos usuários e proteger as credenciais de login por meio de criptografia.

Date: 2023-05-15

## Status

Accepted

## Context

Durante a fase de análise de requisitos, identificamos a necessidade de garantir a segurança das informações dos usuários da plataforma. Para isso, é preciso considerar as seguintes alternativas:
Utilizar criptografia de ponta a ponta para proteger as informações dos usuários
Armazenar os dados dos usuários em servidores seguros e com backups regulares
Implementar medidas de proteção contra ataques cibernéticos, como SQL injection, que visam obter informações que deveriam ser acessadas apenas pelo usuário que as forneceu e/ou o sistema.

## Decision

Foi decidido que a segurança dos dados dos usuários será uma prioridade para o desenvolvimento da plataforma, por meio da utilização de criptografia de ponta a ponta para proteger as informações dos usuários e armazená-las em servidores seguros e com backups regulares. Além disso, serão implementadas medidas de proteção contra ataques cibernéticos assim como testes a fim de garantir a segurança da informação de ponta a ponta.

## Consequences

Ao adotar medidas de segurança para a plataforma, podemos esperar as seguintes consequências:
### Pontos positivos:
* Garantia da privacidade e integridade das informações dos usuários
* Aumento da confiança dos usuários na plataforma
* Melhoria da reputação da empresa

### Pontos negativos:
* Aumento da complexidade do desenvolvimento e manutenção da plataforma
* Possível impacto na performance da aplicação em decorrência das medidas de segurança adotadas.
