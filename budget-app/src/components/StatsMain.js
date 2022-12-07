import { useContext, useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useGooglePieData } from "../hooks/useGooglePieData";
import { useTheme } from "../hooks/useTheme";
import { instance } from "../api/instance";
import { BudgetContext } from "../context/budgetContext";
import { MonthlyDistributionContext } from "../context/monthlyDistributionContext";

export const StatsMain = () => {
  const theme = useTheme();
  const { user } = useContext(BudgetContext);
  const { dispatcher } = useContext(MonthlyDistributionContext);
  const { data, options } = useGooglePieData();
  const [year, setYear] = useState(2022);
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const monthHandler = (ev) => {
    setMonth(parseInt(ev.target.value));
  };

  const yearHandler = (ev) => {
    setYear(parseInt(ev.target.value));
  };

  useEffect(() => {
    const changeDateHandler = async () => {
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
    changeDateHandler();
    //eslint-disable-next-line
  }, [year, month, user]);

  return (
    <div className="mainWrapper" style={{ backgroundColor: theme.main }}>
      <div className="pieChartWrapper">
        <div className="dateSelect">
          <form>
            <select
              style={{ color: theme.text }}
              className="yearSelect"
              defaultValue={year}
              name="year"
              onChange={yearHandler}
            >
              <option value={2015}>2015</option>
              <option value={2016}>2016</option>
              <option value={2017}>2017</option>
              <option value={2018}>2018</option>
              <option value={2019}>2019</option>
              <option value={2020}>2020</option>
              <option value={2021}>2021</option>
              <option value={2022}>2022</option>
            </select>
            <select
              style={{ color: theme.text }}
              className="monthSelect"
              name="month"
              defaultValue={month}
              onChange={monthHandler}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
            </select>
          </form>
        </div>
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"500px"}
          height={"450px"}
        />
      </div>
      <div className="barChartWrapper">
        <Chart
          chartType="BarChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};
