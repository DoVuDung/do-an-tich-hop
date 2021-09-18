//Helper functions
exports.isDate = (string) => {
  return new Date(string) !== 'Invalid Date' && !isNaN(new Date(string));
};
