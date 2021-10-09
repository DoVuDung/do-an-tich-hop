const express = require('express');
const mongoose = require('mongoose');
const { body } = require('express-validator');

const chaptersController = require('../controllers/chapters');
const isAuth = require('../middleware/isAuth');
const Chapter = require('../models/chapter');

const Router = express.Router();

//GET: /api/v1/chapters/:chapterSlugOrId
//teacher, learners of this course, admin, root
Router.get('/chapters/:chapterSlugOrId', isAuth, chaptersController.getChapter);

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
      .withMessage('Invalid type. Expected an ObjectId.'),

    body('number')
      .notEmpty()
      .withMessage("Chapter's number is required.")
      .isNumeric()
      .withMessage('Invalid type. Expected an Number.')
      .custom((value, { req }) => {
        return Chapter.findOne({
          courseId: req.body.courseId,
          number: value,
        }).then((chapterDoc) => {
          if (chapterDoc) {
            return Promise.reject(`Chapter number ${value} is exists`);
          }
        });
      }),

    body('title', "Chapter's title is required.").notEmpty(),

    body('videos')
      .if((value) => value !== undefined)
      .isArray()
      .withMessage('Invalid type. Expected an Array.'),

    body('videos[*].title', 'Video title is required.')
      .if(
        (value, { req }) =>
          req.body.videos !== undefined || req.body.videos !== []
      )
      .notEmpty(),

    body('videos[*].url')
      .if(
        (value, { req }) =>
          req.body.videos !== undefined || req.body.videos !== []
      )
      .notEmpty()
      .withMessage('Video URL is required.')
      .isURL()
      .withMessage('Invalid type. Expected an URL'),

    body('tests')
      .if((value) => value !== undefined)
      .isArray()
      .withMessage('Invalid type. Expected an Array.'),

    body('tests[*].title', 'Test title is required.')
      .if(
        (value, { req }) =>
          req.body.tests !== undefined || req.body.tests !== []
      )
      .notEmpty(),

    body('tests[*].questions')
      .if(
        (value, { req }) =>
          req.body.tests !== undefined || req.body.tests !== []
      )
      .notEmpty()
      .withMessage('Test questions is required.')
      .isArray()
      .withMessage('Invalid type. Expected an Array'),

    body('attachments')
      .if((value) => value !== undefined)
      .isArray()
      .withMessage('Invalid type. Expected an Array.'),

    body('attachments[*].title', 'Attachment title is required.')
      .if(
        (value, { req }) =>
          req.body.attachments !== undefined || req.body.attachments !== []
      )
      .notEmpty(),

    body('attachments[*].url')
      .if(
        (value, { req }) =>
          req.body.attachments !== undefined || req.body.attachments !== []
      )
      .notEmpty()
      .withMessage('Attachments URL is required.')
      .isURL()
      .withMessage('Invalid type. Expected an URL'),
  ],
  chaptersController.postNewChapter
);

//PUT: /api/v1/chapters
//teacher required
Router.put(
  '/chapters',
  isAuth,
  [
    body('id')
      .notEmpty()
      .withMessage('CourseId is required.')
      .isMongoId()
      .withMessage('Invalid type. Expected an ObjectId.'),

    body('number')
      .if((value) => value !== undefined)
      .notEmpty()
      .withMessage("Chapter's number is required.")
      .isNumeric()
      .withMessage('Invalid type. Expected an Number.'),

    body('title')
      .if((value) => value !== undefined)
      .notEmpty()
      .withMessage("Chapter's title is required."),

    body('slug')
      .if((value) => value !== undefined)
      .notEmpty()
      .withMessage('Slug is required.')
      .matches('^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$')
      .withMessage("Invalid slug's type.")
      .custom((value, { req }) => {
        return Chapter.findOne({
          _id: {
            $ne: new mongoose.Types.ObjectId(req.body.id),
          },
          slug: value,
        }).then((chapterDoc) => {
          if (chapterDoc) {
            return Promise.reject(`Slug "${value}" is exists!`);
          }
        });
      }),

    body('status')
      .if((value) => value !== undefined)
      .notEmpty()
      .withMessage('Status is required.')
      .isNumeric()
      .withMessage('Invalid type. Expected an Number.')
      .isInt({ max: 1, min: 0 })
      .withMessage('Status only excepts value: 0 & 1'),

    body('videos')
      .if((value) => value !== undefined)
      .isArray()
      .withMessage('Invalid type. Expected an Array.'),

    body('videos[*].title', 'Video title is required.')
      .if(
        (value, { req }) =>
          req.body.videos !== undefined || req.body.videos !== []
      )
      .notEmpty(),

    body('videos[*].url')
      .if(
        (value, { req }) =>
          req.body.videos !== undefined || req.body.videos !== []
      )
      .notEmpty()
      .withMessage('Video URL is required.')
      .isURL()
      .withMessage('Invalid type. Expected an URL'),

    body('tests')
      .if((value) => value !== undefined)
      .isArray()
      .withMessage('Invalid type. Expected an Array.'),

    body('tests[*].title', 'Test title is required.')
      .if(
        (value, { req }) =>
          req.body.tests !== undefined || req.body.tests !== []
      )
      .notEmpty(),

    body('tests[*].questions')
      .if(
        (value, { req }) =>
          req.body.tests !== undefined || req.body.tests !== []
      )
      .notEmpty()
      .withMessage('Test questions is required.')
      .isArray()
      .withMessage('Invalid type. Expected an Array'),

    body('attachments')
      .if((value) => value !== undefined)
      .isArray()
      .withMessage('Invalid type. Expected an Array.'),

    body('attachments[*].title', 'Attachment title is required.')
      .if(
        (value, { req }) =>
          req.body.attachments !== undefined || req.body.attachments !== []
      )
      .notEmpty(),

    body('attachments[*].url')
      .if(
        (value, { req }) =>
          req.body.attachments !== undefined || req.body.attachments !== []
      )
      .notEmpty()
      .withMessage('Attachments URL is required.')
      .isURL()
      .withMessage('Invalid type. Expected an URL'),
  ],
  chaptersController.updateChapter
);

//DELETE: /api/v1/chapters
//teacher required
Router.delete(
  '/chapters',
  isAuth,
  [
    body('id')
      .notEmpty()
      .withMessage('CourseId is required.')
      .isMongoId()
      .withMessage('Invalid type. Expected an ObjectId.'),
  ],
  chaptersController.deleteChapter
);

module.exports = Router;
