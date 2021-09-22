const User = require('../models/user');

exports.topTeacher = async (req, res, next) => {
  const count = +req.query.count || +req.params.count || 10;

  try {
    const teachers = await User.aggregate([
      //populate('teachingCourses')
      {
        $match: { 'role.id': 3 },
      },
      {
        $lookup: {
          from: 'Course',
          localField: 'teachingCourses',
          foreignField: '_id',
          as: 'course',
        },
      },
      {
        $project: {
          email: 1,
          firstName: 1,
          lastName: 1,
          description: 1,
          imageUrl: 1,
          socialLinks: 1,
          learnersNumber: { $size: '$teachingCourses.learnersDetail' },
        },
      },
      {
        $sort: { learnersNumber: -1 },
      },
      {
        $limit: count,
      },
    ]);

    if (!teachers) {
      const error = new Error('Teachers not found!');
      error.statusCode = 404;

      throw error;
    }

    res.status(200).json({
      message: 'Fetch top teachers successfully!',
      data: {
        teachers,
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
