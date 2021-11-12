const mongoose = require('mongoose');

const Topic = require('../models/topic');
const User = require('../models/user');
const CourseCategory = require('../models/courseCategory');
const { validationError } = require('../util/helper');

//public
exports.getTopics = async (req, res, next) => {
  try {
    const topics = await Topic.find().populate('courseCategoryId', '-topics');

    if (!topics) {
      const error = new Error('Topics not found!');
      error.statusCode = 404;

      throw error;
    }

    res.status(200).json({
      message: 'Fetch topics successfully!',
      data: {
        topics,
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
exports.getTopic = async (req, res, next) => {
  const topicSlugOrId = req.params.topicSlugOrId;

  try {
    //check topic exists
    let topic;

    if (mongoose.isValidObjectId(topicSlugOrId)) {
      topic = await Topic.findById(topicSlugOrId).populate(
        'courseCategoryId',
        '-topics'
      );
    } else {
      topic = await Topic.findOne({ slug: topicSlugOrId }).populate(
        'courseCategoryId',
        '-topics'
      );
    }

    if (!topic) {
      const error = new Error('Topic not found!');
      error.statusCode = 404;

      throw error;
    }

    res.status(200).json({
      message: 'Fetch topics successfully!',
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

//public
exports.getCategoryTopics = async (req, res, next) => {
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

    if (!courseCategory) {
      const error = new Error('Course categories not found!');
      error.statusCode = 404;

      throw error;
    }

    //send res
    res.status(200).json({
      message: "Fetch course category's topic successfully!",
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

//admin or root required
exports.postNewTopic = async (req, res, next) => {
  const categorySlugOrId = req.params.categorySlugOrId;

  //check validation
  const error = validationError(req);
  if (error) return next(error);

  //get request's body
  const title = req.body.title;
  const discountPercent = req.body.discountPercent;

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

    //save topic
    const topic = new Topic({
      title,
      discountPercent,
      courseCategoryId: courseCategory._id,
    });

    await topic.save();

    //push new topic to category
    courseCategory.topics.push(topic._id);

    await courseCategory.save();

    //send res
    res.status(200).json({
      message: 'Successfully created new topic!',
      data: {
        topic,
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

exports.updateTopic = async (req, res, next) => {
  const topicId = req.body.id;

  //check validation
  const error = validationError(req);
  if (error) return next(error);

  //get request's body
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

    //check topic exists
    const updatedTopic = await Topic.findById(topicId).populate(
      'courseCategoryId',
      '-topics'
    );

    if (!updatedTopic) {
      const error = new Error('Topic not found!');
      error.statusCode = 404;

      throw error;
    }

    //update topic and save
    updatedTopic.title = updatedTitle;
    updatedTopic.status = updatedStatus;
    updatedTopic.discountPercent = updatedDiscountPercent;
    updatedTopic.slug = updatedSlug;

    await updatedTopic.save();

    //send res
    res.status(200).json({
      message: 'Successfully updated topic!',
      data: {
        updatedTopic,
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

exports.deleteTopic = async (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  const topicId = req.body.id;

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

    //check topic exists

    const topic = await Topic.findById(topicId);

    if (!topic) {
      const error = new Error('Topic not found!');
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

    const courseCategory = await CourseCategory.findById(
      topic.courseCategoryId
    ).populate('topics');

    //delete topic
    await Topic.findByIdAndDelete(topic._id);

    //remove topic form course category
    if (courseCategory) {
      courseCategory.topics.pull(topic._id);
      await courseCategory.save();
    }

    //send res
    res.status(200).json({
      message: 'Successfully deleted topic!',
      data: {
        updatedCourseCategory: courseCategory,
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
