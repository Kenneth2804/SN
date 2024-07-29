const express = require('express');
const router = express.Router();
const { Notification } = require('../../db');

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const notifications = await Notification.findAll({ where: { userId } });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
