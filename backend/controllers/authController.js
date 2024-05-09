import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

// signup controller ...//
export const signupController = async (req, res, next) => {
  try {
    const { username, firstName, lastName, email, password, bio, preferredGenres } = req.body;
    //validate
    if (!username) {
      next("username is required");
    }
    if (!email) {
      next("email is required");
    }
    if (!password) {
      next("password is required");
    }

    //check if a user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      next("user already exists");
    }

    const shelves = [
      {label: "To Read", isDefault: true},
      {label: "Reading", isDefault: true},
      {label: "Read", isDefault: true},
    ]

    const newUser = await User.create({ username, firstName, lastName, email, password, preferredGenres, bio, shelves });
    // json token
    const token = newUser.createJWT();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None"
    });

    res.status(201).send({
      success: true,
      message: "User created successfully",
      user: {
        _id: newUser._id,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        preferredGenres: newUser.preferredGenres,
      },
      token
    });
  } catch (error) {
    next(error);
  }
};

// login controller ... //
export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }

    // can alternatively use user.comparePassword
    const auth = await bcrypt.compare(password, user.password);
    console.log(auth)
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    //after that create a token & send response
    // user.password = undefined; // for security purpose
    const token = user.createJWT();
    console.log(token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true
    });

    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user,
      token,
    });
    next();
  } catch (error) {
    next(error);
  }
};

// update password  // 
export const updatePassword = async (req, res, next) => {
  const { username } = req.user;
  const {oldPassword, newPassword} = req.body

  try {
    const user = await User.findOne({ username }).select("+password")
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const auth = await bcrypt.compare(oldPassword, user.password);
    console.log(auth)
    if (!auth) {
      return res.json({ message: "Current password invalid" });
    }
    // Update the user's password
    user.password = newPassword;
    await user.save(); // password will be hashed before saved

    return res.status(200).json({ success: true, message: "Password updated"});
  } catch (error) {
    // console.error(`Error fetching user details: ${error.message}`);
    // return res.status(500).json({ error: 'Internal Server Error' });
    next(error.message)
  }
}

// ! get user info
export const getUserInfo = async (req, res, next) => {
  const userId = req.userid;


  try {
    const user = await User.findById(userId).select("-password")
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(
      {
        success: true,
        message: "Password updated",
        data: user
      }
    );
  } catch (error) {
    // console.error(`Error fetching user details: ${error.message}`);
    // return res.status(500).json({ error: 'Internal Server Error' });
    next(error.message)
  }
}


// ! delete user 
export const deleteUser = async (req, res, next) => {
  const userIdToDelete = req.params.userId;
  console.log({ userIdToDelete });


  try {
    const user = await User.findByIdAndDelete(userIdToDelete)


    return res.status(200).json(
      {
        success: true,
        message: "User deleted successfully",
      }
    );
  } catch (error) {
    // console.error(`Error fetching user details: ${error.message}`);
    // return res.status(500).json({ error: 'Internal Server Error' });
    next(error.message)
  }
}