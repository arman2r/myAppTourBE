const { sendConfirmationEmail } = require("../utils/email");
const { generateConfirmationCode } = require("../utils/helpers");
const User = require("../models/userModels/generalInfoUser");

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
const sendConfirmationCodeEmail = async (req, res) => {
  const { email } = req.body;

  const confirmationCode = generateConfirmationCode();

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { confirmationCode },
      { new: true, upsert: true }
    );
    console.log("el codigooooo", confirmationCode);
    await sendConfirmationEmail(email, confirmationCode);

    res.status(200).json({ message: "Confirmation code sent successfully" });
  } catch (error) {
    console.error("Error sending confirmation code:", error);
    res.status(500).json({ message: "Failed to send confirmation code" });
  }
};

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
const verifyConfirmationCodeEmail = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email, confirmationCode: code });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Código de confirmación inválido" });
    }

    user.isConfirmed = true;
    user.confirmationCode = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Usuario confirmado correctamente" });
  } catch (error) {
    console.error("Error al verificar el código de confirmación:", error);
    res
      .status(500)
      .json({ message: "Error al verificar el código de confirmación" });
  }
};

module.exports = {
  sendConfirmationCodeEmail,
  verifyConfirmationCodeEmail
};
