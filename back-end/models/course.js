const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
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
  price: {
    type: Number,
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
    default: 1,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'CourseCategory',
    required: true,
  },
  streams: [{ type: Schema.Types.ObjectId, ref: 'Stream' }],
  feedbacks: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }],
  chapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }],
});

module.exports = mongoose.model('Course', courseSchema);
