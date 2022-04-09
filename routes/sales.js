const express = require('express');

const router = express.Router();

const SalesService = require('../services/salesService');

const SalesController = require('../controllers/salesController');

router.get('/', SalesController.getAll);
router.get('/:id', SalesController.findById);
router.post('/', async (req, res) => {
  const productsPayload = req.body;

  const teste = await SalesService.create(productsPayload);

  res.json(teste);
});

module.exports = router;
