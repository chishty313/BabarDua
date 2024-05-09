import mongoose from 'mongoose';

const { Schema } = mongoose;

const bookRequestSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isbn: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    genres: {
        type: [String],
        required: true
    },

}, { timestamps: true })

const BookRequestModel = mongoose.model('BookRequest', bookRequestSchema);

export default BookRequestModel