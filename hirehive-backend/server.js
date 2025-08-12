const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');
const submissionRoutes = require('./routes/Submission');
const contactRoutes = require('./routes/contact');

dotenv.config();

const app = express();
// app.use(cors());
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.options('*', cors());

app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/submission', submissionRoutes);
app.use('/api/contact', contactRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// const authRoutes = require('./routes/auth');
// const resumeRoutes = require('./routes/resume');
// const submissionRoutes = require('./routes/Submission');

// dotenv.config();

// const app = express();

// // UPDATED: Configure CORS with specific origins to fix the CORS error
// app.use(cors({
//   origin: [
//     'http://localhost:3000',
//     'http://127.0.0.1:3000',
//     'http://localhost:5500',  // VS Code Live Preview default port
//     'http://127.0.0.1:5500',
//     'http://localhost:5501',  // Alternative Live Preview port
//     'http://127.0.0.1:5501'
//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));

// app.use(express.json());

// // OPTIONAL: Add debug logging to see incoming requests
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path} - Origin: ${req.headers.origin}`);
//   next();
// });

// const PORT = process.env.PORT || 3000;
// const MONGO_URI = process.env.MONGO_URI;

// // UPDATED: Remove deprecated MongoDB options
// mongoose.connect(MONGO_URI)
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB error:', err));

// app.use('/api/auth', authRoutes);
// app.use('/api/resume', resumeRoutes);
// app.use('/api/submission', submissionRoutes);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));