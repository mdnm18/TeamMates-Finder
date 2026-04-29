import express from 'express';
import { getConversation, sendMessage } from '../controllers/messageController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/:partnerId', verifyToken, getConversation);
router.post('/', verifyToken, sendMessage);

export default router;
