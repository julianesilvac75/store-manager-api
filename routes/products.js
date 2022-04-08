const express = require('express');

const ProductsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', ProductsController.getAll);
router.get('/:id', ProductsController.findById);

module.exports = router;
