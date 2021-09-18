const User = require('../models/user');

exports.topTeacher = async (req, res, next) => {
  const count = +req.query.count || +req.params.count || 3;

  try {
    const teachers = await User.find({ 'role.id': 3 })
      .select([
        'email',
        'firstName',
        'lastName',
        'description',
        'imageUrl',
        'socialLinks',
      ])
      .limit(count);

    if (!teachers) {
      const error = new Error('Teachers not found!');
      error.statusCode = 404;

      throw error;
    }

    res.status(200).json({
      teachers,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};
