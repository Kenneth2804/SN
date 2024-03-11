const { Router } = require('express');
const { Comments, User } = require("../db.js");

const router = Router();

router.get("/", async (req, res) => {
    const { country, city } = req.query; 

    try {
        let queryOptions = {
            include: [{
                model: User,
                attributes: ['name', 'originCountry', 'originCity', 'picture'],
                where: {}
            }],
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
