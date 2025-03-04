const mongoose = require('mongoose');
require('dotenv').config();

// Connexion à la base de données
const connectDB = async () => {
  const databaseUrl = process.env.DATABASE_URL;
  try {
    await mongoose.connect(databaseUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    throw new Error(error);
  }
};

// Fonction API
module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      await connectDB(); // Connexion à la base de données
      res.status(200).json({ message: 'API is working!' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to connect to database', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};