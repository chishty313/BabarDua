import mongoose from 'mongoose';
import bookModel from '../models/bookModel.js';
import BookModel from '../models/bookModel.js';
const { Book } = BookModel;
import { ObjectId } from 'mongodb';
import Review from '../models/reviewModel.js';
import User from '../models/userModel.js';

//Add Review
const addReview = async (req, res) => {
  try {
    const userId = req.userid
    const { bookId, rating, reviewText } = req.body;

    // Checking User Input
    if (!bookId || (rating===undefined && reviewText===undefined)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input.',
      });
    }

    //Find Book
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    //User has already rated the book or not
    const existingReview = await Review.findOne({ userId, book: bookId });

    // // User has already reviewed the book or not
    // const existingReview = await Review.findOne({ username: req.username, book: bookId, reviewText: { $exists : true} });

    if (existingReview){
      return res.status(400).json({
        success: false,
        message: 'You have already rated and reviewed this book',
      });
    }
    if (rating!==undefined && rating!==null && existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already rated or reviewed this book. If you want to rate, try editing',
      });
    }
    console.log(existingReview)
    if (reviewText!==undefined && existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already rated or reviewed this book. If you want to review, try editing ',
      });
    }

    // Creating a new review/rating
    const newReview = await Review.create({
      userId,
      book: bookId,
      rating: rating ,
      reviewText: reviewText ,
    });
    // await newReview.save();

    await updateBookAvgRatings(bookId)

    // Finding all reviews for the book
    // const allBookReviews = await Review.find({ book: bookId });

    // //Calculating avgRating of the book
    // if (allBookReviews.length !== 0) {
    //   let totalRating = 0;
    //   let countValidReviews = 0;
    //   allBookReviews.forEach((review) => {
    //     if (review.rating !== 0) {
    //       totalRating += review.rating;
    //       countValidReviews += 1;
    //     }
        
    //   }); 
    //   if (countValidReviews!==0){
    //     const newAvgRating = totalRating / countValidReviews;
    //     book.avgRating = newAvgRating;
    //     await book.save();
    //   }
      
    // }

    res.status(201).json({
      success: true,
      message: 'Review or Rating added successfully',
      review: newReview,
    });
  } catch (error) {
    console.error('Error in addReviewOrRating:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

//Edit Review
const editReview = async (req, res) => {
  try {
    const id = req.params.id;
    const { bookId, rating, reviewText} = req.body;

    // Checking User Input
    if (!bookId || (rating===undefined && reviewText===undefined)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input.',
      });
    }

    //Find Book
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }


    // User has already reviewed the book or not
    const existingReview = await Review.findById(id);

    
    if (!existingReview) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    // Update the rating or review
    existingReview.rating = rating !== undefined ? rating : existingReview.rating;
    existingReview.reviewText = reviewText !== undefined ? reviewText : existingReview.reviewText;

    
    await existingReview.save();

    // // Finding all reviews for the book
    // const allBookReviews = await Review.find({ book: bookId });

    await updateBookAvgRatings(bookId)

    // if (allBookReviews.length !== 0) {
    //   let totalRating = 0;
    //   let countValidReviews = 0;
    //   allBookReviews.forEach((review) => {
    //   if (review.rating !== 0) {
    //     totalRating += review.rating;
    //     countValidReviews += 1;
    //   }  
    //   }); 
    //   if (countValidReviews!==0){
    //     const newAvgRating = totalRating / countValidReviews;
    //     book.avgRating = newAvgRating;
    //     await book.save();
    //   }
    // }
  res.status(200).json({ success: true, message: 'Review updated successfully', review: existingReview });
} catch (error) {
    console.error('Error in editReview:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

//Delete Review
const deleteReview = async (req, res) => {
  try {
    const { bookId, deleteRating, deleteReviewText } = req.body;

    //Check User Input
    if (!bookId || ((typeof deleteRating !== 'boolean') && (typeof deleteReviewText !== 'boolean'))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input.'
      });
    }

    //Find Book
    const book = await Book.findById(bookId);

    //If book does not exist
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    
    // Find the existing review
    const existingReview = await Review.findOne({ username: req.username, book: bookId });

    //No review by this user for this book
    if (!existingReview) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    //If both false then nothing should be changed
    if (!deleteRating && !deleteReviewText) {
      return res.status(200).json({ success: true, message: 'No need to delete rating or review', review: existingReview });
    }

    //If both are true then the entire review deleted
    if (deleteRating && deleteReviewText) {
      const deletedReview = await Review.findByIdAndDelete(existingReview._id);

      if (!deletedReview) {
        return res.status(404).json({ success: false, message: 'Review not found' });
      }
      // // Finding all reviews for the book
      // const allBookReviews = await Review.find({ book: bookId });

      // //Calculating avgRating
      // if (allBookReviews.length !== 0) {
      //   let totalRating = 0;
      //   let countValidReviews = 0;
      //   allBookReviews.forEach((review) => {
      //   if (review.rating !== 0) {
      //     totalRating += review.rating;
      //     countValidReviews += 1;
      //   }
      //   });
      //   if (countValidReviews!==0){
      //     const newAvgRating = totalRating / countValidReviews;
      //     book.avgRating = newAvgRating;
      //     await book.save();
      //   }
      // }
      await updateBookAvgRatings(bookId)

      return res.status(200).json({ success: true, message: 'Review deleted successfully', review: deletedReview });
    }

    //If one of them was not present, the other one is true
    if ((deleteRating && existingReview.reviewText==='')|| (deleteReviewText && existingReview.rating ===0)){
      const deletedReview = await Review.findByIdAndDelete(existingReview._id);

      if (!deletedReview) {
        return res.status(404).json({ success: false, message: 'Review not found' });
      }

      // Finding all reviews for the book
      const allBookReviews = await Review.find({ book: bookId });
      console.log(allBookReviews)

      //Calculating avgRating
      if (allBookReviews.length !== 0) {
        let totalRating = 0;
        let countValidReviews = 0;
        allBookReviews.forEach((review) => {
        if (review.rating !== 0) {
          totalRating += review.rating;
          countValidReviews += 1;
        }  
        }); 
        if (countValidReviews!==0){
          const newAvgRating = totalRating / countValidReviews;
          book.avgRating = newAvgRating;
          await book.save();
        }
      }

      return res.status(200).json({ success: true, message: 'Review deleted since no rating and reviewtext', review: deletedReview });
    }

    //Rating will be default one
    if (deleteRating) {
      existingReview.rating = 0;
    }
    
    //Review will be default one
    if (deleteReviewText) {
      existingReview.reviewText = '';
    }
    await existingReview.save();

    // Finding all reviews for the book
    const allBookReviews = await Review.find({ book: bookId });
    console.log(allBookReviews)

    //Calculating avgRating
    if (allBookReviews.length !== 0) {
      let totalRating = 0;
      let countValidReviews = 0;
      allBookReviews.forEach((review) => {
      if (review.rating !== 0) {
        totalRating += review.rating;
        countValidReviews += 1;
      }  
      }); 
      if (countValidReviews!==0){
        const newAvgRating = totalRating / countValidReviews;
        book.avgRating = newAvgRating;
        await book.save();
      }
    }

    res.status(200).json({ success: true, message: 'Review updated successfully after deletion', review: existingReview });
  } catch (error) {
    console.error('Error in deleteReview:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

//Get all reviews for a particular book
const getReviewsByBookId = async (req, res) => {
  try {
    const { bookId } = req.params;

    if (!bookId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input.',
      });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    const reviews = await Review.find({ book: bookId }).populate('userId');

    res.status(200).json({
      success: true,
      message: 'Reviews retrieved successfully',
      reviews,
    });
  } catch (error) {
    console.error('Error in getReviewsByBookId', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


//Get all reviews for an user
const getReviewsByUsername = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input.',
      });
    }

    // Check if the user exists
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    // User exists, now fetch reviews
    const reviews = await Review.find({ userId }).populate('userId');

    if (reviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No reviews found for the specified user.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Reviews retrieved successfully',
      reviews,
    });
  } catch (error) {
    console.error('Error in getReviewsByUsername', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

//Like Review
const likeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    // Find the review by ID
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    const userId = req.userid;

    // Checking if the user has already liked the review
    if (review.likes.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: 'You have already liked this review',
        likes: review.likes,
        dislikes : review.dislikes
      });
    }

    // Checking if the user has disliked the review, if yes, remove the dislike
    if (review.dislikes.includes(userId)) {
      const index = review.dislikes.indexOf(userId);
      review.dislikes.splice(index, 1);
    }

    
    review.likes.push(userId);

    
    await review.save();

    res.status(200).json({
      success: true,
      message: 'Review liked successfully',
      review : review,
      likes: review.likes,
    });
  } catch (error) {
    console.error('Error in likeReview:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

//Dislike Review
const dislikeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.userid

    // Find the review by ID
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    // const username = req.username;

    //Checking if the user has already disliked the review
    if (review.dislikes.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: 'You have disliked this review',
        likes: review.likes,
        dislikes : review.dislikes
      });
    }

    // Checking if the user has liked the review, if yes, remove the like
    if (review.likes.includes(userId)) {
      const index = review.likes.indexOf(userId);
      review.likes.splice(index, 1);
    }

    // review.dislikes.push(userId);

    await review.save();

    res.status(200).json({
      success: true,
      message: 'Review disliked successfully',
      review : review,
      dislikes: review.dislikes,
    });
  } catch (error) {
    console.error('Error in likeReview:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const updateBookAvgRatings = async (bookId) => {
  // const bookId=new ObjectId(bookId)
  const id =  new ObjectId(bookId);
  console.log('running updateBookAvgRatings',bookId,483);
  const book = await BookModel.getBookById(bookId);
  const bookReview = await Review.aggregate([
    { $match: { book:id} },
  {
        $group: {
            _id: null, // Group all documents together
            averageRating: { $avg: "$rating" } // Calculate the average rating
        }
    }

  ])
  book.avgRating = bookReview[0].averageRating
  await book.save();
  // console.log({bookReview});

  // book.avgReview=
  
}

// ! book review of specified book and user
const getBookReviewByUser = async (req, res) => {
  try {
    const userId=req.userid
    const { bookId } = req.params;



    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    const reviews = await Review.find({ book: bookId, userId }).populate('userId');
    
    if(reviews.length === 0){
      res.status(200).json({
        success: true,
        message: 'No reviews found',
        data:[],
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Reviews retrieved successfully',
        data:reviews,
      });
    }

    
  } catch (error) {
    console.error('Error in getReviewsByBookId', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// ! give a report to the comment

const addReportToComment = async (req, res) => {
  try {
    const userId = req.userid
    // const { bookId } = req.params;
    const reviewId = req.params.reviewId
    const { comment } = req.body

    // const book = await Book.findById(bookId);

    // if (!book) {
    //   return res.status(404).json({
    //     success: false,
    //     message: 'Book not found',
    //   });
    // }

    const reviews = await Review.findByIdAndUpdate(
      reviewId,
      { $push: { reportToTheReview: { id: userId, text: comment } } },
      { new: true }
    ).populate('userId');

    if (reviews.length === 0) {
      res.status(200).json({
        success: true,
        message: 'No reviews found',
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Reviews retrieved successfully',
        data: reviews,
      });
    }


  } catch (error) {
    console.error('Error in getReviewsByBookId', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};



export {
  addReview,
  editReview,
  deleteReview, 
  getReviewsByBookId,
  getReviewsByUsername, 
  likeReview,
  dislikeReview,
  getBookReviewByUser,
  addReportToComment
} ;
