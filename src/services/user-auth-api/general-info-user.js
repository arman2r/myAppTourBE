const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModels/generalInfoUser");
const Agency = require("../../models/userModels/agency");
const Tourist = require("../../models/userModels/tourist");

// Función para registrar un nuevo usuario
async function registerUser(userData) {
  try {
    // Verificar si el correo electrónico ya existe
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Crear un nuevo usuario
    const newUser = new User({
      username: userData.username,
      email: userData.email,
      names: userData.names,
      lastNames: userData.lastNames,
      createAt: Date.now(),
      updateAt: Date.now(),
      userIsActive: false,
      phone: userData.phone,
      isTourist: userData.isTourist,
      isAgency: userData.isAgency,
      isPoliticsTrue: userData.isPoliticsTrue,
      isTtoDtosTrue: userData.isTtoDtosTrue,
      documentType: userData.documentType,
      documentNumber: userData.documentNumber,
      documentIssueDate: userData.documentIssueDate,
      birthDate: userData.birthDate,
      password: hashedPassword,
    });

    await newUser.save();

    // Si el usuario es una agencia, guardar información de agencia
    if (userData.isAgency) {
      const newAgency = new Agency({
        agencyName: userData.agencyName,
        currentLocation: userData.currentLocation,
        documentType: userData.documentType,
        documentInfo: userData.documentInfo,
        createAt: Date.now(),
      });

      await newAgency.save();
    }

    // Si el usuario es un turista, guardar información de turista
    if (userData.isTourist) {
      const newTourist = new Tourist({
        currentLocation: userData.currentLocation,
        documentType: userData.documentType,
        documentInfo: userData.documentInfo,
        birthDate: userData.birthDate,
      });

      await newTourist.save();
    }

    return { message: "User registered successfully" };
  } catch (error) {
    throw new Error("Error registering user: " + error.message);
  }
}

// Función para autenticar y hacer login de un usuario
async function loginUser(email, password) {
  try {
    // Buscar usuario por email
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Comparar contraseñas
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    // Generar token JWT
    const token = jwt.sign({ email: user.email }, config.secret_key);
    return { token };
  } catch (error) {
    throw new Error("Error logging in user: " + error.message);
  }
}

// Función para obtener detalles de usuario protegidos
async function getUserDetails(email) {
  try {
    // Buscar usuario por email
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }

    return { 
      firstName: user.firstName, 
      lastName: user.lastName, 
      documentType: user.documentType, 
      documentNumber: user.documentNumber, 
      email: user.email,
      isAgency: user.isAgency,
      location: user.location
    };
  } catch (error) {
    throw new Error("Error getting user details: " + error.message);
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserDetails,
};
