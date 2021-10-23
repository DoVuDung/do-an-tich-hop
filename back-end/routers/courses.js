const express = require('express');
const { body, query } = require('express-validator');
const multer = require('multer');

const coursesController = require('../controllers/courses');
const isAuth = require('../middleware/isAuth');

const Router = express.Router();

//setup multer for receive files
//filter image only
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/webp'
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'Invalid file type: ' +
          file.mimetype +
          '. Expected an image file: .png, .jpg, .jpeg, .webp'
      ),
      false
    );
  }
};

const storage = multer.diskStorage({
  destination: './upload/',
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({ storage, fileFilter });

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

//GET: api/v1/courses/:courseSlugOrId/learners
//get members who registered the course
//authorization: teacher, admin, root
Router.get(
  '/courses/:courseSlugOrId/learners',
  isAuth,
  coursesController.getCourseLearners
);

//GET: api/v1/courses/:courseSlugOrId/feedbacks
//get courses feedback
//public
Router.get(
  '/courses/:courseSlugOrId/feedbacks',
  coursesController.getCourseFeedbacks
);

//GET: api/v1/courses/:courseSlugOrId/streams
//get streams of course, only learner who registered can access, use case: for learning room.
//authorization: learnerDetails, teacher, admin, root
Router.get(
  '/courses/:courseSlugOrId/streams',
  isAuth,
  coursesController.getCourseStreams
);

// ****
//Get courses of users
//Already have in users router
//GET: /api/v1/users/teaching-courses
//GET: /api/v1/users/learning-courses

// POST: /api/v1/courses/register
// authentication required.
Router.post(
  '/courses/register',
  isAuth,
  [
    body('courseId')
      .notEmpty()
      .withMessage('Course ID is required!')
      .isMongoId()
      .withMessage('Invalid type. Expected an ObjectId'),

    body('price')
      .notEmpty()
      .withMessage('Price is required!')
      .isFloat({ min: 0 })
      .withMessage('Invalid type. Expected a number with min = 0'),

    body('brandId')
      .notEmpty()
      .withMessage('Brand Id is required!')
      .isInt({ min: 1 })
      .withMessage('Invalid type. Expected a number with min = 0'),

    body('methodId')
      .notEmpty()
      .withMessage('Method Id is required!')
      .isInt({ min: 1 })
      .withMessage('Invalid type. Expected a number with min = 0'),

    body('invoiceId').notEmpty().withMessage('Invoice Id is required!'),

    body('discount')
      .if((value) => value !== undefined)
      .notEmpty()
      .withMessage('Price is required!')
      .isFloat({ min: 0 })
      .withMessage('Invalid type. Expected a number with min = 0'),
  ],
  coursesController.registerCourse
);

//POST: /api/v1/courses
//post new course
//teacher required
Router.post(
  '/courses',
  upload.single('image'),
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
      .isFloat({ min: 0 })
      .withMessage('Invalid type. Expected a number with min = 0'),

    body('discount')
      .if((value) => value !== undefined)
      .isFloat({ min: 0 })
      .withMessage('Invalid type. Expected a number with min = 0'),
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
  upload.single('image'),
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
      .notEmpty()
      .withMessage('Price is required!')
      .isFloat({ min: 0 })
      .withMessage('Invalid type. Expected a number with min = 0'),

    body('discount')
      .if((value) => value !== undefined)
      .notEmpty()
      .withMessage('Price is required!')
      .isFloat({ min: 0 })
      .withMessage('Invalid type. Expected a number with min = 0'),

    body('status')
      .if((value) => value !== undefined)
      .notEmpty()
      .withMessage('Status is required.')
      .isInt()
      .withMessage('Invalid type. Expected an Number.')
      .custom((value) => {
        const acceptableValues = [0, 1, 2, 20];
        if (!acceptableValues.includes(value)) {
          throw new Error(
            `Invalid value. Expected value in ${acceptableValues}`
          );
        } else {
          return true;
        }
      }),
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
