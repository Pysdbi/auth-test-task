const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const authenticate = require('../middleware/authenticate');
const multer = require('multer');
const upload = require("../utils/filestore");
const router = express.Router();

router.post('/update', authenticate, upload.single('profilePicture'), async (req, res) => {
    const { name, password } = req.body;
    const userId = req.user.userId;
    const updates = {};

    if (name) updates.name = name;
    if (password) updates.password = await bcrypt.hash(password, 10);
    if (req.file) updates.profilePicture = req.file.path;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');
        res.json({ message: 'Profile updated', user: updatedUser });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.get('/me', authenticate, async (req, res) => {
    const userId = req.user.userId;

    try {
        const user = await User.findById(userId).select('-password');
        res.json({ message: 'Profile by token', user });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;
