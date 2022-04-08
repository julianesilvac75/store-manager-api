const SalesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await SalesModel.getAll();

  return sales;
};

const findById = async (id) => {
  const salesById = await SalesModel.findById(id);

  if (!salesById) {
    return {
      error: {
        code: 'Not Found',
        message: 'Sale not found',
      },
    };
  }

  return salesById;
};

module.exports = {
  getAll,
  findById,
};
