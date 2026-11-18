import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';

export function findAll() {
  return prisma.instructor.findMany({
    orderBy: { id: 'asc' }
  });
}

export function findById(id: number) {
  return prisma.instructor.findUnique({
    where: { id }
  });
}

export function findByUserId(userId: number) {
  return prisma.instructor.findUnique({
    where: { userId }
  });
}

export function create(data: { name: string; email: string }) {
  return prisma.instructor.create({
    data
  });
}

export async function update(
  id: number,
  data: { name?: string; email?: string }
) {
  try {
    return await prisma.instructor.update({
      where: { id },
      data
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return null;
    }

    throw error;
  }
}

export async function remove(id: number): Promise<boolean> {
  try {
    await prisma.instructor.delete({
      where: { id }
    });

    return true;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return false;
    }

    throw error;
  }
}