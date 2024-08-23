import { FastifyInstance } from 'fastify';
import { Questions } from '@prisma/client';

export async function createQuestionRepository(
  fastify: FastifyInstance,
  data: Omit<Questions, 'id'>
): Promise<Questions> {
  const question = await fastify.prisma.questions.create({ data });

  return question;
}

export async function getAllQuestionsRepository(fastify: FastifyInstance): Promise<Questions[]> {
  const questions = await fastify.prisma.questions.findMany();

  return questions;
}

export async function questionByIdRepository(fastify: FastifyInstance, id: string): Promise<Questions> {
  const question = await fastify.prisma.questions.findUnique({ where: { id } });

  if (!question) {
    throw new Error(`Question with id ${id} not found`);
  }

  return question;
}

export async function updateQuestionRepository(
  fastify: FastifyInstance,
  id: string,
  data: Omit<Questions, 'id'>
): Promise<Questions> {
  const updatedQuestion = await fastify.prisma.questions.update({
    where: { id },
    data
  });

  if (!updatedQuestion) {
    throw new Error(`Question with id ${id} not found`);
  }

  return updatedQuestion;
}

export async function deleteQuestionRepository(fastify: FastifyInstance, id: string): Promise<void> {
  await fastify.prisma.questions.delete({ where: { id } });
}

export default {
  createQuestionRepository,
  getAllQuestionsRepository,
  questionByIdRepository,
  updateQuestionRepository,
  deleteQuestionRepository
};
