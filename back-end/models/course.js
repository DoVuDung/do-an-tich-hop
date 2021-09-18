const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    detail: {
      about: [
        {
          type: String,
          required: true,
        },
      ],
      tags: [
        {
          type: String,
          trim: true,
        },
      ],
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: Number,
      required: true,
      default: 20,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'CourseCategory',
      required: true,
    },
    learnersDetail: [{ type: Schema.Types.ObjectId, ref: 'CourseDetail' }],
    streams: [{ type: Schema.Types.ObjectId, ref: 'Stream' }],
    feedbacks: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }],
    chapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
