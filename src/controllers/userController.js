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
    console.log("el codigooooo", confirmationCode);
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

const registerUser = async (req, res) => {
  const {
    email,
    code,
    userIsActive,
    names,
    lastNames, 
    phone,
    confirmationCode,
    isConfirmed,
    isTourist,
    isAgency,
    location,
    documentType,
    documentNumber,
    documentIssueDate,
    birthDate,
    isPoliticsTrue,
    isTtoDtosTrue,
    password,
  } = req.body;

  try {
    const user = await User.findOne({ 
      email,
      code,
      userIsActive,
      names,
      lastNames, 
      phone,
      confirmationCode,
      isConfirmed,
      isTourist,
      isAgency,
      location,
      documentType,
      documentNumber,
      documentIssueDate,
      birthDate,
      isPoliticsTrue,
      isTtoDtosTrue,
      password,
    });

    if (!user.email) {
      return res
        .status(400)
        .json({ message: "La dirección de correo electrónico ya existe." });
    }

    user.isConfirmed = false;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Usuario guardado correctamente" });
  } catch (error) {
    console.error("Error al guardar el usuario:", error);
    res
      .status(500)
      .json({ message: "Error al guardar el usuario", error });
  }
};

module.exports = {
  sendConfirmationCodeEmail,
  verifyConfirmationCodeEmail,
  registerUser,
};
