const { Auction, Bid, Item } = require('../models');
const logger = require('../config/logger');

module.exports = {
  async startLiveAuction(req, res) {
    try {
      const { auctionId } = req.body;
      const auction = await Auction.findByPk(auctionId);

      if (!auction) {
        return res.status(404).json({ message: 'Auction not found' });
      }

      await auction.update({ status: 'ongoing' });
      res.status(200).json({ message: 'Live auction started successfully', auction });
    } catch (error) {
      logger.error(`Error starting live auction: ${error.message}`);
      res.status(500).json({ message: 'Error starting live auction' });
    }
  },

  async placeBid(req, res) {
    try {
      const { auctionId, itemId, userId, amount } = req.body;

      const auction = await Auction.findByPk(auctionId);
      const item = await Item.findByPk(itemId);

      if (!auction || !item || auction.status !== 'ongoing') {
        return res.status(400).json({ message: 'Invalid auction or item' });
      }

      const bid = await Bid.create({ auctionId, itemId, userId, amount });
      res.status(201).json({ message: 'Bid placed successfully', bid });
    } catch (error) {
      logger.error(`Error placing bid: ${error.message}`);
      res.status(500).json({ message: 'Error placing bid' });
    }
  },

  async endLiveAuction(req, res) {
    try {
      const { auctionId } = req.body;
      const auction = await Auction.findByPk(auctionId);

      if (!auction || auction.status !== 'ongoing') {
        return res.status(400).json({ message: 'Auction not found or already ended' });
      }

      await auction.update({ status: 'completed' });
      res.status(200).json({ message: 'Live auction ended successfully', auction });
    } catch (error) {
      logger.error(`Error ending live auction: ${error.message}`);
      res.status(500).json({ message: 'Error ending live auction' });
    }
  }
};
