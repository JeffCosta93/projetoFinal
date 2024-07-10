const express = require('express');
const router = express.Router();
const Activity = require('../models/activity');
const auth = require('../middleware/auth');

router.post('/', auth.authenticate, async (req, res) => {
  const { name, description, resources } = req.body;
  const activity = new Activity({ name, description, resources });
  await activity.save();
  res.send({ message: 'Activity created successfully' });
});

router.get('/:id', auth.authenticate, async (req, res) => {
  const id = req.params.id;
  const activity = await Activity.findById(id).populate('resources');
  if (!activity) return res.status(404).send({ message: 'Activity not found' });
  res.send(activity);
});

router.put('/:id', auth.authenticate, async (req, res) => {
    const id = req.params.id;
    const { name, description, resource_id } = req.body;
    const activity = await Activity.findByIdAndUpdate(id, { name, description, resource_id }, { new: true });
    if (!activity) return res.status(404).send({ message: 'Activity not found' });
    res.send(activity);
  });
  
  router.delete('/:id', auth.authenticate, async (req, res) => {
    const id = req.params.id;
    await Activity.findByIdAndRemove(id);
    res.send({ message: 'Activity deleted successfully' });
  });

  