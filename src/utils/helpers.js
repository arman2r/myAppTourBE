// Función para generar un código aleatorio
function generateConfirmationCode() {
  const digits = "0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += digits[Math.floor(Math.random() * 10)];
  }
  console.log('Generando código:', code);
  return code;
}

module.exports = {
  generateConfirmationCode
};
