import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

interface Aula {
  Nome: string
  Texto: string
  Video: string
  Audio: string
  Tags: string
}

function classRoutes(app, options, done) {
  // get all classes publicadas
  app.get('/classes', async (request, reply) => {
    const classes = await prisma.aula.findMany({
      where: { Publicado: true },
    })
    reply.send(classes)
  })

  // get all classes
  app.get('/classes/all', async (request, reply) => {
    const classes = await prisma.aula.findMany()
    reply.send(classes)
  })

  // get all classes by tag
  app.get('/classes/tag/:tag', async (request, reply) => {
    const { tag } = request.params
    const classes = await prisma.aula.findMany({
      where: {
        Tags: {
          contains: tag,
        },
      },
    })
    reply.send(classes)
  })

  // get class by id
  app.get('/classes/:ID', async (request, reply) => {
    let { ID } = request.params
    ID = parseInt(ID)
    const classes = await prisma.aula.findUnique({
      where: {
        ID,
      },
    })
    if (!classes) {
      reply
        .code(404)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ message: 'Class not found' })
    }
    reply.code(200).send(classes)
  })

  // create new class
  app.post('/classes', async (request, reply) => {
    const { Nome, Texto, Video, Audio, Tags } = request.body
    // find if class already exists
    const newClass: Aula = await prisma.aula.create({
      data: {
        Nome,
        Texto,
        Video,
        Audio,
        Tags,
      },
    })
    reply.send(newClass)
  })

  // update class
  app.put('/classes/:ID', async (request, reply) => {
    let { ID } = request.params
    ID = parseInt(ID)
    const { Nome, Texto, Video, Audio, Tags } = request.body

    try {
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
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          reply
            .code(404)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ error: 'Class not found' })
        }
      }
    }
  })

  // delete class
  app.delete('/classes/:ID', async (request, reply) => {
    let { ID } = request.params
    ID = parseInt(ID)
    try {
      const classes: Aula = await prisma.aula.delete({
        where: {
          ID,
        },
      })
      reply.send(classes)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          reply
            .code(404)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ error: 'Class not found' })
        }
      }
    }
  })

  done()
}
module.exports = classRoutes
