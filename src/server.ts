import fastify from 'fastify'

const app = fastify()
const configurarRotas = require('./api/routes/trails')
const classRoutes = require('./api/routes/class')

// registrar a rota
app.register(configurarRotas)
app.register(classRoutes)

app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log(`Server running`)
  })
