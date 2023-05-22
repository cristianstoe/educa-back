# educa-back

## Setup
### Docker - BD
```docker pull postgres```
```docker run --name educaBD -e POSTGRES_PASSWORD=senha -d postgres```
### Projeto
- ```npm install```
- ```npx prisma migrate dev --name init```
- Crie um .env no projeto e adicione
- DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[name]?schema=public"
- SECRET_KEY=<key>
- Para rodar: ```npm run dev```
Agora seja feliz
