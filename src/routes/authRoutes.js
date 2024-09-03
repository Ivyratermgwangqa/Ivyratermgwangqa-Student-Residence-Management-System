import express from 'express';
import { register, login, getUserDetails } from '../controllers/authController.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const router = express.Router();

// Registration route
router.post('/register', register);

// Login route
router.post('/login', login);

// Get user details route (protected)
router.get('/me', authenticateToken, getUserDetails);

export default router;
