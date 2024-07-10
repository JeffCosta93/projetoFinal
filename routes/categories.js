const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const auth = require('../middleware/auth');

router.post('/', auth.authenticate, async (req, res) => {
    const { name, description, resources } = req.body;
    const category = new Category({ name, description, resources });
    await category.save();
    res.send({ message: 'Category created successfully' });
  });
  
  router.get('/:id', auth.authenticate, async (req, res) => {
    const id = req.params.id;
    const category = await Category.findById(id).populate('resources');
    if (!category) return res.status(404).send({ message: 'Category not found' });
    res.send(category);
  });

router.put('/:id', auth.authenticate, async (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body;
    const category = await Category.findByIdAndUpdate(id, { name, description }, { new: true });
    if (!category) return res.status(404).send({ message: 'Category not found' });
    res.send(category);
  });
  
  router.delete('/:id', auth.authenticate, async (req, res) => {
    const id = req.params.id;
    await Category.findByIdAndRemove(id);
    res.send({ message: 'Category deleted successfully' });
  });