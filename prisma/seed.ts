import { PrismaClient } from '@prisma/client'

// initialize Prisma Client

const prisma = new PrismaClient()

async function main() {
  // create two dummy articles

  const post1 = await prisma.aula.upsert({
    where: { ID: '1' },

    update: {},

    create: {
      Nome: 'Teste 1',

      Texto: 'Teste 1',

      Audio: 'Teste 1',

      Video: 'Teste 1',

      Publicado: true,
    },
  })

  const post2 = await prisma.aula.upsert({
    where: { ID: '2' },

    update: {},

    create: {
      Nome: 'Teste 2',

      Texto: 'Teste 2',

      Audio: 'Teste 2',

      Video: 'Teste 2',

      Publicado: true,
    },
  })

  console.log({ post1, post2 })
}

// execute the main function

main()
  .catch((e) => {
    console.error(e)

    process.exit(1)
  })

  .finally(async () => {
    // close Prisma Client at the end

    await prisma.$disconnect()
  })
