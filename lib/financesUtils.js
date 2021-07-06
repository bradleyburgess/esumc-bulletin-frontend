const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function getFinanceStrings(finances) {
  return {
    weekly_donation: formatter.format(finances?.weekly?.weekly_donation),
    ytd_total: formatter.format(finances?.ytd_total),
    yearly_goal: formatter.format(finances?.yearly_goal),
    ytd_percent: `${(finances?.ytd_total / finances?.yearly_goal).toFixed(2)}%`,
  };
}