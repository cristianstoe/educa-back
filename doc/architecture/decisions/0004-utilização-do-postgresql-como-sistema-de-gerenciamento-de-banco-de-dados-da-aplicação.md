# 4. Utilização do PostgreSQL como Sistema de Gerenciamento de Banco de Dados da aplicação.

Date: 2023-05-15

## Status

Accepted

## Context

Na discussão para decidirmos qual SGBD iriamos utilizar no projeto, algumas alternativas foram apresentadas à mesa, sendo elas:
* MongoDB
* PostgreSQL
* Redis

O primeiro apresentado foi o MongoDB, uma opção NoSQL para o sistema. O segundo foi o PostgreSQL, que acabou sendo nossa escolha final. Finalmente, foi oferecida a possibilidade de utilizar o Redis como um banco de dados auxiliar para melhorar o desempenho, uma vez que ele armazena os dados diretamente na memória e é capaz de gerenciar grandes volumes de informações de forma altamente eficiente.

## Decision

Sobre a primeira opção, o MongoDB, alguns pontos fizeram com que ele não fosse escolhido, como:
Sem suporte a ACID: O MongoDB suporta apenas transações em nível de documento em uma única instância e não suporta transações distribuídas, o que pode ser um problema em nossa aplicação.
Esquema rígido: Queremos trabalhar com um esquema mais rígido de dados, o que o MongoDB não ofereceria;
Integração com outras ferramentas: Em termos de experiência, a equipe estava mais acostumada em usar ferramentas (como ORMs) com SGBDs relacionais, o que seria algo a mais para aprender se fosse escolhido o MongoDB.

Escolhemos o PostgreSQL pelos seguintes motivos: 
* Maior conhecimento: Todos os membros da equipe tem mais conhecimento de PostgreSQL do que qualquer outro banco, tendo em vista que utilizamos ele para projetos de matérias passadas;
* Suporte a ACID: O PostgreSQL é um banco de dados relacional que suporta transações ACID (Atomicidade, Consistência, Isolamento e Durabilidade). Então o PostgreSQL garante que as transações sejam executadas com sucesso ou revertidas completamente em caso de falha, garantindo que os dados estejam sempre em um estado consistente;
* Escalabilidade: O PostgreSQL é altamente escalável, permitindo que você aumente a capacidade de processamento e armazenamento do seu banco de dados à medida que sua aplicação cresce.

Acabamos não escolhendo o Redis como SGDB auxiliar devido à falta de conhecimento pleno por parte da equipe, o deixando fora do escopo do projeto.

## Consequences

### Pontos positivos:
* Alguns membros tem certa experiência com a tecnologia; 
* Uma fácil construção da modelagem e esquema do banco;
* Suporte a ACID.

### Pontos negativos:
* A complexidade do SGBD é alta;
* Falta de conhecimento de alguns membros em como configurar o ambiente.
