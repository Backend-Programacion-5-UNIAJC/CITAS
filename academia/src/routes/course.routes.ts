import { Router } from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} from "../controllers/course.controller";
import { requireAuth, requireRole } from '../middleware/auth.middleware';

const courseRoutes = Router();

courseRoutes.get("/", getAllCourses);
courseRoutes.get("/:id", getCourseById);
courseRoutes.post(
  "/",
  requireAuth,
  requireRole('INSTRUCTOR', 'ADMIN'),
  createCourse
);
courseRoutes.put(
  "/:id",
  requireAuth,
  requireRole('INSTRUCTOR', 'ADMIN'),
  updateCourse
);
courseRoutes.delete(
  "/:id",
  requireAuth,
  requireRole('INSTRUCTOR', 'ADMIN'),
  deleteCourse
);

export default courseRoutes;
