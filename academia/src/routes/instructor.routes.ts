import { Router } from "express";
import {
  getAllInstructors,
  getInstructorById,
  createInstructor,
  updateInstructor,
  deleteInstructor
} from "../controllers/instructor.controller";

const instructorRoutes = Router();

instructorRoutes.get("/", getAllInstructors);
instructorRoutes.get("/:id", getInstructorById);
instructorRoutes.post("/", createInstructor);
instructorRoutes.put("/:id", updateInstructor);
instructorRoutes.delete("/:id", deleteInstructor);

export default instructorRoutes;