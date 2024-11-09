const express = require('express');
const { User, Comments } = require("../../db.js");
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId, { 
      include: [{
        model: Comments,
        as: 'comments',
        attributes: ['texto', 'audioFilePath', 'createdAt'] 
      }] 
    }); 

    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }

    res.json(user);
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
});

module.exports = router;
