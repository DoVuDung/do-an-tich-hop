const express = require('express');
const { param } = require('express-validator');
const multer = require('multer');

const utilsController = require('../controllers/utils');

const Router = express.Router();

//setup multer for receive files
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/webp'
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Invalid file type: ' +
          file.mimetype +
          '. Expected an image file: .png, .jpg, .jpeg, .webp'
      ),
      false
    );
  }
};

const storage = multer.diskStorage({
  destination: './upload/',
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage: storage });

//GET /files/:key
//public
//get file from S3 through :key
Router.get(
  '/files/:key',
  [param('key').notEmpty().withMessage('Parameter Id is required!')],
  utilsController.getFileFromStorage
);

//POST /test/upload
Router.post(
  '/test/upload',
  upload.single('upload-file'),
  utilsController.postFileToStorage
);

module.exports = Router;
