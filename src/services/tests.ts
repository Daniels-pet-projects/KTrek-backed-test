import { FastifyInstance } from 'fastify';
import { Tests } from '@prisma/client';

import {
  createTestRepository,
  getAllTestsRepository,
  testByIdRepository,
  updateTestRepository,
  deleteTestRepository
} from '../repositories/tests';

export async function createTestService(fastify: FastifyInstance, data: Omit<Tests, 'id'>): Promise<Tests> {
  return await createTestRepository(fastify, data);
}

export async function getAllTestsService(fastify: FastifyInstance): Promise<Tests[]> {
  return await getAllTestsRepository(fastify);
}

export async function testByIdService(fastify: FastifyInstance, id: string): Promise<Tests> {
  return await testByIdRepository(fastify, id);
}

export async function updateTestService(
  fastify: FastifyInstance,
  id: string,
  data: Omit<Tests, 'id'>
): Promise<Tests> {
  return await updateTestRepository(fastify, id, data);
}

export async function deleteTestService(fastify: FastifyInstance, id: string): Promise<void> {
  return await deleteTestRepository(fastify, id);
}

export default {
  createTestService,
  getAllTestsService,
  testByIdService,
  updateTestService,
  deleteTestService
};
