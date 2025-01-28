const express = require('express');
const router = express.Router();
const { getApplicants, approveApplicant, rejectApplicant } = require('../controllers/applicantController');

router.get('/', getApplicants);
router.post('/:id/approve', approveApplicant);
router.post('/:id/reject', rejectApplicant);

module.exports = router;