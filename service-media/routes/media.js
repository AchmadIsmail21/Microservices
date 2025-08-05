const express = require('express');
const router = express.Router();
const path = require('path');
const isBase64 = require('is-base64');
const base64Img = require('base64-img');
const fs = require('fs');

const { Media } = require('../models'); // Assuming Media is defined in models/index.js

/* GET users listing. */
router.post('/upload', (req, res) => {
  const image = req.body.image;
  if(!isBase64(image, {mimeRequired: true})){
    return res.status(400).json({status: 'error', message: 'Invalid base64 image format'});
  }

  base64Img.img(image, './public/images', `img_${Date.now()}`, async (err, filepath) => {
    if(err){
      console.error('Error saving image:', err);
      return res.status(500).json({
        status: 'error', 
        message: err.message
      });
    }
    // Here you would typically save the filepath to your database
    console.log('Image saved at:', filepath);
    // for macOS, the filepath will be something like '/path/to/your/project/public/images/1691234567890.png'
    // const filename = filepath.split('/').pop();

    const filename = path.basename(filepath);
    console.log('Filename:', filename);
    // Save the image path to the database
    const media = await Media.create({image: `images/${filename}`});
    res.status(201).json({
      status: 'success', 
      data: {
        id: media.id,
        image: `${req.get('host')}/images/${filename}`
      },
      message: 'Image uploaded successfully'
    });
  })

  
});

router.get('/', async (req, res) => {
  const media = await Media.findAll({
    attributes: ['id', 'image'],
  });

  const mappedMedia = media.map((m) => {
    const imagePath = path.basename(m.image);
    m.image = `${req.get('host')}/images/${imagePath}`;
    return m
  });

  if (!mappedMedia || mappedMedia.length === 0) {
    return res.status(404).json({
      status: 'error',
      message: 'No media found'
    });
  }

  res.status(200).json({
    status: 'success',
    data: mappedMedia,
    message: 'Media retrieved successfully'
  });
});

router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  const media = await Media.findByPk(id);
  if (!media) {
    return res.status(404).json({
      status: 'error',
      message: 'Media not found'
    });
  }
  fs.unlink(`./public/${media.image}`, async (err) => {
    if(err){
      console.error('error deleting file:', err);
      return res.status(500).json({
        status: 'error',
        message: 'Error deleting file'
      });
    }
    await media.destroy();
    res.status(200).json({
      status: 'success',
      message: 'Media deleted successfully'
    });
  })
});

module.exports = router;
