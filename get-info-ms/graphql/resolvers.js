const { searchAll } = require('./controllers/searchController');

const resolvers = {
  Query: {
    search: async (_, { text }) => {
      return await searchAll(text);
    },
  },
};

module.exports = resolvers;
