// src/routes/residenceRoutes.js
import express from 'express';
import authenticateToken from '../middlewares/authMiddleware.js';
import {
    createResidence,
    getAllResidences,
    getResidenceById,
    updateResidence,
    deleteResidence,
} from '../controllers/residenceController.js';

const router = express.Router();

// Routes
router.post('/', authenticateToken, createResidence); // Create a new residence
router.get('/', authenticateToken, getAllResidences); // Get all residences
router.get('/:residenceId', authenticateToken, getResidenceById); // Get a residence by ID
router.put('/:residenceId', authenticateToken, updateResidence); // Update a residence
router.delete('/:residenceId', authenticateToken, deleteResidence); // Delete a residence

export default router;