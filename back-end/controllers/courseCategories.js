const CourseCategory = require('../models/courseCategory');
const User = require('../models/user');
const { validationError } = require('../util/helper');

exports.postCourseCategory = async (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  //get request's body
  const name = req.body.name;
  const discount = req.body.discount;

  try {
    //check authentication
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error('User not found!');
      error.statusCode = 401;

      throw error;
    }

    //check role is admin or not
    if (user.role.id !== 1) {
      const error = new Error('You do not have permission to do this action!');
      error.statusCode = 403;

      throw error;
    }

    const courseCategory = new CourseCategory({
      name,
      discount,
    });

    await courseCategory.save();

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
