import fastify from 'fastify'
import { classRoutes } from './api/routes/class'
import { UsersRoute } from './api/routes/user'
import { cursoRoutes } from './api/routes/cursos'
import { trailRoutes } from './api/routes/trails'

const app = fastify()
app.register(require('@fastify/swagger'))

app.register(require('@fastify/swagger-ui'), {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next()
    },
    preHandler: function (request, reply, next) {
      next()
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject
  },
  transformSpecificationClone: true,
})

// Registrar as rotas
app.register(classRoutes)
app.register(UsersRoute)
app.register(cursoRoutes)
app.register(trailRoutes)

const start = async () => {
  try {
    await app.listen({
      port: 3000,
    })
    console.log('Server running')
  } catch (err) {
    console.error('Error starting server:', err)
  }
}

app.ready()

start()
