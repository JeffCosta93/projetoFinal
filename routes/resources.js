const express = require('express');
const router = express.Router();
const Resource = require('../models/resource');
const auth = require('../middleware/auth');

router.post('/', auth.authenticate, upload.single('file'), async (req, res) => {
  const { name, description, categories } = req.body;
  const file = req.file;
  const resource = new Resource({ name, description, categories, file });
  await resource.save();
  res.send({ message: 'Resource created successfully' });
});

router.get('/:id/file', auth.authenticate, async (req, res) => {
  const id = req.params.id;
  const resource = await Resource.findById(id);
  if (!resource) return res.status(404).send({ message: 'Resource not found' });
  res.set('Content-Disposition', `attachment; filename="${resource.name}"`);
  res.set('Content-Type', 'application/octet-stream');
  res.send(resource.file);
});

router.put('/:id', auth.authenticate, async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;
  const resource = await Resource.findByIdAndUpdate(id, { name, description }, { new: true });
  if (!resource) return res.status(404).send({ message: 'Resource not found' });
  res.send(resource);
});

router.delete('/:id', auth.authenticate, async (req, res) => {
  const id = req.params.id;
  await Resource.findByIdAndRemove(id);
  res.send({ message: 'Resource deleted successfully' });
});