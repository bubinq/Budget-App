import express from "express"
import { verifyToken } from "../verifyToken.js"
import { addExpense, deleteExpense, getUserExpenses } from "../contollers/expense.js"


const router = express.Router()

router.get("/get/:userId", getUserExpenses)
router.post("/create", verifyToken, addExpense)
router.delete("/delete/:expenseId", verifyToken, deleteExpense)

export default router;