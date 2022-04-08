require('dotenv').config();

const { expect } = require('chai');
const sinon = require('sinon');

const { 
  products,
  product } = require('../stubs');

const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/produtsModel');

describe('Testa a camada Model de produtos', () => {
  describe('Ao fazer uma requisição ao endpoint /products', () => { 
    before(() => {
      sinon.stub(connection, 'execute').resolves(products);
    });

    after(() => {
      connection.execute.restore();
    });
  
    it('retorna um array', async () => {
      const result = await ProductsModel.getAll();

      expect(result).to.be.a('array');
      expect(result.length).to.be.equal(3);
    });

    it('o array deve conter todos os produtos', async () => {
      const result = await ProductsModel.getAll();
      
      expect(result).to.be.deep.equal(products[0]);
    });
  });

  describe('Ao fazer uma requisição ao endpoint /products/:id', () => {
    describe('caso um produto seja encontrado', () => {

      const ID = 1;

      before(() => {
        sinon.stub(connection, 'execute').resolves(product);
      });
  
      after(() => {
        connection.execute.restore();
      });

      it('retorna um array com apenas um objeto', async () => {
        const result = await ProductsModel.findById(ID);

        expect(result.length).to.be.equal(1)
        expect(result[0]).to.be.a('object');
      });

      it('o objeto tem as propriedades "id", "name" e "quantity"', async () => {
        const result = await ProductsModel.findById(ID);

        expect(result[0]).to.have.a.property('id');
        expect(result[0]).to.have.a.property('name');
        expect(result[0]).to.have.a.property('quantity');
      });
    });

    describe('caso nenhum produto seja encontrado', () => { 

      before(() => {
        sinon.stub(connection, 'execute').resolves([[]]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('retorna "null"', async () =>{
        const result = await ProductsModel.findById(100);

        expect(result).to.be.equal(null);
      });
    });
  });
});
