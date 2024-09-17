const DocumentType = require("../models/userModels/documentType");

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
const createDocumentType = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Nombre y descripción son requeridos" });
    }

    // Crear una nueva instancia del modelo DocumentType
    const newDocumentType = new DocumentType({
      name,
      description,
    });

    // Guardar el nuevo documento en la base de datos
    const savedDocumentType = await newDocumentType.save();

    // Enviar respuesta exitosa
    res.status(201).json(savedDocumentType);
  } catch (error) {
    // Manejo de errores
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al crear el tipo de documento", error });
  }
};

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
const updateDocumentType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedDocumentType = await DocumentType.findByIdAndUpdate(
      id,
      {
        name,
        description,
      },
      { new: true } // Para devolver el documento actualizado
    );

    if (!updatedDocumentType) {
      return res
        .status(404)
        .json({ message: "Tipo de documento no encontrado" });
    }

    res.status(200).json(updatedDocumentType);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el tipo de documento", error });
  }
};

/**
 * @swagger
 * /api/documentType/getAllDocumentType:
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
const getAllDocumentType = async (req, res) => {
  try {
    const documentType = await DocumentType.find();
    console.log("tipos de documento", documentType);
    res.status(200).json(documentType);
  } catch (error) {
    console.error("Error al obtener los tipos de documento:", error);
    res
      .status(500)
      .json({ message: "Error al obtener los tipos de documento", error });
  }
};

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
const getDocumentTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const documentType = await DocumentType.findById(id);

    if (!documentType) {
      return res
        .status(404)
        .json({ message: "Tipo de documento no encontrado" });
    }

    res.status(200).json(documentType);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el tipo de documento", error });
  }
};

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
const deleteDocumentType = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDocumentType = await DocumentType.findByIdAndDelete(id);

    if (!deletedDocumentType) {
      return res
        .status(404)
        .json({ message: "Tipo de documento no encontrado" });
    }

    res.status(200).json({ message: "Tipo de documento eliminado con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el tipo de documento", error });
  }
};

module.exports = {
  createDocumentType,
  updateDocumentType,
  getAllDocumentType,
  getDocumentTypeById,
  deleteDocumentType,
};
