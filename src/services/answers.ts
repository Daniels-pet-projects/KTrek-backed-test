import { FastifyInstance } from 'fastify';
import { Answers } from '@prisma/client';

import {
  createAnswerRepository,
  getAllAnswersRepository,
  answerByIdRepository,
  updateAnswerRepository,
  deleteAnswerRepository
} from '../repositories/answers';

export async function createAnswerService(
  fastify: FastifyInstance,
  data: Omit<Answers, 'id'>
): Promise<Answers> {
  return await createAnswerRepository(fastify, data);
}

export async function getAllAnswersService(fastify: FastifyInstance): Promise<Answers[]> {
  return await getAllAnswersRepository(fastify);
}

export async function answerByIdService(fastify: FastifyInstance, id: string): Promise<Answers> {
  return await answerByIdRepository(fastify, id);
}

export async function updateAnswerService(
  fastify: FastifyInstance,
  id: string,
  data: Omit<Answers, 'id'>
): Promise<Answers> {
  return await updateAnswerRepository(fastify, id, data);
}

export async function deleteAnswerService(fastify: FastifyInstance, id: string): Promise<void> {
  return await deleteAnswerRepository(fastify, id);
}

export default {
  createAnswerService,
  getAllAnswersService,
  answerByIdService,
  updateAnswerService,
  deleteAnswerService
};
