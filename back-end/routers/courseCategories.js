const express = require('express');
const { body } = require('express-validator');

const courseCategoriesController = require('../controllers/courseCategories');
const isAuth = require('../middleware/isAuth');
const CourseCategory = require('../models/courseCategory');

const Router = express.Router();

//GET: /api/v1/courses/categories
//public
Router.get(
  '/courses/categories',
  courseCategoriesController.getCourseCategories
);

//GET: /api/v1/courses/categories/:categorySlugOrId
//public
Router.get(
  '/courses/categories/:categorySlugOrId',
  courseCategoriesController.getCourseCategory
);

//POST: /api/v1/courses/categories
//admin required
Router.post(
  '/courses/categories',
  isAuth,
  [
    body('title')
      .notEmpty()
      .withMessage('Title is required.')
      .trim()
      .custom((value) => {
        return CourseCategory.findOne({ title: value }).then(
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

    body('topics')
      .notEmpty()
      .withMessage('Topics is required.')
      .isArray()
      .withMessage('Invalid type. Expected an Array.'),
  ],
  courseCategoriesController.postCourseCategory
);

//PUT: /api/v1/courses/categories/:categorySlugOrId
//admin required
//Update category info
Router.put(
  '/courses/categories/:categorySlugOrId',
  isAuth,
  [
    body('title')
      .notEmpty()
      .withMessage('Title is required.')
      .trim()
      .custom((value, { req }) => {
        return CourseCategory.findOne({
          title: value,
          slug: { $ne: req.params.categorySlugOrId },
        }).then((courseCategoryDoc) => {
          if (courseCategoryDoc) {
            return Promise.reject(`Category "${value}" is already exists`);
          }
        });
      }),

    body('discount')
      .if((value) => value !== undefined)
      .isNumeric()
      .withMessage('Invalid type. Expected a number'),

    body('topics')
      .notEmpty()
      .withMessage('Topics is required.')
      .isArray()
      .withMessage('Invalid type. Expected an Array.'),
  ],
  courseCategoriesController.updateCourseCategory
);

//DELETE: /api/v1/courses/categories/:categorySlugOrId
//admin required
Router.delete(
  '/courses/categories/:categorySlugOrId',
  isAuth,
  courseCategoriesController.deleteCourseCategory
);

//TOPICs
//POST: /api/v1/courses/categories/:categorySlugOrId/topics
//admin required
//Add topics to category
Router.post(
  '/courses/categories/:categorySlugOrId/topics',
  isAuth,
  [body('title').notEmpty().withMessage("Topic's title is required.")],
  courseCategoriesController.postNewTopic
);

//PUT: /api/v1/courses/categories/:categorySlugOrId/topics/:topicSlugOrId
//admin required
Router.put(
  '/courses/categories/:categorySlugOrId/topics/:topicSlugOrId',
  isAuth,
  [body('title').notEmpty().withMessage("Topic's title is required.")],
  courseCategoriesController.updateTopic
);

//DELETE: /api/v1/courses/categories/:categorySlugOrId/topics/:topicSlugOrId
//admin required
Router.delete(
  '/courses/categories/:categorySlugOrId/topics/:topicSlugOrId',
  isAuth,
  courseCategoriesController.deleteTopic
);

module.exports = Router;
