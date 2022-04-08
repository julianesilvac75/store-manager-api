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

module.exports = {
  getAll,
};
