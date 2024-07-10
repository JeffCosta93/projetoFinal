const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: String,
  description: String,
  resources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', activitySchema);