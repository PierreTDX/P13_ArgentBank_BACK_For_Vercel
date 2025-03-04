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
const corsOptions = {
  origin: [
    "http://localhost:5173",  // Front-end en local
    "https://p13-argentbank-oc.vercel.app"  // Front-end en ligne
  ],
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization"
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // CORS pre-flight request (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  next();
});

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
    'Hello from my Express server v2!<br> <a href="https://p13-argentbank-oc.vercel.app/">Go to the Front on line to test it : https://p13-argentbank-oc.vercel.app/</a>'
  )
})

// app.listen(PORT, () => {
//   console.log(`Server listening on http://localhost:${PORT}`)
// })
module.exports = app;