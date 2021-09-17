const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chapterSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  tests: [
    {
      index: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      questions: [
        {
          question: {
            type: String,
            required: true,
          },
          a: {
            type: String,
            required: true,
          },
          b: {
            type: String,
            required: true,
          },
          c: {
            type: String,
            required: true,
          },
          d: {
            type: String,
            required: true,
          },
          answer: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
  attachments: [
    {
      index: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  videos: [
    {
      index: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Chapter', chapterSchema);
