import { useContext, useEffect } from "react";
import { instance } from "../api/instance";
import _ from "lodash";
import { useTheme } from "./useTheme";
import { MonthlyDistributionContext } from "../context/monthlyDistributionContext";
import { BudgetContext } from "../context/budgetContext";

export const useGooglePieData = (year, month) => {
  const { user } = useContext(BudgetContext);
  const { monthlyExpenses, dispatcher } = useContext(
    MonthlyDistributionContext
  );

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
    legend: { position: "none" },
    titleTextStyle: { color: theme.text, fontSize: 20, position: "bottom" },
    chartArea: {
      width: "85%",
      height: 220,
    },
  };

  useEffect(() => {
    const getMonthlyDistribution = async () => {
      const response = await instance.post(
        `/expenses/userPref/${user?._id}`,
        {
          month,
          year,
        },
        { withCredentials: true }
      );
      dispatcher({
        type: "READ",
        payload: response.data,
      });
    };
    getMonthlyDistribution();
    //eslint-disable-next-line
  }, [year, month, user]);

  return { data, options };
};
