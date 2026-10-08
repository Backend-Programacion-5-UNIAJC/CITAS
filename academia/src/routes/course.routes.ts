import { Router } from "express";
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} from "../controllers/course.controller";

const courseRoutes = Router();

courseRoutes.get("/", getAllCourses);
courseRoutes.get("/:id", getCourseById);
Router.post("/", createCourse);
Router.put("/id", updateCourse);
courseRoutes.delete("/id", deleteCourse);

export default courseRoutes;