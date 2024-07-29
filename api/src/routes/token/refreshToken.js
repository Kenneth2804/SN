require("dotenv").config();
const {Router} = require ("express")
const router = Router();
const jwt = require("jsonwebtoken");
const authenticateToken = require("../../controllers/authMiddleware.js");

router.post('/', authenticateToken, (req, res) => {
    const { id } = req.user;
  
    const newToken = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '3h'
    });
  
    res.json({ token: newToken });
  });
  

module.exports = router