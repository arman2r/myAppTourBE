const express = require("express");
const multer = require("multer");
const path = require("path");

// Configuración de multer (en memoria o almacenamiento)
const storage = multer.memoryStorage(); // Puedes usar `multer.diskStorage` para almacenamiento en disco
const upload = multer({ storage });

// Crear el enrutador
const router = express.Router();

// Importar los controladores
const { uploadBlob, getAttachmentsByUserId } = require("../controllers/docAttachment");

// Rutas
router.post("/attachFile", upload.single("file"), uploadBlob);

router.get('/attachFile/:userId', getAttachmentsByUserId);

module.exports = router;
