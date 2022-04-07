const sinon = require('sinon');
const { expect } = require('chai');

const { products } = require('../data');
const ProductsModel = require('../../../models/produtsModel');
const ProductsService = require('../../../services/productsService');

describe('Para o endpoint "/products"', () => {
  before(() => {
    sinon.stub(ProductsModel, 'getAll').resolves(products);
  });

  after(() => {
    ProductsModel.getAll.restore();
  });

  it('retorna todos os dados de produtos', async () => {
    const result = await ProductsService.getAll();

    expect(result).to.be.deep.equal(products)
  });
});
