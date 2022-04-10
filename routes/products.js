const express = require('express');

const productsValidate = require('../middlewares/productsValidate');

const router = express.Router();

const ProductsModel = require('../models/produtsModel');

const ProductsController = require('../controllers/productsController');

router.get('/', ProductsController.getAll);
router.get('/:id', ProductsController.findById);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const teste = await ProductsModel.destroy(id);

  res.json(teste);
});

router.use(productsValidate);
router.put('/:id', ProductsController.update);
router.post('/', ProductsController.create);

module.exports = router;
