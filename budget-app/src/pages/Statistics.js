import { Header } from "../components/Header";
import { Side } from "../components/Side";
import { useTheme } from "../hooks/useTheme";
import { useContext } from "react";
import { BudgetContext } from "../context/budgetContext";

export const Statistics = () => {
  const theme = useTheme();
  const { dropDownHandler } = useContext(BudgetContext);
  return (
    <>
      <Header></Header>
      <div
        className="contentWrapper"
        style={{ backgroundColor: theme.main }}
        onClick={() => {
          dropDownHandler(false);
        }}
      >
        <Side></Side>
      </div>
    </>
  );
};
