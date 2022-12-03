import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BudgetProvider } from "./context/budgetContext";
import { ExpenseProvider } from "./context/expenseContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ExpenseProvider>
      <BudgetProvider>
        <App />
      </BudgetProvider>
    </ExpenseProvider>
  </BrowserRouter>
);
