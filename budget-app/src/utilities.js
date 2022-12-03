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
    color = "#f52505"
  }
  return color;
}
