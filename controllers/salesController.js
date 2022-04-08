const SalesService = require('../services/salesService');
const { HTTP_OK_STATUS } = require('../helpers');

const getAll = async (req, res) => {
  const sales = await SalesService.getAll();

  return res.status(HTTP_OK_STATUS).json(sales);
};

module.exports = {
  getAll,
};
