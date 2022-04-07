require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

// -----------
const ProductsModel = require('./models/produtsModel');

const ProductsRouter = require('./routes/products');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
// --------

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;

  const product = await ProductsModel.findById(id);

  return res.json(product);
});

app.use('/products', ProductsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
