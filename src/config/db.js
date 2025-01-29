const mongoose = require('mongoose');
require('dotenv').config(); // Asegúrate de cargar las variables de entorno

const uri = `mongodb+srv://${process.env.USERDB}:${process.env.PASSDB}@clusterwebapptourist0.yugq5g3.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority&appName=ClusterWebAppTourist0`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {});
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
