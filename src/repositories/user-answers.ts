import { FastifyInstance } from 'fastify';
import { UserAnswers } from '@prisma/client';

export async function createUserAnswerRepository(
  fastify: FastifyInstance,
  data: Omit<UserAnswers, 'id'>
): Promise<UserAnswers> {
  const userAnswer = await fastify.prisma.userAnswers.create({ data });

  return userAnswer;
}

export async function getAllUserAnswersRepository(fastify: FastifyInstance): Promise<UserAnswers[]> {
  const userAnswers = await fastify.prisma.userAnswers.findMany();

  return userAnswers;
}

export async function userAnswerByIdRepository(fastify: FastifyInstance, id: string): Promise<UserAnswers> {
  const userAnswer = await fastify.prisma.userAnswers.findUnique({ where: { id } });

  if (!userAnswer) {
    throw new Error(`User answer with id ${id} not found`);
  }

  return userAnswer;
}

export async function updateUserAnswerRepository(
  fastify: FastifyInstance,
  id: string,
  data: Omit<UserAnswers, 'id'>
): Promise<UserAnswers> {
  const updatedUserAnswer = await fastify.prisma.userAnswers.update({
    where: { id },
    data
  });

  if (!updatedUserAnswer) {
    throw new Error(`User answer with id ${id} not found`);
  }

  return updatedUserAnswer;
}

export async function deleteUserAnswerRepository(fastify: FastifyInstance, id: string): Promise<void> {
  await fastify.prisma.userAnswers.delete({ where: { id } });
}

export default {
  createUserAnswerRepository,
  getAllUserAnswersRepository,
  userAnswerByIdRepository,
  updateUserAnswerRepository,
  deleteUserAnswerRepository
};
