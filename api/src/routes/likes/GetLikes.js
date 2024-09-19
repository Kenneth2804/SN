const express = require('express');
const router = express.Router();
const { Likes, Comments, User } = require('../../db');

router.get("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId, {
            include: [{
                model: Likes,
                as: "likes",
                include: [{
                    model: Comments,
                    as: "comment",
                    attributes: ['texto', 'createdAt', 'to'],
                    include: [{
                        model: User,
                        as: 'user', 
                        attributes: ['id','name', 'picture'] 
                    }]
                }],
                attributes: ['commentId']
            }]
        });
        if (!user) {
            return res.status(400).send('Usuario no encontrado');
        }
        res.json(user);
    } catch (error) {
        console.error('Error al obtener likes:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;
