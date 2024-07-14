const express = require('express');
const router = express.Router();
const { Replies } = require('../../db'); // Ajusta el path según tu estructura

// Ruta para crear una respuesta
router.post('/reply', async (req, res) => {
    const { texto, userId, commentId } = req.body;
    try {
        const reply = await Replies.create({ texto, userId, commentId });
        res.status(201).json(reply);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para obtener respuestas de un comentario
router.get('/replies/:commentId', async (req, res) => {
    const { commentId } = req.params;
    try {
        const replies = await Replies.findAll({ where: { commentId } });
        res.status(200).json(replies);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
