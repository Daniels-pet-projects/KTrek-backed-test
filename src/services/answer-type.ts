import { FastifyInstance } from 'fastify';
import { AnswerType } from '@prisma/client';

import {
  createAnswerTypeRepository,
  getAllAnswerTypesRepository,
  answerTypeByIdRepository,
  updateAnswerTypeRepository,
  deleteAnswerTypeRepository
} from '../repositories/answer-type';

export async function createAnswerTypeService(
  fastify: FastifyInstance,
  data: Omit<AnswerType, 'id'>
): Promise<AnswerType> {
  return await createAnswerTypeRepository(fastify, data);
}

export async function getAllAnswerTypesService(fastify: FastifyInstance): Promise<AnswerType[]> {
  return await getAllAnswerTypesRepository(fastify);
}

export async function answerTypeByIdService(fastify: FastifyInstance, id: string): Promise<AnswerType> {
  return await answerTypeByIdRepository(fastify, id);
}

export async function updateAnswerTypeService(
  fastify: FastifyInstance,
  id: string,
  data: Omit<AnswerType, 'id'>
): Promise<AnswerType> {
  return await updateAnswerTypeRepository(fastify, id, data);
}

export async function deleteAnswerTypeService(fastify: FastifyInstance, id: string): Promise<void> {
  return await deleteAnswerTypeRepository(fastify, id);
}

export default {
  createAnswerTypeService,
  getAllAnswerTypesService,
  answerTypeByIdService,
  updateAnswerTypeService,
  deleteAnswerTypeService
}
