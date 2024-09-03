import express from 'express';
import {
    createApplication,
    getAllApplications,
    getApplicationById,
    updateApplicationStatus,
    deleteApplication
} from '../controllers/applicationController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Routes for applications
router.post('/', authMiddleware, createApplication);
router.get('/', authMiddleware, getAllApplications);
router.get('/:id', authMiddleware, getApplicationById);
router.put('/:id/status', authMiddleware, updateApplicationStatus);
router.delete('/:id', authMiddleware, deleteApplication);

export default router;