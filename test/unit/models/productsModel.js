require('dotenv').config();

const { expect } = require('chai');
const sinon = require('sinon');

const { products } = require('../data');

const ProductsModel = require('../../../models/produtsModel');

describe('Para o endpoint "/products"', () => {
  describe('caso a requisição tenha sucesso', () => { 
    before(() => {
      sinon.stub(ProductsModel, 'getAll').resolves(products);
    });

    after(() => {
      ProductsModel.getAll.restore();
    });
  
    it('retorna um array', async () => {
      const result = await ProductsModel.getAll();

      expect(result).to.be.a('array');
      expect(result.length).to.be.equal(3);
    });

    it('o array deve conter todos os produtos', async () => {
      const result = await ProductsModel.getAll();
      
      expect(result).to.be.equal(products);
    })
  });
});
