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

export { authUser, registerUser };
