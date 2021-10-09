const User = require('../models/user');
const Notification = require('../models/notification');
const { validationError } = require('../util/helper');

//only admin & teacher has permission
exports.postNewNotification = async (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  //get request's body
  const userId = req.body.userId;
  const title = req.body.title;
  const content = req.body.content;

  try {
    //check authentication who create notification
    const userCreateNotification = await User.findById(req.userId);

    if (!userCreateNotification) {
      const error = new Error('Authentication failed!');
      error.statusCode = 401;

      throw error;
    }

    //check role is admin, root or teacher
    if (
      userCreateNotification.role.id !== 0 &&
      userCreateNotification.role.id !== 1 &&
      userCreateNotification.role.id !== 3
    ) {
      const error = new Error('You do not have permission to do this action!');
      error.statusCode = 403;

      throw error;
    }

    //check user who receive a notification
    const userReceiveNotification = await User.findById(userId);

    if (!userReceiveNotification) {
      const error = new Error('User not found!');
      error.statusCode = 404;

      throw error;
    }

    //save new notification
    const notification = new Notification({
      userId,
      title,
      content,
    });

    await notification.save();

    //push notification to user who receive notification
    userReceiveNotification.notifications.push(notification._id);
    await userReceiveNotification.save();

    res.status(201).json({
      message: 'Notification created successfully!',
      data: {
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

//authentication
exports.getNotifications = async (req, res, next) => {
  try {
    //check authentication
    const user = await User.findById(req.userId)
      .select(['notifications', '_id'])
      .populate('notifications');

    if (!user) {
      const error = new Error('Authentication failed!');
      error.statusCode = 401;

      throw error;
    }

    res.status(200).json({
      message: 'Fetch notifications successfully!',
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
exports.getNotification = async (req, res, next) => {
  const notificationId = req.params.notificationId;

  try {
    //check authentication
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error('Authentication failed!');
      error.statusCode = 401;

      throw error;
    }

    //check notification's userId
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      const error = new Error('Notification not found!');
      error.statusCode = 404;

      throw error;
    }

    if (notification.userId.toString() !== req.userId.toString()) {
      const error = new Error('Authentication failed!');
      error.statusCode = 401;

      throw error;
    }

    res.status(200).json({
      message: 'Fetch notification successfully!',
      data: {
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

exports.deleteNotification = async (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  const notificationId = req.body.id;

  try {
    //check authentication
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error('Authentication failed!');
      error.statusCode = 401;

      throw error;
    }

    //check notification's userId
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      const error = new Error('Notification not found!');
      error.statusCode = 404;

      throw error;
    }

    if (notification.userId.toString() !== req.userId.toString()) {
      const error = new Error('Authentication failed!');
      error.statusCode = 401;

      throw error;
    }

    await Notification.findByIdAndRemove(notificationId);

    user.notifications.pull(notificationId);
    await user.save();

    res.status(200).json({
      message: 'Successfully deleted notification!',
      success: true,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};
