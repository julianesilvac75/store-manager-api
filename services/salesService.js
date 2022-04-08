const SalesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await SalesModel.getAll();

  return sales;
};

module.exports = {
  getAll,
};
