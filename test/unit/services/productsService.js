const sinon = require('sinon');
const { expect } = require('chai');

const { products, product } = require('../stubs');
const ProductsModel = require('../../../models/produtsModel');
const ProductsService = require('../../../services/productsService');

describe('Testa a camada Services de produtos', () => {

  describe('Ao fazer uma requisição ao endpoint /products', () => {
    
    before(() => {
      sinon.stub(ProductsModel, 'getAll').resolves(products[0]);
    });
  
    after(() => {
      ProductsModel.getAll.restore();
    });
  
    it('retorna todos os dados de produtos', async () => {
      const result = await ProductsService.getAll();
  
      expect(result).to.be.deep.equal(products[0])
    });

  });

  describe('Ao fazer uma requisição ao endpoint /products/:id', () => { 
     
    describe('caso exista um produto com o id passado', () => {

      const ID = 1;

      before(() => {
        sinon.stub(ProductsModel, 'findById').resolves(product[0]);
      });

      after(() => {
        ProductsModel.findById.restore();
      })

      it('retorna um array com o produto esperado', async () => {
        const result = await ProductsService.findById(ID);

        expect(result).to.be.a('array');
        expect(result).to.be.deep.equal(product[0]);
      });
    });

    describe('caso não exista um produto', () => {

      const ID = 100;
      const error = {
        error: {
          code: 'Not Found',
          message: 'Product not found',
        },
      };

      before(() => {
        sinon.stub(ProductsModel, 'findById').resolves(null);
      });

      after(() => {
        ProductsModel.findById.restore();
      })

      it('retorna um objeto de erro', async () => {
        const result = await ProductsService.findById(ID);

        expect(result).to.be.deep.equal(error);
      });

    });
  });
});
