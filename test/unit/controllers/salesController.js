const sinon = require('sinon');
const { expect } = require('chai');

const { HTTP_OK_STATUS } = require('../../../helpers');
const { sales } = require('../stubs');
const SalesService = require('../../../services/salesService');
const SalesController = require('../../../controllers/salesController');

describe('Testa a camada Controller de sales', () => {
  const response = {};
  const request = { params: { id: 1 }};

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);
  });

  describe('Ao fazer uma requisição ao endpoint /sales', () => {

    before(() => {
      sinon.stub(SalesService, 'getAll').returns(sales[0]);
    });

    after(() => {
      SalesService.getAll.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await SalesController.getAll(request, response);

      expect(response.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
    });

    it('é chamado o json com todas as vendas', async () => {
      await SalesController.getAll(request, response);

      expect(response.json.calledWith(sales[0])).to.be.equal(true);
    });
  });
});