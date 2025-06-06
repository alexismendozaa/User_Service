const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const changePassword = async (req, res) => {
  const userId = req.user.userId;  // viene del token
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Las nuevas contraseñas no coinciden' });
  }

  try {
    // Obtener el hash de la contraseña actual guardada
    const userResult = await pool.query('SELECT password FROM public."Users" WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const hashedPassword = userResult.rows[0].password;

    // Verificar que la contraseña actual coincida
    const isMatch = await bcrypt.compare(currentPassword, hashedPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'La contraseña actual es incorrecta' });
    }

    // Hashear la nueva contraseña
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña en la base de datos
    await pool.query('UPDATE public."Users" SET password = $1 WHERE id = $2', [newHashedPassword, userId]);

    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error actualizando la contraseña:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { changePassword,
  
 };
