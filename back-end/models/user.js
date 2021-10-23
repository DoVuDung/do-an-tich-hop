const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: false,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    socialLinks: {
      facebook: {
        type: String,
        trim: true,
      },
      instagram: {
        type: String,
        trim: true,
      },
      linkedIn: {
        type: String,
        trim: true,
      },
      github: {
        type: String,
        trim: true,
      },
      twitter: {
        type: String,
        trim: true,
      },
    },
    address: {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
    },
    role: {
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
    },
    status: {
      type: Number,
      required: true,
      default: 1,
    },
    teachingCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
    learningCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'CourseDetail',
      },
    ],
    notifications: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Notification',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
