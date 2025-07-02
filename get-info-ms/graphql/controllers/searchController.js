const { userPool, postPool } = require('../../config/db');

 // search fuzzy basic
function normalize(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // drop accents
    .toLowerCase();
}

async function searchUsers(text) {
  // Search in username and email, fuzzy search
  const query = `
    SELECT id, username, email, "profileImage", "createdAt", "updatedAt"
    FROM "Users"
    WHERE unaccent(username) ILIKE unaccent($1)
      OR unaccent(email) ILIKE unaccent($1)
  `;
  const values = [`%${text}%`];
  const res = await userPool.query(query, values);
  return res.rows;
}

async function searchPosts(text) {
  // Search in post description, fuzzy search
  const query = `
    SELECT id, description, image_url, user_id, created_at
    FROM post
    WHERE unaccent(description) ILIKE unaccent($1)
  `;
  const values = [`%${text}%`];
  const res = await postPool.query(query, values);
  return res.rows;
}

async function searchAll(text) {
  // Normalize the text to remove accents and convert to lowercase
  const cleanText = normalize(text);

  const [users, posts] = await Promise.all([
    searchUsers(cleanText),
    searchPosts(cleanText)
  ]);
  return { users, posts };
}

module.exports = {
  searchAll,
};
