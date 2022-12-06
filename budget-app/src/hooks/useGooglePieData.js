import { useContext } from "react";
import { ExpenseContext } from "../context/expenseContext";
import _ from "lodash";
import { useTheme } from "./useTheme";

export const useGooglePieData = () => {
  const { expenses } = useContext(ExpenseContext);
  const theme = useTheme();
  const amountByCategory = _.chain(expenses)
    .groupBy("category")
    .map((obj, idx) => {
      return [idx, _.sumBy(obj, "amount")];
    })
    .value();

  const colors = _.chain(expenses)
    .map((obj) => obj.color)
    .uniq()
    .value();

  const data = [["Category", "Total Amount"], ...amountByCategory];

  const options = {
    title: "Monthly Distribution",
    backgroundColor: theme.main,
    colors: colors,
    legend: {position: "none"},
    titleTextStyle: { color: theme.text, fontSize: 20, position: "bottom" },
    chartArea: {
        width: '75%',
        height: 300
    },
  };

  return { data, options };
};
