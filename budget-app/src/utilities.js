export function getBudgetColor(budget, current) {
  let rate = current / budget;
  let color = "#05f505";
  if (rate < 0.75) {
    color = "#f5dd05";
  }
  if (rate < 0.5) {
    color = "#f58105";
  }
  if (rate < 0.25) {
    color = "#f52505";
  }
  return color;
}

export const months = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

export const getLastThreeMonths = (year, month) => {
  let months = [];
  for (let i = 3; i > 0; i--) {
    months.push(
      new Date(year, month - i).toLocaleString("default", { month: "long" })
    );
  }
  return months;
};
