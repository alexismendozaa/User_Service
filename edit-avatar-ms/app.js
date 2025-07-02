const dotenv = require('dotenv');
dotenv.config(); // Cargar variables de entorno antes de usarlas

const express = require('express');
const cors = require('cors');  
const userRoutes = require('./routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const pool = require('./config/db'); 

const app = express();


const corsOptions = {
  origin: '*',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  allowedHeaders: ['Content-Type', 'Authorization'],  
};
app.use(cors(corsOptions));  

// Middleware to parse request bodies as JSON
app.use(express.json());

// Swagger Documentation
app.use('/api-docs-avatar', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/user', userRoutes);

// db conection
pool.query('SELECT NOW()')
  .then((result) => {
    console.log('Conexión exitosa a la base de datos PostgreSQL:', result.rows);  // Imprime la fecha de la consulta
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos PostgreSQL:', error);  // Si hay un error, lo mostramos
  });

// Configure the server
const PORT =  3007;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

