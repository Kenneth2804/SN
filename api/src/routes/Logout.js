const { Router } = require('express');
const router = Router();

router.post('/', (req, res) => {

  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: 'Error al cerrar la sesión' });
      }
    });
  }

  res.json({ message: 'Sesión cerrada exitosamente' });
});

module.exports = router;
