import { Router } from 'express';
import { createPublication, getPublications, likePublication } from '../controller/publication.controller';
import {validateTokenMiddleware} from '../middleware/auth.middleware';

const router: Router = Router();

/**
 * @swagger
 * /publication/register:
 *   post:
 *     summary: Registra una nueva publicación
 *     tags: [Publication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - authorId
 *               - likes
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               likes:
 *                 type: number
 *               authorId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Publicación creada exitosamente
 *       400:
 *         description: publicación inválida
 */
router.post('/register', createPublication, validateTokenMiddleware);

/**
 * @swagger
 * /publication:
 *   get:
 *     summary: Obtiene todas las publicaciones
 *     tags: [Publication]
 *     responses:
 *       200:
 *         description: Lista de publicaciones obtenida exitosamente
 *       500:
 *         description: Error al obtener las publicaciones
 */
router.get('/', getPublications);

/**
 * @swagger
 * /publication/like:
 *   post:
 *     summary: Registra un "me gusta" en una publicación
 *     tags: [Publication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - publicationId
 *               - likes
 *             properties:
 *               publicationId:
 *                 type: number
 *               likes:
 *                 type: number
 *     responses:
 *       200:
 *         description: Publicación actualizada exitosamente
 *       404:
 *         description: Publicación no encontrada
 */
router.post('/like', likePublication, validateTokenMiddleware);

// ejemplo de ruta protegida
// router.get('/perfil', authMiddleware, perfilController.getPerfil);

export default router;
