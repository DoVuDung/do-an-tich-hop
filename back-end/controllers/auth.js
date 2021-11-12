const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Notification = require('../models/notification');

const User = require('../models/user');
const { validationError } = require('../util/helper');

//Signup
exports.signup = async (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  //get req body
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const dateOfBirth = req.body.dateOfBirth;
  const address = req.body.address;
  const phoneNumber = req.body.phoneNumber;
  const role = req.body.role;

  const description = req.body.description;
  const socialLinks = req.body.socialLinks;

  let roleData;
  let status;

  if (role === 1) {
    roleData = {
      id: 1,
      name: 'admin',
    };

    status = 2; //pending
  } else if (role === 2) {
    roleData = {
      id: 2,
      name: 'learner',
    };

    status = 1; //active
  } else if (role === 3) {
    roleData = {
      id: 3,
      name: 'teacher',
    };

    status = 2; //pending
  }

  try {
    //hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    //create new user
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      dateOfBirth,
      address,
      role: roleData,
      status,
      phoneNumber,
      description,
      socialLinks,
      learningCourses: [],
      teachingCourses: [],
      notifications: [],
    });

    const savedUser = await user.save();

    //send response
    res.status(201).json({
      message: 'User created successfully!',
      data: {
        userId: savedUser._id,
      },
      success: true,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    //send error response
    next(err);
  }
};

//Login
exports.login = async (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  //get req body
  const email = req.body.email;
  const password = req.body.password;

  try {
    //check user's email
    const user = await User.findOne({ email: email });

    if (!user) {
      const error = new Error(`Account with email "${email}" not found!`);
      error.statusCode = 401;

      throw error;
    }

    //check user's password
    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;

      throw error;
    }

    //check user banned
    if (user.status === 10) {
      const error = new Error(
        'Your account has been suspended. Please contact with us if it have any mistake!'
      );
      error.statusCode = 403;

      throw error;
    }

    //check user locked
    if (user.status === 0) {
      //unlock user
      user.status === 1;
      await user.save();

      const unlockNotification = new Notification({
        userId: user._id,
        title: 'Your account has been unlocked!',
        content: 'Welcome back. Your account has been unlocked!',
      });

      await unlockNotification.save();

      user.notifications.push(unlockNotification._id);
      await user.save();
    }

    //create jwt for new login
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
        status: user.status,
        role: user.role,
      },
      'guruAcademySecretKey',
      {
        expiresIn: '2h',
      }
    );

    //send response
    res.status(200).json({
      message: 'Login successfully!',
      data: {
        token,
        userId: user._id.toString(),
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
//getUser '/'
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      const error = new Error(`not found current user!!`);
      error.statusCode = 401;

      throw error;
    }

    res.status(200).json({
      message: 'load user successfully!',
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
