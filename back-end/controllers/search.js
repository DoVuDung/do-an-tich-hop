const Course = require('../models/course');
const CourseCategory = require('../models/courseCategory');
const Topic = require('../models/topic');

//public
//this search api will accept search string {searchString}
//if {searchString} is empty => not return anything
//1st: if {searchString} match category => return courses by category
//2nd: if {searchString} match topic => return courses by topic
//3rd: => courses include {searchString}
exports.searchMain = async (req, res, next) => {
  const searchString = req.query.s?.trim();

  const currentPage = +req.query.page || 1;
  let coursePerPage = +req.query.count || null;

  try {
    if (!searchString) {
      const error = new Error('Search string is required!');
      error.status = 422;

      throw error;
    }

    //1st: if {searchString} match category => return courses by category
    const category = await CourseCategory.findOne(
      {
        title: searchString,
      },
      ['-topics']
    ).collation({ locale: 'en', strength: 2 });
    //use collation for: Ex: find({title: 'new york'})
    //=> This will return title named "new york", "New York", "New york", etc.

    if (category) {
      const topics = await Topic.find({
        courseCategoryId: category._id,
      }).populate({
        path: 'courses',
        select: ['-learnersDetail'],
        populate: [
          {
            path: 'author',
            select: ['firstName', 'lastName', 'description', 'socialLinks'],
          },
          {
            path: 'topic',
            select: ['title', 'discountPercent', 'slug'],
          },
        ],
      });

      if (!topics) {
        const error = new Error('Category has no course!');
        error.statusCode = 404;

        throw error;
      }

      const courses = [];
      topics.forEach((topic) => courses.push(...topic.courses));

      if (!coursePerPage) {
        coursePerPage = courses.length;
      }

      res.status(200).json({
        message: 'Fetch courses by category successfully!',
        data: {
          searchString,
          category,
          //pagination here
          courses: courses
            .reverse()
            .slice(
              (currentPage - 1) * coursePerPage,
              (currentPage - 1) * coursePerPage + coursePerPage
            ),
          totalCourses: courses.length,
        },
        success: true,
      });
    }

    //2nd: if {searchString} match topic => return courses by topic
    const topic = await Topic.findOne({
      title: searchString,
    })
      .collation({ locale: 'en', strength: 2 })
      .populate({
        path: 'courses',
        select: ['-learnersDetail'],
        populate: [
          {
            path: 'author',
            select: ['firstName', 'lastName', 'description', 'socialLinks'],
          },
          {
            path: 'topic',
            select: ['title', 'discountPercent', 'slug'],
          },
        ],
      });

    if (topic) {
      if (!coursePerPage) {
        coursePerPage = topic.courses.length;
      }

      res.status(200).json({
        message: 'Fetch courses by topic successfully!',
        data: {
          topic: {
            searchString,
            ...topic._doc,
            //pagination here
            courses: topic.courses
              .reverse()
              .slice(
                (currentPage - 1) * coursePerPage,
                (currentPage - 1) * coursePerPage + coursePerPage
              ),
            totalCourses: topic.courses.length,
          },
        },
        success: true,
      });
    }

    //3rd: => courses include {searchString}
    const courses = await Course.find({
      title: new RegExp(searchString, 'i'),
    })
      .populate([
        {
          path: 'author',
          select: ['firstName', 'lastName', 'description', 'socialLinks'],
        },
        {
          path: 'topic',
          select: ['title', 'discountPercent', 'slug'],
        },
      ])
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * coursePerPage)
      .limit(coursePerPage);

    res.status(200).json({
      searchString,
      courses,
      totalCourses: courses.length,
      success: true,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }

    next(error);
  }
};
