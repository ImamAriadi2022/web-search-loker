const db = require('../config/db');

const createApplicantTable = async () => {
  try {
    const connection = await db();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS applicants (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        profession VARCHAR(255) NOT NULL,
        portfolio VARCHAR(255),
        social_media VARCHAR(255),
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Applicants table created successfully');
  } catch (error) {
    console.error('Error creating applicants table:', error);
  }
};

const getApplicants = async () => {
  const connection = await db();
  const [rows] = await connection.query('SELECT * FROM applicants');
  return rows;
};

const createApplicant = async (applicant) => {
  const connection = await db();
  const { full_name, profession, portfolio, social_media, status } = applicant;
  const [result] = await connection.query(
    'INSERT INTO applicants (full_name, profession, portfolio, social_media, status) VALUES (?, ?, ?, ?, ?)',
    [full_name, profession, portfolio, social_media, status]
  );
  return result.insertId;
};

module.exports = {
  createApplicantTable,
  getApplicants,
  createApplicant,
};