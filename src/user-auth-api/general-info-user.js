// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const autogen = require('swagger-autogen')({openapi: '3.0.0'});
const User = require('../models/userModels')

//api key twilio VLDDKZXFBZPHUYBKBLUYHMVM

// Creating an Express application instance
const app = express();
const PORT = 3000;

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/mydatabase')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

 



// Función para generar un código aleatorio
function generateConfirmationCode() {
  const digits = '0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += digits[Math.floor(Math.random() * 10)];
  }
  return code;
}

// Ruta para enviar el código de confirmación por correo electrónico
app.post('/sendConfirmationCodeEmail', async (req, res) => {
  const { email } = req.body;

  // Generar un código de confirmación
  const confirmationCode = generateConfirmationCode();

  // Guardar el código de confirmación en la base de datos
  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      { confirmationCode: confirmationCode },
      { new: true, upsert: true }
    );

    // Enviar el código por correo electrónico
    await sendConfirmationEmail(email, confirmationCode);

    res.status(200).json({ message: 'Confirmation code sent successfully' });
  } catch (error) {
    console.error('Error sending confirmation code:', error);
    res.status(500).json({ message: 'Failed to send confirmation code' });
  }
});

app.post('/verifyConfirmationCodeEmail', async (req, res) => {
  const { email, code } = req.body;

  try {
    // Buscar el usuario por su correo electrónico y el código de confirmación
    const user = await User.findOne({ email: email, confirmationCode: code });

    if (!user) {
      return res.status(400).json({ message: 'Código de confirmación inválido' });
    }

    // Marcar el usuario como confirmado
    user.isConfirmed = true;
    await user.save();

    res.status(200).json({ message: 'Usuario confirmado correctamente' });
  } catch (error) {
    console.error('Error al verificar el código de confirmación:', error);
    res.status(500).json({ message: 'Error al verificar el código de confirmación' });
  }
});

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for JWT validation
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
};

// Route to register a new user
app.post('/api/register', async (req, res) => {
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,      
      names: req.body.names,
      lastNames: req.body.lastNames,
      createAt: Date.now(),
      updateAt: Date.now(),
      userIsActive: false,
      email: req.body.email,
      phone: req.body.phone,
      isTourist: req.body.isTourist,
      isAgency: req.body.isAgency,
      isPoliticsTrue: req.body.isPoliticsTrue,
      isTtoDtosTrue: req.body.isTtoDtosTrue,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to authenticate and log in a user
app.post('/api/login', async (req, res) => {
  try {
    // Check if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, 'secret');
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Protected route to get user details
app.get('/api/user', verifyToken, async (req, res) => {
  try {
    // Fetch user details using decoded token
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ username: user.username, email: user.email });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to my User Registration and Login API!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});