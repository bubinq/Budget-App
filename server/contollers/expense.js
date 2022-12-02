import Expense from "../models/expense.js";

export const addExpense = async (req, res) => {
  const { category, amount } = req.body;
  try {
    const newExpense = await Expense.create({ ownerId: req.user.id, category, amount });
    const savedExpense = await newExpense.save();
    res.status(200).json(savedExpense);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
