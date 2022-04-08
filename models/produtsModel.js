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

const findByName = async (name) => {
  const query = `SELECT * FROM StoreManager.products
    WHERE name = ?;`;
  const [product] = await connection.execute(
    query,
    [name],
  );
  
  if (!product.length) return null;

  return product;
};

const create = async ({ name, quantity }) => {
  const query = `INSERT INTO StoreManager.products (name, quantity)
  VALUES (?, ?);`;
  const [{ insertId }] = await connection.execute(
    query,
    [name, quantity],
  );

  return {
    id: insertId,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  findById,
  findByName,
  create,
};
