const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function getFinanceStrings(finances) {
  const weeklyDonationNumber = stripNumber(finances?.weekly?.amount);
  const ytdTotalNumber = stripNumber(finances?.ytd_total);
  const yearlyGoalNumber = stripNumber(finances?.yearly_goal);
  const ytdPercent = calculateYtdPercentage(ytdTotalNumber, yearlyGoalNumber);

  return {
    weekly_donation: formatter.format(weeklyDonationNumber),
    ytd_total: formatter.format(ytdTotalNumber),
    yearly_goal: formatter.format(yearlyGoalNumber),
    ytd_percent: `${ytdPercent}%`,
    week_of: finances.weekly.week_of,
  };
}

// Strip the numbers of additional characters
function stripNumber(input) {
  if (typeof input === "number") return parseFloat(input);
  if (typeof input === "string")
    return parseFloat(input.trim().replace(/\$/g, "").replace(/\,/g, ""));
}

// Calculate the YTD percent of goal
function calculateYtdPercentage(actual, goal) {
  return ((actual / goal) * 100).toFixed(2);
}

// Format currency, from https://stackoverflow.com/a/149099 (Custom ES6)
// function formatMoney(
//   amount,
//   decimalCount = 2,
//   decimal = ".",
//   thousands = ","
// ) {
//   try {
//     decimalCount = Math.abs(decimalCount);
//     decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

//     const negativeSign = amount < 0 ? "-" : "";

//     let i = parseInt(
//       (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
//     ).toString();
//     let j = i.length > 3 ? i.length % 3 : 0;

//     return (
//       negativeSign +
//       "$" +
//       (j ? i.substr(0, j) + thousands : "") +
//       i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
//       (decimalCount
//         ? decimal +
//           Math.abs(amount - i)
//             .toFixed(decimalCount)
//             .slice(2)
//         : "")
//     );
//   } catch (e) {
//     console.log(e);
//   }
// }
