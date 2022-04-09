const sinon = require('sinon');
const { expect } = require('chai');

const { sales, salesById } = require('../stubs');
const SalesModel = require('../../../models/salesModel');
const SalesService = require('../../../services/salesService');

describe('Testa a camada Services de sales', () => {
  describe('Ao acessar todos as vendas', () => {

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

  describe('Ao acessar uma venda pelo id', () => {

    describe('caso existam vendas com o id passado', () => {
      const ID = 1;

      before(() => {
        sinon.stub(SalesModel, 'findById').resolves(salesById[0]);
      });

      after(() => {
        SalesModel.findById.restore();
      });

      it('retorna um array com todas as vendas', async () => {
        const result = await SalesService.findById(ID);

        expect(result).to.be.a('array');
        expect(result).to.be.deep.equal(salesById[0])
      });
    });

    describe('caso não existam vendas', () => {

      const ID = 100;
      const ERROR = {
        error: {
          code: 'Not Found',
          message: 'Sale not found',
        },
      };

      before(() => {
        sinon.stub(SalesModel, 'findById').resolves(null);
      });

      after(() => {
        SalesModel.findById.restore();
      });

      it('retorna um objeto de erro', async () => {
        const result = await SalesService.findById(ID);

        expect(result).to.be.a('object');
        expect(result).to.be.deep.equal(ERROR);
      });
    });
  });

  describe('Ao cadastrar uma nova venda', () => {

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
      sinon.stub(SalesModel, 'create').resolves(SALE);
    });

    after(() => {
      SalesModel.create.restore();
    })

    it('retorna um objeto com todas as informações da venda', async () => {
      const result = await SalesService.create(PRODUCTS);

      expect(result).to.be.a('object');
      expect(result).to.be.deep.equal(SALE);
    });
  });
});
