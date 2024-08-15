const nodemailer = require("nodemailer");
const config = require("../config/config");

// Configuración del transportador de Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    clientId: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
  },  
});

// Función para enviar el correo de confirmación
const sendConfirmationEmail = (email, confirmationCode) => {
  debugger;
  const mailOptions = {
    from: config.MAIL_USERNAME,
    to: email,
    subject: "Confirmación de correo electrónico",
    text: `Tu código de confirmación es: ${confirmationCode}`,
    auth: {
      user: config.MAIL_USERNAME,
      refreshToken: config.GOOGLE_REFRESH_TOKEN,
      accessToken: config.GOOGLE_ACCESS_TOKEN,
    },
  }; 
  return transporter.sendMail(mailOptions);  
};

module.exports = { sendConfirmationEmail };
