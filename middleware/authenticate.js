const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]; // Bearer TOKEN_HERE
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied." });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ message: "Token is not valid." });
    }
};

module.exports = authenticate;