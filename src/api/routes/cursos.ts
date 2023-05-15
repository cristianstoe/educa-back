import { Prisma, PrismaClient } from '@prisma/client'
import fastify from 'fastify'

const prisma = new PrismaClient()
const app = fastify({ logger: true })