const sinon = require('sinon');
const { expect } = require('chai');

const { products, product } = require('../stubs');
const ProductsModel = require('../../../models/produtsModel');
const ProductsService = require('../../../services/productsService');

describe('Testa a camada Services de produtos', () => {

  describe('Ao acessar todos os produtos', () => {
    
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

    describe('Ao criar um novo produto', () => {

      describe('se o produto ainda não existe', () => {
        const NEW_PRODUCT = {
          id: 1,
          name: 'novíssimo',
          quantity: 10
        };

        before(() => {
          sinon.stub(ProductsModel, 'findByName').resolves(null);
          sinon.stub(ProductsModel, 'create').resolves(NEW_PRODUCT);
        });

        after(() => {
          ProductsModel.findByName.restore();
          ProductsModel.create.restore();
        })
        
        it('retorna um objeto com o produto criado', async () => {
          const result = await ProductsService.create({ name: 'novo produto', quantity: 10 });

          expect(result).to.be.a('object');
          expect(result).to.be.deep.equal(NEW_PRODUCT);
        });
      });

      describe('se o produto já existe', () => {
        const ERROR = {
          error: {
            code: 'Conflict',
            message: 'Product already exists',
          },
        };
        
        before(() => {
          sinon.stub(ProductsModel, 'findByName').resolves(true);
        });

        after(() => {
          ProductsModel.findByName.restore();
        });

        it('retorna um objeto de erro', async () => {
          const result = await ProductsService.create({ name: 'novíssimo', quantity: 5 });

          expect(result).to.be.deep.equal(ERROR);
        });
      })
    });

  });

  describe('Ao acessar um produto pelo id', () => { 
     
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

  describe('Ao atualizar as informações de um produto', () => {
    const UPDATED = {
      id: 1,
      name: 'ave maria',
      quantity: 15
    };

    describe('caso o produto seja atualizado com sucesso', () => {

      it('retorna um objeto com o produto atualizado', async () => {
        const result = await ProductsService.update(UPDATED);

        expect(result).to.be.a('object');
        expect(result).to.be.deep.equal(UPDATED);
      });
    });

    describe('caso o id informado não corresponda a nenhum produto', () => {
      const ERROR = {
        error: {
          code: 'Not Found',
          message: 'Product not found',
        },
      };

      it('retorna um objeto com a mensagem de erro', async () => {
        const result = await ProductsService.update(UPDATED);

        expect(result).to.be.deep.equal(ERROR);
      });
    });
  });
});
