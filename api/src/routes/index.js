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
const forgotpassword = require("./Profiles/forgotpassword")
const resetpassword = require("./Profiles/resetpassword")
const likes = require("../routes/likes/Likes.js")
const refresh = require("../routes/token/refreshToken.js")
const getNotification = require('../routes/likes/Noti.js')
const postfollow = require('../routes/followers/followers.js')
const getfollow = require('../routes/followers/getFollowers.js')
const deletefollow = require('../routes/followers/deletefollow.js')
const getallfollowers = require('../routes/followers/getallfollowers.js')



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
router.use("/forgotpassword", forgotpassword)
router.use("/resetpassword", resetpassword)
router.use("/like", likes)
router.use("/refresh-token", refresh)
router.use("/noti", getNotification)
router.use("/follow", postfollow)
router.use("/followers", getfollow)
router.use("/unfollow", deletefollow)
router.use("/getallfollowers", getallfollowers)


module.exports = router;