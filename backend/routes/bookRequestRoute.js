import express from 'express';
import authMiddleware from "../middlewares/authMiddleware.js";
import { createBookRequest, getAllBookRequest, getSpecificBookRequest } from '../controllers/bookRequestController.js';

const router = express.Router();

// Post a new book
router.post('/', authMiddleware, createBookRequest);

// get all book requests
router.get('/', getAllBookRequest);

// get specific book requests
router.get('/:id', authMiddleware, getSpecificBookRequest);



export default router;
