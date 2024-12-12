const { Sale, Item, User } = require('../models');
const logger = require('../config/logger');

module.exports = {
  async createSale(req, res) {
    try {
      const { itemId, userId, salePrice } = req.body;

      const item = await Item.findByPk(itemId);
      if (!item || item.status === 'sold') {
        return res.status(400).json({ message: 'Item not available for sale' });
      }

      const sale = await Sale.create({ itemId, userId, salePrice, status: 'completed' });
      await item.update({ status: 'sold' });

      res.status(201).json({ message: 'Sale completed successfully', sale });
    } catch (error) {
      logger.error(`Error creating sale: ${error.message}`);
      res.status(500).json({ message: 'Error creating sale' });
    }
  },

  async getSaleById(req, res) {
    try {
      const { id } = req.params;
      const sale = await Sale.findByPk(id, {
        include: [
          { model: Item, as: 'item' },
          { model: User, as: 'buyer' }
        ]
      });

      if (!sale) {
        return res.status(404).json({ message: 'Sale not found' });
      }

      res.status(200).json(sale);
    } catch (error) {
      logger.error(`Error fetching sale by ID: ${error.message}`);
      res.status(500).json({ message: 'Error fetching sale' });
    }
  },

  async getAllSales(req, res) {
    try {
      const sales = await Sale.findAll({
        include: [
          { model: Item, as: 'item' },
          { model: User, as: 'buyer' }
        ]
      });

      res.status(200).json(sales);
    } catch (error) {
      logger.error(`Error fetching sales: ${error.message}`);
      res.status(500).json({ message: 'Error fetching sales' });
    }
  },

  async updateSaleStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const sale = await Sale.findByPk(id);
      if (!sale) {
        return res.status(404).json({ message: 'Sale not found' });
      }

      await sale.update({ status });
      res.status(200).json({ message: 'Sale status updated successfully', sale });
    } catch (error) {
      logger.error(`Error updating sale status: ${error.message}`);
      res.status(500).json({ message: 'Error updating sale status' });
    }
  }
};
