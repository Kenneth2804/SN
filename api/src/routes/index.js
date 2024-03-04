const {Router} = require ("express");

const postusuario = require("./CreateUsers")
const profiles = require("./Profiles/profiles")
const getid = require("./GetId")
const profile = require("./UserProfile")
const postcomment = require("./CreateComments")
const loginuser = require("./Login")
const home = require("./Home")
const logout = require("./Logout")
const getcomments = require("./GetComments")
const localization = require("./GetCountry")
const getusers = require("./GetUsers")
const editpicture = require("./Profiles/editprofilepic")

const router = Router();

router.use("/logout", logout)
router.use("/profile", profile)
router.use("/profiles", profiles)
router.use("/getid", getid)
router.use("/postuser", postusuario)
router.use("/postcomment", postcomment)
router.use("/loginuser", loginuser)
router.use("/home", home)
router.use("/comments", getcomments)
router.use("/localization", localization)
router.use("/getusers", getusers)
router.use("/editpicture", editpicture)

module.exports = router;