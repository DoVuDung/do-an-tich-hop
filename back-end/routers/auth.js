const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');
const isAuth = require('../middleware/isAuth');
const User = require('../models/user');
const Router = express.Router();

//POST: api/v1/auth/login
Router.post(
  //API path
  '/login',

  //validator
  [
    body('email')
      .notEmpty()
      .withMessage('Email is required.')
      .isEmail()
      .withMessage('Invalid email!'),

    body('password').notEmpty().withMessage('Password is required.'),
  ],

  //API handler
  authController.login
);

//POST: api/v1/auth/signup
Router.post(
  //API path
  '/signup',

  //validator
  [
    body('email')
      .notEmpty()
      .withMessage('Email is required!')
      .isEmail()
      .withMessage('Invalid email!')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              `An account with email "${value}" is already exists`
            );
          }
        });
      })
      .normalizeEmail(),

    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 5 })
      .withMessage('Minimum password is 5'),

    body('firstName', 'First name is required').trim().notEmpty(),

    body('lastName', 'Last name is required').trim().notEmpty(),

    body('dateOfBirth')
      .if((value) => value !== undefined)
      .toDate()
      .isISO8601()
      .withMessage('Invalid type. Date of birth must be a Date')
      .isBefore(new Date().toISOString())
      .withMessage('Invalid date of birth. It must before today'),

    body('address')
      .if((value) => value !== undefined)
      .isObject()
      .withMessage('Invalid type. Address must be an Object'),

    body('role')
      .notEmpty()
      .withMessage('Role is required')
      .isInt({ max: 3, min: 1 })
      .withMessage('Invalid value. Expected 1 - 3'),
  ],

  //API handler
  authController.signup
);

//POST: api/v1/auth/check
//check user's authentication by jwt token (in req's header)
Router.get('/check', isAuth, (req, res, next) =>
  res.status(200).json({
    message: 'User checked successfully!',
    success: true,
  })
);

//GET: api/v1/auth/
Router.get('/', isAuth, authController.getUser);
module.exports = Router;
