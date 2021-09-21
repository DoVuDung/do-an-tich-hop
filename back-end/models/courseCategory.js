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
  },
  topics: [
    {
      title: {
        type: String,
        required: true,
        index: true,
      },
      slug: {
        type: String,
        slug: 'title',
        unique: true,
        slugPaddingSize: 3,
      },

      courses: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Course',
        },
      ],
    },
  ],
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

module.exports = mongoose.model(
  'CourseCategory',
  courseCategorySchema,
  'courseCategories'
);
