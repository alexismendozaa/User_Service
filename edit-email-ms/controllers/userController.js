const pool = require('../config/db');

const updateEmail = async (req, res) => {
  const userId = req.user.userId;
  const { email } = req.body;

  if (!email || !validateEmail(email)) {
    return res.status(400).json({ message: 'Valid email is required' });
  }

  try {
    const emailCheck = await pool.query('SELECT id FROM public."Users" WHERE email = $1 AND id <> $2', [email, userId]);
    if (emailCheck.rows.length > 0) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Actualizar email
    const result = await pool.query('UPDATE public."Users" SET email = $1 WHERE id = $2 RETURNING id, username, email', [email, userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Email updated successfully',
      user: result.rows[0],
    });
  } catch (error) {
    console.error('Error updating email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

function validateEmail(email) {
  // Validación básica de email
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

module.exports = {
  updateEmail,
};
