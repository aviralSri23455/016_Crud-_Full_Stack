const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/mern-crud', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    address: String,
    password: String  // Add this line
  });

const User = mongoose.model('User', UserSchema);

// Create
app.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

// Read
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Update
app.put('/api/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

// Delete
app.delete('/api/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));