const { Comment, Post, User } = require('../models');

exports.createComment = async (req, res) => {
  const { content, postId } = req.body;
  try {
    const comment = await Comment.create({ content, postId, userId: req.user.sub });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create comment' });
  }
};
