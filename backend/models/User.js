const db = require('../config/db');

const createUserTable = async () => {
  try {
    const connection = await db();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        personal_data TEXT,
        job_type VARCHAR(255),
        photo_url VARCHAR(255),
        social_media VARCHAR(255),
        portfolio_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table created successfully');
  } catch (error) {
    console.error('Error creating users table:', error);
  }
};

const getUsers = async () => {
  const connection = await db();
  const [rows] = await connection.query('SELECT * FROM users');
  return rows;
};

const createUser = async (user) => {
  const connection = await db();
  const { full_name, email, password, personal_data, job_type, photo_url, social_media, portfolio_url } = user;
  const [result] = await connection.query(
    'INSERT INTO users (full_name, email, password, personal_data, job_type, photo_url, social_media, portfolio_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [full_name, email, password, personal_data, job_type, photo_url, social_media, portfolio_url]
  );
  return result.insertId;
};

module.exports = {
  createUserTable,
  getUsers,
  createUser,
};