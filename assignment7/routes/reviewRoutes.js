import express from 'express';
import { addReview, displayReview } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', addReview);
router.get('/:id', displayReview);

export default router;