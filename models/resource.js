const mongoose = require('mongoose');
const multer = require('multer');

const resourceSchema = new mongoose.Schema({
  name: String,
  description: String,
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  file: { type: Buffer, required: true }
});

const upload = multer({ dest: './uploads/' });

module.exports = mongoose.model('Resource', resourceSchema);