const express = require("express");
const {
  createDocumentType,
  updateDocumentType,
  deleteDocumentType,
  getAllDocumentTypes,
  getDocumentTypeById
} = require("../controllers/userController");

const router = express.Router();

/**
 * @swagger
 * /api/documentType/registerDocumentType:
 *   post:
 *     summary: Create a new document type
 *     tags: [Document type]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the document type
 *                 example: Passport
 *               description:
 *                 type: string
 *                 description: A description of the document type
 *                 example: Official government-issued identification document.
 *     responses:
 *       201:
 *         description: Document type created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the document type
 *                   example: "60c72b2f5f1b2c001f7d3c3b"
 *                 name:
 *                   type: string
 *                   description: The name of the document type
 *                   example: Passport
 *                 description:
 *                   type: string
 *                   description: A description of the document type
 *                   example: Official government-issued identification document.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the document type was created
 *                   example: "2024-08-28T10:30:00.000Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the document type was last updated
 *                   example: "2024-08-28T11:00:00.000Z"
 *       500:
 *         description: Error creating the document type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error creating the document type
 */
router.post("/registerDocumentType", createDocumentType);

/**
 * @swagger
 * /api/documentType/updateDocumentType/{id}:
 *   post:
 *     summary: Update an existing document type
 *     tags: [Document type]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 60c72b2f5f1b2c001f7d3c3b
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the document type
 *                 example: Passport
 *               description:
 *                 type: string
 *                 description: A description of the document type
 *                 example: Official government-issued identification document.
 *     responses:
 *       200:
 *         description: Document type updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the document type
 *                   example: "60c72b2f5f1b2c001f7d3c3b"
 *                 name:
 *                   type: string
 *                   description: The name of the document type
 *                   example: Passport
 *                 description:
 *                   type: string
 *                   description: A description of the document type
 *                   example: Official government-issued identification document.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the document type was created
 *                   example: "2024-08-28T10:30:00.000Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the document type was last updated
 *                   example: "2024-08-28T11:00:00.000Z"
 *       404:
 *         description: Document type not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Document type not found
 *       500:
 *         description: Error updating the document type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error updating the document type
 */
router.post("/updateDocumentType/:id", updateDocumentType);

/**
 * @swagger
 * /api/documentType/deleteDocumentType/{id}:
 *   post:
 *     summary: Delete an existing document type
 *     tags: [Document type]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 60c72b2f5f1b2c001f7d3c3b
 *     responses:
 *       200:
 *         description: Document type deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Document type deleted successfully
 *       404:
 *         description: Document type not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Document type not found
 *       500:
 *         description: Error deleting the document type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error deleting the document type
 */
router.post("/deleteDocumentType/:id", deleteDocumentType);

/**
 * @swagger
 * /api/documentType/getAllDocumentTypes:
 *   get:
 *     summary: Get all document types
 *     tags: [Document type]
 *     responses:
 *       200:
 *         description: List of all document types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The ID of the document type
 *                     example: "60c72b2f5f1b2c001f7d3c3b"
 *                   name:
 *                     type: string
 *                     description: The name of the document type
 *                     example: Passport
 *                   description:
 *                     type: string
 *                     description: A description of the document type
 *                     example: Official government-issued identification document.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the document type was created
 *                     example: "2024-08-28T10:30:00.000Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the document type was last updated
 *                     example: "2024-08-28T11:00:00.000Z"
 *       500:
 *         description: Error retrieving document types
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error retrieving document types
 */
router.post("/getAllDocumentTypes", getAllDocumentTypes);

/**
 * @swagger
 * /api/documentType/getDocumentTypeById/{id}:
 *   get:
 *     summary: Get a document type by its ID
 *     tags: [Document type]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 60c72b2f5f1b2c001f7d3c3b
 *     responses:
 *       200:
 *         description: Document type found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the document type
 *                   example: "60c72b2f5f1b2c001f7d3c3b"
 *                 name:
 *                   type: string
 *                   description: The name of the document type
 *                   example: Passport
 *                 description:
 *                   type: string
 *                   description: A description of the document type
 *                   example: Official government-issued identification document.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the document type was created
 *                   example: "2024-08-28T10:30:00.000Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the document type was last updated
 *                   example: "2024-08-28T11:00:00.000Z"
 *       404:
 *         description: Document type not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Document type not found
 *       500:
 *         description: Error retrieving the document type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error retrieving the document type
 */
router.post("/getDocumentTypeById/:id", getDocumentTypeById);

module.exports = router;
