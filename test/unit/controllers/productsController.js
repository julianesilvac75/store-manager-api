const sinon = require('sinon');
const { expect } = require('chai');

const { HTTP_OK_STATUS } = require('../../../helpers');
const { products } = require('../stubs');
const ProductsServices = require('../../../services/productsService');
const ProductsController = require('../../../controllers/productsController');

describe('Testa a camada controller de produtos', () => {
  const request = {};
  const response = {};

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);
  });

  describe('Ao fazer uma requisição ao endpoint /products', () => {

    before(() => {
      sinon.stub(ProductsServices, 'getAll').resolves(products);
    });

    after(() => {
      ProductsServices.getAll.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await ProductsController.getAll(request, response);

      expect(response.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
    });

    it('é chamado o json com todos os produtos', async () => {
      await ProductsController.getAll(request, response);

      expect(response.json.calledWith(products)).to.be.equal(true);
    });
  });
});
