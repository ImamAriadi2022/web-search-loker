const { Applicant } = require('../models/Applicant');

exports.getApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.findAll();
    res.status(200).json(applicants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applicants' });
  }
};

exports.approveApplicant = async (req, res) => {
  try {
    const { id } = req.params;
    await Applicant.update({ status: 'approved' }, { where: { id } });
    res.status(200).json({ message: 'Applicant approved' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving applicant' });
  }
};

exports.rejectApplicant = async (req, res) => {
  try {
    const { id } = req.params;
    await Applicant.update({ status: 'rejected' }, { where: { id } });
    res.status(200).json({ message: 'Applicant rejected' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting applicant' });
  }
};