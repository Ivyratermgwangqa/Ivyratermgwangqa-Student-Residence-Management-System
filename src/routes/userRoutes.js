import express from 'express';
import { register, login, getUserDetails, updateUserDetails, deleteUser } from '../controllers/userController.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, getUserDetails);
router.put('/profile', authenticateToken, updateUserDetails);
router.delete('/profile', authenticateToken, deleteUser);

export default router;