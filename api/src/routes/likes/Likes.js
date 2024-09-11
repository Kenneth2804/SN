const express = require('express');
const router = express.Router();
const { Likes, Notification, Comments, User } = require('../../db');
const { sendNotification } = require('../../controllers/Socket.js'); 

router.post('/', async (req, res) => {
    const { userId, commentId } = req.body;

    try {
        const existingLike = await Likes.findOne({ where: { userId, commentId } });

        if (existingLike) {
            await Likes.destroy({ where: { userId, commentId } });
            return res.status(200).json({ message: 'Like eliminado.' });
        }

        const like = await Likes.create({ userId, commentId });

        const comment = await Comments.findByPk(commentId);
        if (comment) {
            const user = await User.findByPk(userId);
            if (user) {
                // Crear la notificación
                const notification = await Notification.create({
                    type: 'like',
                    message: `A ${user.name} le gustó tu comentario`,
                    userId: comment.userId, // usuario que recibirá la notificación
                    senderId: userId, // usuario que dio el like
                });

                // Obtener el usuario que envió la notificación (sender)
                const populatedNotification = {
                    ...notification.toJSON(),
                    sender: {
                        name: user.name,
                        picture: user.picture,
                    }
                };

                // Enviar la notificación en tiempo real
                sendNotification(comment.userId, populatedNotification);
            }
        }

        const likedUser = await User.findByPk(userId, {
            attributes: ['name', 'picture']
        });

        const likeResponse = {
            like,
            user: {
                name: likedUser.name,
                picture: likedUser.picture,
                likedAt: like.createdAt
            }
        };

        res.status(201).json(likeResponse);
    } catch (error) {
        console.error('Error al manejar el like:', error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;