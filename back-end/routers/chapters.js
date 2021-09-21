const express = require('express');
const { body } = require('express-validator');

const chaptersController = require('../controllers/chapters');
const isAuth = require('../middleware/isAuth');
const Chapter = require('../models/chapter');

const Router = express.Router();

//POST: /api/v1/chapters
//teacher required
Router.post(
  '/chapters',
  isAuth,
  [
    body('courseId')
      .notEmpty()
      .withMessage('CourseId is required.')
      .isMongoId()
      .withMessage('Invalid type. Expected an ObjectId'),

    body('number')
      .notEmpty()
      .withMessage("Chapter's number is required.")
      .isNumeric()
      .withMessage('Invalid type. Expected an Number')
      .custom((value) => {
        return Chapter.findOne({ number: value }).then((chapterDoc) => {
          if (chapterDoc) {
            return Promise.reject(`Chapter number ${value} is exists`);
          }
        });
      }),

    body('title', "Chapter's title is required.").notEmpty(),
  ],
  chaptersController.postNewChapter
);

module.exports = Router;
