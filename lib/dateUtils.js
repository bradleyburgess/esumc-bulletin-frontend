const dayMap = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const monthMap = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

export function createDateObject(inputString) {
  const _date = new Date(inputString);
  return {
    day: dayMap[_date.getDay()],
    date: _date.getDate(),
    month: monthMap[_date.getMonth()],
    year: _date.getFullYear().toString(),
    time: `${_date.getHours()}:${_date.getMinutes()}`,
  };
}

export function createDateString(dateObj) {
  return `${dateObj.day}, ${dateObj.month} ${dateObj.date}, ${dateObj.year}`;
}

export function getDateSearchString(date) {
  date.setHours(23);
  date.setMinutes(59);
  date.setSeconds(59);
  return date.toISOString();
}
