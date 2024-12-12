const express = require('express');
const ItemController = require('../controllers/ItemController');

const router = express.Router();

// Rutas para artículos
router.get('/', ItemController.getAllItems);
router.get('/:id', ItemController.getItemById);
router.post('/', ItemController.createItem);
router.put('/:id', ItemController.updateItem);
router.delete('/:id', ItemController.deleteItem);

module.exports = router;
