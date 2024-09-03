import express from 'express';
import userRoutes from './userRoutes.js';
import residenceRoutes from './residenceRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/residences', residenceRoutes);

export default router;