const express = require("express");
const router = express.Router();
const {
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
} = require("../controller/expenseController");

router.route("/").get(getExpense).post(createExpense);

router.route("/:id").put(updateExpense).delete(deleteExpense);

module.exports = router;
