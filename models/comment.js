const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: String,
  activity_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);