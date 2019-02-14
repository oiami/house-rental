const request = require('supertest');

describe('/payment', () => {
  let server;
  
  beforeAll(() => {
    server = require('../server');
  });
  
  afterAll(() => {
    server.close();
  });
  
  describe('GET /', () => {
    it('Get proper response', async (done) => {
      const result = await request(server).get('/payments');
      expect(result.status).toBe(200);
      done();
    });
  });

  describe('POST /', () => {
    it('Create payment successfully', async () => {
      const date = new Date();
      const data = {
        contractId: 1,
        description: 'Rent payment',
        value: 1000,
        time: date,
        isImported: false,
        createdAt: date,
        updatedAt: date,
        isDeleted: false
      };
      const result = await request(server).post('/payments').send(data);
      expect(result.status).toBe(200);
      expect(result.text).toEqual('Payment item added');
    })
  });
});
