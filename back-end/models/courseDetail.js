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
      //0: failed, 1: success, 2: pending
      status: {
        type: Number,
        required: true,
        default: 1,
      },
      //total payment
      price: {
        type: Number,
        required: true,
      },
      //*** */currently using dummy data here
      //1 (visa), 2 (momo), 3(Techcombank),...
      brandId: {
        type: Number,
        required: true,
        default: 1,
      },
      //1 (card),...
      methodId: {
        type: Number,
        required: true,
        default: 1,
      },
      //invoice id receive from succeed payment
      invoiceId: {
        type: String,
        required: true,
      },
      //* ***/
      //save discount value from category and topic discountPercent
      discount: {
        type: Number,
        required: true,
        default: 0,
      },
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
