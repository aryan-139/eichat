// controllers/messageController.js
const Message = require('../models/messages');

exports.addMessage = async (req, res) => {
    try {
        const message = new Message(req.body);
        await message.save();
        res.status(201).send(message);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.getMessagesByGroupId = async (req, res) => {
    try {
        const messages = await Message.find({ group_id: req.body.group_id });
        res.send(messages);
    } catch (e) {
        res.status(500).send();
    }
};

exports.getRecentChatsByUid = async (req, res) => {
    try {
        const recent_chats = await Message.find({ $or: [{ from_user: req.body.uid }, { to_user: req.body.uid }] })
            .sort({ sent_time: -1 })
            .limit(10);
        res.send(recent_chats);
    } catch (e) {
        res.status(500).send();
    }
};

exports.getGroupChatsByToUser = async (req, res) => {
    try {
        const chats = await Message.find({ to_user: req.body.to_user })
            .sort({ sent_time: -1 })
            .limit(100);
        res.send(chats);
    } catch (e) {
        res.status(500).send();
    }
};
