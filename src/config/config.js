module.exports = {
    port: process.env.PORT || 3000,
    mongodb_uri: process.env.MONGODB_URI || 'mongodb://localhost/mydb',
    secret_key: process.env.SECRET_KEY || 'defaultsecret',
    // Add other configuration options here
    emailUser: 'tu-correo@gmail.com',
    emailPassword: 'tu-contraseña',
};