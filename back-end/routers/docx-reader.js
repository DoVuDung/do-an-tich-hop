const express = require('express');
const router = express.Router();

const docxReaderController = require('../controllers/docx-reader');

router.post('', docxReaderController.docxReader);

module.exports = router;