const User = require("../models/userModels/generalInfoUser");


/**
 * @swagger
 * tags:
 *   name: User Register
 *   description: User Register APIs
 */

/**
 * @swagger
 * /userRegister:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [User Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               names:
 *                 type: string
 *                 description: Nombres del usuario
 *               lastNames:
 *                 type: string
 *                 description: Apellidos del usuario
 *               agencyName:
 *                 type: string
 *                 description: Nombre de la agencia dado el caso
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               phone:
 *                 type: string
 *                 description: Teléfono del usuario
 *               confirmationCode:
 *                 type: string
 *                 description: Código de confirmación del usuario
 *               isConfirmed:
 *                 type: boolean
 *                 description: Indica si el usuario está confirmado
 *               isTourist:
 *                 type: boolean
 *                 description: Indica si el usuario es un turista
 *               isAgency:
 *                 type: boolean
 *                 description: Indica si el usuario es una agencia
 *               location:
 *                 type: string
 *                 description: ID de la ubicación del usuario
 *               documentType:
 *                 type: string
 *                 description: ID del tipo de documento
 *               documentNumber:
 *                 type: string
 *                 description: Número del documento
 *               documentIssueDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de emisión del documento
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento del usuario
 *               isPoliticsTrue:
 *                 type: boolean
 *                 description: Aceptación de política
 *               isTtoDtosTrue:
 *                 type: boolean
 *                 description: Aceptación de procesamiento de datos personales
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *             example:
 *               names: John
 *               lastNames: Doe
 *               agencyName: everTour
 *               email: john.doe@example.com
 *               phone: 123456789
 *               confirmationCode: ABC123
 *               isConfirmed: false
 *               isTourist: false
 *               isAgency: true
 *               location: 60d0fe4f5311236168a109ca
 *               documentType: 60d0fe4f5311236168a109cb
 *               documentNumber: D1234567
 *               documentIssueDate: 2022-01-01
 *               birthDate: 1990-01-01
 *               isPoliticsTrue: true
 *               isTtoDtosTrue: true
 *               password: password123
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/userModels/generalInfoUser'
 *       400:
 *         description: Datos de entrada no válidos
 *       500:
 *         description: Error del servidor
 */
const registerUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al crear el usuario",
    });
  }
};


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [User Register]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/models/userModels/generalInfoUser'
 *       500:
 *         description: Error del servidor
 */
const getAllUsers = async (req, res) => {
  try {
    // Obtener todos los usuarios y poblar el campo 'documentType'
    const users = await User.find().populate("documentType").exec();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al obtener los usuarios",
    });
  }
};

/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     summary: Obtener un usuario por correo electrónico
 *     tags: [User Register]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: El correo electrónico del usuario a buscar
 *     responses:
 *       200:
 *         description: Información del usuario junto con los datos adjuntos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/userModels/generalInfoUser'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
const getUserByEmail = async (req, res) => {
  const { email } = req.params; // Asumimos que el correo electrónico se pasa como parámetro en la URL

  try {
    // Buscar el usuario por correo electrónico y poblar los campos 'documentType' y 'attachments'
    const user = await User.findOne({ email })
      .populate("location")
      .populate("documentType") // Poblar el tipo de documento
      .populate({
        path: "attachments", // Asegúrate de que el campo 'attachments' esté definido en tu modelo de Usuario
        populate: {
          path: "typeAttach", // Poblar el tipo de documento asociado con el archivo adjunto
        },
      })
      .exec();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al obtener el usuario",
    });
  }
};

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags: [User Register]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del usuario a actualizar
 *       - in: body
 *         name: user
 *         description: Información del usuario para actualizar
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             phone:
 *               type: string
 *               description: Número de teléfono del usuario
 *             userIsActive:
 *               type: boolean
 *               description: Estado activo del usuario
 *             isTourist:
 *               type: boolean
 *               description: Indica si el usuario es un turista
 *             isAgency:
 *               type: boolean
 *               description: Indica si el usuario es una agencia
 *           example:
 *             phone: '+123456789'
 *             userIsActive: true
 *             isTourist: false
 *             isAgency: true
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/userModels/generalInfoUser'
 *       404:
 *         description: Usuario no encontrado
 *       400:
 *         description: Datos de entrada no válidos
 *       500:
 *         description: Error del servidor
 */
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { phone, userIsActive, isTourist, isAgency } = req.body;

  // Validar campos permitidos
  const updates = {};
  if (phone) updates.phone = phone;
  if (userIsActive !== undefined) updates.userIsActive = userIsActive;
  if (isTourist !== undefined) updates.isTourist = isTourist;
  if (isAgency !== undefined) updates.isAgency = isAgency;

  try {
    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
    }).exec();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al actualizar el usuario",
    });
  }
};

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [User Register]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id).exec();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Usuario eliminado con éxito",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar el usuario",
    });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
};
