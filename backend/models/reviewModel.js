import mongoose from 'mongoose';

const { Schema } = mongoose;

const reviewSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  book: {
    type: mongoose.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviewText: {
    type: String,
    default: '',
  },
  likes: {
    type: [mongoose.Types.ObjectId],
    ref: "User",
    default: [],
  },
  dislikes: {
    type: [mongoose.Types.ObjectId],
    ref: "User",
    default: [], 
  },
  reportToTheReview: [
    {
      id: {
        type: [mongoose.Types.ObjectId],
        ref: "User",
        default: [],
      },
      text: {
        type: String,
        required: true,
      }
    }
  ]
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;