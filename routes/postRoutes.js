import express from 'express';
const router= express.Router();

import { fetchAll, createPost, updatePost, deletePost, likePost, fetchBySearch } from '../controllers/postControllers.js';
import authUser from '../middlewares/authUser.js';

router.use(authUser);

router.get('/', fetchAll);
router.post('/createPost', createPost);
router.patch('/:id', updatePost);
router.patch('/:id/like', likePost);
router.delete('/:id', deletePost);
router.get('/search/:string', fetchBySearch);

export default router;