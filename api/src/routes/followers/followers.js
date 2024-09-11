const express = require('express');
const router = express.Router();
const { User, Follow } = require('../../db'); 
const authenticateToken = require('../../controllers/authMiddleware'); 

router.post('/', authenticateToken, async (req, res) => {
  const { followingId } = req.body;
  const followerId = req.user.id;

  if (followerId === followingId) {
    return res.status(400).json({ message: "No puedes seguirte a ti mismo." });
  }

  try {
    const follow = await Follow.create({ followerId, followingId });
    res.status(201).json(follow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;