import type { Request, Response } from "express";
import { instructors } from "../data/instructors";

export const getAllInstructors = (
  _req: Request,
  res: Response
): void => {
  res.status(200).json(instructors);
};

export const getInstructorById = (
  req: Request,
  res: Response
): void => {
  const id = Number(req.params.id);
  const instructor = instructors.find((item) => item.id === id);

  if (!instructor) {
    res.status(404).json({ error: "Instructor no encontrado" });
    return;
  }

  res.status(200).json(instructor);
};