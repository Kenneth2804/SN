const {Router} = require ("express");

const postusuario = require("./CreateUsers")
const postcomment = require("./CreateComments")
const loginuser = require("./Login")
const home = require("./Home")
const logout = require("./Logout")
const getcomments = require("./GetComments")

const router = Router();

router.use("/logout", logout)
router.use("/postuser", postusuario)
router.use("/postcomment", postcomment)
router.use("/loginuser", loginuser)
router.use("/home", home)
router.use("/comments", getcomments)

module.exports = router;