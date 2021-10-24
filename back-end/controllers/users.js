const bcrypt = require('bcryptjs');

const { validationError, unlinkPath } = require('../util/helper');
const User = require('../models/user');
const { uploadFile, removeFile } = require('../util/s3');

//setup unlinked files

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

exports.getPublicUserProfile = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    //check user
    const user = await User.findById(userId).select([
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
  const phoneNumber = req.body.phoneNumber;

  const socialLinks = req.body.socialLinks;
  //socialLinks: {facebook: String, instagram: String, linkedIn: String, github: String, twitter: String}

  const address = req.body.address;
  //address: {street: String, city: String, country: String}

  //receive image file here
  const imageFile = req.file;

  //or user can pass in an image url
  //usage: if user not change avatar, pass this to body for doesn't save new image
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

    //check validation for imageUrl
    if (imageUrl !== user.imageUrl) {
      const error = new Error(
        'This property "imageUrl" have to match old "imageUrl"! It only use in case user not change avatar!'
      );
      error.statusCode = 422;

      throw error;
    }

    //check image file and post it to s3
    let uploadS3Result;
    if (imageFile) {
      //remove old image file
      await removeFile(user.imageUrl.split('/')[2]);

      //upload new image file
      uploadS3Result = await uploadFile(imageFile);

      //unlink image from local path (./upload)
      await unlinkPath(imageFile.path);
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
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;

    if (imageUrl !== undefined) user.imageUrl = imageUrl;
    if (uploadS3Result) user.imageUrl = `/files/${uploadS3Result.Key}`;

    if (hashedNewPassword) user.password = hashedNewPassword;

    await user.save();

    //send response
    res.status(201).json({
      message: 'User profile updated successfully!',
      data: {
        userId: user._id,
        imagePath: uploadS3Result ? `/files/${uploadS3Result.Key}` : undefined,
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
  const phoneNumber = req.body.phoneNumber;

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
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;

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
