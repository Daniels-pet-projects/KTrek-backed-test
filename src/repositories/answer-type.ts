import { FastifyInstance } from 'fastify';
import { AnswerType } from '@prisma/client';

export async function createAnswerTypeRepository(
  fastify: FastifyInstance,
  data: Omit<AnswerType, 'id'>
): Promise<AnswerType> {
  const AnswerType = await fastify.prisma.answerType.create({ data });

  return AnswerType;
}

export async function getAllAnswerTypesRepository(fastify: FastifyInstance): Promise<AnswerType[]> {
  const answerTypes = await fastify.prisma.answerType.findMany();

  return answerTypes;
}

export async function answerTypeByIdRepository(fastify: FastifyInstance, id: string): Promise<AnswerType> {
  const answerType = await fastify.prisma.answerType.findUnique({ where: { id } });

  if (!answerType) {
    throw new Error(`Answer type with id ${id} not found`);
  }

  return answerType;
}

export async function updateAnswerTypeRepository(
  fastify: FastifyInstance,
  id: string,
  data: Omit<AnswerType, 'id'>
): Promise<AnswerType> {
  const updatedAnswerType = await fastify.prisma.answerType.update({
    where: { id },
    data
  });

  if (!updatedAnswerType) {
    throw new Error(`Answer type with id ${id} not found`);
  }

  return updatedAnswerType;
}

export async function deleteAnswerTypeRepository(fastify: FastifyInstance, id: string): Promise<void> {
  await fastify.prisma.answerType.delete({ where: { id } });
}

export default {
  createAnswerTypeRepository,
  getAllAnswerTypesRepository,
  answerTypeByIdRepository,
  updateAnswerTypeRepository,
  deleteAnswerTypeRepository
};
