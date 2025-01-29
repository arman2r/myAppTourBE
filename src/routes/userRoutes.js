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

const router = express.Router();

router.post("/sendConfirmationCodeEmail", sendConfirmationCodeEmail);

router.post("/verifyConfirmationCodeEmail", verifyConfirmationCodeEmail);

router.post("/userRegister", registerUser);

router.get("/users", getAllUsers);

router.get("/:email", getUserByEmail);

// Ruta para actualizar un usuario por ID
router.put("/:id", updateUser);

// Ruta para eliminar un usuario por ID
router.delete("/:id", deleteUser);
 
module.exports = router;