const mongoose = require('mongoose');

const Course = require('../models/course');
const User = require('../models/user');
const Notification = require('../models/notification');
const { validationError } = require('../util/helper');
const CourseCategory = require('../models/courseCategory');
const Topic = require('../models/topic');
const Chapter = require('../models/chapter');
const Stream = require('../models/stream');
const Feedback = require('../models/feedback');

//COURSES
//public
//pagination
exports.getAllCourses = async (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  const currentPage = +req.query.page || 1;
  const coursePerPage = +req.query.count || null;

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
      .populate([
        {
          path: 'topic',
          select: '-courses',
          populate: {
            path: 'courseCategoryId',
            select: '-topics',
          },
        },
        // {
        //   path: 'chapters',
        //   select: ['-courseId'],
        // },
        // {
        //   path: 'streams',
        //   select: ['-courseId'],
        // },
        // {
        //   path: 'feedbacks',
        //   select: ['-courseId'],
        // },
      ])
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
//pagination
exports.getCoursesByCategory = async (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  const categorySlugOrId = req.params.categorySlugOrId;

  const currentPage = +req.query.page || 1;
  let coursePerPage = +req.query.count;

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
          select: ['firstName', 'lastName', 'description', 'socialLinks'],
        },
        {
          path: 'topic',
          select: ['title', 'discountPercent', 'slug'],
        },
        // {
        //   path: 'chapters',
        //   select: ['-courseId'],
        // },
        // {
        //   path: 'streams',
        //   select: ['-courseId'],
        // },
        // {
        //   path: 'feedbacks',
        //   select: ['-courseId'],
        // },
      ],
    });

    if (!topics) {
      const error = new Error('Category has no course!');
      error.statusCode = 404;

      throw error;
    }

    const courses = [];
    topics.forEach((topic) => courses.push(...topic.courses));

    if (!coursePerPage) {
      coursePerPage = courses.length;
    }

    res.status(200).json({
      message: 'Fetch courses by category successfully!',
      data: {
        courseCategory,
        //pagination here
        courses: courses
          .reverse()
          .slice(
            (currentPage - 1) * coursePerPage,
            (currentPage - 1) * coursePerPage + coursePerPage
          ),
        totalCourses: courses.length,
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
//pagination
exports.getCoursesByTopic = async (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  const topicSlugOrId = req.params.topicSlugOrId;

  const currentPage = +req.query.page || 1;
  let coursePerPage = +req.query.count;

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
          select: ['firstName', 'lastName', 'description', 'socialLinks'],
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

    if (!coursePerPage) {
      coursePerPage = topic.courses.length;
    }

    res.status(200).json({
      message: 'Fetch courses by topic successfully!',
      data: {
        topic: {
          ...topic._doc,
          //pagination here
          courses: topic.courses
            .reverse()
            .slice(
              (currentPage - 1) * coursePerPage,
              (currentPage - 1) * coursePerPage + coursePerPage
            ),
          totalCourses: topic.courses.length,
        },
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
      .populate([
        {
          path: 'topic',
          select: '-courses',
          populate: {
            path: 'courseCategoryId',
            select: '-topics',
          },
        },
        {
          path: 'chapters',
          select: [
            '-courseId',
            '-tests.questions',
            '-videos.url',
            '-attachments.url',
          ],
        },
        {
          path: 'streams',
          select: ['-courseId'],
        },
        {
          path: 'feedbacks',
          select: ['-courseId'],
        },
      ]);

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

//authorization: learnerDetails, teacher, admin, root
exports.getCourseChapters = async (req, res, next) => {
  const courseSlugOrId = req.params.courseSlugOrId;

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

    const course = await Course.findOne(courseFilterData)
      .select(['-learnersDetail', '-streams', '-feedbacks'])
      .populate([
        {
          path: 'author',
          select: [
            'email',
            'firstName',
            'lastName',
            'description',
            'socialLinks',
          ],
        },
        {
          path: 'topic',
          select: '-courses',
          populate: {
            path: 'courseCategoryId',
            select: '-topics',
          },
        },
        {
          path: 'chapters',
          select: ['-courseId'],
        },
      ]);

    //check course exists
    if (!course) {
      const error = new Error('Course not found!');
      error.statusCode = 404;

      throw error;
    }

    //*** */
    //check auth who can see this main content course

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

//not finish
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

//teacher, admin required
exports.updateCourse = async (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  //get request's body
  const courseId = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const slug = req.body.slug;
  const categoryId = req.body.categoryId;
  const topicId = req.body.topicId;
  const tags = req.body.tags;
  const price = req.body.price;
  const discount = req.body.discount;
  const status = req.body.status;

  try {
    //check authentication
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error('Authentication failed!');
      error.statusCode = 401;

      throw error;
    }

    //check role is teacher and admin or not
    if (user.role.id !== 3 && user.role.id !== 1 && user.role.id !== 0) {
      const error = new Error('You do not have permission to do this action!');
      error.statusCode = 403;

      throw error;
    }

    //check course exists
    const course = await Course.findById(courseId);

    if (!course) {
      const error = new Error('Course not found!');
      error.statusCode = 404;

      throw error;
    }

    //check course's authorization
    if (course.author.toString() !== req.userId.toString()) {
      const error = new Error(
        'You do not have permission to do this action! This course is not your.'
      );
      error.statusCode = 403;

      throw error;
    }

    if (categoryId) {
      //check category exists
      const courseCategory = await CourseCategory.findById(categoryId);

      if (!courseCategory) {
        const error = new Error('Category not found!');
        error.statusCode = 404;

        throw error;
      }

      if (courseCategory.topics.length === 0) {
        const error = new Error(
          `Selected category "${courseCategory.title}" does not have any topic. Please choose another category!`
        );
        error.statusCode = 404;

        throw error;
      }
    }

    let newTopic;

    //check topicId change?
    if (topicId && topicId !== course.topic.toString()) {
      //check topic exists
      newTopic = await Topic.findById(topicId);

      if (!newTopic) {
        const error = new Error('Topic not found!');
        error.statusCode = 404;

        throw error;
      }

      //check if topic belong to category
      //only check if passed into categoryId
      if (categoryId && newTopic.courseCategoryId.toString() !== categoryId) {
        const error = new Error(
          `Selected topic "${newTopic.title}" does not belong to "${courseCategory.title}" category. Please try again or choose another topic!`
        );
        error.statusCode = 404;

        throw error;
      }
    }

    //update course
    //only update field has data in body
    if (title) course.title = title;
    if (description) course.description = description;
    if (tags) course.tags = tags;
    if (price !== undefined) course.price = price;
    if (discount !== undefined) course.discount = discount;
    if (slug) course.slug = slug;
    if (status !== undefined) course.status = status;

    //if topicId change
    let lastTopic;
    if (newTopic) {
      //find last topic
      lastTopic = await Topic.findById(course.topic);
      //set new topic
      course.topic = topicId;
    }

    //save updated data
    await course.save();

    //if topicId change
    if (lastTopic) {
      //remove courseId from old topic
      lastTopic.courses.pull(course._id);
      await lastTopic.save();

      //push courseId to to new topic
      newTopic.courses.push(course._id);
      await newTopic.save();
    }

    //send response
    res.status(200).json({
      message: 'Course updated successfully!',
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

//admin, teacher required
exports.deleteCourse = async (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  //get request's body
  const courseId = req.body.id;

  try {
    //check authentication
    const user = await User.findById(req.userId);
    const userRole = user.role.id;

    if (!user) {
      const error = new Error('Authentication failed!');
      error.statusCode = 401;

      throw error;
    }

    //check role is teacher and admin or not
    if (userRole !== 3 && userRole !== 1 && userRole !== 0) {
      const error = new Error('You do not have permission to do this action!');
      error.statusCode = 403;

      throw error;
    }

    //check course exists
    const course = await Course.findById(courseId);

    if (!course) {
      const error = new Error('Course not found!');
      error.statusCode = 404;

      throw error;
    }

    //check course's authorization
    if (userRole === 3 && course.author.toString() !== req.userId.toString()) {
      const error = new Error(
        'You do not have permission to do this action! This course is not your.'
      );
      error.statusCode = 403;

      throw error;
    }

    //check courseDetail of teacher
    //*** */
    if (userRole === 2 && course.learnersDetail.length > 0) {
      const error = new Error(
        "Your course already have students! Please update the course or send a delete course request to GuruAcademy Admin in your course 's console."
      );
      error.statusCode = 403;

      throw error;
    }

    //*** */
    //ADMIN and ROOT will delete everything about the course here: include course, course details.
    //Maybe refund for learner here or move the learner from this course to another to protect the buyer
    //This function will be consider in the future
    const adminRoles = [0, 1];
    if (adminRoles.includes(userRole) && course.learnersDetail.length > 0) {
      const error = new Error(
        'Your course already have students! This function will be consider in the future'
      );
      error.statusCode = 403;

      throw error;
    }

    //find relate modal will effect when this course deleted
    const topic = await Topic.findById(course.topic);
    const streamsId = course.streams;
    const feedbacksId = course.feedbacks;
    const chaptersId = course.chapters;

    //delete course
    await Course.findByIdAndDelete(courseId);

    //remove courseId from topic
    if (topic) {
      topic.courses.pull(course._id);
      await topic.save();
    }

    //remove courseId from user (teacher)
    user.teachingCourses.pull(course._id);
    await user.save();

    //remove many doc of streams, feedbacks, chapters belong to this course
    //CASCADE
    //consider keep some data about courseDetail in the future here
    await Stream.deleteMany({ _id: { $in: streamsId } });
    await Feedback.deleteMany({ _id: { $in: feedbacksId } });
    await Chapter.deleteMany({ _id: { $in: chaptersId } });

    //send response
    res.status(200).json({
      message: 'Course deleted successfully!',
      success: true,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};
