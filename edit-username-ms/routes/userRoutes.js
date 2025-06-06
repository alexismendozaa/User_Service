const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const { updateUsername } = require('../controllers/userController');

/**
 * @swagger
 * /user/username:
 *   put:
 *     summary: Update username of logged-in user
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *                 example: newusername123
 *     responses:
 *       200:
 *         description: Username updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized / token invalid or missing
 *       409:
 *         description: Username already exists
 *       500:
 *         description: Internal server error
 */
router.put('/user/username', verifyToken, updateUsername);

module.exports = router;
