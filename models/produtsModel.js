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

const update = async ({ id, name, quantity }) => {
  const query = `UPDATE StoreManager.products
  SET name = ?, quantity = ?
  WHERE id = ?;`;
  const [{ changedRows }] = await connection.execute(
    query,
    [name, quantity, id],
  );

  if (changedRows === 0) return null;

  return {
    id,
    name,
    quantity,
  };
};

const destroy = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?;';
  const [{ affectedRows }] = await connection.execute(query, [id]);

  if (affectedRows === 0) return null;

  return true;
};

module.exports = {
  getAll,
  findById,
  findByName,
  create,
  update,
  destroy,
};
