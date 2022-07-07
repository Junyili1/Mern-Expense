const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//Register new User
//POST /api/users
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill every field");
  }

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }

  res.json({ message: "Registered User" });
});

//Authenticate User
//POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "logged in User" });
});

//Gets User
//Get /api/users/me
const getUser = asyncHandler(async (req, res) => {
  res.json({ message: "Fetch User" });
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
};