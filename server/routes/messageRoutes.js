const express = require('express');
const Message = require('../models/messages');
const router = express.Router();

// Add a message
router.post('/add_message', async (req, res) => {
    try {
        const message = new Message(req.body);
        await message.save();
        res.status(201).send(message);
    } catch (e) {
        res.status(400).send(e);
    }
});

//get messages by group id
router.post('/get_messages', async (req, res) => {
    try {
        const messages = await Message.find
        ({
            group_id: req.body.group_id
        });
        res.send(messages);
    } catch (e) {
        res.status(500).send();
    }
});
//get recent chats by uid 
router.post('/get_recent_chats', async (req, res) => {
    try {
        const recent_chats = await Message.find({ $or: [{ from_user: req.body.uid }, { to_user: req.body.uid }] })
            .sort({ sent_time: -1 })
            .limit(10);
        res.send(recent_chats);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
