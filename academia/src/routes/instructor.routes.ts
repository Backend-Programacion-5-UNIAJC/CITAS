import { Router } from "express";
import {
  getAllInstructors,
  getInstructorById
} from "../controllers/instructor.controller";

const instructorRoutes = Router();

instructorRoutes.get("/", getAllInstructors);
instructorRoutes.get("/:id", getInstructorById);

export default instructorRoutes;