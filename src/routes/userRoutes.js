const express = require("express");
const {
  sendConfirmationCodeEmail,
  verifyConfirmationCodeEmail,
} = require("../controllers/userVerify");

const {
  registerUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const {
  createAttachment,
  updateAttachment,
  deleteAttachment,
} = require("../controllers/docAttachment");

const router = express.Router();

router.post("/sendConfirmationCodeEmail", sendConfirmationCodeEmail);

router.post("/verifyConfirmationCodeEmail", verifyConfirmationCodeEmail);

router.post("/userRegister", registerUser);

router.get("/users", getAllUsers);

router.get("/users/email/:email", getUserByEmail);

// Ruta para actualizar un usuario por ID
router.put("/users/:id", updateUser);

// Ruta para eliminar un usuario por ID
router.delete("/users/:id", deleteUser);

// Ruta para guardar un nuevo archivo adjunto
router.post("/attachments", createAttachment);

// Ruta para actualizar un archivo adjunto por ID
router.put("/attachments/:id", updateAttachment);

// Ruta para eliminar un archivo adjunto por ID
router.delete("/attachments/:id", deleteAttachment);

module.exports = router;
