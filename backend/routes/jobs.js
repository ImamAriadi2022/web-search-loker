const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../models/db');

const upload = multer({ dest: 'uploads/' });

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM jobs');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new job
router.post('/', upload.single('image'), async (req, res) => {
  const { title, location, province, description, portfolio } = req.body;
  const image = req.file ? req.file.filename : null;
  try {
    const [result] = await db.query(
      'INSERT INTO jobs (title, location, province, description, portfolio, image) VALUES (?, ?, ?, ?, ?, ?)',
      [title, location, province, description, portfolio, image]
    );
    res.status(201).json({ id: result.insertId, title, location, province, description, portfolio, image });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all provinces
router.get('/provinces', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM provinces');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all districts
router.get('/districts', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM districts');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});