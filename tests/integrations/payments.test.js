const request = require('supertest');

describe('/payment', () => {
  let server;
  
  beforeAll(() => {
    server = require('../../server');
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

  describe.only('GET /:contractId', async () => {
    it('Get payments items for specific contract ID', async () => {
      const result = await request(server).get('/payments/1')
        .query({ startDate: '2019-02-13', endDate: '2019-02-15' });
      
      expect(result.status).toBe(200);
      expect(result.body.results).toHaveProperty('sum');
      expect(result.body.results).toHaveProperty('items');
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
      expect(result.body.message).toEqual('Payment item added');
    });
  });

  describe('POST /', () => {

    const date = new Date();
    let paymentItem = {
      contractId: 1,
      description: 'Rent payment',
      value: 1000,
      isImported: false,
      createdAt: date,
      updatedAt: date,
      isDeleted: false
    };
    
    const postRequest = (params) => {
      return request(server)
        .post('/payments')
        .send(params);
    };
  
    it('should return 400 if body data is missing', async () => {
      const res = await postRequest();
      expect(res.status).toBe(400);
    });
  
  
    it('should return 422 if required data is missing', async () => {
      const result = await postRequest(paymentItem);
      expect(result.status).toBe(422);
    });
    
    it('Create payment successfully', async () => {
      paymentItem['time'] = date;
      const result = await postRequest(paymentItem);
      expect(result.status).toBe(200);
      expect(result.body.message).toEqual('Payment item added');
    });
  });

  describe('PUT /:id', () => {
    const date = new Date();
    const paymentUpdateItem = {
      value: '444',
      time: date,
      isImported: true,
      createdAt: date,
      updatedAt: date,
      isDeleted: true
    };
    
    const putRequest = (params) => {
      return request(server)
        .put('/payments/2')
        .send(params);
    };
  
    it('should return 400 if body data is missing', async () => {
      const res = await putRequest();
      expect(res.status).toBe(400);
    });
  
    it('should return 422 if data format is is valid', async () => {
      const result = await putRequest(paymentUpdateItem);
      expect(result.status).toBe(422);
    });
    
    it('Update payment successfully', async () => {
      paymentUpdateItem['value'] = 111;
      const result = await putRequest(paymentUpdateItem);
      expect(result.status).toBe(200);
      expect(result.body.message).toEqual('Payment item updated');
    });
  });
  
});

