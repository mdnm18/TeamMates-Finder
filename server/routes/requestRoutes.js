import express from 'express';
import { sendRequest, handleRequest, getUserRequests } from '../controllers/requestController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyToken);

router.post('/send/:postId', sendRequest);
router.put('/handle/:requestId', handleRequest);
router.get('/me', getUserRequests);

export default router;
