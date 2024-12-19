const { User } = require('../models');
const logger = require('../config/logger');

const defaultAvatar = 'https://lh3.googleusercontent.com/a/ACg8ocJlOcLZVwFu01wKTThYkr_PnyrC3FwbQeEwERd5xpiaRotkalg=s96-c';

module.exports = {
  async createUser(req, res) {
    try {
      const { username, email, userId, avatar } = req.body;

      const randomNumber = Math.floor(10000 + Math.random() * 90000);
      const newUsertoCreate = {
        username: username ? username : `Wontollero-${randomNumber}`,
        email,
        userId,
        isVerified: false,
        isAdmin: false,
        avatar: avatar ? avatar : defaultAvatar,
        password: 'NA'
      }
      const newUser = await User.create(newUsertoCreate);
      res.status(201).json({ message: 'User registered successfully', newUser });
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
  },

  async userInfo(req, res) {
    const token = req.header('Authorization')?.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.status(200).json(decoded);
    } catch (error) {
      res.status(400).json({ message: 'Invalid token.' });
    }
  }
};
