const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Add a user
router.post('/add_user', async (req, res) => {
    try {
        const phone_number = req.body.phone_number;
        if(phone_number.length !== 10){
            console.log('Phone number should be of 10 digits');
        }
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

//get user name from user_id
router.post('/get_user_name', async (req, res) => {
    try {
        const user = await User.findOne({ user_id: req.body.user_id });
        if (user) {
            res.send(user);
        } else {
            res.status(404).send();
        }
    } catch (e) {
        res.status(500).send();
    }
}
);

// Get all users
router.get('/get_users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (e) {
        res.status(400).send(e);
    }
});
//login status
router.post('/login', async (req, res) => {
    try {
        const user_id=req.body.user_id;
        const user = await User.findOne({
            user_id
        });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e);
    }  
});

//delete user
router.post('/delete_user', async (req, res) => {
    try {
        const user_id = req.body.user_id;
        await User.findOneAndDelete({ user_id });
        res.status(200).send('User deleted');
    }
    catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
