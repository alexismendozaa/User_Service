// controllers/userController.js
const pool = require('../config/db'); // Conexión a la base de datos

const deleteAccount = async (req, res) => {
  const userId = req.user.userId;  // Obtiene el userId desde el JWT

  try {
    // Verifica si el usuario existe en la base de datos
    const userCheck = await pool.query('SELECT id FROM public."Users" WHERE id = $1', [userId]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Elimina el usuario de la base de datos
    await pool.query('DELETE FROM public."Users" WHERE id = $1', [userId]);

    // Responde con el mensaje de éxito
    res.json({ message: 'Cuenta eliminada exitosamente' });
  } catch (error) {
    console.error('Error eliminando cuenta:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { deleteAccount };
