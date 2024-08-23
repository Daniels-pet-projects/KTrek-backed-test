import 'dotenv/config';
import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import fastifyRedis from '@fastify/redis';

export default fp(async (fastify: FastifyInstance) => {
  const REDIS_PORT = process.env.REDIS_PORT;
  const REDIS_HOST = process.env.REDIS_HOST;

  fastify.register(fastifyRedis, {
    host: String(REDIS_HOST),
    port: Number(REDIS_PORT)
  });
});
