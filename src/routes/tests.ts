import { FastifyInstance } from 'fastify';
import { Tests } from '@prisma/client';

import {
  createTestService,
  getAllTestsService,
  testByIdService,
  updateTestService,
  deleteTestService
} from '../services/tests';

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.post<{ Body: Omit<Tests, 'id'> }>('/test', async (request, reply) => {
    const data = request.body;
    reply.code(200).send(await createTestService(fastify, data));
  });

  fastify.get('/tests', async (request, reply) => {
    reply.code(200).send(await getAllTestsService(fastify));
  });

  fastify.get<{ Params: { id: string } }>('/test/:id', async (request, reply) => {
    const id = request.params.id;
    reply.code(200).send(await testByIdService(fastify, id));
  });

  fastify.put<{ Params: { id: string }; Body: Omit<Tests, 'id'> }>('/test/:id', async (request, reply) => {
    const id = request.params.id;
    const data = request.body;
    reply.code(200).send(await updateTestService(fastify, id, data));
  });

  fastify.delete<{ Params: { id: string } }>('/test/:id', async (request, reply) => {
    const id = request.params.id;
    reply.code(204).send(await deleteTestService(fastify, id));
  });
};
