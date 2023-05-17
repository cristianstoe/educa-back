import { PrismaClient, Prisma } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const prisma = new PrismaClient()

export function UsersRoute(app, options, done) {
  // get all users
  app.get('/users', async (request, reply) => {
    const users = await prisma.usuario.findMany()
    reply.send(users)
  })

  // get user by id
  app.get('/users/:ID', async (request, reply) => {
    let { ID } = request.params
    ID = parseInt(ID)
    const users = await prisma.usuario.findUnique({
      where: {
        ID,
      },
    })
    if (!users) {
      reply
        .code(404)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ message: 'User not found' })
    }
    reply.code(200).send(users)
  })

  // create new user
  app.post('/users', async (request, reply) => {
    const { Nome, Email, Senha, CPF, Username, Celular } = request.body
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(Senha, salt)

    const user = await prisma.usuario.findFirst({ where: { Email } })
    if (user) {
      return reply.code(400).send({ message: 'User already exists' })
    }

    // check if username already exists
    const username = await prisma.usuario.findFirst({ where: { Username } })
    if (username) {
      return reply.code(400).send({ message: 'Username already exists' })
    }
    try {
      const newUser = await prisma.usuario.create({
        data: {
          Nome,
          Email,
          Senha: hash,
          CPF,
          Username,
          Celular,
        },
      })
      return reply.code(201).send(newUser)
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          reply
            .code(400)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({ error: 'CPF already exists' })
        }
      }
    }
  })

  // login user
  app.post('/users/login', async (request, reply) => {
    const { Email, Senha } = request.body
    const user = await prisma.usuario.findFirst({ where: { Email } })
    if (!user) {
      return reply.code(400).send({ message: 'User not found' })
    }

    const valid = bcrypt.compareSync(Senha, user.Senha)
    console.log(valid)
    if (!valid) {
      return reply.code(400).send({ message: 'Invalid password' })
    }

    // Sign in user and generate token
    const token = jwt.sign({ userId: user.ID }, process.env.SECRET_KEY, {
      expiresIn: '3h',
    })

    // Retorna o token gerado para o usuário
    return reply.code(200).send({ token })
  })
  done()
}
