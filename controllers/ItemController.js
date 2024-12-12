const { Item, Image } = require('../models');
const logger = require('../config/logger');
const { uploadImages } = require('./ImageController');
const { where } = require('sequelize');

module.exports = {
  async getAllItems(req, res) {
    try {
      logger.debug('Fetching all items from the database');
      const items = await Item.findAll({
        include: [{ model: Image, as: 'images' }],
        where: { isDeleted: false },
      });
      logger.debug(`Fetched items: ${JSON.stringify(items)}`);
      res.status(200).json(items);
    } catch (error) {
      logger.error(error)
      logger.error(`Error fetching items: ${error.message}`);
      res.status(500).json({ message: 'Error fetching items' });
    }
  },

  async getItemById(req, res) {
    try {
      const { id } = req.params;
      logger.debug(`Fetching item by ID: ${id}`);
      const item = await Item.findByPk(id, {
        include: [{ model: Image, as: 'images' }],
      });
      if (!item) {
        logger.debug(`Item not found: ${id}`);
        return res.status(404).json({ message: 'Item not found' });
      }
      logger.debug(`Fetched item: ${JSON.stringify(item)}`);
      res.status(200).json(item);
    } catch (error) {
      logger.error(`Error fetching item by ID: ${error.message}`);
      res.status(500).json({ message: 'Error fetching item' });
    }
  },

  async createItem(req, res) {
    uploadImages(req, res, async (err) => {
      if (err) {
        logger.error(`Error uploading images: ${err.message}`);
        return res.status(400).json({ message: err.message });
      }

      try {
        logger.debug(`Creating new item with data: ${JSON.stringify(req.body)}`);
        const { name, description, startingPrice, msrp, condition, bggRating, playerCount, publisher, releaseYear } = req.body;
        const newItem = await Item.create({
          name, 
          description, 
          startingPrice, 
          msrp, 
          condition,
          bggRating,
          playerCount,
          publisher,
          releaseYear
        });
        logger.debug(`Created new item: ${JSON.stringify(newItem)}`);

        const imageUrls = req.imageUrls;
        for (const url of imageUrls) {
          logger.debug(`Creating image with URL: ${url} for item ID: ${newItem.id}`);
          await Image.create({ url, itemId: newItem.id });
        }

        res.status(201).json({ newItem, imageUrls });
      } catch (error) {
        logger.error(`Error creating item: ${error.message}`);
        res.status(500).json({ message: 'Error creating item' });
      }
    });
  },

  async updateItem(req, res) {
    console.log(req.body);
    try {
      const { id } = req.params
      logger.debug(`Updating item with ID: ${id} with data: ${JSON.stringify(req.body)}`)
  
      const item = await Item.findByPk(id, {
        include: [{ model: Image, as: 'images' }],
      })
  
      if (!item) {
        logger.debug(`Item not found: ${id}`)
        return res.status(404).json({ message: 'Item not found' })
      }
  
      // Update item fields
      const {
        description,
        startingPrice,
        msrp,
        condition,
        bggRating,
        playerCount,
        publisher,
        releaseYear,
        existingImages = [],
      } = req.body
  
      await item.update({
        description,
        startingPrice,
        msrp,
        condition,
        bggRating,
        playerCount,
        publisher,
        releaseYear,
      })
  
      // Identify images to remove
      const currentImages = await Image.findAll({ where: { itemId: id } })
      const imagesToDelete = currentImages.filter((image) => !existingImages.includes(image))
  
      if (imagesToDelete.length > 0) {
        const imageIdsToDelete = imagesToDelete.map((image) => image.id)
        await Image.destroy({ where: { id: imageIdsToDelete, itemId: id } })
        logger.debug(`Removed images: ${JSON.stringify(imageIdsToDelete)}`)
      }
  
      // Upload new images
      try {
        await uploadImages(req, res, async (uploadErr) => {
          if (uploadErr) {
            logger.error(`Error uploading images: ${uploadErr.message}`)
            return res.status(400).json({ message: 'Image upload failed' })
          }
  
          const uploadedImageUrls = req.imageUrls || []
          for (const url of uploadedImageUrls) {
            await Image.create({ url, itemId: id })
            logger.debug(`Added new image with URL: ${url}`)
          }
  
          // Return updated item
          const updatedItem = await Item.findByPk(id, {
            include: [{ model: Image, as: 'images' }],
          })
  
          logger.debug(`Updated item: ${JSON.stringify(updatedItem)}`)
          res.status(200).json(updatedItem)
        })
      } catch (uploadError) {
        logger.error(`Error uploading images: ${uploadError.message}`)
        res.status(500).json({ message: 'Error uploading images' })
      }
    } catch (error) {
      logger.error(`Error updating item: ${error.message}`)
      res.status(500).json({ message: 'Error updating item' })
    }
  },

  async deleteItem(req, res) {
    try {
      const { id } = req.params;
      logger.debug(`Deleting item with ID: ${id}`);
      const item = await Item.findByPk(id);

      if (!item) {
        logger.debug(`Item not found: ${id}`);
        return res.status(404).json({ message: 'Item not found' });
      }

      await item.update({ isDeleted: true });
      logger.debug(`Deleted item with ID: ${id}`);
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      logger.error(`Error deleting item: ${error.message}`);
      res.status(500).json({ message: 'Error deleting item' });
    }
  }
};