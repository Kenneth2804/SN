const express = require('express');
const {User} = require ("../../db.js");
const { sendResetPasswordEmail } = require('../../controllers/nodemailer.js');

const router = express.Router();


router.use(express.json());

const generateVerificationCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };
  
  router.post('/', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
  
    if (user) {
      const verificationCode = generateVerificationCode();
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 5);
  
      await user.update({
        resetPasswordToken: verificationCode,
        resetPasswordExpires: expires,
      });
  
      await sendResetPasswordEmail(email, verificationCode);
      res.send('Correo de restablecimiento enviado.');
    } else {
      res.status(404).send('Usuario no encontrado.');
    }
  });
  

module.exports = router;