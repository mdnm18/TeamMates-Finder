import express from 'express';
import { login, onboardUser } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Both routes require valid Firebase token + @srmist.edu.in domain
router.post('/login', verifyToken, login);
router.post('/onboard', verifyToken, onboardUser);

export default router;
