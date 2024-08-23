import { FastifyInstance } from 'fastify';
import { AnswerType } from '@prisma/client';

import {
  createAnswerTypeService,
  getAllAnswerTypesService,
  answerTypeByIdService,
  updateAnswerTypeService,
  deleteAnswerTypeService
} from '../services/answer-type';

export default async (fastify: FastifyInstance): Promise<void> => {
  fastify.post<{ Body: Omit<AnswerType, 'id'> }>('/answer-type', async (request, reply) => {
    const data = request.body;
    reply.code(200).send(await createAnswerTypeService(fastify, data));
  });

  fastify.get('/answer-type', async (request, reply) => {
    reply.code(200).send(await getAllAnswerTypesService(fastify));
  });

  fastify.get<{ Params: { id: string } }>('/answer-type/:id', async (request, reply) => {
    const id = request.params.id;
    reply.code(200).send(await answerTypeByIdService(fastify, id));
  });

  fastify.put<{ Params: { id: string }; Body: Omit<AnswerType, 'id'> }>(
    '/answer-type/:id',
    async (request, reply) => {
      const id = request.params.id;
      const data = request.body;
      reply.code(200).send(await updateAnswerTypeService(fastify, id, data));
    }
  );

  fastify.delete<{ Params: { id: string } }>('/answer-type/:id', async (request, reply) => {
    const id = request.params.id;
    reply.code(204).send(await deleteAnswerTypeService(fastify, id));
  });
};
