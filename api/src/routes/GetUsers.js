require("dotenv").config();
const { Router } = require("express");
const { User } = require("../db.js");
const { Op } = require('sequelize');
const { Sequelize } = require("sequelize");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 86400, checkperiod: 120 });
const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      limit: 3,
      order: Sequelize.literal("random()"),
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;