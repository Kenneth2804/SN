const express = require('express');
const router = express.Router();
const { User } = require('../../db');

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ message: 'Description is required.' });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.description = description;
    await user.save();

    res.status(200).json({ message: 'User description updated successfully.', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
