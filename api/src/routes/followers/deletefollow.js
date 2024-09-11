const express = require('express');
const router = express.Router();
const { User, Follow } = require('../../db');
const authenticateToken = require('../../controllers/authMiddleware'); 

router.post('/', authenticateToken, async (req, res) => {
    const { followingId } = req.body;
    const followerId = req.user.id;
  
    try {
      const follow = await Follow.findOne({
        where: {
          followerId: followerId,
          followingId: followingId
        }
      });
  
      if (!follow) {
        return res.status(404).json({ message: "No estás siguiendo a este usuario." });
      }
  
      await follow.destroy();
      res.status(200).json({ message: "Dejaste de seguir al usuario con éxito." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;