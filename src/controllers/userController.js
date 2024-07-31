const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels/generalInfoUser");
const Agency = require("../models/userModels/agency");
const Tourist = require("../models/userModels/tourist");
const { sendConfirmationEmail } = require("../utils/email"); // Utilidad para enviar correos
const { generateConfirmationCode } = require("../utils/helpers"); // Función para generar códigos aleatorios
const config = require("../config/config");

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
router.post("/sendConfirmationCodeEmail", async (req, res) => {
  const { email } = req.body;

  // Generar un código de confirmación
  const confirmationCode = generateConfirmationCode();

  // Guardar el código de confirmación en la base de datos y enviar por correo
  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      { confirmationCode: confirmationCode },
      { new: true, upsert: true }
    );

    // Enviar el código por correo electrónico
    await sendConfirmationEmail(email, confirmationCode);

    res.status(200).json({ message: "Confirmation code sent successfully" });
  } catch (error) {
    console.error("Error sending confirmation code:", error);
    res.status(500).json({ message: "Failed to send confirmation code" });
  }
});

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
router.post("/verifyConfirmationCodeEmail", async (req, res) => {
  const { email, code } = req.body;

  try {
    // Buscar el usuario por su correo electrónico y el código de confirmación
    const user = await User.findOne({ email: email, confirmationCode: code });

    if (!user) {
      return res.status(400).json({ message: "Código de confirmación inválido" });
    }

    // Marcar el usuario como confirmado
    user.isConfirmed = true;
    await user.save();

    res.status(200).json({ message: "Usuario confirmado correctamente" });
  } catch (error) {
    console.error("Error al verificar el código de confirmación:", error);
    res.status(500).json({ message: "Error al verificar el código de confirmación" });
  }
});

module.exports = router;
