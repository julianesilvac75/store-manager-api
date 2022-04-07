require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

// -----------
const ProductsController = require('./controllers/productsController');

const ProductsRouter = require('./routes/products');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
// --------

app.get('/products/:id', ProductsController.findById);

app.use('/products', ProductsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
