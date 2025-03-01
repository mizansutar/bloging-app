const Image = require('../models/image_model.js');
const Url="http://localhost:3001"
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const img = {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      imageBase64: req.file.buffer.toString('base64')
    };

    const newImage = new Image(img);
    await newImage.save();
const imageUrl = `${Url}/file/${newImage._id}`;
    return res.status(200).json( imageUrl);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.set('Content-Type', image.contentType);
    res.send(Buffer.from(image.imageBase64, 'base64'));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { uploadImage, getImage };
