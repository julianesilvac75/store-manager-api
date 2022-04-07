const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT * FROM StoreManager.products
  ORDER BY id ASC;`;
  const [products] = await connection.execute(query);

  return products;
};

const findById = async (id) => {
  const query = `SELECT * FROM StoreManager.products
  WHERE id = ?;`;
  const [product] = await connection
  .execute(
    query,
    [id],
  );

  if (!product.length) return null;

  return product;
};

module.exports = {
  getAll,
  findById,
};
