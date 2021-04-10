import AsyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

/*  @desc   Auth User && get token
    @route  POST /api/users/login
    @access Public
*/
const authUser = AsyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or Password");
  }
});

/*  @desc   Register User
    @route  POST /api/users/
    @access Public
*/
const registerUser = AsyncHandler(async (req, res) => {
  const { fullname, username, email, password, role } = req.body;

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    fullname,
    role,
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      fullname: user.fullname,
      role: user.role,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

/*  @desc   Get User Profile
    @route  GET /api/users/profile
    @access Private
*/
const getUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      fullname: user.fullname,
      role: user.role,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

/*  @desc   Update User Profile
    @route  PUT /api/users/profile
    @access Private
*/
const updateUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.fullname = req.body.fullname || user.fullname;
    user.username = req.body.username || user.username;
    user.role = req.body.role || user.role;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      fullname: updatedUser.fullname,
      role: updatedUser.role,
      username: updatedUser.username,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

/*  @desc   Delete Account
    @route  DELETE /api/users/profile
    @access Private
*/
const deleteOwnAccount = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    await user.remove();
    res.json({ message: "Your account successfully removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/*  @desc   Get all users
    @route  GET /api/users
    @access Private/Admin
*/
const getUsers = AsyncHandler(async (req, res) => {
  const user = await User.find({});
  res.json(user);
});

/*  @desc   Delete user
    @route  DELETE /api/users/:id
    @access Private/Admin
*/
const deleteUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/*  @desc   Get user by ID
    @route  GET /api/users/:id
    @access Private/Admin
*/
const getUserById = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  deleteOwnAccount,
  getUsers,
  deleteUser,
  getUserById,
};
