import { Query } from "mongoose";
import User from "../models/userModel.js";
import { updateProgress } from "./challengeController.js";
import { ObjectId } from "mongodb";


// Create a new shelf for a user by username
export const createShelfByUsername = async (req, res, next) => {
  console.log(req.params, req.body)
  const { username } = req.user;
  const { label } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the shelf already exists
    if (user.shelves.find((shelf) => shelf.label === label)) {
      return res.status(400).json({ error: 'Shelf already exists' });
    }

    // Create a new shelf
    user.shelves.push({ label, default: false, books: [] });
    await user.save();

    return res.status(201).json({ message: 'Shelf created successfully' });
  } catch (error) {
    console.error(`Error creating shelf: ${error.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


// Delete a custom shelf for a user
export const deleteShelf = async (req, res, next) => {
  const userId = req.userid
  let { shelfId } = req.params;
  shelfId = new ObjectId(shelfId);
  console.log(shelfId, 42);
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the shelf exists
    const shelfIndex = user.shelves.filter((shelf) => shelf._id.equals(shelfId));
    console.log({ shelfIndex });
    if (!shelfIndex) {
      return res.status(404).json({ error: 'Shelf not found' });
    }

    // Check if the shelf is a default shelf
    if (shelfIndex?.[0]?.isDefault === true) {
      return res.status(401).json({ error: 'Cannot delete default shelves' });
    }

    // Remove the shelf from the array
    let remaining = user.shelves.filter((shelf) => !shelf._id.equals(shelfId))
    console.log({ remaining });
    user.shelves = remaining
    await user.save();

    return res.status(200).json({ message: 'Shelf deleted successfully' });
  } catch (error) {
    console.error(`Error deleting shelf: ${error.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}



// Add a book to a shelf for a user
export const addBookToShelf = async (req, res) => {
  const userId = req.userid;
  const { shelfId } = req.params;
  console.log({shelfId});
  const bookId = req.body.bookId; //or use isbn instead

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the shelf
    const shelfEqual = user.shelves.filter((shelf) => shelf._id.equals(shelfId))
    let shelfNotEqual = user.shelves.filter((shelf) => !shelf._id.equals(shelfId))

    if (shelfEqual.length===0) {
      return res.status(404).json({ error: 'Shelf not found' });
    }

    console.log({ shelfEqual },99);
    console.log({shelfNotEqual},100);

    // Check if the book is already in the shelf
    if (shelfEqual[0].books.includes(bookId)) {
      return res.status(400).json({ error: 'Book already in the shelf' });
    }

    shelfEqual[0].books.push(bookId);
    let newBookShelf=[]
    for (const shelves of shelfNotEqual) {
      shelves.books = shelves.books.filter(book => !book.equals(bookId))
      // newBookShelf.push(tempShelf)
    }
// shelfNotEqual=shelfNotEqual.forEach(shelves=>shelves.books=shelves.books.filter(book=>!book.equals(bookId)))
    console.log([...shelfEqual,...shelfNotEqual],106);
    user.shelves=[...shelfEqual,...shelfNotEqual]

    // create the comprehensive QueryObject: 
    // const QueryObj = { book: bookId };

    // // check if the shelf is `Read` & year is current year-> increase progress
    
    // if (shelfName === 'Read') {
    //   // if (!dateStarted) {
    //   //   dateStarted = new Date("1-1-2023")
    //   // }
    //   // if (!dateFinished) {
    //   //   dateFinished = new Date("6-6-2023")
    //   // }
    //   QueryObj.dateStarted = new Date(dateStarted || "1-2-2023") ;
    //   QueryObj.dateFinished = new Date(dateFinished || "6-6-2023");
      
    //   // call a function from takeChallenge
    //   await updateProgress(user.username, true)
    // }
    // if (shelfName === "Reading") {
    //   //only datestarted and page
    //   // if (!dateStarted) {
    //   //   dateStarted = new Date("1-1-2023")
    //   // }
      
    //   QueryObj.dateStarted = new Date(dateStarted || "1-2-2023");
    //   QueryObj.pageProgress = pageProgress || 1;
    //   // call a function from takeChallenge
    //   await updateProgress(user.username, false)
    // }

    // Add the book to the shelf
    // shelf.books.push(bookId);
    await user.save();

    return res.status(200).json({
      message: `Book added to ${shelfEqual[0]?.label} successfully`,
    });
  } catch (error) {
    console.error(`Error adding book to shelf: ${error.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Remove book from shelf
export const removeBookFromShelf = async (req, res, next) => {
  try {
    const { shelfId} = req.params;
    const userId = req.userid; 
    const bookId=req.body

    // Find the user and check if the shelf exists
    const user = await User.findById(userId);

     // Find the shelf
     const shelfEqual = user.shelves.filter((shelf) => shelf._id.equals(shelfId))
     const shelfNotEqual = user.shelves.filter((shelf) => !shelf._id.equals(shelfId))
 
     if (shelfEqual.length===0) {
       return res.status(404).json({ error: 'Shelf not found' });
     }
 

    // Find the book in the shelf
    const bookIndex = shelfEqual[0].books.includes(bookId.bookId);

    if (!bookIndex) {
      return res.status(404).json({ error: 'Book not found in the shelf' });
    }

    console.log({shelfEqual:shelfEqual[0].books},179);

    // Remove the book from the shelf
    const updatedShelf = shelfEqual[0].books.filter(shelf => !shelf.equals(bookId.bookId))
    shelfEqual[0].books=updatedShelf

    // console.log({updatedShelf},184);
    

    user.shelves=[...shelfEqual,...shelfNotEqual]
    await user.save();

    return res.status(200).json({ message: 'Book removed from shelf successfully' });
  } catch (error) {
    console.error('Error in removeBookFromShelf:', error);
    next(error);
  }
};


// Get detailed shelves 
export const getShelves = async (req, res, next) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).select("-password").populate({
      path: 'shelves.books',
      model: 'Book',
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // You now have user details with populated shelf data
    return res.status(200).json({ "shelves": user.shelves });
  } catch (error) {
    // console.error(`Error fetching user details: ${error.message}`);
    // return res.status(500).json({ error: 'Internal Server Error' });
    next(error.message)
  }
}