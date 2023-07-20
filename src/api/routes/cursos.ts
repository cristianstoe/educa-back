import { Prisma, PrismaClient } from '@prisma/client'
import fastify from 'fastify'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const prisma = new PrismaClient()
const app = fastify({ logger: true })

interface Curso {
  Nome: string
  Tipo: string
}

export function cursoRoutes(app, options, done) {
  // get all cursos
  app.get('/cursos', async (request, reply) => {
    const cursos = await prisma.curso.findMany()
    reply.send(cursos)
  })

  // get curso by id
  app.get('/cursos/:ID', async (request, reply) => {
    const { ID } = request.params
    const cursos = await prisma.curso.findUnique({
      where: {
        ID,
      },
    })
    if (!cursos) {
      reply
        .code(404)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ message: 'Curso not found' })
    }
    reply.code(200).send(cursos)
  })

  // create new curso
  app.post('/cursos', async (request, reply) => {
    const { Nome, Tipo } = request.body as Curso
    const authHeader = request.headers.authorization
    if (!authHeader) {
      return reply.code(401).send({ message: 'Missing authorization header' })
    }
    const token = authHeader.split(' ')[1]
    // console.log(token)
    try {
      console.log(token)
      const { userId } = jwt.verify(token, process.env.SECRET_KEY)

      // Verificar se o nome possui entre 5 e 50 letras
      if (Nome.length < 5 || Nome.length > 50) {
        return reply
          .code(400)
          .send({ message: 'O nome deve ter entre 5 e 50 letras' })
      }

      // Verificar se o tipo possui entre 5 e 30 letras
      if (Tipo.length < 5 || Tipo.length > 30) {
        return reply
          .code(400)
          .send({ message: 'O tipo deve ter entre 5 e 30 letras' })
      }

      // Verificar se o usuário existe
      const userExists = await prisma.usuario.findUnique({
        where: { ID: userId },
      })
      if (!userExists) {
        return reply.code(404).send({ message: 'Usuário não encontrado' })
      }

      const curso = await prisma.curso.create({
        data: {
          Nome,
          Tipo,
          Usuario: { connect: { ID: userId } },
        },
      })

      return reply.code(201).send(curso)
    } catch (error) {
      return reply.code(401).send({ message: 'Token inválido' }, error)
    }
  }) // Closing the app.post route handler here

  // update curso
  app.put('/cursos/:ID', async (request, reply) => {
    // ... (existing code for the route handler)
  })

  // delete curso
  app.delete('/cursos/:ID', async (request, reply) => {
    // ... (existing code for the route handler)
  })

  done()
}
