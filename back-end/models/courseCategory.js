const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
    default: 1,
  },
  discount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('CourseCategory', courseCategorySchema);
