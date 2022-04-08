const express = require('express');

const router = express.Router();

const SalesController = require('../controllers/salesController');

router.get('/', SalesController.getAll);

module.exports = router;
