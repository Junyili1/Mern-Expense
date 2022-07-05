const asyncHandler = require("express-async-handler");
const Expense = require("../models/expenseModel");

//Gets Expenses
//Route GET /api/expenses
const getExpense = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Hello world" });
});

//Creates Expenses
//Route CREATE /api/expenses
const createExpense = asyncHandler(async (req, res) => {
  res.status(201).json({ message: "Created Expense" });
});

//Updates Expenses
//Route /api/expenses/:id
const updateExpense = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add some text!");
  }
  res.status(200).json({ message: `Updated Expense ${req.params.id}` });
});

//Deletes Expenses
//Route /api/expenses/:id
const deleteExpense = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Deleted Expense ${req.params.id}` });
});

module.exports = {
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
