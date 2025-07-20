const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  company: String,
  employeeType: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  hearAbout: String,
  message: String,
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Submission', submissionSchema);
