import { Router } from "express";
import {
  getAllCourses,
  getCourseById
} from "../controllers/course.controller";

const courseRoutes = Router();

courseRoutes.get("/", getAllCourses);
courseRoutes.get("/:id", getCourseById);

export default courseRoutes;