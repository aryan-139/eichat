// controllers/groupController.js
const Group = require('../models/groups');
const Message = require('../models/messages');

exports.addGroup = async (req, res) => {
    try {
        const group = new Group(req.body);
        await group.save();
        res.status(201).send(group);
    } catch (e) {
        res.status(400).send(e);
    }
};

exports.getGroupName = async (req, res) => {
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
};

exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.find({});
        res.send(groups);
    } catch (e) {
        res.status(500).send();
    }
};

exports.checkGroup = async (req, res) => {
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
};

exports.getGroup = async (req, res) => {
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
};

exports.deleteGroup = async (req, res) => {
    try {
        await Group.findOneAndDelete({ group_id: req.body.group_id });
        await Message.deleteMany({ to_user: req.body.group_id });
        res.status(200).send("group_deleted");
    } catch (e) {
        res.status(500).send();
    }
};

exports.deleteAllGroups = async (req, res) => {
    try {
        await Group.deleteMany({});
        await Message.deleteMany({});
        res.status(200).send("all_groups_deleted");
    } catch (e) {
        res.status(500).send();
    }
};
