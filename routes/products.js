const express = require('express');

const router = express.Router();

const ProductsController = require('../controllers/productsController');

router.get('/', ProductsController.getAll);
router.get('/:id', ProductsController.findById);
router.post('/', ProductsController.create);

module.exports = router;
