import { FastifyInstance } from 'fastify';
import { UserAnswers } from '@prisma/client';

import {
  createUserAnswerRepository,
  getAllUserAnswersRepository,
  userAnswerByIdRepository,
  updateUserAnswerRepository,
  deleteUserAnswerRepository
} from '../repositories/user-answers';

export async function createUserAnswerService(
  fastify: FastifyInstance,
  data: Omit<UserAnswers, 'id'>
): Promise<UserAnswers> {
  return await createUserAnswerRepository(fastify, data);
}

export async function getAllUserAnswersService(fastify: FastifyInstance): Promise<UserAnswers[]> {
  return await getAllUserAnswersRepository(fastify);
}

export async function userAnswerByIdService(fastify: FastifyInstance, id: string): Promise<UserAnswers> {
  return await userAnswerByIdRepository(fastify, id);
}

export async function updateUserAnswerService(
  fastify: FastifyInstance,
  id: string,
  data: Omit<UserAnswers, 'id'>
): Promise<UserAnswers> {
  return await updateUserAnswerRepository(fastify, id, data);
}

export async function deleteUserAnswerService(fastify: FastifyInstance, id: string): Promise<void> {
  return await deleteUserAnswerRepository(fastify, id);
}

export default {
  createUserAnswerService,
  getAllUserAnswersService,
  userAnswerByIdService,
  updateUserAnswerService,
  deleteUserAnswerService
};
