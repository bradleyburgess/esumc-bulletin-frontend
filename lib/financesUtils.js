const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function getFinanceStrings(finances) {
  return {
    weekly_donation: formatter.format(finances?.weekly?.amount),
    ytd_total: formatter.format(finances?.ytd_total),
    yearly_goal: formatter.format(finances?.yearly_goal),
    ytd_percent: `${(finances?.ytd_total / finances?.yearly_goal).toFixed(2)}%`,
    week_of: finances.weekly.week_of,
  };
}

// Strip the numbers of additional characters
export function stripNumber(input) {
  return parseFloat(input.replace(/\$/g, "").replace(/\,/g, ""));
}

// Calculate the YTD percent of goal
export function calculateYtdPercentage(actual, goal) {
  return ((actual / goal) * 100).toFixed(2);
}

// Format currency, from https://stackoverflow.com/a/149099 (Custom ES6)
export function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      "$" +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
}
