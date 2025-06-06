const axios = require('axios');
const path = require('path');
const pool = require('../config/db');

// Function to delete the old photo from S3
const deleteFromS3 = async (filePath) => {
  const bucketUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`;

  // We try to delete from the root first
  const deleteUrlRoot = `${bucketUrl}/${filePath}`;
  
  try {
    // We try to delete the image from the root
    await axios.delete(deleteUrlRoot);
    console.log(`Foto eliminada de la raíz: ${filePath}`);
    return;  // If it was removed, we terminate the execution
  } catch (error) {
    // If it couldn't be deleted from the root, we try the "profile-pictures/" folder
    console.log(`No se encontró la foto en la raíz. Intentando eliminar desde la carpeta 'profile-pictures'...`);
  }

// If it was not in the root, we tried to delete it from the "profile-pictures" folder  const filePathWithFolder = `profile-pictures/${filePath}`;
  const deleteUrlWithFolder = `${bucketUrl}/${filePathWithFolder}`;

  try {
// try to delete the image from the "profile-pictures" folder    await axios.delete(deleteUrlWithFolder);
    console.log(`Foto eliminada de la carpeta 'profile-pictures': ${filePathWithFolder}`);
  } catch (error) {
    console.error('Error al eliminar la foto desde la carpeta "profile-pictures": ', error);
    throw new Error('No se pudo eliminar la foto antigua');
  }
};

// Function to upload the new photo to the S3
const uploadToS3 = async (fileBuffer, filename) => {
  const bucketUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`;
  const filePath = filename;

  try {
    // Make the PUT request to the public S3 bucket with axios
    const uploadUrl = `${bucketUrl}/${filePath}`;
    await axios.put(uploadUrl, fileBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });

    return uploadUrl;
  } catch (error) {
    console.error('Error al subir la imagen a S3:', error);
    throw new Error('No se pudo subir la nueva imagen');
  }
};

// Function to update the profile picture
const updateProfileImage = async (req, res) => {
  const userId = req.user.userId;  // User ID from the token
  const { file } = req; // The image file is passed from Multer

  try {
    // Get the user and their profile picture
    const result = await pool.query('SELECT "profileImage" FROM public."Users" WHERE id = $1', [userId]);
    const user = result.rows[0];  // Access the first row of the results

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // If the user already has a photo, delete it from S3
    if (user.profileImage) {
      const oldFileName = path.basename(user.profileImage); 
      await deleteFromS3(oldFileName);  // Delete the old photo from S3
    }

    // Upload the new image to S3
    const newFileName = `${userId}_${Date.now()}.jpg`;  // Generate a unique name for the file
    const fileUrl = await uploadToS3(file.buffer, newFileName);

    // Update the image URL in the database
    await pool.query('UPDATE public."Users" SET "profileImage" = $1 WHERE id = $2', [fileUrl, userId]);

    return res.status(200).json({ message: 'Foto de perfil actualizada', profileImageUrl: fileUrl });
  } catch (error) {
    console.error('Error al actualizar la foto de perfil:', error);
    return res.status(500).json({ message: 'Error al actualizar la foto de perfil' });
  }
};

module.exports = { updateProfileImage };
