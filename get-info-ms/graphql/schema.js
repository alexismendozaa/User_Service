const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    profileImage: String
    createdAt: String
    updatedAt: String
  }

  type Post {
    id: ID!
    description: String!
    image_url: String
    user_id: ID!
    created_at: String
  }

  type SearchResults {
    users: [User!]!
    posts: [Post!]!
  }

  type Query {
    search(text: String!): SearchResults!
  }
`;

module.exports = typeDefs;
