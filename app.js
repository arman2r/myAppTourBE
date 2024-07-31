const express = require("express");
const connectDB = require("./src/config/db");
const userRoutes = require("./src/routes/userRoutes");
const config = require("./src/config/config");
const cors = require("cors");
const swagger = require('./swagger');
const path = require("path");

// Load environment variables
require("dotenv").config();

// Connect to MongoDB
connectDB();

// Creating an Express application instance
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Swagger setup
swagger(app);

// User routes
app.use("/api/user", userRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to my User Registration and Login API!");
});

// Start the server
const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
