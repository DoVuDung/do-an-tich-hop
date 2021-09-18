const { validationResult } = require('express-validator');

//Helper functions
exports.isDate = (string) => {
  return new Date(string) !== 'Invalid Date' && !isNaN(new Date(string));
};

//check validation
exports.validationError = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed!');
    error.statusCode = 422;
    error.data = errors.array();

    return error;
  }
};
