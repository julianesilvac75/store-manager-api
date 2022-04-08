require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const ProductsModel = require('./models/produtsModel');

const ProductsRouter = require('./routes/products');
const SalesRouter = require('./routes/sales');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
// --------

app.post('/products', async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await ProductsModel.create({ name, quantity });

  res.json(newProduct);
});

app.use('/products', ProductsRouter);
app.use('/sales', SalesRouter);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
