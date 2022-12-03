import express from "express"
import { verifyToken } from "../verifyToken.js"
import { addExpense, getUserExpenses } from "../contollers/expense.js"


const router = express.Router()

router.get("/get/:userId", getUserExpenses)
router.post("/create", verifyToken, addExpense)

export default router;