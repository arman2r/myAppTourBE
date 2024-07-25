const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModels");
const Agency = require("../../models/agency");
const Tourist = require("../../models/tourist");
const { sendConfirmationEmail } = require("../../utils/email"); // Utilidad para enviar correos
const { generateConfirmationCode } = require("../../utils/helpers"); // Función para generar códigos aleatorios
const config = require("../../config");

const router = express.Router();

// Ruta para enviar el código de confirmación por correo electrónico
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

// Ruta para verificar el código de confirmación por correo electrónico
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
