import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { DoctorInput } from "../models/doctor.model";

function isNotFound(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025";
}

export function findAll() {
  return prisma.doctor.findMany({ orderBy: { id: "asc" } });
}

export function findById(id: number) {
  return prisma.doctor.findUnique({ where: { id } });
}

export function create(data: DoctorInput) {
  return prisma.doctor.create({ data });
}

export async function update(id: number, data: Partial<DoctorInput>) {
  try {
    return await prisma.doctor.update({ where: { id }, data });
  } catch (error) {
    if (isNotFound(error)) {
      return null;
    }
    throw error;
  }
}

export async function remove(id: number): Promise<boolean> {
  try {
    await prisma.doctor.delete({ where: { id } });
    return true;
  } catch (error) {
    if (isNotFound(error)) {
      return false;
    }
    throw error;
  }
}
