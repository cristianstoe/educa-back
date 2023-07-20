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

      // Verificar se o nome possui entre 5 e 50 letras
      if (Nome.length < 5 || Nome.length > 50) {
        return reply
          .code(400)
          .send({ message: 'O nome deve ter entre 5 e 50 letras' })
      }

      // Verificar se o usuário existe
      const userExists = await prisma.usuario.findUnique({
        where: { ID: userId },
      })
      if (!userExists) {
        return reply.code(404).send({ message: 'Usuário não encontrado' })
      }

      // Verificar se há pelo menos 1 curso
      if (cursos.length < 1) {
        return reply
          .code(400)
          .send({ message: 'Deve haver pelo menos 1 curso na trilha' })
      }

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
      reply.code(401).send({ message: 'Token inválido' })
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
    } catch (error) {
      return reply.code(401).send(error)
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
      // Delete associated CursoNaTrilha records first
      await prisma.cursoNaTrilha.deleteMany({
        where: { TrilhaID: id },
      })
      // Delete the trail
      const trail = await prisma.trilha.delete({
        where: { ID: id },
      })
      reply.code(204).send(trail)
    } catch (e) {
      return reply.code(401).send(e)
    }
  })

  done()
}
