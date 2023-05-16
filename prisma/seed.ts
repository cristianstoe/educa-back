import { PrismaClient } from '@prisma/client'
import { classes } from './seedclasses'

const prisma = new PrismaClient()

async function seed() {
  try {
    for (const aula of classes) {
      await prisma.aula.create({
        data: {
          Nome: aula.Nome,
          Texto: aula.Texto,
          Video: aula.Video,
          Audio: aula.Audio,
          Tags: aula.Tags,
        },
      })
    }

    console.log('Dados populados com sucesso!')
  } catch (error) {
    console.error('Erro ao popular dados:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seed()
