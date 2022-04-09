const express = require('express');

const router = express.Router();

const salesValidate = require('../middlewares/salesValidate');

const SalesController = require('../controllers/salesController');

router.get('/', SalesController.getAll);
router.get('/:id', SalesController.findById);

router.use(salesValidate);
router.post('/', SalesController.create);

module.exports = router;
