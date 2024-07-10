const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const auth = require('../middleware/auth');

router.post('/', auth.authenticate, async (req, res) => {
  const { text, activity_id } = req.body;
  const comment = new Comment({ text, activity_id });
  await comment.save();
  res.send({ message: 'Comment created successfully' });
});

router.get('/', auth.authenticate, async (req, res) => {
  const comments = await Comment.find().populate('activity_id');
  res.send(comments);
});