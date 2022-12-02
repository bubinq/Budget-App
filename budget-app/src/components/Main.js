import { useTheme } from "../hooks/useTheme";
import { Chart, ArcElement } from "chart.js";
import { useGraphData } from "../utilities";
import { Doughnut } from "react-chartjs-2";
import { instance } from "../api/instance";
import { useContext, useState } from "react";
import { ErrorMessage } from "../components/ErrorMessage";
import { BudgetContext } from "../context/budgterContext";

Chart.register(ArcElement);

export const Main = () => {
  const theme = useTheme();
  const config = useGraphData();
  const [error, setError] = useState({
    message: "",
  });
  const { dispatcher } = useContext(BudgetContext);

  const submitHandler = async (ev) => {
    ev.preventDefault();

    const { category, amount } = Object.fromEntries(new FormData(ev.target));

    if (amount.trim() && !isNaN(amount)) {
      setError({ message: "" });
    } else {
      ev.target.reset();
      setError({ message: "Please fill with correct data!" });
      return;
    }

    try {
      const response = await instance.post(
        "/expenses/create",
        {
          category,
          amount,
        },
        { withCredentials: true }
      );

      console.log(response.data);
      dispatcher({
        type: "ADD",
        payload: response.data,
      });
      setError({ message: "" });
      ev.target.reset();
    } catch (error) {
      const msg = error.response.data.message;
      console.log(msg);
      setError({ message: msg });
    }
  };

  return (
    <div className="mainWrapper" style={{ backgroundColor: theme.main }}>
      <div className="chartWrapper">
        <div className="chartHeading">
          <h1 style={{ color: theme.text }}>Expenses</h1>
        </div>
        <Doughnut {...config}></Doughnut>
      </div>
      <div className="budgetTotal">
        <h1 style={{ color: theme.text }}>Budget Total:</h1>
        <span style={{ color: "rgb(255, 205, 86)" }}>$2500</span>
      </div>
      <div className="stepOne">
        <div className="chartHeading">
          <h1 style={{ color: theme.text }}>Transactions</h1>
        </div>
        <div className="stepsHeading">
          <h1>1. Select Category</h1>
        </div>
        <form className="transactionsForm" onSubmit={submitHandler}>
          <label className="buble" htmlFor="category">
            <select id="category" name="category">
              <option>Rent</option>
              <option>Groceries</option>
              <option>Utilities</option>
              <option>Clothes</option>
            </select>
          </label>
          <div className="stepsHeading">
            <h1>2. Select Amount</h1>
          </div>
          {error.message && (
            <ErrorMessage message={error.message}></ErrorMessage>
          )}
          <label className="buble" htmlFor="budget">
            <input
              id="budget"
              type="text"
              placeholder="Amount:"
              name="amount"
            ></input>
          </label>

          <button type="submit" className="addTransaction">
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};
