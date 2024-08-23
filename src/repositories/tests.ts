import { FastifyInstance } from 'fastify';
import { Tests } from '@prisma/client';

export async function createTestRepository(
  fastify: FastifyInstance,
  data: Omit<Tests, 'id'>
): Promise<Tests> {
  const test = await fastify.prisma.tests.create({ data });

  return test;
}

export async function getAllTestsRepository(fastify: FastifyInstance): Promise<Tests[]> {
  const tests = await fastify.prisma.tests.findMany();

  return tests;
}

export async function testByIdRepository(fastify: FastifyInstance, id: string): Promise<Tests> {
  const test = await fastify.prisma.tests.findUnique({ where: { id } });

  if (!test) {
    throw new Error(`Test with id ${id} not found`);
  }

  return test;
}

export async function updateTestRepository(
  fastify: FastifyInstance,
  id: string,
  data: Omit<Tests, 'id'>
): Promise<Tests> {
  const updatedTest = await fastify.prisma.tests.update({
    where: { id },
    data
  });

  if (!updatedTest) {
    throw new Error(`Test with id ${id} not found`);
  }

  return updatedTest;
}

export async function deleteTestRepository(fastify: FastifyInstance, id: string): Promise<void> {
  await fastify.prisma.tests.delete({ where: { id } });
}

export default {
  createTestRepository,
  getAllTestsRepository,
  testByIdRepository,
  updateTestRepository,
  deleteTestRepository
};
