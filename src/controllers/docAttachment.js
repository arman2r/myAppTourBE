const Attachment = require("../models/userModels/attachment"); // Ajusta la ruta según la ubicación de tu modelo
const { BlobServiceClient } = require("@azure/storage-blob");
const dotenv = require('dotenv');

dotenv.config()

const blobService = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);

/**
 * @swagger
 * /attachFile/upload:
 *   post:
 *     summary: Sube un archivo a Azure Blob Storage y guarda los detalles en la base de datos.
 *     tags: [Attachments]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               container:
 *                 type: string
 *                 description: Nombre del contenedor de Azure Blob Storage.
 *                 example: "mis-archivos"
 *               userAttachId:
 *                 type: string
 *                 description: ID del usuario al que se adjunta el archivo.
 *                 example: "60d0fe4f5311236168a109ca"
 *               attachType:
 *                 type: string
 *                 description: ID del tipo de documento del archivo.
 *                 example: "60d0fe4f5311236168a109cb"
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Archivo a subir.
 *     responses:
 *       201:
 *         description: Archivo subido y guardado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: ID del archivo adjunto.
 *                     userAttachId:
 *                       type: string
 *                       description: ID del usuario al que se adjunta el archivo.
 *                     attachName:
 *                       type: string
 *                       description: Nombre original del archivo.
 *                     attachExt:
 *                       type: string
 *                       description: Extensión del archivo.
 *                     attachType:
 *                       type: string
 *                       description: ID del tipo de documento del archivo.
 *                     fileAttachUrl:
 *                       type: string
 *                       description: URL del archivo subido en Azure Blob Storage.
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha de creación del registro.
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha de la última actualización del registro.
 *       400:
 *         description: Solicitud incorrecta o datos faltantes.
 *       500:
 *         description: Error interno del servidor.
 */
const uploadBlob = async (req, res) => {
  try {
    const { container } = req.body;
    const { originalName, buffer, mimetype } = req.file; // Asegúrate de que estos campos estén en el archivo recibido
    
    // Extraer la extensión del archivo
    const fileExtension = originalName.split('.').pop();
    
    const containerClient = blobService.getContainerClient(container);

    // Sube el archivo a Azure Blob Storage
    await containerClient.getContainerClient(originalName).uploadData(buffer);
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;

    const fileAttachUrl = `https://${accountName}.blob.core.windows.net/${container}/${originalName}`; // Reemplaza con la URL correcta del archivo subido

    // Guarda los detalles del archivo en la base de datos
    const newAttachment = new Attachment({
      userAttachId: req.body.userAttachId,
      attachName: originalName,
      attachExt: fileExtension,
      attachType: req.body.attachType,
      fileAttachUrl: fileAttachUrl,
    });

    const savedAttachment = await newAttachment.save();

    res.status(201).json({
      success: true,
      data: savedAttachment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @swagger
 * /attachFile/{userId}:
 *   get:
 *     summary: Obtiene las URLs de los archivos adjuntos para un usuario específico.
 *     tags: [Attachments]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario para el que se quieren obtener los archivos adjuntos.
 *     responses:
 *       200:
 *         description: Lista de URLs de archivos adjuntos obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: URL del archivo adjunto.
 *                   example: 
 *                     - "https://example.blob.core.windows.net/container/file1.pdf"
 *                     - "https://example.blob.core.windows.net/container/file2.jpg"
 *       404:
 *         description: No se encontraron archivos adjuntos para este usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No se encontraron archivos adjuntos para este usuario"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error al obtener los archivos adjuntos"
 */
const getAttachmentsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    // Encuentra todos los archivos adjuntos que pertenecen al usuario
    const attachments = await Attachment.find({ userAttachId: userId });

    if (!attachments || attachments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron archivos adjuntos para este usuario",
      });
    }

    // Extrae solo las URLs de los archivos adjuntos
    const fileUrls = attachments.map(attachment => attachment.fileAttachUrl);

    res.status(200).json({
      success: true,
      data: fileUrls,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los archivos adjuntos",
    });
  }
};
 

module.exports = {
  uploadBlob,
  getAttachmentsByUserId
};
