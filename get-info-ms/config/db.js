const { Pool } = require('pg');
require('dotenv').config();

// Pool for users database
const userPool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_USERS,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

// Pool for posts database
const postPool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_POST,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

// Optional: handle pool errors
userPool.on('error', (err) => {
  console.error('Unexpected error on idle userPool client', err);
  process.exit(-1);
});

postPool.on('error', (err) => {
  console.error('Unexpected error on idle postPool client', err);
  process.exit(-1);
});

module.exports = { userPool, postPool };
