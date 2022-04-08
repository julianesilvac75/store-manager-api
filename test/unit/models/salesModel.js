require('dotenv').config();

const { expect } = require('chai');
const sinon = require('sinon');

const { sales } = require('../stubs');

const connection = require('../../../models/connection');
const SalesModel = require('../../../models/salesModel');

describe('Testa a camada Model de sales', () => {
  describe('Ao fazer uma requisição ao endpoint /sales', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves(sales);
    });

    after(() => {
      connection.execute.restore();
    })

    it('retorna um array', async () => {
      const result = await SalesModel.getAll();

      expect(result).to.be.a('array');
      expect(result.length).to.be.equal(3);
    });

    it('o array deve conter todas as vendas', async () => {
      const result = await SalesModel.getAll();

      expect(result).to.be.deep.equal(sales[0]);
    });
  });
});
