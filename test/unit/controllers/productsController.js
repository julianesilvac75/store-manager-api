const sinon = require('sinon');
const { expect } = require('chai');

const { HTTP_OK_STATUS, HTTP_NOT_FOUND_STATUS } = require('../../../helpers');
const {
  products,
  product } = require('../stubs');
const ProductsServices = require('../../../services/productsService');
const ProductsController = require('../../../controllers/productsController');

describe('Testa a camada controller de produtos', () => {
  const response = {};
  const request = { params: { id: 1 }};

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

  describe('Ao fazer uma requisição ao endpoint /products/:id', () => {

    describe('Caso exista um produto com o id passado', () => {
      
      it('é chamado o status com o código 200', async () => {
        await ProductsController.findById(request, response);

        expect(response.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
      });

      it('é chamado o json com o produto', async () => {
        await ProductsController.findById(request, response);
        expect(response.json.calledWith(product[0][0])).to.be.equal(true);
      });
    });

    describe('Caso não não exista um produto', () => {
      const ERROR = { message: 'Product not found' }
      
      it('é chamado o status com o código 404', async () => {
        request.params.id = 100;

        await ProductsController.findById(request, response);

        expect(response.status.calledWith(HTTP_NOT_FOUND_STATUS)).to.be.equal(true);
      });

      it('é chamado o json com a mensagem de erro', async () => {
        await ProductsController.findById(request, response);

        expect(response.json.calledWith(ERROR)).to.be.equal(true);
      });
    });
  });
});
