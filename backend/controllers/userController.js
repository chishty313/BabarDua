import userModel from "../models/userModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";


// get user controller ... //
export const getUserController = async (req, res, next) => {
  try {
    const { userid, username } = req.params;
    
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }
    
    res.status(200).json({
      message: "user fetched success",
      success: true,
      user,
    });
    next();
  } catch (error) {
    next(error);
  }
};




export const getUserDetails = async (req, res, next) => {
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
    return res.status(200).json({ user });
  } catch (error) {
    // console.error(`Error fetching user details: ${error.message}`);
    // return res.status(500).json({ error: 'Internal Server Error' });
    next(error.message)
  }
}




// Update user: 
export const updateUser = async (req, res, next) => {
  // const {username} = req.user
  try {
    const { id, ...updatedUserInfo } = req.body;
    //validate

    //check if a user already exist
    const user = await User.findById(id);

    if (!user) {
      next("user doesn't exist");
    }
    // construct the queryObj based on req.body

    // const QueryObj = {};
    // if (firstName) QueryObj.firstName = firstName;
    // if (lastName) QueryObj.lastName = lastName;
    // if (email) QueryObj.email = email;
    // if (bio) QueryObj.bio = bio;
    // if (preferredGenres) QueryObj.preferredGenres = preferredGenres;

    // //update the user:

    // user.firstName = QueryObj.firstName || user.firstName;
    // user.lastName = QueryObj.lastName || user.lastName;
    // user.email = QueryObj.email || user.email;
    // user.bio = QueryObj.bio || user.bio;
    // user.preferredGenres = QueryObj.preferredGenres || user.preferredGenres;

    await userModel.findByIdAndUpdate(
      id,
      updatedUserInfo
    );

    res.status(201).send({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// get all users
export const getAllUserDetails = async (req, res, next) => {


  try {
    const user = await User.find({}).select("-password")

    // You now have user details with populated shelf data
    return res.status(200).json({ user });
  } catch (error) {
    // console.error(`Error fetching user details: ${error.message}`);
    // return res.status(500).json({ error: 'Internal Server Error' });
    next(error.message)
  }
}