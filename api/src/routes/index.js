const {Router} = require ("express");

const postusuario = require("./CreateUsers")
const getid = require("./GetId")
const profile = require("./UserProfile")
const postcomment = require("./CreateComments")
const loginuser = require("./Login")
const home = require("./Home")
const logout = require("./Logout")
const getcomments = require("./GetComments")
const localization = require("./GetCountry")

const router = Router();

router.use("/logout", logout)
router.use("/profile", profile)
router.use("/getid", getid)
router.use("/postuser", postusuario)
router.use("/postcomment", postcomment)
router.use("/loginuser", loginuser)
router.use("/home", home)
router.use("/comments", getcomments)
router.use("/localization", localization)

module.exports = router;