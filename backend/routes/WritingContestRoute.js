import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createContest, deleteContest, getAllContest, getContest, updateContest } from "../controllers/WrittingcontestController.js";


const router = express.Router();

// Get all contests
router.get('/', getAllContest);

// Get a specific contest by ID
router.get('/:contestId', getContest);

// Create a new contest
router.post('/', authMiddleware, createContest);

// Update a contest by ID
router.patch('/:contestId', authMiddleware, updateContest);

// Delete a contest by ID
router.delete('/:contestId', authMiddleware, deleteContest);

export default router;
