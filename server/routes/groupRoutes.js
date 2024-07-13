const express = require('express');
const Group = require('../models/groups');
const router = express.Router();

// Add a group
router.post('/add_group', async (req, res) => {
    try {
        const group = new Group(req.body);
        await group.save();
        res.status(201).send(group);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Get all groups
router.get('/get_groups', async (req, res) => {
    try {
        const groups = await Group.find({});
        res.send(groups);
    } catch (e) {
        res.status(500).send();
    }
});

// check if group exists
router.post('/check_group', async (req, res) => {
    try {
        const group = await Group.findOne({ group_id: req.body.group_id });
        if (group) {
            res.send(group);
        } else {
            res.status(404).send();
        }
    } catch (e) {
        res.status(500).send();
    }
}
);
//get single group info using group_id
router.post('/get_group', async (req, res) => {
    try {
        const group = await Group.findOne({ group_id: req.body.group_id });
        if (group) {
            res.send(group);
        } else {
            res.status(404).send();
        }
    } catch (e) {
        res.status(500).send();
    }
});



module.exports = router;
