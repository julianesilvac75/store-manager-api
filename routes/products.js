const express = require('express');

const ProductsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', ProductsController.getAll);

module.exports = router;
