const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Add a user
router.post('/add_user', async (req, res) => {
    try {
        console.log('user route hit');
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Get all users
router.get('/get_users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
