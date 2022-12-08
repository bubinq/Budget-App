import { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { useTheme } from "./useTheme";
import { TotalDistributionContext } from "../context/monthlyTotalContext";
import { instance } from "../api/instance";
import { getLastThreeMonths } from "../utilities";
import { getLastThreeMonthsAmounts } from "../api/instance";

export const useGoogleBarData = (year, month) => {
  const { totalExpenses, dispatch } = useContext(TotalDistributionContext);
  const [amounts, setAmounts] = useState([]);
  const theme = useTheme();

  const lastThreeMonths = getLastThreeMonths(year, month);

  const colors = _.chain(totalExpenses)
    .map((obj) => obj.color)
    .uniq()
    .value();

  const barData = [
    [
      "Month",
      "Groceries",
      "Clothes",
      "Utilities",
      "Rent",
      { role: "annotation" },
    ],
    [
      lastThreeMonths[0],
      amounts[2]?.Groceries || 0,
      amounts[2]?.Clothes || 0,
      amounts[2]?.Utilities || 0,
      amounts[2]?.Rent || 0,
      "",
    ],
    [
      lastThreeMonths[1],
      amounts[1]?.Groceries || 0,
      amounts[1]?.Clothes || 0,
      amounts[1]?.Utilities || 0,
      amounts[1]?.Rent || 0,
      "",
    ],
    [
      lastThreeMonths[2],
      amounts[0]?.Groceries || 0,
      amounts[0]?.Clothes || 0,
      amounts[0]?.Utilities || 0,
      amounts[0]?.Rent || 0,
      "",
    ],
  ];

  const barOptions = {
    title: "Monthly Total",
    backgroundColor: theme.main,
    colors: colors.length > 1 ? colors : ["#808080", "#808080", "#808080"],
    bar: { groupWidth: "50%" },
    legend: { position: "none" },
    titleTextStyle: { color: theme.text, fontSize: 20, position: "bottom" },
    chartArea: {
      width: "85%",
      height: 200,
    },
    isStacked: true,
  };
  useEffect(() => {
    const getTotalMonthly = async () => {
      const response = await instance.post(
        `/expenses/totalCompared`,
        {
          month,
          year,
        },
        { withCredentials: true }
      );
      dispatch({
        type: "READ",
        payload: response.data,
      });
    };
    getTotalMonthly();
    getLastThreeMonthsAmounts(parseInt(year), parseInt(month)).then((obj) => {
      console.log(obj);
      setAmounts(Object.values(obj));
    });
    //eslint-disable-next-line
  }, [year, month]);

  return { barData, barOptions };
};
