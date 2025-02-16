const request = require('supertest');
const app = require('../server');
const { Item } = require('../models');
// const port = 3000;

jest.mock('../models');

describe('API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /items should return all items', async () => {
    const items = [{ id: 1, quantity: 1, name: 'Item 1' }, { id: 2, quantity: 2, name: 'Item 2' }];
    Item.findAll.mockResolvedValue(items);

    const res = await request(app).get('/items');
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(items);
  });

  test('POST /items should create a new item', async () => {
    const newItem = { id: 1, quantity: 10, name: 'New Item' };
    Item.create.mockResolvedValue(newItem);

    const res = await request(app).post('/items').send({ quantity: 10, name: 'New Item' });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(newItem);
  });

  test('PUT /items/:id should update an item', async () => {
    const updatedItem = { id: 1, quantity: 20, name: 'Updated Item' };
    Item.update.mockResolvedValue([1]);
    Item.findByPk.mockResolvedValue(updatedItem);

    const res = await request(app).put('/items/1').send({ quantity: 20, name: 'Updated Item' });
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(updatedItem);
  });

  test('DELETE /items/:id should delete an item', async () => {
    Item.destroy.mockResolvedValue(1);

    const res = await request(app).delete('/items/1');
    
    expect(res.statusCode).toBe(204);
  });
});

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
