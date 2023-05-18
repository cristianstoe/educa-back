import { PrismaClient, Prisma } from '@prisma/client'
import jwt from 'jsonwebtoken'
const prisma = new PrismaClient()

interface Trilha {
  Nome: string
  UserN: string
  cursos: string[]
}

export function trailRoutes(app, options, done) {
  // get all trails
  app.get('/trails', async (request, reply) => {
    const trails = await prisma.trilha.findMany()
    reply.send(trails)
  })

  // get trail by id
  app.get('/trails/:ID', async (request, reply) => {
    const { ID } = request.params
    const trails = await prisma.trilha.findUnique({
      where: {
        ID,
      },
    })
    if (!trails) {
      reply
        .code(404)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ message: 'Trail not found' })
    }
    reply.code(200).send(trails)
  })

  // create new trail
  app.post('/trails', async (request, reply) => {
    const { Nome, cursos } = request.body as Trilha // Adicione 'cursos' ao desestruturar o corpo da solicitação

    const authHeader = request.headers.authorization
    if (!authHeader) {
      return reply.code(401).send({ message: 'Missing authorization header' })
    }
    const token = authHeader.split(' ')[1]

    try {
      const { userId } = jwt.verify(token, process.env.SECRET_KEY)
      const trail = await prisma.trilha.create({
        data: {
          Nome,
          Usuario: { connect: { ID: userId } },
          Cursos: {
            // Conecte os cursos à trilha
            create: cursos.map((curso) => ({
              Curso: { connect: { ID: curso.ID } },
            })),
          },
        },
        include: { Cursos: true }, // Inclua os cursos relacionados na resposta
      })

      reply.code(201).send(trail)
    } catch (error) {
      console.log(error)
      reply.code(401).send({ message: 'Invalid token' })
    }
  })

  // update trail by id
  app.put('/trails/:id', async (request, reply) => {
    const { id } = request.params
    const { Nome, cursos } = request.body as Trilha
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return reply.code(401).send({ message: 'Missing authorization header' })
    }
    const token = authHeader.split(' ')[1]
    try {
      const { userId } = jwt.verify(token, process.env.SECRET_KEY)
      const trailData = {
        Nome,
        Usuario: { connect: { ID: userId } },
      }

      if (cursos && cursos.length > 0) {
        trailData.Cursos = {
          deleteMany: {}, // Apagar todos os cursos existentes
          create: cursos.map((curso) => ({
            Curso: { connect: { ID: curso.ID } },
          })),
        }
      }

      const trail = await prisma.trilha.update({
        where: { ID: id },
        data: trailData,
        include: { Cursos: true },
      })

      reply.code(201).send(trail)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          reply
            .code(400)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ error: 'Internal error' })
        }
      }
    }
  })

  // delete trail by id
  app.delete('/trails/:id', async (request, reply) => {
    const { id } = request.params
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return reply.code(401).send({ message: 'Missing authorization header' })
    }
    const token = authHeader.split(' ')[1]
    try {
      const { userId } = jwt.verify(token, process.env.SECRET_KEY)
      const trail = await prisma.trilha.delete({
        where: { ID: id },
      })
      reply.code(201).send(trail)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          reply
            .code(400)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ error: 'Internal error' })
        }
      }
    }
  })
  done()
}
