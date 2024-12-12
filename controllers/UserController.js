const { User } = require('../models');
const logger = require('../config/logger');

module.exports = {
  async createUser(req, res) {
    try {
      const { username, email, password } = req.body;
      const newUser = await User.create({ username, email, password });
      res.status(201).json({ message: 'User created successfully', newUser });
    } catch (error) {
      logger.error(`Error creating user: ${error.message}`);
      res.status(500).json({ message: 'Error creating user' });
    }
  },

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      logger.error(`Error fetching user by ID: ${error.message}`);
      res.status(500).json({ message: 'Error fetching user' });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      logger.error(`Error fetching users: ${error.message}`);
      res.status(500).json({ message: 'Error fetching users' });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { username, email, password } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.update({ username, email, password });
      res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      logger.error(`Error updating user: ${error.message}`);
      res.status(500).json({ message: 'Error updating user' });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.destroy();
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      logger.error(`Error deleting user: ${error.message}`);
      res.status(500).json({ message: 'Error deleting user' });
    }
  }
};
