const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; //header: {'Authorization': 'Bearer token'}

  if (!token) {
    const error = new Error('Access token not found.');

    error.statusCode = 401;
    error.success = false;

    return next(error);
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || 'guruAcademySecretKey'
    );
  } catch (error) {
    error.statusCode = 500;
    error.success = false;

    return next(error);
  }

  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 403;
    error.success = false;

    return next(error);
  }

  req.userId = decodedToken.userId;
  next();
};

// module.exports = verifyToken;
