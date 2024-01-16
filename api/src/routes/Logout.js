const { Router } = require('express');
const router = Router();

// Assuming you're using Express sessions along with JWT
router.post('/', (req, res) => {
  // If using Express sessions, destroy the session
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: 'Error al cerrar la sesión' });
      }
    });
  }

  // Inform the client to delete the token
  res.json({ message: 'Sesión cerrada exitosamente' });
});

module.exports = router;
