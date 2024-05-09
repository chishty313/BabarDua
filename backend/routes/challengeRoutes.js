import express from 'express';
import { getChallenge, addTargetBooks, updateTargetBooks, deleteChallenge, challengeLeaderBoard } from '../controllers/challengeController.js';
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/get-challenge', authMiddleware, getChallenge);

router.post('/add-target-books', authMiddleware, addTargetBooks);

router.patch('/update-target-books', authMiddleware, updateTargetBooks);

router.delete('/delete-challenge', authMiddleware, deleteChallenge);

router.get('/challenge-leaderboard', challengeLeaderBoard);


export default router;
