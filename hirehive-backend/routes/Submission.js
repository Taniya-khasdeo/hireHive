const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');

router.post('/', async (req, res) => {
  try {
    const newSubmission = new Submission(req.body);
    await newSubmission.save();
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit form', details: err });
  }
});

module.exports = router;
