const express = require('express');
const { body } = require('express-validator');

const coursesController = require('../controllers/courses');
const isAuth = require('../middleware/isAuth');

const Router = express.Router();

//GET: /api/v1/courses/all (query: count, page)
//get all courses
//public //pagination
Router.get('/courses/all', coursesController.getAllCourses);

// GET: /api/v1/courses/:courseSlugOrId
//get course
// public
Router.get('/courses/:courseSlugOrId', coursesController.getCourse);

// GET: /api/v1/courses/categories/topic/:id
//get course by category
// public
Router.get(
  '/courses/categories/:categorySlugOrId',
  coursesController.getCoursesByCategory
);

// GET: /api/v1/courses/categories/topic/:id
//get course by topic
// public
Router.get(
  '/courses/topics/:topicSlugOrId',
  coursesController.getCoursesByTopic
);

//GET: /api/v1/courses/register
//authentication required.
// Router.get;

//POST: /api/v1/courses
//post new course
//teacher required
Router.post(
  '/courses',
  isAuth,
  [
    body('title', 'Title is required').notEmpty().trim(),

    body('description', 'Description is required').notEmpty().trim(),

    body('categoryId')
      .notEmpty()
      .withMessage('CategoryId is required')
      .isMongoId()
      .withMessage('Invalid type. Expected an ObjectId'),

    body('topicId')
      .notEmpty()
      .withMessage('TopicId is required')
      .isMongoId()
      .withMessage('Invalid type. Expected an ObjectId'),

    body('tags')
      .if((value) => value !== undefined)
      .isArray()
      .withMessage('Invalid type. Expected an array'),

    body('price')
      .if((value) => value !== undefined)
      .isNumeric()
      .withMessage('Invalid type. Expected a number')
      .isInt({ min: 0 })
      .withMessage('Invalid value. Min = 0'),

    body('discount')
      .if((value) => value !== undefined)
      .isNumeric()
      .withMessage('Invalid type. Expected a number')
      .isInt({ min: 0 })
      .withMessage('Invalid value. Min = 0'),
  ],
  coursesController.postNewCourse
);

module.exports = Router;
