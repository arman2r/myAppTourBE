const express = require("express");
const DocumentType = require("../../models/userModels/documentType");
const router = express.Router();
const cors = require('cors'); 

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Creating an Express application instance
const app = express();
// Middleware
app.use(cors());
// Middleware
router.use(express.json());

// Route to get all document types
router.get("/", async (req, res) => {
  try {
    const documentType = await DocumentType.find();
    res.json(documentType);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new document type
router.post("/", async (req, res) => {
  const { name, description } = req.body;

  try {
    const newDocumentType = new DocumentType({
      name,
      description,
    });

    const savedDocumentType = await newDocumentType.save();
    res.status(201).json(savedDocumentType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;