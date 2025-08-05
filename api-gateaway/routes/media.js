const express = require('express');
const router = express.Router();

const mediaHandler = require('./handler/media');

/* GET users listing. */
// router.get('/', mediaHandler.index);
router.post('/upload', mediaHandler.create);
router.get('/', mediaHandler.getAll);
router.delete('/:id', mediaHandler.deleted);

module.exports = router;
