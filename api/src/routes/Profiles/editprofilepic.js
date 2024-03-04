require("dotenv").config();
const express = require("express");
const { User } = require("../../db.js");
const authMiddleware = require("../../controllers/authMiddleware.js");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const streamifier = require('streamifier');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.put("/", authMiddleware, upload.single("picture"), async (req, res) => {
  const { name } = req.body;
  const user = req.user;
  const file = req.file;
  try {
    const usuario = await User.findByPk(user.id);

    if (!usuario) {
      return res.status(404).json({ message: "El usuario no existe" });
    }

    if (file) {

      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        async (error, result) => {
          if (error) {
            return res.status(500).json({ message: "Error al cargar la imagen", error });
          }

          usuario.picture = result.secure_url;

          if (name) {
            usuario.name = name;
          }

          await usuario.save();
          res.json({ message: "Perfil actualizado exitosamente", usuario });
        }
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    } else {
      if (name) {
        usuario.name = name;
        await usuario.save();
        res.json({ message: "Perfil actualizado exitosamente", usuario });
      } else {
        res.status(400).json({ message: "No hay cambios para actualizar" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor", error });
  }
});

module.exports = router;
