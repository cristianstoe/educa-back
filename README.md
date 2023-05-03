# educa-back

## Setup
### Docker - BD
```docker pull postgres```
```docker run --name educaBD -e POSTGRES_PASSWORD=senha -d postgres```
### Projeto
- ```npm install```
- ```npx prisma migrate dev --name init```
- Crie um .env no projeto e adicione
```DATABASE_URL="<url>"

Agora seja feliz
