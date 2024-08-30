import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Get user details (protected route)
router.get('/me', authenticate, authController.getUserDetails);

export default router;