import type { Request, Response } from "express";

const courses = [
  { id: 1, title: "TypeScript", capacity: 25 },
  { id: 2, title: "Desarrollo V", capacity: 20 },
  { id: 3, title: "From JS y C++", capacity: 30 }
];

export const getAllCourses = (_req: Request, res: Response): void => {
  res.status(200).json(courses);
};

export const getCourseById = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const course = courses.find((course) => course.id === id);

  if (!course) {
    res.status(404).json({ error: "Curso no encontrado" });
    return;
  }

  res.status(200).json(course);
};