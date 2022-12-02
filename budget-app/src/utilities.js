import { useContext } from "react";
import { BudgetContext } from "./context/budgterContext";

export function useGraphData() {
  const {expenses} = useContext(BudgetContext)
  console.log(expenses);
  const config = {
    data: {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
        {
          label: "My First Dataset",
          data: [30, 200],
          backgroundColor: [
            "rgb(255, 191, 0)"
          ],
          hoverOffset: 3,
          borderRadius: 15,
          spacing: 20,
        },
      ],
    },

    options: {
      cutout: 125,
      radius: 150,
    },
  };
  return config;
}
