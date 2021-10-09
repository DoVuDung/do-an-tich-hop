const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

const Schema = mongoose.Schema;

mongoose.plugin(slug);

const courseCategorySchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  slug: {
    type: String,
    slug: 'title',
    unique: true,
    slugPaddingSize: 3,
  },
  topics: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Topic',
    },
  ],
  //0: inactive, 1: active
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

module.exports = mongoose.model(
  'CourseCategory',
  courseCategorySchema,
  'courseCategories'
);
