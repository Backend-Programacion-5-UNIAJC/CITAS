import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { EspecialidadInput } from "../models/especialidad.model";

function isNotFound(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025";
}

export function findAll() {
  return prisma.especialidad.findMany({ orderBy: { id: "asc" } });
}

export function findById(id: number) {
  return prisma.especialidad.findUnique({ where: { id } });
}

export function create(data: EspecialidadInput) {
  return prisma.especialidad.create({ data });
}

export async function update(id: number, data: Partial<EspecialidadInput>) {
  try {
    return await prisma.especialidad.update({ where: { id }, data });
  } catch (error) {
    if (isNotFound(error)) {
      return null;
    }
    throw error;
  }
}

export async function remove(id: number): Promise<boolean> {
  try {
    await prisma.especialidad.delete({ where: { id } });
    return true;
  } catch (error) {
    if (isNotFound(error)) {
      return false;
    }
    throw error;
  }
}
