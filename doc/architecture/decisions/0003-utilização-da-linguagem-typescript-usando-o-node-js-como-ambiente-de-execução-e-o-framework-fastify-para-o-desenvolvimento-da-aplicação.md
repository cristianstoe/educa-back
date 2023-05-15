# 3. Utilização da linguagem TypeScript, usando o Node.js como ambiente de execução e o framework Fastify para o desenvolvimento da aplicação.

Date: 2023-05-15

## Status

Accepted

## Context

Foi necessário escolher a linguagem de programação e o ambiente de execução para o desenvolvimento do back-end da nossa aplicação. As opções consideradas foram:

Linguagem de programação: TypeScript, JavaScript, Python, Ruby.
Ambiente de execução: Node.js, Python, Ruby.
A aplicação precisa ser capaz de lidar com alta demanda de tráfego e armazenar grande quantidade de dados de forma segura e confiável. Além disso, a equipe já possuía familiaridade com TypeScript e JavaScript.

## Decision

Foi decidido utilizar a linguagem TypeScript com o ambiente de execução Node.js e o framework Fastify para o desenvolvimento do back-end da aplicação.

A escolha pelo TypeScript se deu por ser uma linguagem que adiciona um nível extra de segurança ao código, tornando-o mais fácil de manter e escalar. Além disso, TypeScript é uma linguagem tipada, o que ajuda a prevenir erros comuns de digitação.

O Node.js foi escolhido como ambiente de execução por ser uma plataforma popular para o desenvolvimento de aplicações web e possuir uma vasta comunidade de desenvolvedores, além de possuir recursos avançados para lidar com grande quantidade de dados.

O Fastify foi escolhido como framework por ser extremamente rápido e eficiente, possuindo alto desempenho e suportando a escalabilidade horizontal.

## Consequences

A utilização de TypeScript com Node.js e Fastify permite um desenvolvimento mais rápido e seguro do back-end da aplicação.
A equipe precisará de familiaridade com TypeScript e Fastify, o que pode demandar um tempo para treinamento e aprendizado.
Essa escolha pode tornar a aplicação menos compatível com outras linguagens e frameworks, o que pode dificultar a integração com outros sistemas no futuro.
