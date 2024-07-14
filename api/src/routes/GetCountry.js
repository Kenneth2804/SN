const express = require('express');
const router = express.Router();
const localization = require("./../controllers/Localization.js")



router.get('/', (req, res) => {
  res.json(localization);
});

module.exports = router;
