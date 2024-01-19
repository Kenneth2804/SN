const { Router } = require('express')
const {User, Comments} = require ("../db.js");

const router = Router()

router.post('/', async (req, res) => {
  let { email, commentname,  texto, themeofcomment} = req.body
  try {
    const finduser = await User.findOne({
      where: { email: email },
    })
    const comment = await Comments.create({
    
      texto,
      userId: finduser.id

    })

    finduser.addComments(comment)
  
    return res.status(200).send(comment)
  } catch (error) {
    return res.status(400).json(error.message)
  }
})

module.exports = router