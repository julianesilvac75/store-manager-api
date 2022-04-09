const {
  HTTP_OK_STATUS,
  HTTP_NOT_FOUND_STATUS,
  HTTP_CONFLICT_STATUS,
  HTTP_CREATED_STATUS, 
  HTTP_BAD_REQUEST_STATUS } = require('../helpers');
const ProductsService = require('../services/productsService');

const getAll = async (req, res) => {
  const products = await ProductsService.getAll();

  return res.status(HTTP_OK_STATUS).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const product = await ProductsService.findById(id);

  // Fazer middleware de erro padronizado
  if (product.error) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Product not found' });
  }

  return res.status(HTTP_OK_STATUS).json(product[0]);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await ProductsService.create({ name, quantity });

  // Fazer middleware de erro padronizado
  if (newProduct.error) {
    return res.status(HTTP_CONFLICT_STATUS).json({ message: 'Product already exists' });
  }

  return res.status(HTTP_CREATED_STATUS).json(newProduct);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updatedProduct = await ProductsService.update({ id, name, quantity });

  if (updatedProduct.error) {
    switch (updatedProduct.error.code) {
      case 'Not Found':
        return res
          .status(HTTP_NOT_FOUND_STATUS).json({ message: 'Product not found' });
      case 'Bad Request':
        return res
          .status(HTTP_BAD_REQUEST_STATUS).json({ message: 'Product could not be updated' });
      default:
        return res
          .status(HTTP_BAD_REQUEST_STATUS).json(updatedProduct.error.message);
    }
  }

  return res.status(HTTP_OK_STATUS).json(updatedProduct);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
};
