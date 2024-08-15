require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const config = require("./src/config/config");
const cors = require("cors");
const swagger = require('./swagger');
const path = require("path");

// Conectar a MongoDB
connectDB();

// Crear instancia de la aplicación Express
const app = express();

// Middleware
app.use(express.json());

// Configuración de CORS
const corsOptions = {
  origin: ['http://localhost:3000', 'http://otro-dominio.com'], // Agrega otros orígenes si es necesario
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true, // Si necesitas enviar cookies o credenciales
};

app.use(cors(corsOptions));

// Habilitar CORS para solicitudes OPTIONS
app.options('*', cors(corsOptions));

// Política de referencia
app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  next();
});

// Importar configuración de Swagger
swagger(app);

// Rutas de usuario
app.use("/api/user", userRoutes);

// Ruta por defecto
app.get("/", (req, res) => {
  res.send("Welcome to my User Registration and Login API!");
});

// Iniciar el servidor
const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
