
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const replace = require('./models/replace');

const app = express();
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.get('/api/data', async (req, res) => {
  const data = await replace.find();
  res.json(data);
});

app.post('/api/save', async (req, res) => {
  await replace.deleteMany({});
  await replace.insertMany(req.body);
  res.json({ message: 'Saved' });
});

// ✅ ลบข้อมูลเฉพาะ _id
app.delete('/api/delete/:id', async (req, res) => {
  await replace.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

app.listen(3000, () => console.log('✅ Server running at http://54.157.57.149:3000'));
