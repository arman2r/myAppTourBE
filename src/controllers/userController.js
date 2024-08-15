const User = require("../models/userModels/generalInfoUser");
const { sendConfirmationEmail } = require("../utils/email");
const { generateConfirmationCode } = require("../utils/helpers");

const sendConfirmationCodeEmail = async (req, res) => {
  const { email } = req.body;

  const confirmationCode = generateConfirmationCode();

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { confirmationCode },
      { new: true, upsert: true }
    );
    console.log('el codigooooo',confirmationCode);
    await sendConfirmationEmail(email, confirmationCode);

    res.status(200).json({ message: "Confirmation code sent successfully" });
  } catch (error) {
    console.error("Error sending confirmation code:", error);
    res.status(500).json({ message: "Failed to send confirmation code" });
  }
};

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
  verifyConfirmationCodeEmail,
};
