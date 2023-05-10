import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

interface Aula {
  Nome: string
  Texto: string
  Video: string
  Audio: string
  Tags: string
}

function classRoutes(app, options, done) {
  app.get('/classes', async (request, reply) => {
    const classes = await prisma.aula.findMany({
      where: { Publicado: true },
    })
    reply.send(classes)
  })

  // const upsertUser = await prisma.user.upsert({
  //   where: {
  //     Nome: 'viola@prisma.io',
  //     where: { title: 'Prisma Adds Support for MongoDB' },
  //   },
  //   create: {
  //     email: 'viola@prisma.io',
  //     name: 'Viola the Magnificent',
  //   },
  // })

  app.post('/classes', async (request, reply) => {
    const { Nome, Texto, Video, Audio, Tags } = request.body
    const classes: Aula = await prisma.aula.create({
      data: {
        Nome,
        Texto,
        Video,
        Audio,
        Tags,
      },
    })
    reply.send(classes)
  })

  app.put('/classes/:ID', async (request, reply) => {
    let { ID } = request.params
    ID = parseInt(ID)
    const { Nome, Texto, Video, Audio, Tags } = request.body

    const classes: Aula = await prisma.aula.update({
      where: {
        ID,
      },
      data: {
        Nome,
        Texto,
        Video,
        Audio,
        Tags,
      },
    })
    reply.send(classes)
  })

  app.delete('/classes/:ID', async (request, reply) => {
    let { ID } = request.params
    ID = parseInt(ID)
    const classes: Aula = await prisma.aula.delete({
      where: {
        ID,
      },
    })
    reply.send(classes)
  })

  done()
}
module.exports = classRoutes
