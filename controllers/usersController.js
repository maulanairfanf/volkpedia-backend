const express = require('express');
const User = require('../models/Users');
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')

const genToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '30d' });
}

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const checkPassword = bcrypt.compareSync(password, user.password)

  if (user && checkPassword) {
    res.json({
      _id: user._id,
      fullName: user.fullName,
      isAdmin: user.isAdmin,
      token: genToken(user._id)
    })
  } else {
    res.status(401);
    throw new Error('Invalid email or password.')
  }
}
);


const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400)
    throw new Error("We already have an account with that email address. ");
  }

  const user = await User.create({
    fullName,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const getUsers = async (req, res, next) => {
  try {
    const result = await User.find()

    res
      .status(200)
      .setHeader('Content-Type', 'application/json')
      .json(result)
  } catch (err) {
    throw new Error(`Error retrieving users: ${err.message}`)
  }
}

const postUser = async (req, res, next) => {
  try {
    const result = await User.create(req.body)
    res
      .status(201)
      .setHeader('Content-Type', 'application/json')
      .json(result)
  } catch (err) {
    throw new Error(`Error displaying a new user: ${err.message}`)
  }
}

const deleteUsers = asyncHandler(async (req, res, next) => {
  try {
    await User.deleteMany({});
    res.status(200).json({
      success: true,
      msg: 'All users were deleted'
    });
  } catch (err) {
    throw new Error(`Error deleting users: ${err.message}`);
  }
});

const getUser = asyncHandler(async (req, res, next) => {
  try {
    const result = await User.findById(req.params.id)
    if (!result) {
      res.status(404)
      throw new Error("User not found.");
    }
    res
      .status(200)
      .setHeader('Content-Type', 'application/json')
      .json({
        _id: result._id,
        fullName: result.fullName,
        email: result.email,
      })
  } catch (err) {
    throw new Error(`Error retrieving user: ${err.message}`)
  }
})

const putUser = asyncHandler(async (req, res, next) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!result) {
      res.status(404)
      throw new Error("User not found.");
    }

    res
      .status(200)
      .setHeader('Content-Type', 'application/json')
      .json(result)
  } catch (err) {
    throw new Error(`Error updating user: ${err.message}`)
  }
})

const deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.deleteOne({_id: userId});
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // await user.remove();

  res.json({ success: true, message: 'User deleted successfully' });
});


module.exports = {
  getUsers,
  postUser,
  deleteUsers,
  getUser,
  putUser,
  deleteUser,
  loginUser,
  registerUser
}