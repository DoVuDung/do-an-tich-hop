const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');

const Schema = mongoose.Schema;

mongoose.plugin(slug);

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      // required: true,
    },
    slug: {
      type: String,
      slug: 'title',
      unique: true,
      slugPaddingSize: 3,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    topic: {
      type: Schema.Types.ObjectId,
      ref: 'Topic',
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
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
    //0: inactive, 1: active, 20: draft
    status: {
      type: Number,
      required: true,
      default: 20,
    },

    learnersDetail: [{ type: Schema.Types.ObjectId, ref: 'CourseDetail' }],
    streams: [{ type: Schema.Types.ObjectId, ref: 'Stream' }],
    feedbacks: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }],
    chapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
