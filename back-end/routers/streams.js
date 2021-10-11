const express = require('express');
const router = express.Router();

const streamController = require('../controllers/streams');

router.get('/???', streamController.init);
router.get('/???', streamController.setupCamera);

module.exports = router;