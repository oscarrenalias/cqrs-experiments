// application models
const models = require('./app/models')

// Events from Kafka
const events = require('./app/events')

// Routes
const routes = require('./app/routes')

// Run the server!
const start = async () => {
  try {
    await events.eventLoop();

    await routes.fastify.listen(8000)
    routes.fastify.log.info(`server listening on ${routes.fastify.server.address().port}`)
  } catch (err) {
    routes.fastify.log.error(err)
    process.exit(1)
  }
}
start()