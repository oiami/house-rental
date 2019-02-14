const request = require('supertest');

let server;

describe('/payment', () => {
  beforeEach(() => { server = require('../index'); });
  afterEach(() => { server.close(); });

  describe('GET /', () => {
    it('Get proper response', async () => {
      const result = await request(server).get('/payments');
      expect(result.status).toBe(200);
      expect(result.text).toEqual('Here is Get Payments');
    });
  });
});
