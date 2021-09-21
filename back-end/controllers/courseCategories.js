const mongoose = require('mongoose');
const CourseCategory = require('../models/courseCategory');
const User = require('../models/user');
const { validationError } = require('../util/helper');

//CATEGORY
//----
//public
exports.getCourseCategories = async (req, res, next) => {
  try {
    //get course category
    const courseCategories = await CourseCategory.find();

    if (!courseCategories) {
      const error = new Error('Course categories not found!');
      error.statusCode = 404;

      throw error;
    }

    //send res
    res.status(200).json({
      message: 'Fetch course categories successfully!',
      courseCategories,
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
      courseCategory = await CourseCategory.findById(categorySlugOrId);
    } else {
      courseCategory = await CourseCategory.findOne({ slug: categorySlugOrId });
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
      courseCategory,
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
  const discount = req.body.discount;
  const topics = req.body.topics;

  //transform topics to correct schema's form
  const transformedTopics = topics.map((topic) => {
    if (!topic.title) {
      return { title: topic };
    }

    return topic;
  });

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

    //create new category
    const courseCategory = new CourseCategory({
      title,
      discount,
      topics: transformedTopics,
      courses: [],
    });

    await courseCategory.save();

    //send res
    res.status(201).json({
      message: 'Course category created successfully!',
      courseCategory,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.updateCourseCategory = async (req, res, next) => {
  const categorySlugOrId = req.params.categorySlugOrId;

  //check validation
  const error = validationError(req);
  if (error) return next(error);

  //get request's body
  const updatedTitle = req.body.title;
  const updatedDiscount = req.body.discount;

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
    let updatedCourseCategory;

    if (mongoose.isValidObjectId(categorySlugOrId)) {
      updatedCourseCategory = await CourseCategory.findById(categorySlugOrId);
    } else {
      updatedCourseCategory = await CourseCategory.findOne({
        slug: categorySlugOrId,
      });
    }

    if (!updatedCourseCategory) {
      const error = new Error('Course category not found!');
      error.statusCode = 404;

      throw error;
    }

    //update category
    updatedCourseCategory.title = updatedTitle;
    updatedCourseCategory.discount = updatedDiscount;

    await updatedCourseCategory.save();

    //send res
    res.status(200).json({
      message: 'Course category updated successfully!',
      updatedCourseCategory,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.deleteCourseCategory = async (req, res, next) => {
  const categorySlugOrId = req.params.categorySlugOrId;

  //check validation
  const error = validationError(req);
  if (error) return next(error);

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
    let courseCategory;

    if (mongoose.isValidObjectId(categorySlugOrId)) {
      courseCategory = await CourseCategory.findById(categorySlugOrId);
    } else {
      courseCategory = await CourseCategory.findOne({ slug: categorySlugOrId });
    }

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

    await CourseCategory.findByIdAndRemove(categorySlugOrId);

    //send res
    res.status(200).json({
      message: 'Course category deleted successfully!',
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

//----
//TOPIC
//admin or root required
exports.postNewTopic = async (req, res, next) => {
  const categorySlugOrId = req.params.categorySlugOrId;

  //check validation
  const error = validationError(req);
  if (error) return next(error);

  //get request's body
  const title = req.body.title;

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

    //check course category exists
    let courseCategory;

    if (mongoose.isValidObjectId(categorySlugOrId)) {
      courseCategory = await CourseCategory.findById(categorySlugOrId);
    } else {
      courseCategory = await CourseCategory.findOne({ slug: categorySlugOrId });
    }

    if (!courseCategory) {
      const error = new Error('Category not found!');
      error.statusCode = 404;

      throw error;
    }

    //check topic's title exists
    if (courseCategory.topics.find((topic) => topic.title === title)) {
      const error = new Error(`Topic "${title}" is already exists`);
      error.statusCode = 422;

      throw error;
    }

    //save topic
    courseCategory.topics.push({
      title,
    });

    await courseCategory.save();

    //send res
    res.status(200).json({
      message: 'Successfully created new topic!',
      courseCategory,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.updateTopic = async (req, res, next) => {
  const categorySlugOrId = req.params.categorySlugOrId;
  const topicSlugOrId = req.params.topicSlugOrId;

  //check validation
  const error = validationError(req);
  if (error) return next(error);

  //get request's body
  const updatedTitle = req.body.title;

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

    //check course category exists
    let courseCategory;

    if (mongoose.isValidObjectId(categorySlugOrId)) {
      courseCategory = await CourseCategory.findById(categorySlugOrId);
    } else {
      courseCategory = await CourseCategory.findOne({ slug: categorySlugOrId });
    }

    if (!courseCategory) {
      const error = new Error('Category not found!');
      error.statusCode = 404;

      throw error;
    }

    //check topic's title exists
    if (courseCategory.topics.find((topic) => topic.title === updatedTitle)) {
      const error = new Error(
        `Topic "${updatedTitle}" is already exists. Please choose another title`
      );
      error.statusCode = 422;

      throw error;
    }

    //check topic exists
    let topicIndex;
    if (mongoose.isValidObjectId(topicSlugOrId)) {
      topicIndex = courseCategory.topics.findIndex(
        (topic) => topic._id.toString() === topicSlugOrId
      );
    } else {
      topicIndex = courseCategory.topics.findIndex(
        (topic) => topic.slug === topicSlugOrId
      );
    }

    if (topicIndex < 0) {
      const error = new Error(`Topic "${topicSlugOrId}" not found!`);
      error.statusCode = 404;

      throw error;
    }

    //update topic and save
    courseCategory.topics[topicIndex] = {
      _id: courseCategory.topics[topicIndex]._id,
      title: updatedTitle,
      courses: courseCategory.topics[topicIndex].courses,
    };

    await courseCategory.save();

    //send res
    res.status(200).json({
      message: 'Successfully updated topic!',
      courseCategory,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

exports.deleteTopic = async (req, res, next) => {
  const categorySlugOrId = req.params.categorySlugOrId;
  const topicSlugOrId = req.params.topicSlugOrId;

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

    //check course category exists
    let courseCategory;

    if (mongoose.isValidObjectId(categorySlugOrId)) {
      courseCategory = await CourseCategory.findById(categorySlugOrId);
    } else {
      courseCategory = await CourseCategory.findOne({ slug: categorySlugOrId });
    }

    if (!courseCategory) {
      const error = new Error('Category not found!');
      error.statusCode = 404;

      throw error;
    }

    //check topic exists
    let topic;
    if (mongoose.isValidObjectId(topicSlugOrId)) {
      topic = courseCategory.topics.find(
        (topic) => topic._id.toString() === topicSlugOrId
      );
    } else {
      topic = courseCategory.topics.find(
        (topic) => topic.slug === topicSlugOrId
      );
    }

    if (!topic) {
      const error = new Error(`Topic "${title}" not found!`);
      error.statusCode = 404;

      throw error;
    }

    //check topic already has courses
    //if topic has courses, reject the action to protect courses
    //ask for update topic instead.
    if (topic.courses.length > 0) {
      const error = new Error(
        `Topic "${topic.title}" already has courses. Please update the topic instead.`
      );
      error.statusCode = 403;

      throw error;
    }

    //delete topic
    courseCategory.topics.pull({
      _id: topic._id,
    });

    await courseCategory.save();

    //send res
    res.status(200).json({
      message: 'Successfully deleted topic!',
      updatedCourseCategory: courseCategory,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};
