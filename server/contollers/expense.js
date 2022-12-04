import Expense from "../models/expense.js";
import { colors } from "../utils.js";

export const getUserExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ ownerId: req.params.userId });
    res.status(200).json(expenses);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
export const addExpense = async (req, res) => {
  const { category, amount } = req.body;
  try {
    const newExpense = await Expense.create({
      ownerId: req.user.id,
      category,
      amount,
      color: colors[category],
    });
    const savedExpense = await newExpense.save();
    res.status(200).json(savedExpense);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.expenseId);
    res.status(200).json("Successfully removed expense!");
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
