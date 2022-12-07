import Expense from "../models/expense.js";
import { colors } from "../utils.js";

export const getRecentUserExpenses = async (req, res) => {
  const count = await Expense.countDocuments({ ownerId: req.params.userId });
  let skipN = count - 8;
  try {
    const expenses = await Expense.find({ ownerId: req.params.userId })
      .skip(skipN < 0 ? 0 : skipN)
      .limit(8)
      .sort({ createdAt: 1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
export const getAllUserExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ ownerId: req.params.userId });
    res.status(200).json(expenses);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const getUserPrefExpenses = async (req, res) => {
  const { month, year } = req.body;
  const lastDay = new Date(year, month, 0).getDate();
  try {
    const expenses = await Expense.find({ ownerId: req.params.userId })
      .gte("createdAt", `${year}-${month < 10? "0" : ""}${month}-01T00:00:00Z`)
      .lte("createdAt", `${year}-${month < 10? "0" : ""}${month}-${lastDay}T00:00:00Z`);
    res.status(200).json(expenses);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
export const getMonthlyUserExpenses = async (req, res) => {
  const date = new Date();
  const currMonth = date.getMonth();
  const lastDay = new Date(date.getFullYear(), currMonth + 1, 0).getDate();
  try {
    const expenses = await Expense.find({ ownerId: req.params.userId })
      .gte("createdAt", `2022-${currMonth + 1}-01T00:00:00Z`)
      .lte("createdAt", `2022-${currMonth + 1}-${lastDay}T00:00:00Z`);
    res.status(200).json(expenses);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const getYearlyUserExpenses = async (req, res) => {
  const year = new Date().getFullYear();
  try {
    const expenses = await Expense.find({ ownerId: req.params.userId })
      .gte("createdAt", `${year}-01-01T00:00:00Z`)
      .lt("createdAt", `${year + 1}-01-01T00:00:00Z`);
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
