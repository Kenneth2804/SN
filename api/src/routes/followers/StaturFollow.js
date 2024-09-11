const express = require('express');
const router = express.Router();
const { Follow } = require('../../db');
const authenticateToken = require('../../controllers/authMiddleware');

router.get('/:followingId', authenticateToken, async (req, res) => {
  const { followingId } = req.params;
  const followerId = req.user.id;

  try {
    const follow = await Follow.findOne({
      where: {
        followerId: followerId,
        followingId: followingId
      }
    });

    if (!follow) {
      return res.json({ isFollowing: false });
    }

    res.json({ isFollowing: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
