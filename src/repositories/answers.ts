import { FastifyInstance } from 'fastify';
import { Answers } from '@prisma/client';

export async function createAnswerRepository(
  fastify: FastifyInstance,
  data: Omit<Answers, 'id'>
): Promise<Answers> {
  const answer = await fastify.prisma.answers.create({ data });

  return answer;
}

export async function getAllAnswersRepository(fastify: FastifyInstance): Promise<Answers[]> {
  const answers = await fastify.prisma.answers.findMany();

  return answers;
}

export async function answerByIdRepository(fastify: FastifyInstance, id: string): Promise<Answers> {
  const answer = await fastify.prisma.answers.findUnique({ where: { id } });

  if (!answer) {
    throw new Error(`Answer with id ${id} not found`);
  }

  return answer;
}

export async function updateAnswerRepository(
  fastify: FastifyInstance,
  id: string,
  data: Omit<Answers, 'id'>
): Promise<Answers> {
  const updatedAnswer = await fastify.prisma.answers.update({
    where: { id },
    data
  });

  if (!updatedAnswer) {
    throw new Error(`Answer with id ${id} not found`);
  }

  return updatedAnswer;
}

export async function deleteAnswerRepository(fastify: FastifyInstance, id: string): Promise<void> {
  await fastify.prisma.answers.delete({ where: { id } });
}

export default {
  createAnswerRepository,
  getAllAnswersRepository,
  answerByIdRepository,
  updateAnswerRepository,
  deleteAnswerRepository
};
