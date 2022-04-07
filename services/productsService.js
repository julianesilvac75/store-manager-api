const ProductsModel = require('../models/produtsModel');

const getAll = async () => {
  const products = await ProductsModel.getAll();

  return products;
};

const findById = async (id) => {
  const product = await ProductsModel.findById(id);

  console.log(product);
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

module.exports = {
  getAll,
  findById,
};
