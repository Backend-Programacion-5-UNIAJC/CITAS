import { Router } from "express";
import {
  getAllInstructors,
  getInstructorById,
  createInstructor,
  updateInstructor,
  deleteInstructor
} from "../controllers/instructor.controller";
import { requireAuth, requireRole } from '../middleware/auth.middleware';

const instructorRoutes = Router();

instructorRoutes.get("/", getAllInstructors);
instructorRoutes.get("/:id", getInstructorById);
instructorRoutes.post(
  "/",
  requireAuth,
  requireRole('ADMIN'),
  createInstructor
);
instructorRoutes.put(
  "/:id",
  requireAuth,
  requireRole('ADMIN'),
  updateInstructor
);
instructorRoutes.delete(
  "/:id",
  requireAuth,
  requireRole('ADMIN'),
  deleteInstructor
);

export default instructorRoutes;