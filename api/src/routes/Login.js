require("dotenv").config();
const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { User } = require("../db.js");
const jwt = require("jsonwebtoken");
const router = Router();
const authenticateToken = require("../controllers/authMiddleware.js");

const validateInputs = [
  body("email").isEmail().withMessage("El email debe ser válido"),
  body("password").notEmpty().withMessage("La contraseña es requerida")
];

router.post("/", validateInputs, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "El usuario no existe" });
    }

 
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "La contraseña es incorrecta" });
    }


    

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "3h"
    });
    if (!req.session) {
        req.session = {};
      }

    req.session.user = user;

    res.json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});


module.exports = router;