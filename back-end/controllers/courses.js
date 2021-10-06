const mongoose = require('mongoose');

const Course = require('../models/course');
const User = require('../models/user');
const Notification = require('../models/notification');
const { validationError } = require('../util/helper');
const CourseCategory = require('../models/courseCategory');
const Topic = require('../models/topic');

//COURSES
//public
//pagination
exports.getAllCourses = async (req, res, next) => {
  const currentPage = +req.query.page || 1;
  const coursePerPage = +req.query.count || null;

  try {
    if (
      (currentPage && currentPage <= 0) ||
      (coursePerPage && coursePerPage <= 0)
    ) {
      const error = new Error('Invalid queries value! Expected a Number > 0');
      error.statusCode = 422;

      throw error;
    }
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
      .populate({
        path: 'topic',
        select: '-courses',
        populate: {
          path: 'courseCategoryId',
          select: '-topics',
        },
      })
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * coursePerPage)
      .limit(coursePerPage);

    if (!courses) {
      const error = new Error('Courses not found!');
      error.statusCode = 404;

      throw error;
    }

    //send res
    res.status(200).json({
      message: 'Fetch courses successfully',
      data: {
        courses,
        totalCourses,
      },
      success: true,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

//public
exports.getCourse = async (req, res, next) => {
  const courseSlugOrId = req.params.courseSlugOrId;

  try {
    //get course
    let courseFilterData;
    if (mongoose.isValidObjectId(courseSlugOrId)) {
      const courseId = new mongoose.Types.ObjectId(courseSlugOrId);
      courseFilterData = { _id: courseId };
    } else {
      courseFilterData = { slug: courseSlugOrId };
    }

    const course = await Course.findOne(courseFilterData)
      .populate('author', [
        'email',
        'firstName',
        'lastName',
        'description',
        'socialLinks',
      ])
      .populate({
        path: 'topic',
        select: '-courses',
        populate: {
          path: 'courseCategoryId',
          select: '-topics',
        },
      });

    //check course exists
    if (!course) {
      const error = new Error('Course not found!');
      error.statusCode = 404;

      throw error;
    }

    //send res
    res.status(200).json({
      message: 'Fetch courses successfully',
      data: {
        course,
      },
      success: true,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

//public
exports.getCoursesByCategory = async (req, res, next) => {
  const categorySlugOrId = req.params.categorySlugOrId;

  try {
    //get course category
    let courseCategory;

    if (mongoose.isValidObjectId(categorySlugOrId)) {
      courseCategory = await CourseCategory.findById(categorySlugOrId).select(
        '-topics'
      );
    } else {
      courseCategory = await CourseCategory.findOne({
        slug: categorySlugOrId,
      }).select('-topics');
    }

    //check exists
    if (!courseCategory) {
      const error = new Error('Course category not found!');
      error.statusCode = 404;

      throw error;
    }

    const topics = await Topic.find({
      courseCategoryId: courseCategory._id,
    }).populate({
      path: 'courses',
      select: ['-learnersDetail'],
      populate: [
        {
          path: 'author',
          select: [
            'firstName',
            'lastName',
            'description',
            'socialLinks',
            'teachingCourses',
          ],
        },
        {
          path: 'topic',
          select: ['title', 'discountPercent', 'slug'],
        },
      ],
    });

    if (!topics) {
      const error = new Error('Category has no course!');
      error.statusCode = 404;

      throw error;
    }

    const courses = [];
    topics.forEach((topic) => courses.push(...topic.courses));

    res.status(200).json({
      message: 'Fetch courses by category successfully!',
      data: {
        courseCategory,
        courses,
      },
      success: true,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

//public
exports.getCoursesByTopic = async (req, res, next) => {
  const topicSlugOrId = req.params.topicSlugOrId;

  try {
    //get course topic
    let topicFilterData;

    if (mongoose.isValidObjectId(topicSlugOrId)) {
      const topicId = new mongoose.Types.ObjectId(courseSlugOrId);
      topicFilterData = { _id: topicId };
    } else {
      topicFilterData = { slug: topicSlugOrId };
    }

    const topic = await Topic.findOne(topicFilterData).populate({
      path: 'courses',
      select: ['-learnersDetail'],
      populate: [
        {
          path: 'author',
          select: [
            'firstName',
            'lastName',
            'description',
            'socialLinks',
            'teachingCourses',
          ],
        },
        {
          path: 'topic',
          select: ['title', 'discountPercent', 'slug'],
        },
      ],
    });

    //check exists
    if (!topic) {
      const error = new Error('Topic not found!');
      error.statusCode = 404;

      throw error;
    }

    res.status(200).json({
      message: 'Fetch courses by topic successfully!',
      data: {
        topic,
      },
      success: true,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

//authentication
exports.registerCourse = async (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  //get request's body
  const title = req.body.title;
  const description = req.body.description;

  try {
    //check authentication
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error('Authentication failed!');
      error.statusCode = 401;

      throw error;
    }

    //get course
    let courseFilterData;
    if (mongoose.isValidObjectId(courseSlugOrId)) {
      const courseId = new mongoose.Types.ObjectId(courseSlugOrId);
      courseFilterData = { _id: courseId };
    } else {
      courseFilterData = { slug: courseSlugOrId };
    }

    const course = await Course.findOne(courseFilterData);

    if (!course) {
      const error = new Error('Courses not found!');
      error.statusCode = 404;

      throw error;
    }

    //check if teacher try to buy their own course
    if (user.role.id === 3) {
      const error = new Error('You do not have permission to do this action!');
      error.statusCode = 403;

      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

//teacher require
exports.postNewCourse = async (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  //get request's body
  const title = req.body.title;
  const description = req.body.description;
  const tags = req.body.tags;
  const price = req.body.price;
  const discount = req.body.discount;
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

    //check category exists
    const courseCategory = await CourseCategory.findById(categoryId);

    if (!courseCategory) {
      const error = new Error('Category not found!');
      error.statusCode = 404;

      throw error;
    }

    //check topic exists
    if (courseCategory.topics.length === 0) {
      const error = new Error(
        `Selected category "${courseCategory.title}" does not have any topic. Please choose another category!`
      );
      error.statusCode = 404;

      throw error;
    }

    const topic = await Topic.findById(topicId);

    if (!topic) {
      const error = new Error('Topic not found!');
      error.statusCode = 404;

      throw error;
    }

    if (topic.courseCategoryId.toString() !== categoryId) {
      const error = new Error(
        `Selected topic "${topic.title}" does not belong to "${courseCategory.title}" category. Please try again or choose another topic!`
      );
      error.statusCode = 404;

      throw error;
    }

    //save new course
    const course = new Course({
      title,
      description,
      author: req.userId,
      topic: topicId,
      tags,
      price,
      discount,
      learnersDetail: [],
      streams: [],
      feedbacks: [],
      chapters: [],
    });

    await course.save();

    //push courseId to to topic
    topic.courses.push(course._id);
    await topic.save();

    //push courseId to user (teacher)
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
      data: {
        course,
        notification,
      },
      success: true,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

//teacher required
exports.updateCourse = async (req, res, next) => {};

//admin, teacher required
exports.deleteCourse = async (req, res, next) => {};
