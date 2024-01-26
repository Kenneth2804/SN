const { User, Comments } = require("../db.js");

const getCommentsByCountry = async (req, res) => {
    const { country } = req.query; 

    try {
        const comments = await Comments.findAll({
            include: [{
                model: User,
                where: { originCountry: country }
            }]
        });

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getCommentsByCountry
};
