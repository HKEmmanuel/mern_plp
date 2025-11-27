const mongoose = require('mongoose');

const tutorProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject']
  },
  level: {
    type: String,
    required: [true, 'Please add a level']
  },
  rate: {
    type: String,
    required: [true, 'Please add a rate (e.g. 20€/h)']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  photo: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  availability: {
    type: [String],
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  reviewsCount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('TutorProfile', tutorProfileSchema);
