const express = require('express');
const LiveAuctionController = require('../controllers/LiveAuctionController');

const router = express.Router();

// Rutas para subastas en vivo
router.post('/start', LiveAuctionController.startLiveAuction);
router.post('/bid', LiveAuctionController.placeBid);
router.post('/end', LiveAuctionController.endLiveAuction);

module.exports = router;
