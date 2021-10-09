const _ = require('lodash');
const mongoose = require('mongoose');

const CourseCategory = require('../models/courseCategory');
const Topic = require('../models/topic');
const User = require('../models/user');
const { validationError } = require('../util/helper');

//CATEGORY
//----
//public
exports.getCourseCategories = async (req, res, next) => {
  try {
    //get course category
    const courseCategories = await CourseCategory.find().populate('topics');

    if (!courseCategories) {
      const error = new Error('Course categories not found!');
      error.statusCode = 404;

      throw error;
    }

    //send res
    res.status(200).json({
      message: 'Fetch course categories successfully!',
      data: {
        courseCategories,
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

exports.getCourseCategory = async (req, res, next) => {
  const categorySlugOrId = req.params.categorySlugOrId;

  try {
    //get course category
    let courseCategory;

    if (mongoose.isValidObjectId(categorySlugOrId)) {
      courseCategory = await CourseCategory.findById(categorySlugOrId).populate(
        'topics'
      );
    } else {
      courseCategory = await CourseCategory.findOne({
        slug: categorySlugOrId,
      }).populate('topics');
    }

    //check exists
    if (!courseCategory) {
      const error = new Error('Course category not found!');
      error.statusCode = 404;

      throw error;
    }

    //send res
    res.status(200).json({
      message: 'Fetch course category successfully!',
      data: {
        courseCategory,
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

//-----
//Admin or root required
exports.postCourseCategory = async (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  //get request's body
  const title = req.body.title;
  const discountPercent = req.body.discountPercent;
  const topics = req.body.topics;

  try {
    //check authentication
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error('Authentication failed!');
      error.statusCode = 401;

      throw error;
    }

    //check role is admin or root
    if (user.role.id !== 1 && user.role.id !== 0) {
      const error = new Error('You do not have permission to do this action!');
      error.statusCode = 403;

      throw error;
    }

    //create new category
    const courseCategory = new CourseCategory({
      title,
      discountPercent,
      topics: [],
      courses: [],
    });

    await courseCategory.save();

    //transform topics to correct schema's form
    const transformedTopics = _.uniq(topics).map((topic) => {
      if (!topic.title) {
        return { title: topic, courseCategoryId: courseCategory._id };
      }

      return topic;
    });

    //create multiple topics
    //not using Topic.insertMany(transformedTopics) because slug conflict => duplicated error E11000
    //insertedIds.push(result._id.toString()) failed too;
    let insertedIds = await Promise.all(
      transformedTopics.map((item) => {
        const topic = new Topic(item);
        return topic.save().then((result) => result._id.toString());
      })
    );

    //update topics
    courseCategory.topics = insertedIds;
    await courseCategory.save();

    //send res
    res.status(201).json({
      message: 'Course category created successfully!',
      data: {
        courseCategory,
        topicIds: insertedIds,
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

exports.updateCourseCategory = async (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  //get request's body
  const categoryId = req.body.id;
  const updatedTitle = req.body.title;
  const updatedDiscountPercent = req.body.discountPercent;
  const updatedStatus = req.body.status;
  const updatedSlug = req.body.slug;

  try {
    //check authentication
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error('Authentication failed!');
      error.statusCode = 401;

      throw error;
    }

    //check role is admin or not
    if (user.role.id !== 1 && user.role.id !== 0) {
      const error = new Error('You do not have permission to do this action!');
      error.statusCode = 403;

      throw error;
    }

    //check category exists
    const updatedCourseCategory = await CourseCategory.findById(categoryId);

    if (!updatedCourseCategory) {
      const error = new Error('Course category not found!');
      error.statusCode = 404;

      throw error;
    }

    //update category
    updatedCourseCategory.title = updatedTitle;
    updatedCourseCategory.discountPercent = updatedDiscountPercent;
    updatedCourseCategory.status = updatedStatus;
    updatedCourseCategory.slug = updatedSlug;

    await updatedCourseCategory.save();

    //send res
    res.status(200).json({
      message: 'Course category updated successfully!',
      data: {
        updatedCourseCategory,
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

exports.deleteCourseCategory = async (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  const categoryId = req.body.id;

  try {
    //check authentication
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error('Authentication failed!');
      error.statusCode = 401;

      throw error;
    }

    //check role is admin or not
    if (user.role.id !== 1 && user.role.id !== 0) {
      const error = new Error('You do not have permission to do this action!');
      error.statusCode = 403;

      throw error;
    }

    //check category exists
    const courseCategory = await CourseCategory.findById(categoryId).populate(
      'topics'
    );

    if (!courseCategory) {
      const error = new Error('Course category not found!');
      error.statusCode = 404;

      throw error;
    }

    //check courses exists
    //if courses existing, ask for update category instead.
    courseCategory.topics.forEach((topic) => {
      if (topic.courses.length > 0) {
        return res.status(403).json({
          message: `Can't delete the category because topic "${topic.title}" already has courses. Please update the the category instead.`,
        });
      }
    });

    //delete topics
    const topicIds = courseCategory.topics.map((topic) => topic._id);

    await Topic.deleteMany({ _id: { $in: topicIds } });

    //delete category
    await CourseCategory.findByIdAndRemove(courseCategory._id);

    //send res
    res.status(200).json({
      message: 'Course category deleted successfully!',
      success: true,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};
