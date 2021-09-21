const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatBotSchema = new Schema({
  answers: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  type: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('ChatBot', chatBotSchema, 'chatBot');
