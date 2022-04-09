const express = require('express');

const productsValidate = require('../middlewares/productsValidate');

const router = express.Router();

const ProductsController = require('../controllers/productsController');

router.get('/', ProductsController.getAll);
router.get('/:id', ProductsController.findById);
router.put('/:id', ProductsController.update);

router.use(productsValidate);

router.post('/', ProductsController.create);

module.exports = router;
