import { useContext } from "react";
import { ExpenseContext } from "../context/expenseContext";
import { useTheme } from "../hooks/useTheme";
import { Expense } from "./Expense";

export const Transactions = () => {
  const theme = useTheme();
  const { expenses } = useContext(ExpenseContext);
  return (
    <div className="transactionsWrapper">
      <h1 style={{ color: theme.text }}>Transaction History</h1>
      <div className="tansactionsHeading">
        <span style={{ color: "rgb(255, 72, 136)" }}>Date</span>
        <span style={{ color: "rgb(255, 72, 136)" }}>Category</span>
        <span style={{ color: "rgb(255, 72, 136)" }}>Amount</span>
        <span style={{ color: "rgb(255, 72, 136)" }}>Remove</span>
      </div>
      <div className="expensesWrapper">
        {expenses.map((expense) => (
          <Expense key={expense._id} data={expense}></Expense>
        ))}
      </div>
    </div>
  );
};
