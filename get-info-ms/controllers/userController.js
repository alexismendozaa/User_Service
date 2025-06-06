const pool = require('../config/db');

const getUserInfoByNameOrEmail = async (req, res) => {
  const { name, email } = req.query;
  const currentUserId = req.user.userId; 

  try {
    
    const query = `
      SELECT username, email, "profileImage" 
      FROM public."Users" 
      WHERE username = $1 OR email = $2
    `;
    const values = [name, email];
    
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];

    // If the authenticated user is the same as the requested one, we return only the public information
    if (parseInt(user.username) === currentUserId || parseInt(user.email) === currentUserId) {
      const publicInfo = {
        username: user.username,  
        email: user.email,
        photo: user.profileImage, 
      };
      return res.json(publicInfo);
    }

    // If it is not the authenticated user, we only return public information
    const publicInfo = {
      username: user.username,  
      email: user.email,        
      photo: user.profileImage,
    };

    res.json(publicInfo);
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getUserInfoByNameOrEmail };
