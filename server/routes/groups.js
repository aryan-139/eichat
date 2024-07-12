const express=require('express');
const router=express.Router();

const groupController=require('../controllers/groupController');

router.post('/create',groupController.createGroup);
router.get('/get',groupController.getGroups);
router.get('/delete/:group_id',groupController.deleteGroup);
router.get('/get/:group_id',groupController.getGroup);