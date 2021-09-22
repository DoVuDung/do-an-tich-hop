const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

const Schema = mongoose.Schema;

mongoose.plugin(slug);

const topicSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  slug: {
    type: String,
    slug: 'title',
    unique: true,
    slugPaddingSize: 3,
  },
  courseCategoryId: {
    type: Schema.Types.ObjectId,
    ref: 'CourseCategory',
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
  status: {
    type: Number,
    required: true,
    default: 1,
  },
  discountPercent: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Topic', topicSchema);
