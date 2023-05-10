import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

function configurarRotas(app, options, done) {
  app.get('/users', async (request, reply) => {
    const allUsersAndHobbies = await prisma.usuario.findMany({
      where: { Nome: 'Admin' },
    })
    reply.send(allUsersAndHobbies)
  })
  done()
}

module.exports = configurarRotas
