const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT * FROM StoreManager.products
  ORDER BY id ASC;`;
  const [result] = await connection.execute(query);

  return result;
};

module.exports = {
  getAll,
};
