import { FastifyInstance } from 'fastify';
import { AttemptsPass } from '@prisma/client';

import {
  createAttemptsPassRepository,
  getAllAttemptsPassRepository,
  attemptsPassByIdRepository,
  updateAttemptsPassRepository,
  deleteAttemptsPassRepository
} from '../repositories/attempts-pass';

export async function createAttemptsPassService(
  fastify: FastifyInstance,
  data: Omit<AttemptsPass, 'id'>
): Promise<AttemptsPass> {
  return await createAttemptsPassRepository(fastify, data);
}

export async function getAllAttemptsPassService(fastify: FastifyInstance): Promise<AttemptsPass[]> {
  return await getAllAttemptsPassRepository(fastify);
}

export async function attemptsPassByIdService(fastify: FastifyInstance, id: string): Promise<AttemptsPass> {
  return await attemptsPassByIdRepository(fastify, id);
}

export async function updateAttemptsPassService(
  fastify: FastifyInstance,
  id: string,
  data: Omit<AttemptsPass, 'id'>
) {
  return await updateAttemptsPassRepository(fastify, id, data);
}

export async function deleteAttemptsPassService(fastify: FastifyInstance, id: string): Promise<void> {
  return await deleteAttemptsPassRepository(fastify, id);
}

export default {
  createAttemptsPassService,
  getAllAttemptsPassService,
  attemptsPassByIdService,
  updateAttemptsPassService,
  deleteAttemptsPassService
};
