require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const SalesModel = require('./models/salesModel');

const ProductsRouter = require('./routes/products');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
// --------

app.use('/products', ProductsRouter);

app.get('/sales', async (req, res) => {
  const sales = await SalesModel.getAll();

  return res.json(sales);
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
