const sinon = require('sinon');
const { expect } = require('chai');

const { sales } = require('../stubs');
const SalesModel = require('../../../models/salesModel');
const SalesService = require('../../../services/salesService');

describe('Testa a camada Services de sales', () => {
  describe('Ao fazer uma requisição ao endpoint /sales', () => {

    before(() => {
      sinon.stub(SalesModel, 'getAll').resolves(sales[0]);
    });

    after(() => {
      SalesModel.getAll.restore();
    });

    it('retorna todos os dados de produtos', async () => {
      const result = await SalesService.getAll();

      expect(result).to.be.deep.equal(sales[0]);
    });
  });
});
