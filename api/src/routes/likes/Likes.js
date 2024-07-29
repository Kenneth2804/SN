const express = require('express');
const router = express.Router();
const { Likes, Notification, Comments, User } = require('../../db');

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

        const comment = await Comments.findByPk(commentId);
        if (comment) {
            const user = await User.findByPk(userId);
            if (user) {
                const notification = await Notification.create({
                    type: 'like',
                    message: `Your comment has been liked by ${user.name}` ,
                    userId: comment.userId,
                });
                console.log('Notificación creada:', notification.message);
            }
        }


        const user = await User.findByPk(userId, {
            attributes: ['name', 'picture']
        });

        const likeResponse = {
            like,
            user: {
                name: user.name,
                picture: user.picture,
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
