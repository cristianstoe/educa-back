import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

interface Aula {
  Nome: string
  Tags: string
}

export function classRoutes(app, options, done) {
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
    const { ID } = request.params
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
    const {
      Nome,
      CursoID,
      TAssunto,
      TConteudo,
      AAssunto,
      AConteudo,
      VAssunto,
      VConteudo,
      Tags,
    } = request.body
    const newClass: Aula = await prisma.aula.create({
      data: {
        Nome,
        CursoID,
        Tags,
        Texto: {
          create: {
            Assunto: TAssunto,
            Conteudo: TConteudo,
          },
        },
        Audio: {
          create: {
            Assunto: AAssunto,
            Conteudo: AConteudo,
          },
        },
        Video: {
          create: {
            Assunto: VAssunto,
            Conteudo: VConteudo,
          },
        },
      },
    })
    reply.send(newClass)
  })

  // update class
  app.put('/classes/:ID', async (request, reply) => {
    const { ID } = request.params
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
    const { ID } = request.params
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

  // get specific properties of a class by id
  app.get('/classes/:ID/properties', async (request, reply) => {
    const { ID } = request.params
    try {
      const classes = await prisma.aula.findUnique({
        where: {
          ID,
        },
        select: {
          Nome: true,
          CursoID: true,
          Texto: {
            select: {
              Assunto: true,
              Conteudo: true,
            },
          },
          Audio: {
            select: {
              Assunto: true,
              Conteudo: true,
            },
          },
          Video: {
            select: {
              Assunto: true,
              Conteudo: true,
            },
          },
          Tags: true,
        },
      })

      if (!classes) {
        reply
          .code(404)
          .header('Content-Type', 'application/json; charset=utf-8')
          .send({ message: 'Class not found' })
      }

      reply.code(200).send(classes)
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
