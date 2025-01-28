require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { createJobTable } = require('./models/Job');
const { createUserTable } = require('./models/User');
const { createApplicantTable } = require('./models/Applicant');

const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const applicantRoutes = require('./routes/applicantRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/applicants', applicantRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  const connection = await connectDB();
  await createJobTable();
  await createUserTable();
  await createApplicantTable();
});