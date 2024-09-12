const User = require("../models/userModels/generalInfoUser");
const { sendConfirmationEmail } = require("../utils/email");
const { generateConfirmationCode } = require("../utils/helpers");
const DocumentType = require('../models/userModels/documentType');

const sendConfirmationCodeEmail = async (req, res) => {
  const { email } = req.body;

  const confirmationCode = generateConfirmationCode();

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { confirmationCode },
      { new: true, upsert: true }
    );
    console.log("el codigooooo", confirmationCode);
    await sendConfirmationEmail(email, confirmationCode);

    res.status(200).json({ message: "Confirmation code sent successfully" });
  } catch (error) {
    console.error("Error sending confirmation code:", error);
    res.status(500).json({ message: "Failed to send confirmation code" });
  }
};

const verifyConfirmationCodeEmail = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email, confirmationCode: code });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Código de confirmación inválido" });
    }

    user.isConfirmed = true;
    user.confirmationCode = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Usuario confirmado correctamente" });
  } catch (error) {
    console.error("Error al verificar el código de confirmación:", error);
    res
      .status(500)
      .json({ message: "Error al verificar el código de confirmación" });
  }
};

const registerUser = async (req, res) => {
  const {
    email,
    code,
    userIsActive,
    names,
    lastNames, 
    phone,
    confirmationCode,
    isConfirmed,
    isTourist,
    isAgency,
    location,
    documentType,
    documentNumber,
    documentIssueDate,
    birthDate,
    isPoliticsTrue,
    isTtoDtosTrue,
    password,
  } = req.body;

  try {
    const user = await User.findOne({ 
      email,
      code,
      userIsActive,
      names,
      lastNames, 
      phone,
      confirmationCode,
      isConfirmed,
      isTourist,
      isAgency,
      location,
      documentType,
      documentNumber,
      documentIssueDate,
      birthDate,
      isPoliticsTrue,
      isTtoDtosTrue,
      password,
    });

    if (!user.email) {
      return res
        .status(400)
        .json({ message: "La dirección de correo electrónico ya existe." });
    }

    user.isConfirmed = false;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Usuario guardado correctamente" });
  } catch (error) {
    console.error("Error al guardar el usuario:", error);
    res
      .status(500)
      .json({ message: "Error al guardar el usuario", error });
  }
};

// Crear un nuevo tipo de documento
const createDocumentType = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: 'Nombre y descripción son requeridos' });
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
    console.error(error)
    res.status(500).json({ message: 'Error al crear el tipo de documento', error });
  }
};

// Actualizar un tipo de documento existente
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
      return res.status(404).json({ message: "Tipo de documento no encontrado" });
    }

    res.status(200).json(updatedDocumentType);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el tipo de documento", error });
  }
};

// Obtener todos los tipos de documento
const getAllDocumentType = async (req, res) => {
  try {
    const documentType = await DocumentType.find();
    console.log('tipos de documento',documentType)
    res.status(200).json(documentType);
  } catch (error) {
    console.error("Error al obtener los tipos de documento:", error);
    res.status(500).json({ message: "Error al obtener los tipos de documento", error });
  }
};

// Obtener un tipo de documento por ID
const getDocumentTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const documentType = await DocumentType.findById(id);

    if (!documentType) {
      return res.status(404).json({ message: "Tipo de documento no encontrado" });
    }

    res.status(200).json(documentType);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el tipo de documento", error });
  }
};

// Eliminar un tipo de documento
const deleteDocumentType = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDocumentType = await DocumentType.findByIdAndDelete(id);

    if (!deletedDocumentType) {
      return res.status(404).json({ message: "Tipo de documento no encontrado" });
    }

    res.status(200).json({ message: "Tipo de documento eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el tipo de documento", error });
  }
};

module.exports = {
  sendConfirmationCodeEmail,
  verifyConfirmationCodeEmail,
  createDocumentType,
  updateDocumentType,
  getAllDocumentType,
  getDocumentTypeById,
  deleteDocumentType,
  registerUser,
};
