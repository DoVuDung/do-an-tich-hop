const mongoose = require('mongoose');

const Course = require('../models/course');
const User = require('../models/user');
const Notification = require('../models/notification');

const { validationError } = require('../util/helper');
const CourseCategory = require('../models/courseCategory');

//pagination
exports.getAllCourses = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const COURSE_PER_PAGE = req.query.count || 10;

  try {
    //get courses's count
    const totalCourses = await Course.find().countDocuments();

    //get courses
    const courses = await Course.find()
      .populate('author', [
        'email',
        'firstName',
        'lastName',
        'description',
        'socialLinks',
      ])
      .populate('category', ['title', 'slug', 'discount'])
      .populate('topic')
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * COURSE_PER_PAGE)
      .limit(COURSE_PER_PAGE);

    if (!courses) {
      const error = new Error('Courses not found!');
      error.statusCode = 404;

      throw error;
    }

    //send res
    res.status(200).json({
      message: 'Fetch courses successfully',
      courses,
      totalCourses,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.getCourse = async (req, res, next) => {
  const courseSlugOrId = req.params.courseSlugOrId;

  try {
    //get course
    let course;
    if (mongoose.isValidObjectId(courseSlugOrId)) {
      course = await findById(courseSlugOrId);
    } else {
      course = await findOne({ slug: courseSlugOrId });
    }

    //check course exists
    if (!course) {
      const error = new Error('Course not found!');
      error.statusCode = 404;

      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.postNewCourse = async (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  //get request's body
  const title = req.body.title;
  const description = req.body.description;
  const tags = req.body.tags;
  const categoryId = req.body.categoryId;
  const topicId = req.body.topicId;

  try {
    //check authentication
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error('Authentication failed!');
      error.statusCode = 401;

      throw error;
    }

    //check role is teacher or not
    if (user.role.id !== 3) {
      const error = new Error('You do not have permission to do this action!');
      error.statusCode = 403;

      throw error;
    }

    //check detail.topic refs
    const category = await CourseCategory.findById(categoryId);

    if (!category) {
      const error = new Error('Category not found!');
      error.statusCode = 404;

      throw error;
    }

    //check topic exists
    const topics = category.topics;
    if (topics.length === 0) {
      const error = new Error(
        'Selected category does not have any topic. Please choose another category!'
      );
      error.statusCode = 404;

      throw error;
    }

    const topic = topics.find((topic) => topic._id.toString() === topicId);

    if (!topic) {
      const error = new Error('Topic not found!');
      error.statusCode = 404;

      throw error;
    }

    //save new course
    const course = new Course({
      title,
      description,
      category: categoryId,
      author: req.userId,
      topic: topicId,
      tags,
      learnersDetail: [],
      streams: [],
      feedbacks: [],
      chapters: [],
    });

    await course.save();

    //push id course to user (teacher)
    user.teachingCourses.push(course._id);
    await user.save();

    //create new notification
    const notification = new Notification({
      userId: req.userId,
      title: 'Successfully created new course!',
      content:
        'Your course will be a draft until you public it. Feel free to design your content, make sure the quality of your course always as high as possible.',
    });

    await notification.save();

    //push id notification to user
    user.notifications.push(notification._id);
    await user.save();

    //send response
    res.status(201).json({
      message: 'Course created successfully!',
      course,
      notification,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.updateCourse = async (req, res, next) => {};

exports.deleteCourse = async (req, res, next) => {};
