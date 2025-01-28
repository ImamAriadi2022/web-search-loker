const { getJobs, createJob } = require('../models/Job');

exports.getJobs = async (req, res) => {
  try {
    const jobs = await getJobs();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
};

exports.createJob = async (req, res) => {
  try {
    const { title, location, province, job_type, description } = req.body;
    const jobId = await createJob({ title, location, province, job_type, description });
    res.status(201).json({ message: 'Job created', id: jobId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating job' });
  }
};