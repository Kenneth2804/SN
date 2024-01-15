const jwt = require('jsonwebtoken');
require("dotenv").config();
const { User } = require("../db.js");

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send("no hay token"); 
  }
  
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.sendStatus(403); 
    }
    
    try {
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidorrrr' });
    }
  });
}

module.exports = authenticateToken;