const { Post, User } = require('../models');

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await Post.create({ title, content, userId: req.user.sub });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

exports.getPosts = async (req, res) => {
  const posts = await Post.findAll({ include: User });
  res.json(posts);
};
