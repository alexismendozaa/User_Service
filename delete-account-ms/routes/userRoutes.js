const express = require('express');
const router = express.Router();
const { deleteAccount } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /user/account:
 *   delete:
 *     summary: Eliminar cuenta de usuario
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cuenta eliminada exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/user/account', verifyToken, deleteAccount);

module.exports = router;
