const sinon = require('sinon');
const { expect } = require('chai');

const { HTTP_OK_STATUS, HTTP_NOT_FOUND_STATUS, HTTP_CREATED_STATUS } = require('../../../helpers');
const { sales, salesById } = require('../stubs');
const SalesService = require('../../../services/salesService');
const SalesController = require('../../../controllers/salesController');

describe('Testa a camada Controller de sales', () => {
  const response = {};
  const request = { params: { id: 1 }};

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);
  });

  describe('Ao acessar todas as vendas', () => {

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

  describe('Ao acessar uma venda pelo id', () => {
    describe('Caso existam vendas com o id passado', () => {

      before(() => {
        sinon.stub(SalesService, 'findById').resolves(salesById[0]);
      });

      after(() => {
        SalesService.findById.restore();
      });

      it('é chamado o status com o código 200', async () => {
        await SalesController.findById(request, response);

        expect(response.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
      });

      it('é chamado o json com todas as informações sobre a venda', async () => {
        await SalesController.findById(request, response);
        
        expect(response.json.calledWith(salesById[0])).to.be.equal(true);
      });
    });

    describe('Caso não exista nenhuma venda', () => {
      const ERROR = {
        error: {
          code: 'Not Found',
          message: 'Sale not found',
        },
      };

      before(() => {
        sinon.stub(SalesService, 'findById').resolves(ERROR);
      });

      after(() => {
        SalesService.findById.restore();
      });

      it('é chamado o status com o código 404', async () => {
        request.params.id = 100;

        await SalesController.findById(request, response);

        expect(response.status.calledWith(HTTP_NOT_FOUND_STATUS)).to.be.equal(true);
      });

      it('é chamado com o json com a mensagem de erro', async () => {
        await SalesController.findById(request, response);

        expect(response.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
      });
    });
  });

  describe('Ao criar uma nova venda', () => {

    const PRODUCTS = [
      {
        "productId": 1,
        "quantity": 2
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ];

    const SALE = {
      id: 1,
      itemsSold: PRODUCTS,
    };

    before(() => {
      request.body = PRODUCTS;

      sinon.stub(SalesService, 'create').resolves(SALE);
    });

    after(() => {
      SalesService.create.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await SalesController.create(request, response);

      expect(response.status.calledWith(HTTP_CREATED_STATUS)).to.be.equal(true);
    });

    it('é chamado o json com as informações sobre a venda', async () => {
      await SalesController.create(request, response);

      expect(response.json.calledWith(SALE)).to.be.equal(true);
    });
  });
});