const { Router } = require('express');
const { Comments, User, Likes } = require("../db.js");
const Sequelize = require('sequelize');
const router = Router();

router.get("/", async (req, res) => {
    const { country, city } = req.query;

    try {
        // Obtener el comentario más reciente
        let recentCommentQueryOptions = {
            include: [
                {
                    model: User,
                    attributes: ['id','name', 'originCountry', 'originCity', 'picture'],
                    where: {}
                },
                {
                    model: Likes, 
                    attributes: ['id', 'userId'] 
                }
            ],
            attributes: ['id','texto',"to", 'audioFilePath', 'createdAt'],
            order: [['createdAt', 'DESC']],
            limit: 1
        };

        if (country) {
            recentCommentQueryOptions.include[0].where.originCountry = country;
        }

        if (city) {
            recentCommentQueryOptions.include[0].where.originCity = city;
        }

        const recentComment = await Comments.findOne(recentCommentQueryOptions);

        // Obtener los comentarios restantes de manera aleatoria
        let randomCommentsQueryOptions = {
            include: [
                {
                    model: User,
                    attributes: ['id','name', 'originCountry', 'originCity', 'picture'],
                    where: {}
                },
                {
                    model: Likes, 
                    attributes: ['id', 'userId'] 
                }
            ],
            attributes: ['id','texto',"to", 'audioFilePath', 'createdAt'],
            order: Sequelize.literal('random()'),
            where: {}
        };

        if (country) {
            randomCommentsQueryOptions.include[0].where.originCountry = country;
        }

        if (city) {
            randomCommentsQueryOptions.include[0].where.originCity = city;
        }

        if (recentComment) {
            randomCommentsQueryOptions.where.id = { [Sequelize.Op.ne]: recentComment.id };
        }

        const randomComments = await Comments.findAll(randomCommentsQueryOptions);

        // Combinar ambos resultados
        const comments = recentComment ? [recentComment, ...randomComments] : randomComments;

        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

module.exports = router;
