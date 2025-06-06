const express = require('express');
const router = express.Router();
const { changePassword } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /user/change-password:
 *   put:
 *     summary: Cambiar contraseña del usuario autenticado
 *     tags:
 *       - Usuarios
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Contraseña actual y nueva para actualizar
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: "contraseñaActual123"
 *               newPassword:
 *                 type: string
 *                 example: "nuevaContraseña456"
 *               confirmPassword:
 *                 type: string
 *                 example: "nuevaContraseña456"
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contraseña actualizada correctamente.
 *       400:
 *         description: Las nuevas contraseñas no coinciden o faltan campos
 *       401:
 *         description: Contraseña actual incorrecta o no autorizado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.put('/change-password', verifyToken, changePassword);

module.exports = router;
