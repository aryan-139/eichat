const express = require('express');
const Group = require('../models/groups');
const Message = require('../models/messages');
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

//get group name 
router.post('/get_group_name', async (req, res) => {
    try {
        const group = await Group.findOne({ group_id:
            req.body.group_id });
        if (group) {
            res.send(group);
        }
        else {
            res.status(404).send();
        }
    } catch (e) {
        res.status(500).send();
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

//delete a group by group id
router.post('/delete_group', async (req, res) => {
    try {
        await Group.findOneAndDelete({ group_id: req.body.group_id });
        await Message.deleteMany({ to_user: req.body.group_id });
        res.status(200).send("group_deleted");
    }
    catch (e) {
        res.status(500).send();
    }
});


module.exports = router;
