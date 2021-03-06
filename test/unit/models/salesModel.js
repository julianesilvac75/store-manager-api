require('dotenv').config();

const { expect } = require('chai');
const sinon = require('sinon');

const { sales, salesById } = require('../stubs');

const connection = require('../../../models/connection');
const SalesModel = require('../../../models/salesModel');

describe('Testa a camada Model de sales', () => {
  describe('Ao acessar todas as vendas', () => {

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

  describe('Ao acessar uma venda pelo id', () => {
    describe('caso o id passado seja encontrado', () => {
      const ID = 1;

      before(() => {
        sinon.stub(connection, 'execute').resolves(salesById);
      });

      after(() => {
        connection.execute.restore();
      });

      it('retorna um array com as vendas relacionadas ao id', async () => {
        const result = await SalesModel.findById(ID);

        expect(result).to.be.a('array');
        expect(result).to.be.deep.equal(salesById[0]);
      });

      it('as vendas tem as propriedades "date", "productId" e "quantity"', async () => {
        const result = await SalesModel.findById(ID);

        expect(result[0]).to.have.a.property('date');
        expect(result[0]).to.have.a.property('productId');
        expect(result[0]).to.have.a.property('quantity');
      });
    });

    describe('caso o id passado não seja encontrado', () => {

      const ID = 100;

      before(() => {
        sinon.stub(connection, 'execute').resolves([[]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('retorna "null"', async () => {
        const result = await SalesModel.findById(ID);

        expect(result).to.be.equal(null);
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
      const callback = sinon.stub(connection, 'execute');
      callback.onCall(0).resolves([{ insertId: 1}]);
      callback.onCall(1).resolves();
    });

    after(() => {
      connection.execute.restore();
    });
    
    it('deve retornar um objeto com as informações sobre a venda', async () => {
      const result = await SalesModel.create(PRODUCTS);
      
      expect(result).to.be.deep.equal(SALE);
    });
  });
});
