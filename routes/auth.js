const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  const user = new User({ email, password, role });
  await user.save();
  res.send({ message: 'User created successfully' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send({ message: 'Invalid email or password' });
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).send({ message: 'Invalid email or password' });
  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
  res.send({ token });
});

router.get('/me', auth.authenticate, async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.send(user);
});