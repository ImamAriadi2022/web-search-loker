CREATE TABLE jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  location VARCHAR(255),
  province VARCHAR(255),
  job_type VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255),
  personal_data TEXT,
  job_type VARCHAR(255),
  photo_url VARCHAR(255),
  social_media VARCHAR(255),
  portfolio_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE applicants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255),
  profession VARCHAR(255),
  portfolio VARCHAR(255),
  social_media VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);