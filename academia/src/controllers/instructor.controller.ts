import type { Request, Response } from "express";
import * as instructorService from "../services/instructor.service";

export async function getAllInstructors(req: Request, res: Response) {
  const instructors = await instructorService.listInstructors();

  return res.status(200).json(instructors);
}

export async function getInstructorById(req: Request, res: Response) {
  const instructor = await instructorService.findInstructorById(
    Number(req.params.id)
  );

  if (!instructor) {
    return res.status(404).json({
      error: 'Instructor no encontrado'
    });
  }

  return res.status(200).json(instructor);
}

export async function createInstructor(req: Request, res: Response) {
  const { name, email } = req.body ?? {};

  if (!name || !email) {
    return res.status(400).json({
      error: 'name y email son obligatorios'
    });
  }

  const instructor = await instructorService.createInstructor({
    name,
    email
  });

  return res.status(201).json(instructor);
}

export async function updateInstructor(req: Request, res: Response) {
  const { name, email } = req.body ?? {};

  if (!name || !email) {
    return res.status(400).json({
      error: 'name y email son obligatorios'
    });
  }

  const instructor = await instructorService.updateInstructor(
    Number(req.params.id),
    { name, email }
  );

  if (!instructor) {
    return res.status(404).json({
      error: 'Instructor no encontrado'
    });
  }

  return res.status(200).json(instructor);
}

export async function deleteInstructor(req: Request, res: Response) {
  const deleted = await instructorService.deleteInstructor(
    Number(req.params.id)
  );

  if (!deleted) {
    return res.status(404).json({
      error: 'Instructor no encontrado'
    });
  }

  return res.status(204).send();
}