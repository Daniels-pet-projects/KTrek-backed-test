import { FastifyInstance } from 'fastify';
import { Answers } from '@prisma/client';

import {
  createAnswerService,
  getAllAnswersService,
  answerByIdService,
  updateAnswerService,
  deleteAnswerService
} from '../services/answers';

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.post<{ Body: Omit<Answers, 'id'> }>('/answer', async (request, reply) => {
    const data = request.body;
    reply.code(200).send(await createAnswerService(fastify, data));
  });

  fastify.get('/answer', async (request, reply) => {
    reply.code(200).send(await getAllAnswersService(fastify));
  });

  fastify.get<{ Params: { id: string } }>('/answer/:id', async (request, reply) => {
    const id = request.params.id;
    reply.code(200).send(await answerByIdService(fastify, id));
  });

  fastify.put<{ Params: { id: string }; Body: Omit<Answers, 'id'> }>(
    '/answer/:id',
    async (request, reply) => {
      const id = request.params.id;
      const data = request.body;
      reply.code(200).send(await updateAnswerService(fastify, id, data));
    }
  );

  fastify.delete<{ Params: { id: string } }>('/answer/:id', async (request, reply) => {
    const id = request.params.id;
    reply.code(204).send(await deleteAnswerService(fastify, id));
  });
};
