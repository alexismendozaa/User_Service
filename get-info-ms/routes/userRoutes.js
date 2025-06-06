const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const { getUserInfoByNameOrEmail } = require('../controllers/userController');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get information of a user by name or email
 *     description: Get public information of the user (name, email, and photo). If the authenticated user is the same, it will return complete information.
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: The name of the user to fetch
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         required: false
 *         description: The email of the user to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 photo:
 *                   type: string
 *                   description: URL of the user's public photo
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.get('/users', verifyToken, getUserInfoByNameOrEmail);

module.exports = router;
