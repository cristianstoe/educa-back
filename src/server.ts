import fastify from 'fastify'
import { classRoutes } from './api/routes/class'
import { UsersRoute } from './api/routes/user'
import { cursoRoutes } from './api/routes/cursos'
import { trailRoutes } from './api/routes/trails'
import dotenv from 'dotenv'
import fastifyCors from '@fastify/cors' // Import the '@fastify/cors' plugin with the correct package name

dotenv.config()

const app = fastify()

// Register the '@fastify/cors' plugin to enable CORS
app.register(fastifyCors, {
  origin: '*', // Set this to allow requests from any origin. For production, use a specific origin or list of origins.
  methods: ['GET', 'PUT', 'POST', 'DELETE'], // Set the allowed HTTP methods.
  allowedHeaders: ['Content-Type', 'Authorization'], // Set the allowed request headers.
})

app.register(require('@fastify/swagger'))

// Rest of your route registrations...
app.register(classRoutes)
app.register(UsersRoute)
app.register(cursoRoutes)
app.register(trailRoutes)

app.listen(process.env.PORT || 3000, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
