import express from 'express';
import residenceController from '../controllers/residenceController.js';

const router = express.Router();

// Define routes for residence operations
router.post('/', residenceController.createResidence);
router.get('/', residenceController.getAllResidences);
router.get('/:id', residenceController.getResidenceById);
router.put('/:id', residenceController.updateResidence);
router.delete('/:id', residenceController.deleteResidence);

export default router;
