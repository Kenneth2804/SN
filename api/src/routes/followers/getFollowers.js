const express = require('express');
const router = express.Router();
const { User } = require('../../db');
const authenticateToken = require('../../controllers/authMiddleware');

router.get('/:userId', authenticateToken, async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const followers = await user.getFollowers({
      attributes: ['id', 'name', 'picture'], 
      joinTableAttributes: [],
    });

    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
