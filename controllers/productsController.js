const { HTTP_OK_STATUS, HTTP_NOT_FOUND_STATUS } = require('../helpers');
const ProductsService = require('../services/productsService');

const getAll = async (req, res) => {
  const products = await ProductsService.getAll();

  return res.status(HTTP_OK_STATUS).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const product = await ProductsService.findById(id);

  if (product.error) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Product not found' });
  }

  // console.log('real', product[0]);
  // Fazer middleware de erro padronizado
  return res.status(HTTP_OK_STATUS).json(product[0]);
};

module.exports = {
  getAll,
  findById,
};
