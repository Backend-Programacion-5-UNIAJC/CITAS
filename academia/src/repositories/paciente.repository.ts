import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { PacienteInput } from "../models/paciente.model";

function isNotFound(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025";
}

export function findAll() {
  return prisma.paciente.findMany({ orderBy: { id: "asc" } });
}

export function findById(id: number) {
  return prisma.paciente.findUnique({ where: { id } });
}

export function create(data: PacienteInput) {
  return prisma.paciente.create({ data });
}

export async function update(id: number, data: Partial<PacienteInput>) {
  try {
    return await prisma.paciente.update({ where: { id }, data });
  } catch (error) {
    if (isNotFound(error)) {
      return null;
    }
    throw error;
  }
}

export async function remove(id: number): Promise<boolean> {
  try {
    await prisma.paciente.delete({ where: { id } });
    return true;
  } catch (error) {
    if (isNotFound(error)) {
      return false;
    }
    throw error;
  }
}
