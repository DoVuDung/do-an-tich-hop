const { validationError } = require('../util/helper');
const User = require('../models/user');
const Course = require('../models/course');
const Chapter = require('../models/chapter');

exports.postNewChapter = async (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  //get request's body
  const courseId = req.body.courseId;
  const number = req.body.number;
  const title = req.body.title;
  const description = req.body.description;

  try {
    //check authentication
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error('Authentication failed!');
      error.statusCode = 401;

      throw error;
    }

    //check role is teacher or not
    if (user.role.id !== 3) {
      const error = new Error('You do not have permission to do this action!');
      error.statusCode = 403;

      throw error;
    }

    //check course info
    const course = await Course.findById(courseId);

    if (!course) {
      const error = new Error('Course not found!');
      error.statusCode = 404;

      throw error;
    }

    //check course's authorization
    if (course.author.toString() !== req.userId.toString()) {
      const error = new Error(
        'You do not have permission to do this action! This course is not your.'
      );
      error.statusCode = 403;

      throw error;
    }

    //save new chapter
    const chapter = new Chapter({
      courseId,
      number,
      title,
      description,
      tests: [],
      attachments: [],
      videos: [],
    });

    await chapter.save();

    //push new chapter to course
    course.chapters.push(chapter._id);
    await course.save();

    //send response
    res.status(201).json({
      message: 'Chapter created successfully!',
      courseId: course._id.toString(),
      newChapter: chapter,
      courseChapters: course.chapters,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};
