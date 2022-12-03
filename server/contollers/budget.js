import Budget from "../models/budget.js";

export const getUserBudget = async (req, res) => {
  try {
    const budget = await Budget.find({ownerId: req.params.userId})
    res.status(200).json(budget);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const setBudget = async (req, res) => {
  try {
    const newBudget = await Budget.create({
      ownerId: req.user.id,
      amount: req.body.amount,
    });
    const savedBudget = await newBudget.save();
    res.status(200).json(savedBudget);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const editBudget = async (req, res) => {
  try {
    const budget = await Budget.findOneAndUpdate(
      { id: req.params.budgetId },
      { $set: { amount: req.body.amount } },
      { new: true }
    );
    res.status(200).json(budget);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};
