const express = require('express');
const ImageController = require('../controllers/ImageController');

const router = express.Router();

// Route for uploading images
router.post('/upload', ImageController.uploadImages);

module.exports = router;