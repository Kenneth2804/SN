const express = require('express');
const router = express.Router();
const { Likes } = require('../../db'); // Ajusta el path según tu estructura

router.post('/', async (req, res) => {
    const { userId, commentId } = req.body;
    try {
        const existingLike = await Likes.findOne({ where: { userId, commentId } });
        if (existingLike) {
            console.log('Like existente encontrado. Procediendo a eliminarlo.');
            await Likes.destroy({ where: { userId, commentId } });
            return res.status(200).json({ message: 'Like eliminado.' });
        }

        console.log('No se encontró un like existente. Creando uno nuevo.');
        const like = await Likes.create({ userId, commentId });
        res.status(201).json(like);
    } catch (error) {
        console.error('Error al manejar el like:', error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;



// Ruta para quitar like a un comentario
/* router.delete('/unlike', async (req, res) => {
    const { userId, commentId } = req.body;
    try {
        await Likes.destroy({ where: { userId, commentId } });
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
 */
