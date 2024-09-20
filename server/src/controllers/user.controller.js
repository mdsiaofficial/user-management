const User = require("../models/user.model.Js");
const asyncHandler = require("../utils/asyncHandler.js")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const allUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.status(201).json(users);
});

const userById = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).select('-password');
  res.status(201).json(user);
});


module.exports = { allUsers, userById };