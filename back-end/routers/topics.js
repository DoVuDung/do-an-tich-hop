const express = require('express');
const { body } = require('express-validator');
const mongoose = require('mongoose');

const topicsController = require('../controllers/topics');
const isAuth = require('../middleware/isAuth');
const Topic = require('../models/topic');

const Router = express.Router();

//TOPICs
//GET all topics
//public
Router.get('/topics', topicsController.getTopics);

//GET category's topics
//public
Router.get(
  '/course-categories/:categorySlugOrId/topics',
  topicsController.getCategoryTopics
);

//GET topic
//public
Router.get('/topics/:topicSlugOrId', topicsController.getTopic);

//POST: /api/v1/course-categories/:categorySlugOrId/topics
//admin required
//Add topics to category
Router.post(
  '/course-categories/:categorySlugOrId/topics',
  isAuth,
  [
    body('title')
      .notEmpty()
      .withMessage("Topic's title is required.")
      .trim()
      .custom((value) => {
        return Topic.findOne({ title: value })
          .collation({ locale: 'en', strength: 2 })
          .then((topicDoc) => {
            if (topicDoc) {
              return Promise.reject(`Topic "${value}" is already exists`);
            }
          });
      }),

    body('discountPercent')
      .if((value) => value !== undefined)
      .isNumeric()
      .withMessage('Invalid type. Expected a number')
      .isInt({ min: 0, max: 100 })
      .withMessage('Invalid value. (0 <= discount percent <= 100)'),
  ],
  topicsController.postNewTopic
);

//PUT: /api/v1/topics
//admin required
Router.put(
  '/topics',
  isAuth,
  [
    body('id')
      .notEmpty()
      .withMessage('CourseId is required.')
      .isMongoId()
      .withMessage('Invalid type. Expected an ObjectId.'),

    body('title')
      .notEmpty()
      .withMessage("Topic's title is required.")
      .trim()
      .custom((value, { req }) => {
        const topicId = new mongoose.Types.ObjectId(req.body.id);

        return Topic.findOne({
          title: value,
          _id: {
            $ne: topicId,
          },
        })
          .collation({ locale: 'en', strength: 2 })
          .then((topicDoc) => {
            if (topicDoc) {
              return Promise.reject(`Topic "${value}" is already exists`);
            }
          });
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
      .isInt({ max: 1, min: 0 })
      .withMessage('Status only excepts value: 0 & 1'),

    body('slug')
      .notEmpty()
      .withMessage('Slug is required.')
      .matches('^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$')
      .withMessage("Invalid slug's type.")
      .custom((value, { req }) => {
        return Topic.findOne({
          _id: {
            $ne: new mongoose.Types.ObjectId(req.body.id),
          },
          slug: value,
        }).then((topicDoc) => {
          if (topicDoc) {
            return Promise.reject(`Slug "${value}" is exists!`);
          }
        });
      }),
  ],
  topicsController.updateTopic
);

//DELETE: /api/v1/topics
//admin required
Router.delete(
  '/topics',
  isAuth,
  [
    body('id')
      .notEmpty()
      .withMessage('CourseId is required.')
      .isMongoId()
      .withMessage('Invalid type. Expected an ObjectId.'),
  ],
  topicsController.deleteTopic
);

module.exports = Router;
