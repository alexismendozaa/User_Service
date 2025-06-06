const express = require('express');
const router = express.Router();
const { updateProfileImage } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware'); // Verificación del token

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('file'); 

/**
 * @swagger
 * /user/change-image:
 *   put:
 *     summary: Actualizar la foto del perfil del usuario
 *     description: Permite a un usuario actualizar su foto de perfil.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Foto de perfil actualizada exitosamente
 *       400:
 *         description: Error en la solicitud
 *       401:
 *         description: No autorizado
 */
router.put('/change-image', verifyToken, upload, updateProfileImage);  // Aquí cambiamos la ruta a '/change-image'

module.exports = router;
