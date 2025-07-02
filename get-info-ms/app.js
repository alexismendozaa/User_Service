const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const setupSwagger = require('./swagger');
require('dotenv').config();

const app = express();

// GraphQL setup
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

// Middlewares
app.use(cors());
app.use(express.json());

// REST API routes
app.use(userRoutes);

// Swagger documentation
setupSwagger(app);

// Start Apollo GraphQL Server and mount at /graphql
async function startApolloServer() {
  // Create Apollo Server instance with schema and resolvers
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  // Apply as middleware to Express app
  server.applyMiddleware({ app, path: '/graphql' });
}

startApolloServer();

const PORT = 3009;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Running on port ${PORT}`);
});
