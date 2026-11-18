import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { Role } from "../models/user.model";

const safeFields = { id: true, name: true, email: true, role: true } as const;

export function findByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export function findById(id: number) {
  return prisma.user.findUnique({ where: { id }, select: safeFields });
}

export async function create(data: {
  name: string;
  email: string;
  password: string;
  role: Role;
}) {
  try {
    return await prisma.user.create({ data, select: safeFields });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    )
      return null;

    throw error;
  }
}