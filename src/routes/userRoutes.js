const express = require("express");
const { sendConfirmationCodeEmail, verifyConfirmationCodeEmail } = require("../controllers/userController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Confirm Email
 *   description: Confirm Email APIs
 */

/**
 * @swagger
 * /api/user/sendConfirmationCodeEmail:
 *   post:
 *     summary: Send a confirmation code to the user's email
 *     tags: [Confirm Email]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address to which the confirmation code will be sent
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Confirmation code sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Confirmation code sent successfully
 *       500:
 *         description: Failed to send confirmation code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to send confirmation code
 */
router.post("/sendConfirmationCodeEmail", sendConfirmationCodeEmail);

/**
 * @swagger
 * /api/user/verifyConfirmationCodeEmail:
 *   post:
 *     summary: Verify the confirmation code sent to the user's email
 *     tags: [Confirm Email]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user
 *                 example: user@example.com
 *               code:
 *                 type: string
 *                 description: The confirmation code sent to the user's email
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User confirmed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario confirmado correctamente
 *       400:
 *         description: Invalid confirmation code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Código de confirmación inválido
 *       500:
 *         description: Error verifying the confirmation code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al verificar el código de confirmación
 */
router.post("/verifyConfirmationCodeEmail", verifyConfirmationCodeEmail);

module.exports = router;
