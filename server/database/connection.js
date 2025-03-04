const mongoose = require('mongoose')
require('dotenv').config()
const databaseUrl = process.env.DATABASE_URL

// Ajouter cette ligne pour définir explicitement l'option strictQuery
mongoose.set('strictQuery', false); // ou true si tu préfères

module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl, { useNewUrlParser: true })
    console.log('Database successfully connected')
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`)
    throw new Error(error)
  }
}