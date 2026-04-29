import express from 'express';
import { createPost, getPosts } from '../controllers/postController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Middleware lock demands auth on all post actions
router.use(verifyToken);

router.post('/', createPost);
router.get('/', getPosts);

export default router;
