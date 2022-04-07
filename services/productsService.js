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
        message: 'Produto não encontrado',
      },
    };
  }

  return product;
};

module.exports = {
  getAll,
  findById,
};
