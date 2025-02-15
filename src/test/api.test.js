const request = require('supertest');
const { expect } = require('chai');
const { sequelize, Item } = require('../models');
const app = require('../server'); // Adjust the path based on your project structure

describe('API Tests', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  it('should create a new item', (done) => {
    request(app)
      .post('/items')
      .send({ name: 'Test Item', quantity: 10 })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('name', 'Test Item');
        expect(res.body).to.have.property('quantity', 10);
        done();
      });
  });

  it('should get all items', (done) => {
    request(app)
      .get('/items')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should update an item', (done) => {
    Item.create({ name: 'Old Item', quantity: 5 }).then((item) => {
      request(app)
        .put(`/items/${item.id}`)
        .send({ name: 'Updated Item', quantity: 15 })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('name', 'Updated Item');
          expect(res.body).to.have.property('quantity', 15);
          done();
        });
    });
  });

  it('should delete an item', (done) => {
    Item.create({ name: 'Item to Delete', quantity: 1 }).then((item) => {
      request(app)
        .delete(`/items/${item.id}`)
        .expect(204)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });
});
