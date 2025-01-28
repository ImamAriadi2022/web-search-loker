const db = require('../config/db');

const createJobTable = async () => {
  try {
    const connection = await db();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        province VARCHAR(255) NOT NULL,
        job_type VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Jobs table created successfully');
  } catch (error) {
    console.error('Error creating jobs table:', error);
  }
};

const getJobs = async () => {
  const connection = await db();
  const [rows] = await connection.query('SELECT * FROM jobs');
  return rows;
};

const createJob = async (job) => {
  const connection = await db();
  const { title, location, province, job_type, description } = job;
  const [result] = await connection.query(
    'INSERT INTO jobs (title, location, province, job_type, description) VALUES (?, ?, ?, ?, ?)',
    [title, location, province, job_type, description]
  );
  return result.insertId;
};

module.exports = {
  createJobTable,
  getJobs,
  createJob,
};