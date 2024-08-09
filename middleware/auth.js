const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');

exports.authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = { userId: decoded.userId };
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
