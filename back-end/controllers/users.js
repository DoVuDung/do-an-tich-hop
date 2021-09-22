const User = require('../models/user');
require('../models/courseDetail');

//authentication
exports.getUserAllInfo = async (req, res, next) => {
  try {
    //check user
    const user = await User.findById(req.userId)
      .populate({
        path: 'teachingCourses',
        select: [
          'title',
          'description',
          'author',
          'topic',
          'price',
          'discount',
          'slug',
        ],
        populate: [
          {
            path: 'author',
            select: ['socialLinks', 'firstName', 'lastName', 'description'],
          },
          {
            path: 'topic',
            select: ['title', 'courseCategoryId', 'discountPercent', 'slug'],
            populate: {
              path: 'courseCategoryId',
              select: ['title', 'discountPercent', 'slug'],
            },
          },
        ],
      })
      .populate('learningCourses')
      .populate('notifications');

    if (!user) {
      const error = new Error(`Account with email "${email}" not found!`);
      error.statusCode = 401;

      throw error;
    }

    if (user.status === 0 || user.status === 10) {
      const error = new Error(
        'Your account has been suspended. Please contact with us if it have any mistake!'
      );
      error.statusCode = 403;

      throw error;
    }

    //send response
    res.status(200).json({
      message: 'Fetch user profile successfully!',
      data: {
        user,
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

exports.getUserProfile = async (req, res, next) => {
  try {
    //check user
    const user = await User.findById(req.userId).select([
      '-password',
      '-teachingCourses',
      '-learningCourses',
      '-notifications',
    ]);

    if (!user) {
      const error = new Error(`Account with email "${email}" not found!`);
      error.statusCode = 401;

      throw error;
    }

    if (user.status === 0 || user.status === 10) {
      const error = new Error(
        'Your account has been suspended. Please contact with us if it have any mistake!'
      );
      error.statusCode = 403;

      throw error;
    }

    //send response
    res.status(200).json({
      message: 'Fetch user profile successfully!',
      data: {
        user,
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

exports.getUserNotifications = async (req, res, next) => {};
exports.getUserTeachingCourses = async (req, res, next) => {};
exports.getUserLearningCourses = async (req, res, next) => {};

//admin & root
//users management
