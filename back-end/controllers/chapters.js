const mongoose = require('mongoose');

const { validationError } = require('../util/helper');
const User = require('../models/user');
const Course = require('../models/course');
const Chapter = require('../models/chapter');
const CourseDetail = require('../models/courseDetail');

exports.getChapter = async (req, res, next) => {
  const chapterSlugOrId = req.params.chapterSlugOrId;

  try {
    //check authentication
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error('Authentication failed!');
      error.statusCode = 401;

      throw error;
    }

    //get chapter
    let chapterFilterData;
    if (mongoose.isValidObjectId(chapterSlugOrId)) {
      const chapterId = new mongoose.Types.ObjectId(chapterSlugOrId);
      chapterFilterData = { _id: chapterId };
    } else {
      chapterFilterData = { slug: chapterSlugOrId };
    }

    const chapter = await Chapter.findOne(chapterFilterData).populate({
      path: 'courseId',
      select: ['title', 'description', 'author'],
      populate: {
        path: 'author',
        select: [
          'email',
          'firstName',
          'lastName',
          'description',
          'socialLinks',
        ],
      },
    });

    //check chapter exists
    if (!chapter) {
      const error = new Error('Chapter not found!');
      error.statusCode = 404;

      throw error;
    }

    //check auth who can see this chapter content
    const courseDetail = await CourseDetail.findOne({
      userId: user.id,
      courseId: chapter.courseId._id,
    });

    if (
      !courseDetail && //learners check
      user.role.id !== 1 && //admin
      user.role.id !== 0 && //ROOT
      user._id.toString() !== chapter.courseId.author._id.toString() //teacher
    ) {
      const error = new Error('You do not have permission to do this action!');
      error.statusCode = 403;

      throw error;
    }

    //send res
    res.status(200).json({
      message: 'Fetch chapter successfully',
      data: {
        chapter,
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

//teacher required
exports.postNewChapter = async (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  //get request's body
  const courseId = req.body.courseId;
  const number = req.body.number;
  const title = req.body.title;
  const description = req.body.description;
  const tests = req.body.tests;
  const videos = req.body.videos;
  const attachments = req.body.attachments;

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
      tests,
      attachments,
      videos,
    });

    await chapter.save();

    //push new chapter to course
    course.chapters.push(chapter._id);
    await course.save();

    //send response
    res.status(201).json({
      message: 'Chapter created successfully!',
      data: {
        courseId: course._id.toString(),
        newChapter: chapter,
        courseChapters: course.chapters,
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

//teacher required
exports.updateChapter = async (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  //get request's body
  const chapterId = req.body.id;
  const number = req.body.number;
  const title = req.body.title;
  const description = req.body.description;
  const slug = req.body.slug;
  const status = req.body.status;
  const tests = req.body.tests;
  const videos = req.body.videos;
  const attachments = req.body.attachments;

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

    //check chapter info
    const chapter = await Chapter.findById(chapterId);

    if (!chapter) {
      const error = new Error('Chapter not found!');
      error.statusCode = 404;

      throw error;
    }

    //check number's chapter exists
    const checkNumberChapter = await Chapter.findOne({
      courseId: chapter.courseId,
      number,
    });

    if (checkNumberChapter && checkNumberChapter._id.toString() !== chapterId) {
      const error = new Error(`Chapter number ${number} is exists!`);
      error.statusCode = 422;

      throw error;
    }

    //check chapter's authorization
    const course = await Course.findById(chapter.courseId);

    if (!course) {
      const error = new Error('Course not found!');
      error.statusCode = 404;

      throw error;
    }

    if (course.author.toString() !== req.userId.toString()) {
      const error = new Error(
        'You do not have permission to do this action! This course is not your.'
      );
      error.statusCode = 403;

      throw error;
    }

    //update chapter
    //only update field has data in body
    if (title) chapter.title = title;
    if (description !== undefined) chapter.description = description;
    if (number !== undefined) chapter.number = number;
    if (slug) chapter.slug = slug;
    if (status !== undefined) chapter.status = status;
    if (videos !== undefined) chapter.videos = videos;
    if (tests !== undefined) chapter.tests = tests;
    if (attachments !== undefined) chapter.attachments = attachments;

    await chapter.save();

    //send response
    res.status(200).json({
      message: 'Chapter updated successfully!',
      data: {
        chapter,
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

exports.deleteChapter = async (req, res, next) => {
  //check validation
  const error = validationError(req);
  if (error) return next(error);

  const chapterId = req.body.id;

  try {
    //check auth user
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

    //check chapter info
    const chapter = await Chapter.findById(chapterId);

    if (!chapter) {
      const error = new Error('Chapter not found!');
      error.statusCode = 404;

      throw error;
    }

    //check chapter's authorization
    const course = await Course.findById(chapter.courseId);

    if (!course) {
      const error = new Error('Course not found!');
      error.statusCode = 404;

      throw error;
    }

    if (course.author.toString() !== req.userId.toString()) {
      const error = new Error(
        'You do not have permission to do this action! This course is not your.'
      );
      error.statusCode = 403;

      throw error;
    }

    //delete chapter
    await Chapter.findByIdAndDelete(chapterId);

    //remove chapter from course
    course.chapters.pull(chapter._id);
    await course.save();

    //send response
    res.status(200).json({
      message: 'Chapter deleted successfully!',
      success: true,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};
