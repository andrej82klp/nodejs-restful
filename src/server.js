const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Item } = require('./models');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/items', async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

app.post('/items', async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create item' });
  }
});

app.put('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Item.update(req.body, { where: { id } });
    if (updatedItem[0]) {
      const item = await Item.findByPk(id);
      res.json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update item' });
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Item.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
