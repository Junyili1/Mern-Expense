const mongoose = require("mongoose");
const expenseSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
  },
  {
    timestamps: true,
  }
);

module.export = mongoose.model("Expense", expenseSchema);
