import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js';
import { createContestResponse, deleteContestResponse, getContestResponse, getContestResponses } from '../controllers/WritingContestResponse.js';

const router = express.Router();

// Create a new contest response
router.post('/', authMiddleware, createContestResponse);

// Update a contest response by ID
// router.patch('/:id', authMiddleware, updateContestResponse);

// Delete a contest response by ID
router.delete('/:id', authMiddleware, deleteContestResponse);

// Get all contest responses
router.get('/', getContestResponses);

// Get a specific contest response by ID
router.get('/:id', getContestResponse);

export default router;
