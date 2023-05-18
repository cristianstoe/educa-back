import fastify from 'fastify'
import { classRoutes } from './api/routes/class'
import { UsersRoute } from './api/routes/user'
import { cursoRoutes } from './api/routes/cursos'
import { trailRoutes } from './api/routes/trails'

const app = fastify()

// registrar a rota
app.register(classRoutes)
app.register(UsersRoute)
app.register(cursoRoutes)
app.register(trailRoutes)

app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log(`Server running`)
  })
