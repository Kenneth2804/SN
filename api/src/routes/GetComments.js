const { Router } = require('express');
const { Comments, User, Likes } = require("../db.js"); // Asegúrate de importar el modelo Likes

const router = Router();

router.get("/", async (req, res) => {
    const { country, city } = req.query; 

    try {
        let queryOptions = {
            include: [
                {
                    model: User,
                    attributes: ['id','name', 'originCountry', 'originCity', 'picture'],
                    where: {}
                },
                {
                    model: Likes, // Incluir el modelo Likes
                    attributes: ['id', 'userId'] // Selecciona los atributos que desees mostrar
                }
            ],
            attributes: ['id','texto', 'audioFilePath', 'createdAt'],
            order: [['createdAt', 'DESC']]
        };

        if (country) {
            queryOptions.include[0].where.originCountry = country;
        }

        if (city) {
            queryOptions.include[0].where.originCity = city;
        }

        const comments = await Comments.findAll(queryOptions);
        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

module.exports = router;
