require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const ProductsRouter = require('./routes/products');
const SalesRouter = require('./routes/sales');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
// --------

app.use('/products', ProductsRouter);
app.use('/sales', SalesRouter);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
