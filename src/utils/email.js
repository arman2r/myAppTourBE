const nodemailer = require("nodemailer");
const config = require("../config/config");

// Configuración del transportador de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: config.emailUser,
    pass: config.emailPassword,
  },
});

// Función para enviar el correo de confirmación
const sendConfirmationEmail = (email, confirmationCode) => {
  const mailOptions = {
    from: config.emailUser,
    to: email,
    subject: "Confirmación de correo electrónico",
    text: `Tu código de confirmación es: ${confirmationCode}`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendConfirmationEmail };
