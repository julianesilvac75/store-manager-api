const { HTTP_OK_STATUS } = require('../helpers');
const ProductsService = require('../services/productsService');

const getAll = async (req, res) => {
  const products = await ProductsService.getAll();

  return res.status(HTTP_OK_STATUS).json(products);
};

module.exports = {
  getAll,
};
