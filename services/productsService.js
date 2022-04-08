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

module.exports = {
  getAll,
  findById,
  create,
};
