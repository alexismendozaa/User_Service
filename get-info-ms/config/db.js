const { Pool } = require('pg');
require('dotenv').config();

// Direct assignment: hardcoded database names
const userPool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'users', 
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

const postPool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'post', 
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

userPool.on('error', (err) => {
  console.error('Unexpected error on idle userPool client', err);
  process.exit(-1);
});

postPool.on('error', (err) => {
  console.error('Unexpected error on idle postPool client', err);
  process.exit(-1);
});

module.exports = { userPool, postPool };
