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

const create = async (productsPayload) => {
  const sale = await SalesModel.create(productsPayload);

  return sale;
};

module.exports = {
  getAll,
  findById,
  create,
};
