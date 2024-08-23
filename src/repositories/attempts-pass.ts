import { FastifyInstance } from 'fastify';
import { AttemptsPass } from '@prisma/client';

export async function createAttemptsPassRepository(
  fastify: FastifyInstance,
  data: Omit<AttemptsPass, 'id'>
): Promise<AttemptsPass> {
  const attemptsPass = await fastify.prisma.attemptsPass.create({ data });

  return attemptsPass;
}

export async function getAllAttemptsPassRepository(fastify: FastifyInstance): Promise<AttemptsPass[]> {
  const attemptsPasses = await fastify.prisma.attemptsPass.findMany();

  return attemptsPasses;
}

export async function attemptsPassByIdRepository(
  fastify: FastifyInstance,
  id: string
): Promise<AttemptsPass> {
  const attemptsPass = await fastify.prisma.attemptsPass.findUnique({ where: { id } });

  if (!attemptsPass) {
    throw new Error(`Attempts pass with id ${id} not found`);
  }

  return attemptsPass;
}

export async function updateAttemptsPassRepository(
  fastify: FastifyInstance,
  id: string,
  data: Omit<AttemptsPass, 'id'>
): Promise<AttemptsPass> {
  const updatedAttemptsPass = await fastify.prisma.attemptsPass.update({
    where: { id },
    data
  });

  if (!updatedAttemptsPass) {
    throw new Error(`Attempts pass with id ${id} not found`);
  }

  return updatedAttemptsPass;
}

export async function deleteAttemptsPassRepository(fastify: FastifyInstance, id: string): Promise<void> {
  await fastify.prisma.attemptsPass.delete({ where: { id } });
}

export default {
  createAttemptsPassRepository,
  getAllAttemptsPassRepository,
  attemptsPassByIdRepository,
  updateAttemptsPassRepository,
  deleteAttemptsPassRepository
};
