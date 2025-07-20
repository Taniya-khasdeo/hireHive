const express = require('express');
const multer = require('multer');
const Resume = require('../models/Resume');


const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Upload Resume
router.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    const resume = new Resume({
      userId: req.body.userId,
      filename: req.file.filename,
      path: req.file.path
    });
    await resume.save();
    res.status(201).json({ message: 'Resume uploaded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
