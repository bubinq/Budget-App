import { useContext } from "react";
import _ from "lodash";
import { useTheme } from "./useTheme";
import { MonthlyDistributionContext } from "../context/monthlyDistributionContext";

export const useGooglePieData = () => {
  const {monthlyExpenses} = useContext(MonthlyDistributionContext)
  const theme = useTheme();
  const amountByCategory = _.chain(monthlyExpenses)
    .groupBy("category")
    .map((obj, idx) => {
      return [idx, _.sumBy(obj, "amount")];
    })
    .value();

  const colors = _.chain(monthlyExpenses)
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
        width: '65%',
        height: 250
    },
  };

  return { data, options };
};
