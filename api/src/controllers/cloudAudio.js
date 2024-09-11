const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadAudio(file) {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: 'video', 
      folder: 'uploads/audio' 
    });
    return result.secure_url;
  } catch (error) {
    console.error(error);
    throw new Error('Error uploading audio to Cloudinary');
  }
}

module.exports = { uploadAudio };
