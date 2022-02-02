const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/TransactionController');

router.get('/transactions', TransactionController.index);
router.post('/transactions', TransactionController.store);

module.exports = router;
