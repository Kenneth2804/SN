const express = require('express');
const router = express.Router();
const { User, Follow } = require('../../db'); 
const authenticateToken = require('../../controllers/authMiddleware'); 

router.get('/:userId', authenticateToken, async (req, res) => {
  const { userId } = req.params;

  try {

    const follows = await Follow.findAll({
      where: { followingId: userId },
      include: [{ model: User, as: 'follower' }],
    });

    const followers = follows.map(follow => ({
      id: follow.follower.id,
      name: follow.follower.name,
      email: follow.follower.email,
    }));

    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
