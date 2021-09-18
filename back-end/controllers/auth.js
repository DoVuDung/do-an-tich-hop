const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  const role = req.body.role;

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
      role,
      notifications: [],
    });

    const savedUser = await user.save();

    //send response
    res.status(201).json({
      message: 'User created successfully!',
      userId: savedUser._id,
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

    //create jwt for new login
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
        status: user.status,
        role: user.role,
        // firstName: user.firstName,
        // lastName: user.lastName,
        // dateOfBirth: user.dateOfBirth,
      },
      'guruAcademySecretKey',
      {
        expiresIn: '2h',
      }
    );

    //send response
    res.status(200).json({
      message: 'Login successfully!',
      token,
      userId: user._id.toString(),
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};

// const user = await User.findOne({ email: email }).select('-password');
