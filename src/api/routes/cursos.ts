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
    let { ID } = request.params
    ID = parseInt(ID)
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

      const curso = await prisma.curso.create({
        data: {
          Nome,
          Tipo,
          Usuario: { connect: { ID: userId } },
        },
      })

      return reply.code(201).send(curso)
    } catch (error) {
      return reply.code(401).send({ message: 'Invalid token' }, error)
    }
  })
  done()
}
