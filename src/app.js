const express = require("express");
const connectDB = require("./config/connectDB");
const userController = require("./controllers/userController");
const userService = require("./services/userService");
const config = require("./config");
const cors = require("cors");

// Load environment variables
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Creating an Express application instance
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas controladas por el usuario
app.use("/api/user", userController);

// Ruta para registrar un nuevo usuario
app.post("/api/register", async (req, res) => {
  try {
    const result = await userService.registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Ruta para autenticar e iniciar sesión
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Ruta protegida para obtener detalles de usuario
app.get("/api/userDetails", async (req, res) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, config.secret_key);
    const result = await userService.getUserDetails(decoded.email);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Ruta predeterminada
app.get("/", (req, res) => {
  res.send("Welcome to my User Registration and Login API!");
});

// Iniciar el servidor
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
