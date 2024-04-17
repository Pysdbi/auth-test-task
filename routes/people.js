const router = require('express').Router();
const User = require('../models/User');
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user.userId } }).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;