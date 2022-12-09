import { useEffect, useState } from "react";
import { useTheme } from "./useTheme";
import { getLastThreeMonths } from "../utilities";
import { getLastThreeMonthsAmounts } from "../api/instance";
import { colors } from "../utilities";

export const useGoogleBarData = (year, month) => {
  const [amounts, setAmounts] = useState([]);
  const theme = useTheme();

  const lastThreeMonths = getLastThreeMonths(year, month);
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
      `$ ${amounts[2]?.total || 0}`,
    ],
    [
      lastThreeMonths[1],
      amounts[1]?.Groceries || 0,
      amounts[1]?.Clothes || 0,
      amounts[1]?.Utilities || 0,
      amounts[1]?.Rent || 0,
      `$ ${amounts[1]?.total || 0}`,
    ],
    [
      lastThreeMonths[2],
      amounts[0]?.Groceries || 0,
      amounts[0]?.Clothes || 0,
      amounts[0]?.Utilities || 0,
      amounts[0]?.Rent || 0,
      `$ ${amounts[0]?.total || 0}`,
    ],
  ];

  const barOptions = {
    title: "Monthly Total",
    backgroundColor: "transparent",
    colors: [colors.Groceries, colors.Clothes, colors.Utilities, colors.Rent],
    bar: { groupWidth: "50%" },
    legend: { position: "none" },
    titleTextStyle: { color: theme.text, fontSize: 25, position: "bottom" },
    chartArea: {
      width: "65%",
      height: 200,
    },
    animation: {
      duration: 600,
      easing: "in"
    },
    isStacked: true,
  };
  useEffect(() => {
    setAmounts([]);
    getLastThreeMonthsAmounts(parseInt(year), parseInt(month)).then((data) => {
      let prevMonthIdx = 0;
      data.forEach((currMonth) => {
        debugger;
        if (month - (currMonth.month + prevMonthIdx) === 2) {
          setAmounts([{}, {}, currMonth]);
        } else if (month - (currMonth.month + prevMonthIdx) === 1) {
          prevMonthIdx++;
          setAmounts((oldAmounts) => [...oldAmounts, {}, currMonth]);
        } else {
          setAmounts((oldAmounts) => [...oldAmounts, currMonth]);
        }
        prevMonthIdx++;
      });
    });
    //eslint-disable-next-line
  }, [year, month]);

  return { barData, barOptions };
};
