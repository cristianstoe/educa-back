# 7. Padrão Arquitetural base utilizando padrão cliente-servidor.

Date: 2023-05-15

## Status

Accepted

## Context

Visando um projeto bem estruturado, de fácil entendimento e de fácil desenvolvimento, optamos por escolher a arquitetura cliente-servidor. O front-end será feito em AngularJS e o back-end em NodeJS. Assim, cada pessoa da equipe foi direcionada para suas tarefas. Não houve outra possibilidade mencionada.

## Decision

Levando em consideração o prazo do projeto, conhecimento da equipe e facilidade de encontrar conteúdo de apoio na internet, optamos por escolher AngularJS e NodeJS para o desenvolvimento do projeto na arquitetura cliente-servidor. Havia possibilidade de pensar em um modelo MVC, porém a equipe possui mais familiaridade com o modelo escolhido. Assim, conseguimos focar no que temos mais conhecimento e mais familiaridade.
## Consequences

### Pontos Positivos:
* Familiaridade da equipe com frameworks e linguagens escolhidas.
* Experiência no deploy de aplicações no modelo cliente-servidor.

### Pontos Negativos: 
* No modelo cliente-servidor, o servidor pode ficar sobrecarregado caso receba mais solicitações do que suporta, e tornar o sistema indisponível.
* Quanto mais clientes acessarem a aplicação, maior será a demanda para o servidor.
