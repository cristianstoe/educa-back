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
    const { ID } = request.params
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
    const errors = []

    // Verificar o nome
    if (Nome.length > 40) {
      errors.push('Name exceeds maximum length of 40 characters')
    }

    // Verificar o e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|br|org|net)$/
    if (!emailRegex.test(Email)) {
      errors.push('Invalid email format')
    }

    // Verificar a senha
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/
    if (!passwordRegex.test(Senha)) {
      errors.push('Invalid password format')
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(Senha, salt)

    const user = await prisma.usuario.findFirst({ where: { Email } })
    if (user) {
      errors.push('User already exists')
    }

    // check if username already exists
    const username = await prisma.usuario.findFirst({ where: { Username } })
    if (username) {
      errors.push('Username already exists')
    }

    if (errors.length > 0) {
      return reply.code(400).send({ errors })
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
    if (!valid) {
      return reply.code(400).send({ message: 'Invalid email or password' })
    }

    // Sign in user and generate token
    const token = jwt.sign({ userId: user.ID }, process.env.SECRET_KEY, {
      expiresIn: '24h',
    })

    // Retorna o token gerado para o usuário
    return reply.code(200).send({ token })
  })

  // update user
  app.put('/users/:ID', async (request, reply) => {
    const { ID } = request.params
    const { Nome, Email, Senha, CPF, Username, Celular } = request.body

    const user = await prisma.usuario.findUnique({
      where: {
        ID,
      },
    })

    if (!user) {
      return reply
        .code(404)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ message: 'User not found' })
    }

    const data = {
      Nome,
      Email,
      CPF,
      Username,
      Celular,
      Senha,
    }

    if (Senha) {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(Senha, salt)
      data.Senha = hash
    }

    const updatedUser = await prisma.usuario.update({
      where: {
        ID,
      },
      data,
    })

    reply.code(200).send(updatedUser)
  })

  // delete user
  app.delete('/users/:ID', async (request, reply) => {
    const { ID } = request.params
    const user = await prisma.usuario.findUnique({
      where: {
        ID,
      },
    })
    if (!user) {
      reply
        .code(404)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ message: 'User not found' })
    }

    const deletedUser = await prisma.usuario.delete({
      where: {
        ID,
      },
    })
    reply.code(200).send(deletedUser)
  })

  done()
}
