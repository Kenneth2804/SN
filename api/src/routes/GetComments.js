const { Router } = require('express')
const { Comments } = require("../db.js");

const router = Router()

router.get("/", async (req, res) => {
    try {
      const comments = await Comments.findAll(); 
      res.status(200).json(comments); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  });

  module.exports = router