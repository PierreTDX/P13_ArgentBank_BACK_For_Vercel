const express = require('express')
const dotEnv = require('dotenv')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const yaml = require('yamljs')
const path = require('path');
const swaggerDocs = yaml.load(path.join(__dirname, '../swagger.yaml'));
const dbConnection = require('./database/connection')

dotEnv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Connect to the database
dbConnection()

// Handle CORS issues
app.use(cors())

// Request payload middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Handle custom routes
app.use('/api/v1/user', require('./routes/userRoutes'))

// API Documentation
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

app.get('/', (req, res, next) => {
  res.send(
    'Hello from my Express server v2!<br> <a href="http://localhost:3001/api-docs">API Docs : http://localhost:3001/api-docs</a>'
  )
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
