const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api-docs-password', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/user', userRoutes);

const PORT = 3006;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Running on port ${PORT}`);
});
