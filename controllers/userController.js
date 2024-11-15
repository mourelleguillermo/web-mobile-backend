const { User } = require('../models');

exports.createUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = await User.create({ username, password, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};
