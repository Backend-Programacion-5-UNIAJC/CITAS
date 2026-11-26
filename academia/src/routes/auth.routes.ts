import { Router } from 'express';
import { register, login, me } from '../controllers/auth.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ana Torres
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ana@estudiante.edu
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Clave123*
 *     responses:
 *       201:
 *         description: Usuario registrado
 *       400:
 *         description: Faltan datos obligatorios
 *       409:
 *         description: El correo ya está registrado
 */
router.post('/register', register);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión y obtener un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@academia.edu
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Clave123*
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso; devuelve el token para Authorize
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [token]
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Faltan email o password
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', login);
router.get('/me', requireAuth, me);

export default router;
