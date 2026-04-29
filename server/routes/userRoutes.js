import express from 'express';
import { getProfile, updateProfile, addProfileItem, removeProfileItem, getAllUsers } from '../controllers/userController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', verifyToken, getProfile);
router.get('/all', verifyToken, getAllUsers);
router.put('/profile', verifyToken, updateProfile);
router.post('/profile/item', verifyToken, addProfileItem);
router.delete('/profile/item/:modelType/:itemId', verifyToken, removeProfileItem);

export default router;
