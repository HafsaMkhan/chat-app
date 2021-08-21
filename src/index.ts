import fastify from 'fastify'
import { dbConnector } from './helpers'
require('dotenv').config()

const server = fastify({
  logger: true,
  ignoreTrailingSlash: true,
  onProtoPoisoning: 'remove',
});
server.register(dbConnector);

const port = process.env.PORT || 5000
server.get('/', async (request, reply) => {
  return { hello: 'world' }
})

const start = async () => {
  try {
    await server.listen(port)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start();