const ProductsModel = require('../models/produtsModel');

const getAll = async () => {
  const products = await ProductsModel.getAll();

  return products;
};

const findById = async (id) => {
  const product = await ProductsModel.findById(id);

  if (!product) {
    return {
      error: {
        code: 'Not Found',
        message: 'Product not found',
      },
    };
  }

  return product;
};

const create = async ({ name, quantity }) => {
  const findProduct = await ProductsModel.findByName(name);

  if (findProduct) {
    return {
      error: {
          code: 'Conflict',
          message: 'Product already exists',
      },
    };
  }

  const newProduct = await ProductsModel.create({ name, quantity });

  return newProduct;
};

const update = async ({ id, name, quantity }) => {
  const checkProduct = await ProductsModel.findById(id);

  if (!checkProduct) {
    return { error: {
        code: 'Not Found',
        message: 'Product not found',
      },
    };
  }

  const updatedProduct = await ProductsModel.update({ id, name, quantity });

  if (!updatedProduct) {
    return { error: {
        code: 'Bad Request',
        message: 'Product could not be updated',
      },
    };
  }

  return updatedProduct;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
};
