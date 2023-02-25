const { find } = require("../models/userModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { request } = require("express");
const { validateMongooseId } = require("../utils/validateMongodbId");
// create user ctl
const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    //create new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User already exist");
  }
});

//update user

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  console.log(req.user);
  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body.firstname,
        lastname: req?.body.lastname,
        email: req?.body.email,
        phone: req?.body.phone,
      },
      {
        new: true,
      }
    );
    res.json({
      updateUser,
    });
  } catch (err) {
    throw new Error(err);
  }
});

//login ctl
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      phone: findUser?.phone,
      token: generateToken(findUser.id),
    });
  } else {
    throw new Error("Invalid email or password");
  }
});

//get all users
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    throw new Error(err);
  }
});
//get  a user

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.json({ user });
  } catch (err) {
    throw new Error(err);
  }
});
//destroy a user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    res.json({ user });
  } catch (err) {
    throw new Error(err);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongooseId(id);

  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      msg: "User is blocked",
    });
  } catch (err) {
    throw new Error(err);
  }
});
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongooseId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      msg: "User is unblocked",
    });
  } catch (err) {
    throw new Error(err);
  }
});
module.exports = {
  createUser,
  updateUser,
  loginUser,
  getUsers,
  getUser,
  deleteUser,
  blockUser,
  unblockUser,
};
