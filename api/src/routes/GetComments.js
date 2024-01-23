const { Router } = require('express');
const { Comments } = require("../db.js");

const router = Router();

router.get("/", async (req, res) => {
    try {
        // Añadir 'order' a la consulta para obtener los comentarios más recientes primero
        const comments = await Comments.findAll({ 
            order: [['createdAt', 'DESC']] // Asegúrate de que 'createdAt' es el nombre correcto del campo de fecha
        }); 
        res.status(200).json(comments); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

module.exports = router;
