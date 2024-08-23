import { FastifyInstance } from 'fastify';
import { UserAnswers } from '@prisma/client';

import {
  createUserAnswerService,
  getAllUserAnswersService,
  userAnswerByIdService,
  updateUserAnswerService,
  deleteUserAnswerService
} from '../services/user-answers';

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.post<{ Body: Omit<UserAnswers, 'id'> }>('/user-answer', async (request, reply) => {
    const data = request.body;
    reply.code(200).send(await createUserAnswerService(fastify, data));
  });

  fastify.get('/user-answers', async (request, reply) => {
    reply.code(200).send(await getAllUserAnswersService(fastify));
  });

  fastify.get<{ Params: { id: string } }>('/user-answer/:id', async (request, reply) => {
    const id = request.params.id;
    reply.code(200).send(await userAnswerByIdService(fastify, id));
  });

  fastify.put<{ Params: { id: string }; Body: Omit<UserAnswers, 'id'> }>(
    '/user-answer/:id',
    async (request, reply) => {
      const id = request.params.id;
      const data = request.body;
      reply.code(200).send(await updateUserAnswerService(fastify, id, data));
    }
  );

  fastify.delete<{ Params: { id: string } }>('/user-answer/:id', async (request, reply) => {
    const id = request.params.id;
    reply.code(204).send(await deleteUserAnswerService(fastify, id));
  });
};
