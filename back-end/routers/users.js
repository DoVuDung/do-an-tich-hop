const express = require('express');

const usersController = require('../controllers/users');
const isAuth = require('../middleware/isAuth');

const Router = express.Router();

//POST: /api/v1/users/all-info
//Authentication
//get all information of user
Router.get('/users/all-info', isAuth, usersController.getUserAllInfo);

//POST: /api/v1/users/profile
//Authentication
//get profile info only
Router.get('/users/profile', isAuth, usersController.getUserProfile);

//GET: /api/v1/users/notifications
//authentication require
//get notifications only
Router.get(
  '/users/notifications',
  isAuth,
  usersController.getUserNotifications
);

//GET: /api/v1/users/teaching-courses
//authentication require
//get teaching-courses only
Router.get(
  '/users/teaching-courses',
  isAuth,
  usersController.getUserTeachingCourses
);

//GET: /api/v1/users/learning-courses
//authentication require
//get learning-courses only
Router.get(
  '/users/learning-courses',
  isAuth,
  usersController.getUserLearningCourses
);

module.exports = Router;
