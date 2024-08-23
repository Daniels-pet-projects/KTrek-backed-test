import { FastifyInstance } from 'fastify';
import { Questions } from '@prisma/client';

import {
  createQuestionService,
  getAllQuestionsService,
  questionByIdService,
  updateQuestionService,
  deleteQuestionService
} from '../services/questions';

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.post<{ Body: Omit<Questions, 'id'> }>('/question', async (request, reply) => {
    const data = request.body;
    reply.code(200).send(await createQuestionService(fastify, data));
  });

  fastify.get('/questions', async (request, reply) => {
    reply.code(200).send(await getAllQuestionsService(fastify));
  });

  fastify.get<{ Params: { id: string } }>('/question/:id', async (request, reply) => {
    const id = request.params.id;
    reply.code(200).send(await questionByIdService(fastify, id));
  });

  fastify.put<{ Params: { id: string }; Body: Omit<Questions, 'id'> }>(
    '/question/:id',
    async (request, reply) => {
      const id = request.params.id;
      const data = request.body;
      reply.code(200).send(await updateQuestionService(fastify, id, data));
    }
  );

  fastify.delete<{ Params: { id: string } }>('/question/:id', async (request, reply) => {
    const id = request.params.id;
    reply.code(204).send(await deleteQuestionService(fastify, id));
  });
};
