const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./config/logger');
const sequelize = require('./config/database');
const firebaseService = require('./services/firebaseService');
const itemRoutes = require('./routes/item');
const saleRoutes = require('./routes/sale');
const liveAuctionRoutes = require('./routes/liveAuction');
const imageRoutes = require('./routes/image'); // Import the image routes
const { errorConverter, errorHandler } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use('/api/items', itemRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/live-auctions', liveAuctionRoutes);
app.use('/api/images', imageRoutes); // Use the image routes

// Guardar subasta en Firebase
app.post('/api/save-auction', async (req, res) => {
  try {
    const { auctionId, data } = req.body;
    const result = await firebaseService.saveAuctionResult(auctionId, data);
    res.status(200).json(result);
  } catch (error) {
    logger.error('Error saving auction:', error);
    res.status(500).json({ message: 'Error saving auction result' });
  }
});

// Manejo de errores
app.use(errorConverter);
app.use(errorHandler);

// Sincronizar base de datos y lanzar el servidor
(async () => {
  try {
    // await sequelize.authenticate();
    logger.info('Database connected...');

    // await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
})();