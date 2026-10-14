import type { Request, Response } from "express";
import * as courseService from "../services/course.service";

export function getAllCourses(_req: Request, res: Response): void {
  res.status(200).json(courseService.listCourses());
}

export function getCourseById(req: Request, res: Response): void {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "El id debe ser un entero positivo" });
    return;
  }

  const course = courseService.findCourseById(id);

  if (!course) {
    res.status(404).json({ error: "Curso no encontrado" });
    return;
  }

  res.status(200).json(course);
}

export function createCourse(req: Request, res: Response): void {
  const { title, capacity } = req.body ?? {};

  if (
    typeof title !== "string" ||
    title.trim() === "" ||
    !Number.isInteger(capacity) ||
    capacity <= 0
  ) {
    res.status(400).json({
      error: "title debe ser un texto no vacío y capacity un entero positivo"
    });
    return;
  }

  const course = courseService.createCourse({
    title: title.trim(),
    capacity
  });

  res.status(201).json(course);
}

export function updateCourse(req: Request, res: Response): void {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "El id debe ser un entero positivo" });
    return;
  }

  const { title, capacity } = req.body ?? {};

  if (
    typeof title !== "string" ||
    title.trim() === "" ||
    !Number.isInteger(capacity) ||
    capacity <= 0
  ) {
    res.status(400).json({
      error: "title debe ser un texto no vacío y capacity un entero positivo"
    });
    return;
  }

  const course = courseService.updateCourse(id, {
    title: title.trim(),
    capacity
  });

  if (!course) {
    res.status(404).json({ error: "Curso no encontrado" });
    return;
  }

  res.status(200).json(course);
}

export function deleteCourse(req: Request, res: Response): void {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "El id debe ser un entero positivo" });
    return;
  }

  const deleted = courseService.deleteCourse(id);

  if (!deleted) {
    res.status(404).json({ error: "Curso no encontrado" });
    return;
  }

  res.status(204).send();
}