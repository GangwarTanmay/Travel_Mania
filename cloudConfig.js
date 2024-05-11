//using .env file
if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//cloud account credentials
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

//cloud storage credentials
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Travel-Mania',
        allowedFormat: ["png", "jpg", "jpeg"]
    },
});

module.exports = { cloudinary, storage };