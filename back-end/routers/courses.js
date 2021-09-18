const express = require('express');
const { body } = require('express-validator');

const coursesController = require('../controllers/courses');
const isAuth = require('../middleware/isAuth');

const Router = express.Router();

//POST: /api/v1/courses
//teacher required
Router.post(
  '/courses',
  isAuth,
  [
    body('name', 'Name is required').notEmpty().trim(),

    body('description', 'Description is required').notEmpty().trim(),

    body('categoryId')
      .notEmpty()
      .withMessage('CategoryId is required')
      .isMongoId()
      .withMessage('Invalid type. Expected an ObjectId'),

    body('detail')
      .notEmpty()
      .withMessage('Detail is required.')
      .isObject()
      .withMessage('Invalid type. Expected an Object'),
    body('detail.about').notEmpty().withMessage('Detail.about is required'),
    body('detail.tags')
      .if((value) => value !== undefined)
      .isArray()
      .withMessage('Invalid type. Expected an array'),
  ],
  coursesController.postNewCourse
);

module.exports = Router;
