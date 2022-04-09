const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT
    s.id AS saleId,
      s.date,
      sp.product_id AS productId,
      sp.quantity
  FROM StoreManager.sales AS s
  INNER JOIN StoreManager.sales_products AS sp
  ON s.id = sp.sale_id;`;
  const [sales] = await connection.execute(query);

  return sales;
};

const findById = async (id) => {
  const query = `SELECT
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id
    WHERE s.id = ?;`;
  const [salesById] = await connection.execute(
    query,
    [id],
  );

  if (!salesById.length) return null;

  return salesById;
};

const create = async (productsPayload) => {
  const salesQuery = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
  const salesProductsQuery = `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?);`;

  const [{ insertId }] = await connection.execute(salesQuery);

  productsPayload.forEach(async ({ productId, quantity }) => {
    await connection.execute(salesProductsQuery, [insertId, productId, quantity]);
  });

  return {
    id: insertId,
    itemsSold: productsPayload,
  };
};

module.exports = {
  getAll,
  findById,
  create,
};
