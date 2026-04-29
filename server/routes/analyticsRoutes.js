import express from 'express';
import { getApplicationStats, getProfileViews, getSkillDemand } from '../controllers/analyticsController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/applications', verifyToken, getApplicationStats);
router.get('/views', verifyToken, getProfileViews);
router.get('/skills', verifyToken, getSkillDemand);

export default router;
