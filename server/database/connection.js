const mongoose = require('mongoose');
require('dotenv').config();
const databaseUrl = process.env.DATABASE_URL;

// Définir explicitement l'option strictQuery
mongoose.set('strictQuery', false); // ou true si tu préfères

module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl, {
      useNewUrlParser: true,  // Cette option est obsolète, mais peut être maintenue pour éviter les avertissements.
      useUnifiedTopology: true,  // C'est important pour éviter les problèmes de gestion de topologie dans MongoDB.
    });
    console.log('Database successfully connected');
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`);
    throw new Error(error);
  }
};