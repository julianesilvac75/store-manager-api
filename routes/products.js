const express = require('express');

const productsValidate = require('../middlewares/productsValidate');

const router = express.Router();

const ProductsController = require('../controllers/productsController');

router.get('/', ProductsController.getAll);
router.get('/:id', ProductsController.findById);

router.delete('/:id', ProductsController.destroy);

router.use(productsValidate);
router.put('/:id', ProductsController.update);
router.post('/', ProductsController.create);

module.exports = router;
