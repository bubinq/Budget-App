import express from "express"
import { verifyToken } from "../verifyToken.js"
import { addExpense } from "../contollers/expense.js"


const router = express.Router()

router.post("/create", verifyToken, addExpense)

export default router;