const express = require('express');
const { body } = require('express-validator');

const courseCategoriesController = require('../controllers/courseCategories');
const isAuth = require('../middleware/isAuth');
const CourseCategory = require('../models/courseCategory');

const Router = express.Router();

//POST: /api/v1/course-categories
//admin required
Router.post(
  '/course-categories',
  isAuth,
  [
    body('name')
      .notEmpty()
      .withMessage('Name is required.')
      .trim()
      .custom((value) => {
        return CourseCategory.findOne({ name: value }).then(
          (courseCategoryDoc) => {
            if (courseCategoryDoc) {
              return Promise.reject(`Category "${value}" is already exists`);
            }
          }
        );
      }),

    body('discount')
      .if((value) => value !== undefined)
      .isNumeric()
      .withMessage('Invalid type. Expected a number'),
  ],
  courseCategoriesController.postCourseCategory
);

module.exports = Router;
