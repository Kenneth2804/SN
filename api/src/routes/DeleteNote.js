const { Router } = require('express');
const { Comments } = require("../db.js");
const router = Router();
const authenticateToken = require("../controllers/authMiddleware.js");

function isAuthenticated(req, res, next) {
    const userId = req.user;

    if (!userId) {
        return res.status(404).json({ message: "Debe iniciar sesión para acceder a esta página" });
    }

    next();
}

router.delete("/", authenticateToken, isAuthenticated, async (req, res) => {
    const { id } = req.body; 
    const userId = req.user.id; 

    try {
        const comment = await Comments.findOne({
            where: {
                id, 
                userId 
            }
        });

        if (!comment) {
            return res.status(404).json({ message: "Comentario no encontrado o no autorizado" });
        }

        await comment.destroy();

        res.status(200).json({ message: "Comentario eliminado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el comentario" });
    }
});

module.exports = router;
