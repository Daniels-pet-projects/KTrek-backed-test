import { FastifyInstance } from 'fastify';
import { Questions } from '@prisma/client';

import {
  createQuestionRepository,
  getAllQuestionsRepository,
  questionByIdRepository,
  updateQuestionRepository,
  deleteQuestionRepository
} from '../repositories/questions';

export async function createQuestionService(
  fastify: FastifyInstance,
  data: Omit<Questions, 'id'>
): Promise<Questions> {
  return await createQuestionRepository(fastify, data);
}

export async function getAllQuestionsService(fastify: FastifyInstance): Promise<Questions[]> {
  return await getAllQuestionsRepository(fastify);
}

export async function questionByIdService(fastify: FastifyInstance, id: string): Promise<Questions> {
  return await questionByIdRepository(fastify, id);
}

export async function updateQuestionService(
  fastify: FastifyInstance,
  id: string,
  data: Omit<Questions, 'id'>
): Promise<Questions> {
  return await updateQuestionRepository(fastify, id, data);
}

export async function deleteQuestionService(fastify: FastifyInstance, id: string): Promise<void> {
  return await deleteQuestionRepository(fastify, id);
}

export default {
  createQuestionService,
  getAllQuestionsService,
  questionByIdService,
  updateQuestionService,
  deleteQuestionService
};
