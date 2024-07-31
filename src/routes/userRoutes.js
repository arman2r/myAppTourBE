const express = require("express");
const { registerUser, loginUser, getUserDetails } = require("../services/user-auth-api/general-info-user");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../config/config");

// Route to register a new user
/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               names:
 *                 type: string
 *                 required: true
 *               lastNames:
 *                 type: string
 *                 required: true
 *               email:
 *                 type: string
 *                 required: true
 *               phone:
 *                 type: string
 *                 required: true
 *               confirmationCode:
 *                 type: string
 *                 required: true
 *               isTourist:
 *                 type: string
 *                 required: false
 *                 default: null
 *               isAgency:
 *                 type: string
 *                 required: false
 *                 default: null
 *               location:
 *                 type: string
 *                 required: false
 *                 default: null
 *               documentType:
 *                 type: string
 *                 required: false
 *                 default: null
 *               documentNumber:
 *                 type: string
 *                 required: false
 *                 default: null
 *               documentIssueDate:
 *                 type: string
 *                 format: date-time
 *                 required: false
 *                 default: null
 *               birthDate:
 *                 type: string
 *                 format: date-time
 *                 required: true
 *               isPoliticsTrue:
 *                 type: boolean
 *                 required: true
 *               isTtoDtosTrue:
 *                 type: boolean
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *     responses:
 *       201:
 *         description: User registered successfully
 *       500:
 *         description: Internal server error
 */
router.post("/register", async (req, res) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to authenticate and log in a user
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       500:
 *         description: Internal server error
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Protected route to get user details
/**
 * @swagger
 * /api/user/userDetails:
 *   get:
 *     summary: Get user details
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 names:
 *                   type: string
 *                 lastNames:
 *                   type: string
 *                 createAt:
 *                   type: string
 *                   format: date-time
 *                 updateAt:
 *                   type: string
 *                   format: date-time
 *                 userIsActive:
 *                   type: boolean
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 confirmationCode:
 *                   type: string
 *                 isConfirmed:
 *                   type: boolean
 *                 isTourist:
 *                   type: string
 *                 isAgency:
 *                   type: string
 *                 location:
 *                   type: string
 *                 documentType:
 *                   type: string
 *                 documentNumber:
 *                   type: string
 *                 documentIssueDate:
 *                   type: string
 *                   format: date-time
 *                 birthDate:
 *                   type: string
 *                   format: date-time
 *                 isPoliticsTrue:
 *                   type: boolean
 *                 isTtoDtosTrue:
 *                   type: boolean
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/userDetails", async (req, res) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, config.secret_key);
    const result = await getUserDetails(decoded.email);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error getting user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
