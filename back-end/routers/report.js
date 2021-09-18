const express = require('express');

const reportController = require('../controllers/report');
const isAuth = require('../middleware/isAuth');

const Router = express.Router();

//public api
//POST: /api/v1/report/public/top-teachers
Router.get('/public/top-teachers/:count', reportController.topTeacher);

module.exports = Router;
