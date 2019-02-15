const util = require('../../utils/calc');

describe('util function', () => {
  describe('calculate', () => {
    it('should return correct sum value', () => {
      const data = [{
        contractId: 1,
        id: 3,
        value: "1000"
      },
      {
        contractId: 1,
        id: 4,
        value: "-820"
      }];
      const sum = util.sumValue(data, 'value');
      expect(sum).toBe(180);
    });
  });
});
