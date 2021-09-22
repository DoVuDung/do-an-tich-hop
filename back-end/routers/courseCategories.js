const express = require('express');
const { body } = require('express-validator');
const mongoose = require('mongoose');

const courseCategoriesController = require('../controllers/courseCategories');
const isAuth = require('../middleware/isAuth');
const CourseCategory = require('../models/courseCategory');
const Topic = require('../models/topic');

const Router = express.Router();

//GET: /api/v1/course-categories
//public
Router.get(
  '/course-categories',
  courseCategoriesController.getCourseCategories
);

//GET: /api/v1/course-categories/:categorySlugOrId
//public
Router.get(
  '/course-categories/:categorySlugOrId',
  courseCategoriesController.getCourseCategory
);

//POST: /api/v1/course-categories
//admin required
Router.post(
  '/course-categories',
  isAuth,
  [
    body('title')
      .notEmpty()
      .withMessage('Title is required.')
      .trim()
      .custom((value) => {
        return CourseCategory.findOne({ title: value })
          .collation({ locale: 'en', strength: 2 })
          .then((courseCategoryDoc) => {
            if (courseCategoryDoc) {
              return Promise.reject(`Category "${value}" is already exists`);
            }
          });
      }),

    body('discountPercent')
      .if((value) => value !== undefined)
      .isNumeric()
      .withMessage('Invalid type. Expected a number')
      .isInt({ min: 0, max: 100 })
      .withMessage('Invalid value. (0 <= discount percent <= 100)'),

    body('topics')
      .notEmpty()
      .withMessage('Topics is required.')
      .isArray()
      .withMessage('Invalid type. Expected an Array.')
      .custom((value) => {
        return Topic.findOne({ title: { $in: value } })
          .collation({ locale: 'en', strength: 2 })
          .then((topicDoc) => {
            if (topicDoc) {
              return Promise.reject(
                `Topic "${topicDoc.title}" is already exists`
              );
            }
          });
      }),
  ],
  courseCategoriesController.postCourseCategory
);

//PUT: /api/v1/course-categories/:categorySlugOrId
//admin required
//Update category info
Router.put(
  '/course-categories/:categorySlugOrId',
  isAuth,
  [
    body('title')
      .notEmpty()
      .withMessage('Title is required.')
      .trim()
      .custom((value, { req }) => {
        if (mongoose.isValidObjectId(req.params.categorySlugOrId)) {
          const categoryId = new mongoose.Types.ObjectId(
            req.params.categorySlugOrId
          );

          return CourseCategory.findOne({
            title: value,
            _id: {
              $ne: categoryId,
            },
          })
            .collation({ locale: 'en', strength: 2 })
            .then((courseCategoryDoc) => {
              if (courseCategoryDoc) {
                return Promise.reject(`Category "${value}" is already exists`);
              }
            });
        } else {
          return CourseCategory.findOne({
            title: value,
            slug: { $ne: req.params.categorySlugOrId },
          })
            .collation({ locale: 'en', strength: 2 })
            .then((courseCategoryDoc) => {
              if (courseCategoryDoc) {
                return Promise.reject(`Category "${value}" is already exists`);
              }
            });
        }
      }),

    body('discountPercent')
      .if((value) => value !== undefined)
      .isNumeric()
      .withMessage('Invalid type. Expected a number')
      .isInt({ min: 0, max: 100 })
      .withMessage('Invalid value. (0 <= discount percent <= 100)'),

    body('status')
      .notEmpty()
      .withMessage('Status is required.')
      .isNumeric()
      .withMessage('Invalid type. Expected an Number.')
      .isIn([0, 1])
      .withMessage('Status only excepts value: 0 & 1'),

    body('slug')
      .notEmpty()
      .withMessage('Slug is required.')
      .matches('^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$')
      .withMessage("Invalid slug's type."),
  ],
  courseCategoriesController.updateCourseCategory
);

//DELETE: /api/v1/course-categories/:categorySlugOrId
//admin required
Router.delete(
  '/course-categories/:categorySlugOrId',
  isAuth,
  courseCategoriesController.deleteCourseCategory
);

module.exports = Router;
