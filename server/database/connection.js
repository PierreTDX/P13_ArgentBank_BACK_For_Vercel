const mongoose = require('mongoose')
require('dotenv').config()
const databaseUrl = process.env.DATABASE_URL

// cette ligne pour définir explicitement l'option strictQuery
mongoose.set('strictQuery', false); // ou true 

module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl)
    console.log('Database successfully connected')
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`)
    throw new Error(error)
  }
}