const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Management - Public User Info Service',
      version: '1.0.0',
      description: 'Microservice for retrieving public information of users (name, email, photo). If the authenticated user is the same, complete information is returned.',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'], // This will pick up all the routes in the /routes folder
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs-users', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = setupSwagger;
