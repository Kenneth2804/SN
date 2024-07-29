const { Router } = require('express');
const { Comments, User, Likes } = require("../db.js"); 

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
                    model: Likes, 
                    attributes: ['id', 'userId'] 
                }
            ],
            attributes: ['id','texto',"to", 'audioFilePath', 'createdAt'],
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
