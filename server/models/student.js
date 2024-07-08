const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  genre: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other'],
  },
});

module.exports = mongoose.model('Student', StudentSchema);
