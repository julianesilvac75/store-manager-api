const express = require('express');

const router = express.Router();

const SalesController = require('../controllers/salesController');

router.get('/', SalesController.getAll);
router.get('/:id', SalesController.findById);
router.post('/', SalesController.create);

module.exports = router;
