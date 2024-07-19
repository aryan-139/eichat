// routes/messages.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageControllers');

// Add a message
router.post('/add_message', messageController.addMessage);

// Get messages by group ID
router.post('/get_messages', messageController.getMessagesByGroupId);

// Get recent chats by UID
router.post('/get_recent_chats', messageController.getRecentChatsByUid);

// Get chats of a group by to_user
router.post('/get_group_chats', messageController.getGroupChatsByToUser);

module.exports = router;
