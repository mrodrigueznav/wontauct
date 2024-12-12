const express = require('express');
const SaleController = require('../controllers/SaleController');

const router = express.Router();

// Rutas para ventas
router.get('/', SaleController.getAllSales);
router.get('/:id', SaleController.getSaleById);
router.post('/', SaleController.createSale);
router.put('/:id', SaleController.updateSaleStatus);

module.exports = router;
