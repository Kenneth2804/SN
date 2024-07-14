require("dotenv").config();
const {Router} = require ("express")
const {User, Comments} = require ("../db.js");
const router = Router();
const getusers = require("../controllers/getusers.js")

router.get('/:id', getusers.getUserById)

module.exports = router