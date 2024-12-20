const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

// Rutas para usuarios
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

router.get('/info/me', UserController.userInfo)

module.exports = router;
