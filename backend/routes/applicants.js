const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Get all applicants
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM applicants');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Approve an applicant
router.post('/:id/approve', async (req, res) => {
  try {
    await db.query('DELETE FROM applicants WHERE id = ?', [req.params.id]);
    res.json({ message: 'Applicant approved' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reject an applicant
router.post('/:id/reject', async (req, res) => {
  try {
    await db.query('DELETE FROM applicants WHERE id = ?', [req.params.id]);
    res.json({ message: 'Applicant rejected' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;