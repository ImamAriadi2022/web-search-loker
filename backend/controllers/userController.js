const { User } = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { full_name, personal_data, job_type, photo_url, social_media, portfolio_url } = req.body;
    const user = await User.create({ full_name, personal_data, job_type, photo_url, social_media, portfolio_url });
    res.status(201).json({ message: 'User created', id: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};