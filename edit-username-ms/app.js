const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const setupSwagger = require('./swagger');
require('dotenv').config();

const app = express();

app.use(cors()); 
app.use(express.json());

app.use(userRoutes);

setupSwagger(app);

const PORT = 3004;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Running on port ${PORT}`);
});