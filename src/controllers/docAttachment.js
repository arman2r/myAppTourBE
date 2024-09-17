const Attachment = require("../models/userModels/attachment"); // Ajusta la ruta según la ubicación de tu modelo

/**
 * @swagger
 * /attachments:
 *   post:
 *     summary: Guardar un nuevo archivo adjunto
 *     tags: [Attachments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userAttach:
 *                 type: string
 *                 description: ID del usuario al que se adjunta el archivo
 *               typeAttach:
 *                 type: string
 *                 description: ID del tipo de documento del archivo
 *               fileAttachUrl:
 *                 type: string
 *                 description: URL del archivo adjunto
 *             example:
 *               userAttach: 60d0fe4f5311236168a109ca
 *               typeAttach: 60d0fe4f5311236168a109cb
 *               fileAttachUrl: https://example.com/file.pdf
 *     responses:
 *       201:
 *         description: Archivo adjunto guardado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/userModels/attachment'
 *       400:
 *         description: Datos de entrada no válidos
 *       500:
 *         description: Error del servidor
 */
const createAttachment = async (req, res) => {
  const { userAttach, typeAttach, fileAttachUrl } = req.body;

  try {
    const newAttachment = new Attachment({
      userAttach,
      typeAttach,
      fileAttachUrl,
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
      message: "Error al guardar el archivo adjunto",
    });
  }
};

/**
 * @swagger
 * /attachments/{id}:
 *   put:
 *     summary: Actualizar un archivo adjunto por ID
 *     tags: [Attachments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del archivo adjunto a actualizar
 *       - in: body
 *         name: attachment
 *         description: Información del archivo adjunto para actualizar
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userAttach:
 *               type: string
 *               description: ID del usuario al que se adjunta el archivo
 *             typeAttach:
 *               type: string
 *               description: ID del tipo de documento del archivo
 *             fileAttachUrl:
 *               type: string
 *               description: URL del archivo adjunto
 *           example:
 *             userAttach: 60d0fe4f5311236168a109ca
 *             typeAttach: 60d0fe4f5311236168a109cb
 *             fileAttachUrl: https://example.com/new-file.pdf
 *     responses:
 *       200:
 *         description: Archivo adjunto actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/userModels/attachment'
 *       404:
 *         description: Archivo adjunto no encontrado
 *       400:
 *         description: Datos de entrada no válidos
 *       500:
 *         description: Error del servidor
 */
const updateAttachment = async (req, res) => {
  const { id } = req.params;
  const { userAttach, typeAttach, fileAttachUrl } = req.body;

  const updates = {};
  if (userAttach) updates.userAttach = userAttach;
  if (typeAttach) updates.typeAttach = typeAttach;
  if (fileAttachUrl) updates.fileAttachUrl = fileAttachUrl;

  try {
    const updatedAttachment = await Attachment.findByIdAndUpdate(id, updates, {
      new: true,
    }).exec();

    if (!updatedAttachment) {
      return res.status(404).json({
        success: false,
        message: "Archivo adjunto no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedAttachment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el archivo adjunto",
    });
  }
};

/**
 * @swagger
 * /attachments/{id}:
 *   delete:
 *     summary: Eliminar un archivo adjunto por ID
 *     tags: [Attachments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del archivo adjunto a eliminar
 *     responses:
 *       200:
 *         description: Archivo adjunto eliminado con éxito
 *       404:
 *         description: Archivo adjunto no encontrado
 *       500:
 *         description: Error del servidor
 */
const deleteAttachment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAttachment = await Attachment.findByIdAndDelete(id).exec();

    if (!deletedAttachment) {
      return res.status(404).json({
        success: false,
        message: "Archivo adjunto no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Archivo adjunto eliminado con éxito",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar el archivo adjunto",
    });
  }
};

module.exports = {
  createAttachment,
  updateAttachment,
  deleteAttachment,
};
