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
    payment: {
      price: {
        type: Number,
        required: true,
      },
      type: {
        type: String,
        required: true,
        default: 'visa',
      },
      // id
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
    isDone: {
      type: Boolean,
      require: true,
      default: false,
    },
    status: {
      type: Number,
      required: true,
      default: 1,
    },
    certificate: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  'CourseDetail',
  courseDetailSchema,
  'courseDetail'
);
