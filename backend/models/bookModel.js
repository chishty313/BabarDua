import mongoose from 'mongoose';

const { Schema } = mongoose;

const bookSchema = new Schema({

    isbn: {
        type : String,
        required : true
    },

    title : {
        type : String,
        required : true
    },
    
    author: {
        type : String,
        required : true
    },
    authorImage: {
        type: String,
        required: true
    },
    authorDetails: {
        type: String,
        required: true
    },
    description : {
        type : String,
        required : true
    },

    image : {
        type : String,
        required : true
    },

    genres: {
        type: [String],
        required : true
    },
    
    avgRating: {
        type: Number,
        default: 0
    },
    
    totalPages: {
        type: Number,
        required : true
    }
}, {timestamps : true})

const Book = mongoose.model('Book', bookSchema);

//For creating new book
const createNewBook = async (bookData) => {
    try {
        const newBook = await Book.create(bookData);
        return newBook;
    } catch (error) {
        return false; 
    }
};

//For updating a book
const updateBookById = async (id, updatedData) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return false; 
        }

        const updatedBook = await Book.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });

        if (updatedBook) {
            return updatedBook;
        } else {
            return false; 
        }
    } catch (error) {
        return false; 
    }
};

//For deleting a book
const deleteBookById = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return false; 
        }
        const deletedBook = await Book.findOneAndDelete({ _id: id });
        if (!deletedBook) {
            return false; 
        }
        return deletedBook;
    } catch (error) {
        return false; 
    }
};

//For getting books
const getAllBooks = async (queryParams) => {

    const { search, filter, sort, page, limit } = queryParams;
    
    const queryObject = {};
    
    //Search based on Book Title or Author
    if (search) {
        queryObject.$or = [
            { title: { $regex: search, $options: 'i' } },
            { author: { $regex: search, $options: 'i' } },
        ];
    }

    //Filter based on Book Genre
    if (filter) {
        queryObject.genres = { $in: filter.split(',') };
    }

    //Sorting
    const sortOptions = {};
    if (!sort) {
        sortOptions.title = 1;
    } else {
        if (sort === "Newest") {
            sortOptions.createdAt = -1;
        } else if (sort === "Oldest") {
            sortOptions.createdAt = 1;
        } else if (sort === "A-Z") {
            sortOptions.title = 1;
        } else if (sort === "Z-A") {
            sortOptions.title = -1;
        } else if (sort === 'asc') {
            sortOptions.avgRating = 1;
        } else if (sort === 'desc') {
            sortOptions.avgRating = -1;
        }
    }
    
    // //Pagination
    // const pageNumber = Number(page) || 1;
    // const pageSize = Number(limit) || 5;

    // const skip = (pageNumber - 1) * pageSize;

    const showBooks = await Book.find(queryObject)
        .select('isbn title author description image genres ratings avgRating')
        // .skip(skip)
        .sort(sortOptions)
    // .limit(pageSize);

    return { showBooks };
};

//For getting a single book
const getBookById = async (id) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return false;
        }
        const singleBook = await Book.findById(id)
        console.log({ singleBook });
        if (!singleBook) {
            return false;
        }
        return singleBook; 
    } catch (error) {
        console.log('Error getting single book', { error });
        return false;
    }
};


export default {Book, createNewBook, updateBookById, deleteBookById, getAllBooks, getBookById};
   