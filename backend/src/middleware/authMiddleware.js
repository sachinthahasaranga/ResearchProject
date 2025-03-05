import jwt from 'jsonwebtoken';
import config from '../config/env.js';

const protect = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized, no token' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token invalid or expired' });
    }
};

export default protect;
