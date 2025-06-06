const pool = require('../config/db');

const updateUsername = async (req, res) => {
  const userId = req.user.userId; // Cambiado de id a userId
  const { username } = req.body;

  if (!username || username.length < 3) {
    return res.status(400).json({ message: 'Username is required and must be at least 3 characters' });
  }

  try {
    console.log('User from token:', req.user);
    
    const userCheck = await pool.query('SELECT id FROM public."Users" WHERE username = $1 AND id <> $2', [username, userId]);
    if (userCheck.rows.length > 0) {
      return res.status(409).json({ message: 'Username already in use' });
    }

    const result = await pool.query('UPDATE public."Users" SET username = $1 WHERE id = $2 RETURNING id, username, email', [username, userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Username updated successfully',
      user: result.rows[0],
    });
  } catch (error) {
    console.error('Error updating username:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  updateUsername,
};
