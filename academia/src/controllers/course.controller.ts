import type { Request, Response } from "express";
import * as courseService from "../services/course.service";
import { AuthRequest } from '../middleware/auth.middleware';

export async function getAllCourses(req: Request, res: Response) {
  const courses = await courseService.listCourses();

  return res.status(200).json(courses);
}

export async function getCourseById(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: 'El id debe ser un número entero positivo'
    });
  }

  const course = await courseService.findCourseById(id);

  if (!course) {
    return res.status(404).json({
      error: 'Curso no encontrado'
    });
  }

  return res.status(200).json(course);
}

export async function createCourse(req: AuthRequest, res: Response) {
  const { title, capacity, instructorId } = req.body ?? {};

  if (!title || !capacity || capacity <= 0) {
    return res.status(400).json({
      error: 'title y capacity son obligatorios y capacity debe ser mayor que cero'
    });
  }

  try {
    const course = await courseService.createCourse(
      { title, capacity, instructorId },
      req.user!
    );

    return res.status(201).json(course);
  } catch (error) {
    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return res.status(403).json({
        error: 'Tu usuario no tiene un perfil de instructor vinculado'
      });
    }

    throw error;
  }
}

export async function updateCourse(req: AuthRequest, res: Response) {
  const { title, capacity } = req.body ?? {};

  try {
    const course = await courseService.updateCourseAsOwner(
      Number(req.params.id),
      req.user!,
      { title, capacity }
    );

    return res.status(200).json(course);
  } catch (error) {
    if (error instanceof Error && error.message === 'NOT_FOUND') {
      return res.status(404).json({
        error: 'Curso no encontrado'
      });
    }

    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return res.status(403).json({
        error: 'Solo el instructor dueño o un administrador pueden editarlo'
      });
    }

    throw error;
  }
}

export async function deleteCourse(req: AuthRequest, res: Response) {
  try {
    const deleted = await courseService.deleteCourseAsOwner(
      Number(req.params.id),
      req.user!
    );

    if (!deleted) {
      return res.status(404).json({
        error: 'Curso no encontrado'
      });
    }

    return res.status(204).send();
  } catch (error) {
    if (error instanceof Error && error.message === 'NOT_FOUND') {
      return res.status(404).json({
        error: 'Curso no encontrado'
      });
    }

    if (error instanceof Error && error.message === 'FORBIDDEN') {
      return res.status(403).json({
        error: 'Solo el instructor dueño o un administrador pueden eliminarlo'
      });
    }

    throw error;
  }
}
