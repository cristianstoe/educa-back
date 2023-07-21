# 9. Mudança de Banco de Dados: Troca do PostgreSQL para o SQLite

Date: 2023-07-16

## Status

Accepted

## Contexto

Durante a fase de análise de requisitos, foi identificada a necessidade de alterar o banco de dados utilizado pela plataforma. Inicialmente, planejamos utilizar o PostgreSQL para armazenar os dados. No entanto, após avaliar as restrições do ambiente de hospedagem, constatamos que o deploy com um container não é suportado, tornando inviável a utilização do PostgreSQL.

## Decisão

Diante da limitação do ambiente de hospedagem, decidimos migrar o banco de dados do PostgreSQL para o SQLite. Essa mudança permitirá que a plataforma seja implantada sem depender de um container, viabilizando a execução em um ambiente que ofereça suporte apenas ao SQLite. 

## Consequências

Ao realizar a migração do PostgreSQL para o SQLite, podemos esperar as seguintes consequências:

### Pontos positivos:
* A plataforma poderá ser implantada em um ambiente que suporte apenas o SQLite, sem a necessidade de depender de um container.
* A administração do banco de dados será simplificada, pois o SQLite é um banco de dados embutido e não requer um servidor separado para funcionar.
* O tamanho do banco de dados será menor, o que pode impactar positivamente no desempenho e na eficiência do armazenamento.
* A escolha do SQLite para exemplificação tornará mais acessível a compreensão da solução de armazenamento de dados.

### Pontos negativos:
* O SQLite pode não ser adequado para projetos que exijam alta escalabilidade ou concorrência, visto que não é um banco de dados cliente-servidor como o PostgreSQL.
* Poderá ser necessário adaptar consultas e comandos SQL, pois o SQLite possui algumas diferenças em relação ao PostgreSQL.

Em resumo, a mudança para o SQLite proporcionará uma alternativa viável ao PostgreSQL, permitindo que a plataforma seja implantada em um ambiente que não suporte o deploy com container, além de simplificar a administração e reduzir o tamanho do banco de dados. No entanto, é importante considerar as diferenças entre os dois bancos de dados e suas respectivas limitações para garantir que essa mudança seja apropriada para o projeto.
