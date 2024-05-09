import BookModel from '../models/bookModel.js';

// Create a new book
const createBook = async (req, res) => {
    const bookData = req.body;
    try {
        const newBook = await BookModel.createNewBook(bookData);
        res.status(201).json({ success: true, message: 'New Book created successfully', book: newBook });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update a book
const updateBook = async (req, res) => {
    const {id} = req.params;
    try {
        const updatedBook = await BookModel.updateBookById(id, req.body);
        if (!updatedBook) {
            return res.status(404).json({ success: false, error: 'No such book for update' });
        }
        res.status(200).json({ success: true, message: 'Book updated successfully', book: updatedBook });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    const {id} = req.params;
    try {
        const deletedBook = await BookModel.deleteBookById(id);
        if (!deletedBook) {
            return res.status(404).json({ success: false, error: 'No such book found for delete' });
        }
        res.status(200).json({ success: true, message: 'Book deleted successfully', book: deletedBook });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

//Get Books 
const getBooks = async (req, res) => {
    try {
        const queryParams = req.query;
        // const bookReview= 
        const {showBooks} = await BookModel.getAllBooks(queryParams);
        res.status(200).json({ success: true, message: 'Books retrieved successfully', books: showBooks });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get a single book
const getBook = async (req, res) => {
    const {id} = req.params
    try {
        const singleBook = await BookModel.getBookById(id);
        if (!singleBook) {
            return res.status(404).json({ success: false, error: 'No such book found in the database' });
        }
        res.status(200).json({ success: true, message: 'Book retrieved successfully', book: singleBook });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
    
export {
    createBook,
    updateBook,
    deleteBook,
    getBooks,
    getBook
};


