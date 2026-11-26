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

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Listar cursos
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
courseRoutes.get("/", getAllCourses);
/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Obtener un curso por id
 *     tags: [Courses]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: El curso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: El id no es un número válido
 *       404:
 *         description: Curso no encontrado
 */
courseRoutes.get("/:id", getCourseById);
/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Crear un curso
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseInput'
 *     responses:
 *       201:
 *         description: Curso creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Datos del curso inválidos
 *       401:
 *         description: Falta un token válido
 *       403:
 *         description: El usuario no tiene permiso para crear cursos
 */
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
