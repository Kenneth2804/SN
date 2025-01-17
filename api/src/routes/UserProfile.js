const {User, Comments} = require ("../db.js");
const { Router } = require("express");
const router = Router();
const authenticateToken = require("../controllers/authMiddleware.js");

function isAuthenticated(req, res, next) {
  const user = req.user;

  if (!user) {
    return res.status(404).json({ message: "Debe iniciar sesión para acceder a esta página" });
  }

  next();
}

router.get("/", authenticateToken, isAuthenticated, async (req, res) => {
  const user = req.user;

  try {
    const dbUser = await User.findOne({
      where: { id: user.id },
      include: { model: Comments },
    });

    if (!dbUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const userComments = dbUser.comments ? dbUser.comments.map((comment) => ({
      id: comment.id,
      texto: comment.texto,
      audioFilePath: comment.audioFilePath,
      createdAt: comment.createdAt
    })) : [];

    const userInfo = {
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      picture: dbUser.picture,
      comments: userComments,
      originCountry: dbUser.originCountry,
      originCity: dbUser.originCity
    };

    res.json({ user: userInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor en userProfile" });
  }
});

module.exports = router;