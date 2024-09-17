const express = require("express");
const {
  createDocumentType,
  updateDocumentType,
  deleteDocumentType,
  getAllDocumentType,
  getDocumentTypeById
} = require("../controllers/documentType");

const router = express.Router();

router.post("/registerDocumentType", createDocumentType);

router.post("/updateDocumentType/:id", updateDocumentType);

router.post("/deleteDocumentType/:id", deleteDocumentType);

router.get("/getAllDocumentType", getAllDocumentType);

router.get("/getDocumentTypeById/:id", getDocumentTypeById);

module.exports = router;
