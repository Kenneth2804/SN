const {Router} = require ("express");

const postusuario = require("./CreateUsers")
const postcomment = require("./CreateComments")
const loginuser = require("./Login")
const home = require("./Home")

const router = Router();

router.use("/postuser", postusuario)
router.use("/postcomment", postcomment)
router.use("/loginuser", loginuser)
router.use("/home", home)

module.exports = router;