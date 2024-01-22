const { User, Comments } = require("../db.js");

exports.getUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({
            where: { id },
            include: [Comments] // Incluir comentarios si es necesario
        });
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }
        return res.json(user); // Envía la información del usuario
    } catch (error) {
        next(error); // Maneja cualquier error que pueda ocurrir
    }
};