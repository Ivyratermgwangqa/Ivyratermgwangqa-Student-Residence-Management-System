// src/routes/applicationRoutes.js
import express from 'express';
import authenticateToken from '../middlewares/authMiddleware.js';
import {
    createApplication,
    getUserApplications,
    getResidenceApplications,
    acceptApplication,
    declineApplication,
} from '../controllers/applicationController.js';

const router = express.Router();

// Routes
router.post('/', authenticateToken, createApplication); // Create a new application
router.get('/user', authenticateToken, getUserApplications); // Get all applications for the logged-in user
router.get('/residence/:residenceId', authenticateToken, getResidenceApplications); // Get all applications for a specific residence
router.post('/:applicationId/accept', authenticateToken, acceptApplication); // Accept an application
router.post('/:applicationId/decline', authenticateToken, declineApplication); // Decline an application

export default router;