import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BudgetProvider } from "./context/budgetContext";
import { ExpenseProvider } from "./context/expenseContext";
import { BrowserRouter } from "react-router-dom";
import { MonthlyDistributionProvider } from "./context/monthlyDistributionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ExpenseProvider>
      <BudgetProvider>
        <MonthlyDistributionProvider>
          <App />
        </MonthlyDistributionProvider>
      </BudgetProvider>
    </ExpenseProvider>
  </BrowserRouter>
);
