const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseDetailSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    testResults: [
      {
        chapterId: {
          type: Schema.Types.ObjectId,
          ref: 'Chapter',
        },
        results: [
          {
            index: {
              type: Number,
              required: true,
            },
            isPassed: {
              type: Boolean,
              required: true,
            },
          },
        ],
      },
    ],
    certificate: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CourseDetail', courseDetailSchema);
