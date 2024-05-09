import express from 'express';

import {createBook,updateBook,deleteBook,getBooks,getBook} from '../controllers/bookController.js';

const router = express.Router();

// Post a new book
router.post('/create-book', createBook);

// Update a book
router.patch('/update-book/:id', updateBook);

// Delete a book
router.delete('/delete-book/:id', deleteBook);

// Get all books
router.get('/get-books', getBooks);

//Get a single book
router.get('/get-book/:id', getBook);

export default router;
