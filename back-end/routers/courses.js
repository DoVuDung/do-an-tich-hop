const express = require('express');
const { body } = require('express-validator');

const coursesController = require('../controllers/courses');
const isAuth = require('../middleware/isAuth');
const CourseCategory = require('../models/courseCategory');

const Router = express.Router();

//GET: /api/v1/courses/all (query: count, page)
//public
//pagination
Router.get('/courses/all', coursesController.getAllCourses);

// GET: /api/v1/courses/:courseSlugOrId
// public
Router.get('/courses/:courseSlugOrId', coursesController.getCourse);

//GET: /api/v1/courses/categories/topic/:id
//public
// Router.get(
//   '/api/v1/courses/categories/:categoryId/topic/:topicId',
//   coursesController.getCoursesByTopic
// );

//GET: /api/v1/courses/register
//authentication required.
// Router.get;

//POST: /api/v1/courses
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
      .withMessage('Invalid type. Expected an ObjectId')
      .custom((value) => {
        return CourseCategory.findById(value).then((doc) => {
          if (!doc) {
            return Promise.reject(
              'Category not found! Reload the page and try again!'
            );
          }
        });
      }),

    body('topicId')
      .notEmpty()
      .withMessage('TopicId is required')
      .isMongoId()
      .withMessage('Invalid type. Expected an ObjectId'),

    body('tags')
      .if((value) => value !== undefined)
      .isArray()
      .withMessage('Invalid type. Expected an array'),
  ],
  coursesController.postNewCourse
);

module.exports = Router;
