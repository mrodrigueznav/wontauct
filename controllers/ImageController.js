const multer = require('multer');
const { uploadImageToAzure } = require('../services/azureBlobService');
const logger = require('../config/logger');

// Configure multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
}).array('images', 10); // Allow up to 10 images

module.exports = {
  uploadImages: (req, res, callback) => {
    upload(req, res, async (err) => {
      if (err) {
        logger.error(`Error uploading images: ${err.message}`);
        return callback(err);
      }

      try {
        const imageUrls = [];
        let { name } = req.body;
        name = name.replace(/^["'](.+(?=["']$))["']$/, '$1'); // Remove surrounding quotes

        for (const file of req.files) {
          const randomNum = Math.floor(Math.random() * 10000);
          const newFilename = `${name}-${randomNum}${file.originalname.substring(file.originalname.lastIndexOf('.'))}`;
          const url = await uploadImageToAzure(newFilename, file.buffer);
          imageUrls.push(url);
        }

        req.imageUrls = imageUrls;
        callback(null);
      } catch (error) {
        logger.error(`Error uploading images: ${error.message}`);
        callback(error);
      }
    });
  },
};