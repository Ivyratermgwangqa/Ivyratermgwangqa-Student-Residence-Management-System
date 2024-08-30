import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// Define routes for user operations
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;