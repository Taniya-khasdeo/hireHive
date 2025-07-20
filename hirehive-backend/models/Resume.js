const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: String,
  path: String,
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Resume', resumeSchema);
