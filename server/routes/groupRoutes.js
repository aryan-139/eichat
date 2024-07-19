// routes/groups.js
const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupControllers');

// Add a group
router.post('/add_group', groupController.addGroup);
// Get group name
router.post('/get_group_name', groupController.getGroupName);
// Get all groups
router.get('/get_groups', groupController.getGroups);
// Check if group exists
router.post('/check_group', groupController.checkGroup);
// Get single group info using group_id
router.post('/get_group', groupController.getGroup);
// Delete a group by group_id
router.post('/delete_group', groupController.deleteGroup);
// Delete all groups
router.post('/delete_all_groups', groupController.deleteAllGroups);
module.exports = router;
