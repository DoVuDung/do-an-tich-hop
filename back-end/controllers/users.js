const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationError } = require('../util/helper');

//all authentication
exports.getUserAllInfo = async (req, res, next) => {
  try {
    //check user
    const user = await User.findById(req.userId)
      .populate({
        path: 'teachingCourses',
        select: ['-author'],
        options: {
          sort: { createdAt: -1 },
        },
        populate: {
          path: 'topic',
          select: ['title', 'courseCategoryId', 'discountPercent', 'slug'],
          populate: {
            path: 'courseCategoryId',
            select: ['title', 'discountPercent', 'slug'],
          },
        },
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

exports.getUserTeachingCourses = async (req, res, next) => {
  try {
    //check user
    const user = await User.findById(req.userId)
      .select(['email', 'teachingCourses', 'firstName', 'lastName', 'status'])
      .populate({
        path: 'teachingCourses',
        options: {
          sort: { createdAt: -1 },
        },
        populate: {
          path: 'topic',
          select: ['title', 'courseCategoryId', 'discountPercent', 'slug'],
          populate: {
            path: 'courseCategoryId',
            select: ['title', 'discountPercent', 'slug'],
          },
        },
      });

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
      message: 'Fetch user teaching courses successfully!',
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

exports.getUserLearningCourses = async (req, res, next) => {
  try {
    //check user
    const user = await User.findById(req.userId)
      .select(['email', 'learningCourses', 'firstName', 'lastName', 'status'])
      .populate({
        path: 'learningCourses',
        select: ['-userId'],
        options: {
          sort: { createdAt: -1 },
        },
        populate: {
          path: 'courseId',
          select: ['title', 'description', 'author', 'topic'],
          populate: [
            {
              path: 'author',
              select: ['firstName', 'lastName'],
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
        },
      });

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
      message: 'Fetch user learning courses successfully!',
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

exports.getUserNotifications = async (req, res, next) => {
  try {
    //check user
    const user = await User.findById(req.userId)
      .select(['email', 'notifications', 'firstName', 'lastName', 'status'])
      .populate({
        path: 'notifications',
        select: '-userId',
      });

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
      message: 'Fetch user learning courses successfully!',
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

exports.updateUserProfile = async (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  //get req's body
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const dateOfBirth = req.body.dateOfBirth;
  const description = req.body.description;
  const status = req.body.status;

  const socialLinks = req.body.socialLinks;
  //socialLinks: {facebook: String, instagram: String, linkedIn: String, github: String, twitter: String}

  const address = req.body.address;
  //address: {street: String, city: String, country: String}

  const imageUrl = req.body.imageUrl;

  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  try {
    //check authentication
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error('Authentication failed!');
      error.statusCode = 401;

      throw error;
    }

    //check status
    if (user.status === 0 || user.status === 10) {
      const error = new Error(
        'Your account has been suspended. Please contact with us if it have any mistake!'
      );
      error.statusCode = 403;

      throw error;
    }

    //check user try to change status
    //only admin or root users can change status
    // if (status !== undefined && user.role.id !== 1 && user.role.id !== 0) {
    //   const error = new Error('You can not change the status of your account!');
    //   error.statusCode = 403;

    //   throw error;
    // }

    //check password change request
    if ((!oldPassword && newPassword) || (oldPassword && !newPassword)) {
      const error = new Error(
        'Missing "oldPassword" or "newPassword" property for change password request!'
      );
      error.statusCode = 422;

      throw error;
    }

    //check password
    let hashedNewPassword;

    if (oldPassword && newPassword) {
      const isMatchPassword = bcrypt.compareSync(oldPassword, user.password);
      if (!isMatchPassword) {
        const error = new Error('Incorrect old password!');
        error.statusCode = 401;

        throw error;
      }

      //change new password
      hashedNewPassword = bcrypt.hashSync(newPassword, 12);
    }

    //update user profile here
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (dateOfBirth !== undefined) user.dateOfBirth = dateOfBirth;
    if (description !== undefined) user.description = description;
    if (status !== undefined) user.status = status;
    if (socialLinks !== undefined) user.socialLinks = socialLinks;
    if (address !== undefined) user.address = address;

    if (imageUrl !== undefined) user.imageUrl = imageUrl;

    if (hashedNewPassword) user.password = hashedNewPassword;

    await user.save();

    //send response
    res.status(201).json({
      message: 'User profile updated successfully!',
      data: {
        userId: user._id,
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

exports.changeUserPassword = async (req, res, next) => {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  try {
    //check authentication
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error('Authentication failed!');
      error.statusCode = 401;

      throw error;
    }

    //check status
    if (user.status === 0 || user.status === 10) {
      const error = new Error(
        'Your account has been suspended. Please contact with us if it have any mistake!'
      );
      error.statusCode = 403;

      throw error;
    }

    //check password
    let hashedNewPassword;

    if (oldPassword && newPassword) {
      const isMatchPassword = bcrypt.compareSync(oldPassword, user.password);
      if (!isMatchPassword) {
        const error = new Error('Incorrect old password!');
        error.statusCode = 401;

        throw error;
      }

      //change new password
      hashedNewPassword = bcrypt.hashSync(newPassword, 12);
    }

    if (!hashedNewPassword) {
      const error = new Error(
        'Missing "oldPassword" or "newPassword" property for change password request!'
      );
      error.statusCode = 422;

      throw error;
    }

    user.password = hashedNewPassword;

    await user.save();

    //send response
    res.status(201).json({
      message: 'Change password successfully!',
      data: {
        userId: user._id,
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
exports.forgotUserPassword = async (req, res, next) => {};

//admin change user profile
exports.adminUpdateUserProfile = async (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  //get req's body
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const dateOfBirth = req.body.dateOfBirth;
  const description = req.body.description;
  const status = req.body.status;

  const socialLinks = req.body.socialLinks;
  //socialLinks: {facebook: String, instagram: String, linkedIn: String, github: String, twitter: String}

  const address = req.body.address;
  //address: {street: String, city: String, country: String}

  const imageUrl = req.body.imageUrl;

  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  try {
    //check authentication
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error('Authentication failed!');
      error.statusCode = 401;

      throw error;
    }

    //check status
    if (user.status === 0 || user.status === 10) {
      const error = new Error(
        'Your account has been suspended. Please contact with us if it have any mistake!'
      );
      error.statusCode = 403;

      throw error;
    }

    //check user try to change status
    //only admin or root users can change status
    if (status !== undefined && user.role.id !== 1 && user.role.id !== 0) {
      const error = new Error('You can not change the status of your account!');
      error.statusCode = 403;

      throw error;
    }

    //check password change request
    if ((!oldPassword && newPassword) || (oldPassword && !newPassword)) {
      const error = new Error(
        'Missing "oldPassword" or "newPassword" property for change password request!'
      );
      error.statusCode = 422;

      throw error;
    }

    //check password
    let hashedNewPassword;

    if (oldPassword && newPassword) {
      const isMatchPassword = bcrypt.compareSync(oldPassword, user.password);
      if (!isMatchPassword) {
        const error = new Error('Incorrect old password!');
        error.statusCode = 401;

        throw error;
      }

      //change new password
      hashedNewPassword = bcrypt.hashSync(newPassword, 12);
    }

    //update user profile here
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (dateOfBirth !== undefined) user.dateOfBirth = dateOfBirth;
    if (description !== undefined) user.description = description;
    if (status !== undefined) user.status = status;
    if (socialLinks !== undefined) user.socialLinks = socialLinks;
    if (address !== undefined) user.address = address;

    if (imageUrl !== undefined) user.imageUrl = imageUrl;

    if (hashedNewPassword) user.password = hashedNewPassword;

    await user.save();

    //send response
    res.status(201).json({
      message: 'User profile updated successfully!',
      data: {
        userId: user._id,
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
