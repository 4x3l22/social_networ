import { Router } from 'express';
import { registerUser,
     loginUser,
     getUsersByIds,
     verifyToken } from '../controller/user.controller';
import authMiddleware from '../middleware/auth.middleware';

const router: Router = Router();

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - alias
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *               alias:
 *                 type: string
 *               password:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Usuario creado y token generado
 *       400:
 *         description: Alias ya registrado o error de validación
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Inicia sesión con un usuario existente
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - alias
 *               - password
 *             properties:
 *               alias:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso y token generado
 *       400:
 *         description: Usuario no encontrado o contraseña incorrecta
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /user/verify-token:
 *   post:
 *     summary: Verifica el token de autenticación
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token verificado exitosamente
 *       401:
 *         description: Token inválido o no proporcionado
 */
router.post('/verify-token', verifyToken);

/**
 * @swagger
 * /user/ids:
 *   get:
 *     summary: Obtiene usuarios por IDs
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: ids
 *         required: true
 *         schema:
 *           type: string
 *           example: "1,2,3"
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *       400:
 *         description: Parámetro "ids" es requerido o no se encontraron IDs válidos
 */
router.get('/ids', getUsersByIds);

// ejemplo de ruta protegida
// router.get('/perfil', authMiddleware, perfilController.getPerfil);

export default router;
