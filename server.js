const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/auth'
mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/', (req, res) => {
    res.send('Auth Test Task');
});

app.use('/uploads', express.static('uploads'));

app.use('/api/auth', require('./routes/auth'))
app.use('/api/profile', require('./routes/profile'));
app.use('/api/people', require('./routes/people'));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
