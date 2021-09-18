const Course = require('../models/course');
const User = require('../models/user');
const Notification = require('../models/notification');

const { validationError } = require('../util/helper');

exports.postNewCourse = async (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  //get request's body
  const name = req.body.name;
  const description = req.body.description;
  const categoryId = req.body.categoryId;
  const detail = req.body.detail;

  try {
    //check authentication
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error('User not found!');
      error.statusCode = 401;

      throw error;
    }

    //check role is teacher or not
    if (user.role.id !== 3) {
      const error = new Error('You do not have permission to do this action!');
      error.statusCode = 403;

      throw error;
    }

    //save new course
    const course = new Course({
      name,
      description,
      category: categoryId,
      detail,
      author: req.userId,
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
