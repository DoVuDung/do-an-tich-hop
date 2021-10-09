const express = require('express');
const { body, param } = require('express-validator');

const notificationsController = require('../controllers/notifications');
const isAuth = require('../middleware/isAuth');

const Router = express.Router();

//GET: /api/v1/notifications
//authentication require
Router.get('/notifications', isAuth, notificationsController.getNotifications);

//GET: /api/v1/notifications/:notificationId
//authentication require
Router.get(
  '/notifications/:notificationId',
  isAuth,
  notificationsController.getNotification
);

//DELETE: /api/v1/notifications
//authentication require
Router.delete(
  '/notifications',
  isAuth,
  [
    body('id')
      .notEmpty()
      .withMessage('CourseId is required.')
      .isMongoId()
      .withMessage('Invalid type. Expected an ObjectId.'),
  ],
  notificationsController.deleteNotification
);

//POST: /api/v1/notifications
//admin, teacher required (Use case: admin, teacher send notification to learners...)
Router.post(
  '/notifications',
  isAuth,
  [
    body('userId')
      .notEmpty()
      .withMessage('UserId is required.')
      .isMongoId()
      .withMessage('Invalid type. Expected an ObjectId.'),

    body('title', "Notification's title is required.").notEmpty(),

    body('content', "Notification's content is required.").notEmpty(),
  ],
  notificationsController.postNewNotification
);

module.exports = Router;
