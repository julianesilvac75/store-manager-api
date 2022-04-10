const sinon = require('sinon');
const { expect } = require('chai');

const { HTTP_OK_STATUS, HTTP_NOT_FOUND_STATUS, HTTP_CREATED_STATUS, HTTP_CONFLICT_STATUS, HTTP_BAD_REQUEST_STATUS, HTTP_NO_CONTENT_STATUS } = require('../../../helpers');
const {
  products,
  product } = require('../stubs');
const ProductsServices = require('../../../services/productsService');
const ProductsController = require('../../../controllers/productsController');

describe('Testa a camada Controller de produtos', () => {
  const response = {};
  const request = { 
    params: { id: 1 },
    body: {
      name: 'Martelo de Thor',
      quantity: 10
    },
  };

  before(() => {
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);
    response.end = sinon.stub().returns();
  });

  describe('Ao acessar todos os produtos', () => {

    before(() => {
      sinon.stub(ProductsServices, 'getAll').resolves(products[0]);
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

      expect(response.json.calledWith(products[0])).to.be.equal(true);
    });
  });

  describe('Ao criar um novo produto', () => {
    describe('caso o produto ainda não exista', () => {

      before(() => {
        sinon.stub(ProductsServices, 'create').resolves(product[0][0]);
      });

      after(() => {
        ProductsServices.create.restore();
      });

      it('é chamado o status com o código 201', async () => {
        await ProductsController.create(request, response);

        expect(response.status.calledWith(HTTP_CREATED_STATUS)).to.be.equal(true);
      });

      it('é chamado o json com o novo produto', async () => {
        await ProductsController.create(request, response);
        
        expect(response.json.calledWith(product[0][0])).to.be.equal(true);
      });
    });

    describe('caso o produto já exista', () => {
      const ERROR = {
        error: {
          code: 'Conflict',
          message: 'Product already exists',
        },
      };

      before(() => {
        sinon.stub(ProductsServices, 'create').resolves(ERROR);
      });

      after(() => {
        ProductsServices.create.restore();
      });
      
      it('é chamado o status com o código 409', async () => {
        await ProductsController.create(request, response);

        expect(response.status.calledWith(HTTP_CONFLICT_STATUS)).to.be.equal(true);
      });

      it('é chamado o json com a mensagem de erro', async () => {
        await ProductsController.create(request, response);

        expect(response.json.calledWith({ message: 'Product already exists' })).to.be.equal(true);
      });
    });
  });

  describe('Ao acessar um produto pelo id', () => {

    describe('Caso exista um produto com o id passado', () => {

      before(() => {
        sinon.stub(ProductsServices, 'findById').resolves(product[0]);
      });

      after(() => {
        ProductsServices.findById.restore();
      });
      
      it('é chamado o status com o código 200', async () => {
        await ProductsController.findById(request, response);

        expect(response.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
      });

      it('é chamado o json com o produto', async () => {
        await ProductsController.findById(request, response);
        expect(response.json.calledWith(product[0][0])).to.be.equal(true);
      });
    });

    describe('Caso não exista um produto', () => {
      const ERROR = {
        error: {
          code: 'Not Found',
          message: 'Product not found',
        },
      };

      before(() => {
        sinon.stub(ProductsServices, 'findById').resolves(ERROR);
      });

      after(() => {
        ProductsServices.findById.restore();
      });
      
      it('é chamado o status com o código 404', async () => {
        request.params.id = 100;

        await ProductsController.findById(request, response);

        expect(response.status.calledWith(HTTP_NOT_FOUND_STATUS)).to.be.equal(true);
      });

      it('é chamado o json com a mensagem de erro', async () => {
        await ProductsController.findById(request, response);

        expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
      });
    });
  });

  describe('Ao atualizar as informações de um produto', () => {
    describe('quando o id informado existe', () => {

      const UPDATED = {
        id: 1,
        name: 'ave maria',
        quantity: 15
      };

      describe('caso o produto seja atualizado com sucesso', () => {

        before(() => {
          sinon.stub(ProductsServices, 'update').resolves(UPDATED);
        });

        after(() => {
          ProductsServices.update.restore();
        });

        it('o status é chamado com o código 200', async () => {

          await ProductsController.update(request, response);

          expect(response.status.calledWith(HTTP_OK_STATUS)).to.be.equal(true);
        });

        it('o json é chamado com as informações atualizadas do produto', async () => {
          await ProductsController.update(request, response);

          expect(response.json.calledWith(UPDATED)).to.be.equal(true);
        });
      });

      describe('caso o produto não seja atualizado', () => {
        const ERROR = { error: {
          code: 'Bad Request',
          message: 'Product could not be updated',
        },
      };

        before(() => {
          sinon.stub(ProductsServices, 'update').resolves(ERROR);
        });

        after(() => {
          ProductsServices.update.restore();
        });

        it('o status é chamado com o código 400', async () => {
          await ProductsController.update(request, response);

          expect(response.status.calledWith(HTTP_BAD_REQUEST_STATUS)).to.be.equal(true);
        });

        it('o json é chamado com a mensagem de erro correta', async () => {
          await ProductsController.update(request, response);

          expect(response.json.calledWith({ message: 'Product could not be updated' })).to.be.equal(true);
        });
      });
    });

    describe('quando o id informado não existe', () => {
      const ERROR = {
        error: {
          code: 'Not Found',
          message: 'Product not found',
        },
      };

      before(() => {
        sinon.stub(ProductsServices, 'update').resolves(ERROR);
      });

      after(() => {
        ProductsServices.update.restore();
      });
      
      it('o status é chamado com o código 404', async () => {
        await ProductsController.update(request, response);

        expect(response.status.calledWith(HTTP_NOT_FOUND_STATUS)).to.be.equal(true);
      });

      it('o json é chamado com a mensagem de erro correta', async () => {
        await ProductsController.update(request, response);

        expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
      });
    });
  });

  describe('Ao deletar um produto', () => {

    describe('Caso o produto seja deletado com sucesso', () => {

      before(() => {
        sinon.stub(ProductsServices, 'destroy').resolves(true);
      });

      after(() => {
        ProductsServices.destroy.restore();
      });

      it('é chamado o status com o código 204', async () => {
        await ProductsController.destroy(request, response);

        expect(response.status.calledWith(HTTP_NO_CONTENT_STATUS)).to.be.equal(true);
      });

      it('é chamado o end sem parâmetros', async () => {
        await ProductsController.destroy(request, response);

        expect(response.end.calledWith()).to.be.equal(true);
      });
    });

    describe('Caso o produto não seja encontrado', () => {

      const ERROR = {
        error: {
          code: 'Not Found',
          message: 'Product not found',
        },
      };

      before(() => {
        sinon.stub(ProductsServices, 'destroy').resolves(ERROR);
      });

      after(() => {
        ProductsServices.destroy.restore();
      });

      it('é chamado o status com o código 404', async () => {
        await ProductsController.destroy(request, response);

        expect(response.status.calledWith(HTTP_NOT_FOUND_STATUS)).to.be.equal(true);
      });

      it('é chamado o json com a mensagem de erro correta', async () => {
        await ProductsController.destroy(request, response);

        expect(response.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
      });
    });
  });
});
