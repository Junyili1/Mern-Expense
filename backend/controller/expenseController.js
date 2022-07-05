const asyncHandler = require("express-async-handler");

const Expense = require("../models/expenseModel");

//Gets Expenses
//Route GET /api/expenses
const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find();

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

  await expense.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
};
