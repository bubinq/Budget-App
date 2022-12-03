import { useTheme } from "../hooks/useTheme";
import { BiSend } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { instance } from "../api/instance";
import { BudgetContext } from "../context/budgetContext";
import { ErrorMessage } from "./ErrorMessage";
import { ExpenseContext } from "../context/expenseContext";
import {getBudgetColor} from "../utilities"

export const BudgetForm = () => {
  const theme = useTheme();
  const { dispatcher, budget, user } = useContext(BudgetContext);
  const { expenses } = useContext(ExpenseContext);
  const [error, setError] = useState({ message: "" });

  const totalExpenses = expenses.reduce(
    (sum, currAmount) => sum + currAmount.amount,
    0
  );

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const { amount } = Object.fromEntries(new FormData(ev.target));

    if (amount.trim() && !isNaN(amount)) {
      setError({ message: "" });
    } else {
      ev.target.reset();
      setError({ message: "Please fill with correct data!" });
      return;
    }

    try {
      const response = await instance.post(
        "/budget/create",
        {
          amount,
        },
        { withCredentials: true }
      );
      dispatcher({
        type: "ADD",
        payload: response.data,
      });
      setError({ message: "" });
      ev.target.reset();
    } catch (error) {
      const msg = error.response.data.message;
      setError({ message: msg });
    }
  };

  useEffect(() => {
    const loadBudget = async (id) => {
      const userBudget = await instance.get(`budget/get/${id}`);
      dispatcher({
        type: "GET",
        payload: userBudget.data,
      });
    };
    if (user?.displayName) {
      loadBudget(user._id);
    }
    //eslint-disable-next-line
  }, []);
  return (
    <div className="budgetTotal">
      <h1 style={{ color: theme.text }}>Budget Total:</h1>
      {!budget[0]?.amount && (
        <form onSubmit={handleSubmit}>
          <input
            style={{ color: theme.text }}
            className="budgetInput"
            type="text"
            placeholder="Set Budget"
            name="amount"
          ></input>
          <button className="sendBudget">
            <BiSend
              style={{ color: theme.text, width: "20px", height: "20px" }}
            ></BiSend>
          </button>
        </form>
      )}

      {error.message && <ErrorMessage message={error.message}></ErrorMessage>}
      {budget[0]?.amount && (
        <>
          <span className="budgetAmount" style={{ color: theme.text }}>
            Initial: ${budget[0].amount}
          </span>
          <span style={{ color: getBudgetColor(budget[0].amount, budget[0].amount - totalExpenses) }}>Current: ${budget[0].amount - totalExpenses}</span>
        </>
      )}
    </div>
  );
};
