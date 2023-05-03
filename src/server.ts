import fastify from 'fastify'

const app = fastify()

app.get('/', () => {
  return 'hello'
})

app
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log(`Server running`)
  })
