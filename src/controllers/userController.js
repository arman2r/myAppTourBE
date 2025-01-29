const User = require("../models/userModels/generalInfoUser");
const bcrypt = require("bcryptjs");

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
 *     summary: Register a new user
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
 *                 description: User's first name
 *               lastNames:
 *                 type: string
 *                 description: User's last name
 *               agencyName:
 *                 type: string
 *                 description: Name of the agency, if applicable
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               phone:
 *                 type: string
 *                 description: User's phone number
 *               confirmationCode:
 *                 type: string
 *                 description: Confirmation code for user verification
 *               isConfirmed:
 *                 type: boolean
 *                 description: Indicates if the user is confirmed
 *               isTourist:
 *                 type: boolean
 *                 description: Indicates if the user is a tourist
 *               isAgency:
 *                 type: boolean
 *                 description: Indicates if the user is an agency
 *               location:
 *                 type: string
 *                 description: User's location ID
 *               documentType:
 *                 type: string
 *                 description: Document type ID
 *               documentNumber:
 *                 type: string
 *                 description: Document number
 *               documentIssueDate:
 *                 type: string
 *                 format: date
 *                 description: Date of document issuance
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: User's birth date
 *               isPoliticsTrue:
 *                 type: boolean
 *                 description: User's acceptance of terms and conditions
 *               isTtoDtosTrue:
 *                 type: boolean
 *                 description: User's acceptance of data processing policies
 *               password:
 *                 type: string
 *                 description: User's password
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
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input data
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
 *                   example: Email already exists
 *       500:
 *         description: Server error
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
 *                   example: Error creating user
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user's unique identifier
 *         names:
 *           type: string
 *         lastNames:
 *           type: string
 *         agencyName:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         confirmationCode:
 *           type: string
 *         isConfirmed:
 *           type: boolean
 *         isTourist:
 *           type: boolean
 *         isAgency:
 *           type: boolean
 *         location:
 *           type: string
 *         documentType:
 *           type: string
 *         documentNumber:
 *           type: string
 *         documentIssueDate:
 *           type: string
 *           format: date
 *         birthDate:
 *           type: string
 *           format: date
 *         isPoliticsTrue:
 *           type: boolean
 *         isTtoDtosTrue:
 *           type: boolean
 *         password:
 *           type: string
 *       required:
 *         - names
 *         - lastNames
 *         - email
 *         - phone
 *         - password
 */
const registerUser = async (req, res) => {
  try {
    const { email, password, ...rest } = req.body; // Desestructurar para extraer email y password

    // Verificar si el correo electrónico ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "El correo electrónico ya está registrado.",
      });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario con la contraseña encriptada
    const newUser = new User({
      ...rest, // Otros campos del usuario
      email,
      password: hashedPassword, // Reemplazar la contraseña con la versión encriptada
    });

    // Guardar el usuario en la base de datos
    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      data: savedUser,
    });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({
      success: false,
      message: "Error al crear el usuario.",
    });
  }
};

/**
 * @swagger
 * /api/user/users:
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
 * /api/user/{email}:
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
 * /api/user/{id}:
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
 * /api/user/{id}:
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
