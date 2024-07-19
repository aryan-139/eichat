// controllers/userController.js
const User = require('../models/user');

exports.addUser = async (req, res) => {
    try {
        const phone_number = req.body.phone_number;
        if(phone_number.length !== 10){
            return res.status(400).send('Phone number should be of 10 digits');
        }
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.getUserName = async (req, res) => {
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
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.login = async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const user = await User.findOne({ user_id });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e);
    }  
};

exports.deleteUser = async (req, res) => {
    try {
        const user_id = req.body.user_id;
        await User.findOneAndDelete({ user_id });
        res.status(200).send('User deleted');
    } catch (e) {
        res.status(500).send();
    }
};

exports.deleteAllUsers = async (req, res) => {
    try {
        await User.deleteMany();
        res.status(200).send('All users deleted');
    } catch (e) {
        res.status(500).send();
    }
};
