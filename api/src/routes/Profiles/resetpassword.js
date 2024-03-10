const express = require('express');
const {User, Comments} = require ("../../db.js");
const { sendResetPasswordEmail } = require('../../controllers/nodemailer.js');
const bcrypt = require('bcrypt');
const router = express.Router();
const crypto = require('crypto');

router.post('/', async (req, res) => {
    const { email, verificationCode, newPassword } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(404).send('Usuario no encontrado.');
    }
    const isCodeValid = verificationCode === user.resetPasswordToken && Date.now() < new Date(user.resetPasswordExpires).getTime();

    console.log("iscode", isCodeValid)
    console.log("verificationCode", verificationCode)

    if (isCodeValid) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.update({ password: hashedPassword, resetPasswordToken: null, resetPasswordExpires: null });
        res.send('Contraseña actualizada con éxito.');
    } else {
        res.status(400).send('Código de verificación inválido o expirado.');
    }
    console.log("Código enviado: ", verificationCode);
console.log("Fecha y hora actual: ", Date.now());
console.log("Fecha y hora de caducidad: ", new Date(user.resetPasswordExpires).getTime());

});
  
module.exports = router;