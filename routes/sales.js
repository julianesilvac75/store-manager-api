const express = require('express');

const router = express.Router();

const SalesModel = require('../models/salesModel');

const SalesController = require('../controllers/salesController');

router.get('/', SalesController.getAll);
router.get('/:id', SalesController.findById);
router.post('/', async (req, res) => {
  const productsPayload = req.body;

  const teste = await SalesModel.create(productsPayload);

  res.json(teste);
});

module.exports = router;
