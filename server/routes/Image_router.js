const express = require('express');
const multer = require('multer');
const imageController = require('../controllers/image_control.js');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Ensure the field name matches the frontend ("file")
const router = express.Router();
router.post('/file/upload', upload.single('file'), imageController.uploadImage);
router.get('/file/:id', imageController.getImage);

module.exports = router;
