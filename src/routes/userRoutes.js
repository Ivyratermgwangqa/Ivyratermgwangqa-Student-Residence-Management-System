import express from 'express';
import {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/userController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/', authMiddleware, adminMiddleware, getAllUsers); // Admin only
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser); // Admin only

export default router;