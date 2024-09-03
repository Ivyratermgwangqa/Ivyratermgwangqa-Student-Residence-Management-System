import express from 'express';
import {
    createResidence,
    acceptApplication,
    declineApplication,
    getApplications,
    getAllResidences,
    getResidenceById,
    updateResidence,
    deleteResidence
} from '../controllers/residenceController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';
const router = express.Router();

// Define your routes
router.post('/', createResidence);
router.get('/', getAllResidences);
router.get('/:id', getResidenceById);
router.put('/:id', updateResidence);
router.delete('/:id', deleteResidence);

export default router;