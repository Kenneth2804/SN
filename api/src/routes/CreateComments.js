const { Router } = require('express');
const { User, Comments } = require('../db.js');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadAudio } = require('../controllers/cloudAudio.js');
const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/audio/';
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('audio'), async (req, res) => {
  const { email, texto, to } = req.body;
  const audioFile = req.file;

  try {
    const finduser = await User.findOne({
      where: { email: email },
    });

    const commentData = {
      texto,
      to,
      userId: finduser.id
    };

    if (audioFile) {
      const audioURL = await uploadAudio(audioFile);
      commentData.audioFilePath = audioURL; 
    }

    const comment = await Comments.create(commentData);
    finduser.addComments(comment);

    return res.status(200).send(comment);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

module.exports = router;
