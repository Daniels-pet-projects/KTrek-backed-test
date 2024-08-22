import 'dotenv/config';
import Fastify from 'fastify';
import { name } from '../package.json';

const APP_PORT = process.env.APP_PORT;
const APP_HOST = process.env.APP_HOST;

const fastify = Fastify({
  logger: true
});

fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.status(500).send({ error: 'Internal Server Error' });
});

fastify.get('/', (request, reply) => {
  reply.status(200).send({ message: `Welcome to ${ name } API` });
});

async function start() {
  try {
    if (require.main === module) {
      await fastify.listen({
        port: Number(APP_PORT),
        host: String(APP_HOST)
      });
    }
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

start();
