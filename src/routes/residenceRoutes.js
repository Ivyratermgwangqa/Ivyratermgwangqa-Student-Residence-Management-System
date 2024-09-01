import express from 'express';
import {
    createResidence,
    getAllResidences,
    getResidenceById,
    updateResidence,
    deleteResidence
} from '../controllers/residenceController.js';

const router = express.Router();

// Define your routes
router.post('/', createResidence);
router.get('/', getAllResidences);
router.get('/:id', getResidenceById);
router.put('/:id', updateResidence);
router.delete('/:id', deleteResidence);

export default router;