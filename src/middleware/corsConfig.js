// src/middleware/corsConfig.js
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000", // Asegúrate de que el origen coincida con el de tu frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
