CREATE DATABASE jobportal;

USE jobportal;

CREATE TABLE jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  portfolio VARCHAR(255),
  image VARCHAR(255)
);

CREATE TABLE applicants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(255) NOT NULL,
  profession VARCHAR(255) NOT NULL,
  portfolio VARCHAR(255),
  socialMedia VARCHAR(255)
);