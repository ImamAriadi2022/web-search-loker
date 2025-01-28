const express = require('express');
const { getJobs, createJob } = require('../controllers/jobController');
const router = express.Router();

router.get('/', getJobs);
router.post('/', createJob); // Admin only

module.exports = router;
