// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

// Add a user
router.post('/add_user', userController.addUser);

// Get user name from user_id
router.post('/get_user_name', userController.getUserName);

// Get all users
router.get('/get_users', userController.getUsers);

// Login status
router.post('/login', userController.login);

// Delete user
router.post('/delete_user', userController.deleteUser);

// Delete all users
router.post('/delete_all_users', userController.deleteAllUsers);

module.exports = router;
