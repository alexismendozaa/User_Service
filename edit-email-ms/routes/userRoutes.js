const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const { updateEmail } = require('../controllers/userController');

/**
 * @swagger
 * /user/email:
 *   put:
 *     summary: Update email of logged-in user
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
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Email updated successfully
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
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized / token invalid or missing
 *       409:
 *         description: Email already exists
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/user/email', verifyToken, updateEmail);

module.exports = router;
