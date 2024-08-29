const express = require("express");
const {
  sendConfirmationCodeEmail,
  verifyConfirmationCodeEmail, 
  registerUser,
} = require("../controllers/userController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Confirm Email
 *   description: Confirm Email APIs
 */

/**
 * @swagger
 * /api/user/sendConfirmationCodeEmail:
 *   post:
 *     summary: Send a confirmation code to the user's email
 *     tags: [Confirm Email]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address to which the confirmation code will be sent
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Confirmation code sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Confirmation code sent successfully
 *       500:
 *         description: Failed to send confirmation code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to send confirmation code
 */
router.post("/sendConfirmationCodeEmail", sendConfirmationCodeEmail);

/**
 * @swagger
 * /api/user/verifyConfirmationCodeEmail:
 *   post:
 *     summary: Verify the confirmation code sent to the user's email
 *     tags: [Confirm Email]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user
 *                 example: user@example.com
 *               code:
 *                 type: string
 *                 description: The confirmation code sent to the user's email
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User confirmed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario confirmado correctamente
 *       400:
 *         description: Invalid confirmation code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Código de confirmación inválido
 *       500:
 *         description: Error verifying the confirmation code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al verificar el código de confirmación
 */
router.post("/verifyConfirmationCodeEmail", verifyConfirmationCodeEmail);

/**
 * @swagger
 * tags:
 *   name: User Register
 *   description: User Register APIs
 */

/** 
 * @swagger
 * /api/user/userRegister:
 *   post:
 *     summary: Register a user verifying if email doesn't exist
 *     tags: [User Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user
 *                 example: user@example.com
 *               code:
 *                 type: string
 *                 description: The confirmation code sent to the user's email
 *                 example: 123456
 *               names:
 *                 type: string
 *                 description: The user's first name(s)
 *                 example: John
 *               lastNames:
 *                 type: string
 *                 description: The user's last name(s)
 *                 example: Doe
 *               phone:
 *                 type: string
 *                 description: The user's phone number
 *                 example: '+1234567890'
 *               isTourist:
 *                 type: boolean
 *                 description: Indicates if the user is a tourist
 *                 example: false
 *               isAgency:
 *                 type: boolean
 *                 description: Indicates if the user is associated with an agency
 *                 example: false
 *               location:
 *                 type: string
 *                 description: The user's location
 *                 example: 'New York, USA'
 *               documentType:
 *                 type: string
 *                 description: The user's document type (referenced by ObjectId)
 *                 example: '62b9e36fffcfcf0011234567'
 *               documentNumber:
 *                 type: string
 *                 description: The user's document number
 *                 example: 'A1234567'
 *               documentIssueDate:
 *                 type: string
 *                 format: date
 *                 description: The issue date of the user's document
 *                 example: '2023-01-01'
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: The user's date of birth
 *                 example: '1990-01-01'
 *               isPoliticsTrue:
 *                 type: boolean
 *                 description: Whether the user agrees to the politics
 *                 example: true
 *               isTtoDtosTrue:
 *                 type: boolean
 *                 description: Whether the user agrees to the processing of personal data
 *                 example: true
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: 'password123'
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *       400:
 *         description: Failed to register user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to register user
 *       500:
 *         description: Please verify that the email entered does not exist in our system.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please verify that the email entered does not exist in our system.
 */
router.post("/registerUser", registerUser);

module.exports = router;
