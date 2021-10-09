const express = require('express');
const { body, query } = require('express-validator');

const coursesController = require('../controllers/courses');
const isAuth = require('../middleware/isAuth');

const Router = express.Router();

//GET: /api/v1/courses/all (query: count, page)
//get all courses
//public //pagination
Router.get(
  '/courses/all',
  [
    query('page')
      .if((value) => value !== undefined)
      .isInt({ min: 1 })
      .withMessage('Invalid value! Expected a Number > 0'),

    query('count')
      .if((value) => value !== undefined)
      .isInt({ min: 1 })
      .withMessage('Invalid value! Expected a Number > 0'),
  ],
  coursesController.getAllCourses
);

// GET: /api/v1/courses/categories/:categorySlugOrId (query: count, page)
//get courses by category
// public
Router.get(
  '/courses/categories/:categorySlugOrId',
  [
    query('page')
      .if((value) => value !== undefined)
      .isInt({ min: 1 })
      .withMessage('Invalid value! Expected a Number > 0'),

    query('count')
      .if((value) => value !== undefined)
      .isInt({ min: 1 })
      .withMessage('Invalid value! Expected a Number > 0'),
  ],
  coursesController.getCoursesByCategory
);

// GET: /api/v1/courses/topics/:topicSlugOrId (query: count, page)
//get courses by topic
// public
Router.get(
  '/courses/topics/:topicSlugOrId',
  [
    query('page')
      .if((value) => value !== undefined)
      .isInt({ min: 1 })
      .withMessage('Invalid value! Expected a Number > 0'),

    query('count')
      .if((value) => value !== undefined)
      .isInt({ min: 1 })
      .withMessage('Invalid value! Expected a Number > 0'),
  ],
  coursesController.getCoursesByTopic
);

// GET: /api/v1/courses/:courseSlugOrId
//get course
// public
Router.get('/courses/:courseSlugOrId', coursesController.getCourse);

//GET: api/v1/courses/:courseSlugOrId/chapters
//get main content of course, only learner who registered can access, use case: for learning room.
//authorization: learnerDetails, teacher, admin, root
Router.get(
  '/courses/:courseSlugOrId/chapters',
  isAuth,
  coursesController.getCourseChapters
);

// ****
//Get courses of users
//Already have in users router
// GET: /api/v1/users/teaching-courses
//GET: /api/v1/users/learning-courses

// GET: /api/v1/courses/register
// authentication required.
Router.post('/courses/register', isAuth, coursesController.registerCourse);

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

//PUT: /api/v1/courses
//update course
//only update data passed into body
//teacher, admin required
Router.put(
  '/courses',
  isAuth,
  [
    body('id')
      .notEmpty()
      .withMessage('Course ID is required!')
      .isMongoId()
      .withMessage('Invalid type. Expected an ObjectId'),

    body('title')
      .if((value) => value !== undefined)
      .notEmpty()
      .withMessage('Title is required')
      .trim(),

    body('description')
      .if((value) => value !== undefined)
      .notEmpty()
      .withMessage('Description is required')
      .trim(),

    body('slug')
      .if((value) => value !== undefined)
      .notEmpty()
      .withMessage('Slug is required.')
      .matches('^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$')
      .withMessage("Invalid slug's type."),

    body('categoryId')
      .if((value) => value !== undefined)
      .notEmpty()
      .withMessage('CategoryId is required')
      .isMongoId()
      .withMessage('Invalid type. Expected an ObjectId'),

    body('topicId')
      .if((value) => value !== undefined)
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

    body('status')
      .if((value) => value !== undefined)
      .notEmpty()
      .withMessage('Status is required.')
      .isNumeric()
      .withMessage('Invalid type. Expected an Number.')
      .isInt({ max: 1, min: 0 })
      .withMessage('Status only excepts value: 0 & 1'),
  ],
  coursesController.updateCourse
);

//DELETE: /api/v1/courses
//delete course
//teacher, admin required
Router.delete(
  '/courses',
  isAuth,
  [
    body('id')
      .notEmpty()
      .withMessage('Course ID is required!')
      .isMongoId()
      .withMessage('Invalid type. Expected an ObjectId'),
  ],
  coursesController.deleteCourse
);

module.exports = Router;
