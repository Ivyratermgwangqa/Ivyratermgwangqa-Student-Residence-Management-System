import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { handleError } from '../utils/helpers.js'; // Assuming you have a custom error handling function

dotenv.config();

const authenticateToken = (req, res, next) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // If no token is provided, return a 401 Unauthorized status
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify the JWT token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // If the token is invalid or expired, return a 403 Forbidden status
            return res.status(403).json({ message: 'Invalid or expired token.' });
        }

        // Attach the user info from the token to the request object
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    });
};

export default authenticateToken;