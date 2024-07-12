const express=require('express');
const router=express.Router();

const messageController=require('../controllers/messageController');

router.post('/send',messageController.sendMessage);
router.get('/get',messageController.getMessages);
router.get('/get/:group_id',messageController.getMessagesByGroup);