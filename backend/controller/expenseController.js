const asyncHandler = require("express-async-handler");

const Expense = require("../models/expenseModel");
const User = require("../models/userModel");

//Gets Expenses
//Route GET /api/expenses
const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find({ user: req.user.id });

  res.status(200).json(expenses);
});

//Creates Expenses
//Route CREATE /api/expenses
const createExpense = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const expense = await Expense.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(201).json(expense);
});

//Updates Expenses
//Route /api/expenses/:id
const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(400);
    throw new Error("Unable to find expense");
  }

  const user = await User.findById(req.user.id);

  //Checks for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (expense.user.toString() !== user.id) {
    res.status(401);
    throw new Error("Unauthorized user");
  }

  const updatedExpense = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedExpense);
});

//Deletes Expenses
//Route /api/expenses/:id
const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    res.status(400);
    throw new Error("Unable to find and delete expense");
  }

  const user = await User.findById(req.user.id);

  //Checks for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (expense.user.toString() !== user.id) {
    res.status(401);
    throw new Error("Unauthorized user");
  }

  await expense.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
};
