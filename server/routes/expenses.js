import express from "express"
import { verifyToken } from "../verifyToken.js"
import { addExpense, deleteExpense, getRecentUserExpenses, getAllUserExpenses, getMonthlyUserExpenses, getYearlyUserExpenses } from "../contollers/expense.js"


const router = express.Router()

router.get("/all/:userId", getAllUserExpenses)
router.get("/monthly/:userId", getMonthlyUserExpenses)
router.get("/yearly/:userId", getYearlyUserExpenses)
router.get("/recent/:userId", getRecentUserExpenses)
router.post("/create", verifyToken, addExpense)
router.delete("/delete/:expenseId", verifyToken, deleteExpense)

export default router;