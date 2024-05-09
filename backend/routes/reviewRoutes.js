import express from 'express';
import { 
    addReview,
    editReview, 
    deleteReview, 
    getReviewsByBookId, 
    getReviewsByUsername, 
    likeReview,
    dislikeReview,
    getBookReviewByUser,
    addReportToComment
} from '../controllers/reviewController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();
 
router.post('/add-review', authMiddleware, addReview);

router.put('/edit-review/:id', authMiddleware, editReview);

router.delete('/delete-review', deleteReview);

router.get('/get-book-reviews/:bookId', getReviewsByBookId);

// router.get('/get-user-reviews/:username', getReviewsByUsername);

router.get('/get-user-reviews/:bookId', authMiddleware, getBookReviewByUser);


router.post('/like-review/:reviewId', authMiddleware, likeReview);

router.post('/dislike-review/:reviewId', authMiddleware, dislikeReview);

router.post('/get-book-reviews/:id', authMiddleware, dislikeReview);

router.post('/review-report/:reviewId', authMiddleware, addReportToComment);

export default router;