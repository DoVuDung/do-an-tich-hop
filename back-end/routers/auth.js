const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');
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
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 5 })
      .withMessage('Minimum password is 5'),

    body('firstName', 'First name is required').trim().notEmpty(),

    body('lastName', 'Last name is required').trim().notEmpty(),

    body('dateOfBirth')
      .toDate()
      .isISO8601()
      .withMessage('Invalid type. Date of birth must be a Date')
      .isBefore(new Date().toISOString())
      .withMessage('Invalid date of birth. It must before today'),

    body('address')
      .isObject()
      .withMessage('Invalid type. Address must be an Object'),

    body('role').isObject().withMessage('Invalid type. Role must be an Object'),
    body('role.id')
      .notEmpty()
      .withMessage("Role's id is required")
      .isNumeric()
      .withMessage('Invalid role Id, expect a Number'),
    body('role.name').notEmpty().withMessage("Role's name is required"),
  ],

  //API handler
  authController.signup
);

module.exports = Router;
