import { FastifyInstance } from 'fastify';
import { AttemptsPass } from '@prisma/client';

import {
  createAttemptsPassService,
  getAllAttemptsPassService,
  attemptsPassByIdService,
  updateAttemptsPassService,
  deleteAttemptsPassService
} from '../services/attempts-pass';

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.post<{ Body: Omit<AttemptsPass, 'id'> }>('/attempts-pass', async (request, reply) => {
    const data = request.body;
    reply.code(200).send(await createAttemptsPassService(fastify, data));
  });

  fastify.get('/attempts-pass', async (request, reply) => {
    reply.code(200).send(await getAllAttemptsPassService(fastify));
  });

  fastify.get<{ Params: { id: string } }>('/attempts-pass/:id', async (request, reply) => {
    const id = request.params.id;
    reply.code(200).send(await attemptsPassByIdService(fastify, id));
  });

  fastify.put<{ Params: { id: string }; Body: Omit<AttemptsPass, 'id'> }>(
    '/attempts-pass/:id',
    async (request, reply) => {
      const id = request.params.id;
      const data = request.body;
      reply.code(200).send(await updateAttemptsPassService(fastify, id, data));
    }
  );

  fastify.delete<{ Params: { id: string } }>('/attempts-pass/:id', async (request, reply) => {
    const id = request.params.id;
    reply.code(204).send(await deleteAttemptsPassService(fastify, id));
  });
};
