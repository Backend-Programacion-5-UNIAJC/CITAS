import {Prisma, PrismaClient} from '@prisma/client';
import {prisma} from '../lib/prisma';
import {Course, CourseInput} from '../models/course.model';

function isNotFound(error: unknown): boolean {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025';
}
export function findAll() {
    return prisma.course.findMany({ orderBy: { id: 'asc' } });
}
export function findById(id: number) {
    return prisma.course.findUnique({ where: { id } });
}
export  function create(data: CourseInput) {
    return prisma.course.create({ data });
}
export async function update(id: number, data: Partial<CourseInput>) {
    try {
        return await prisma.course.update({ where: { id }, data });
    } catch (error) {
        if (isNotFound(error)) {
            return null;
        }
        throw error;
    }
}
export async function remove(id: number) : Promise<boolean> {
    try {
        await prisma.course.delete({ where: { id } });
        return true;
    } catch (error) {
        if (isNotFound(error)) {
            return false;
        }
        throw error;
    }
}