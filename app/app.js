const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const resourceRoutes = require('./routes/resources');

mongoose.connect('mongodb://localhost/wayne-industries', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});