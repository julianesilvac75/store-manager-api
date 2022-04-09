const SalesService = require('../services/salesService');
const { HTTP_OK_STATUS, HTTP_NOT_FOUND_STATUS, HTTP_CREATED_STATUS } = require('../helpers');

const getAll = async (req, res) => {
  const sales = await SalesService.getAll();

  return res.status(HTTP_OK_STATUS).json(sales);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const salesById = await SalesService.findById(id);

  // Fazer middleware de erro padronizado
  if (salesById.error) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Sale not found' });
  }

  return res.status(HTTP_OK_STATUS).json(salesById);
};

const create = async (req, res) => {
  const productsPayload = req.body;

  const sale = await SalesService.create(productsPayload);

  return res.status(HTTP_CREATED_STATUS).json(sale);
};

module.exports = {
  getAll,
  findById,
  create,
};
