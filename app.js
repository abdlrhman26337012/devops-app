const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL || 'mongodb://mongo:27017/mydb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

const Item = mongoose.model('Item', { name: String });

app.get('/', (req, res) => res.json({ message: 'Hello from DevOps App!', status: 'running' }));
app.post('/items', async (req, res) => {
  const item = await Item.create({ name: req.body.name });
  res.json(item);
});
app.get('/items', async (req, res) => {
  res.json(await Item.find());
});

app.listen(3000, () => console.log('App running on port 3000'));
