import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BudgetProvider } from "./context/budgterContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <BudgetProvider>
      <App />
    </BudgetProvider>
  </BrowserRouter>
);
