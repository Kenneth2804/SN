const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'secretnotes3@gmail.com', 
    pass: 'sekk ygew yhis rtas', 
  },
});



const sendResetPasswordEmail = async (email, verificationCode) => {
    const mailOptions = {
      from: 'secretnotes3@gmail.com',
      to: email,
      subject: 'Restablece tu contraseña',
      html: `<p>Has solicitado restablecer tu contraseña. Usa el siguiente código de verificación para cambiar tu contraseña:</p><p>Código de verificación: <strong>${verificationCode}</strong></p><p>Si no solicitaste este cambio, por favor ignora este correo.</p>`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('Correo de restablecimiento de contraseña enviado.');
    } catch (error) {
      console.error('Error al enviar el correo de restablecimiento de contraseña:', error);
    }
  };
  



module.exports = { sendResetPasswordEmail };
