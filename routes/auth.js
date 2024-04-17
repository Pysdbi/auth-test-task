const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const upload = require("../utils/filestore");
const jwt = require('jsonwebtoken');

router.post('/register', upload.single('profilePicture'), async (req, res) => {
    try {
        const { name, email, password, birthdate, gender } = req.body;
        const profilePicture = req.file ? req.file.path : ''; // Путь к файлу изображения

        if (!email || !password || !name) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            birthdate,
            gender,
            profilePicture // Сохраняем путь к загруженному изображению
        });
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User created successfully", userId: savedUser._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
