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

const PORT =  3008;

app.listen(PORT, () => {
  console.log(`Edit Username Service running on port ${PORT}`);
});
