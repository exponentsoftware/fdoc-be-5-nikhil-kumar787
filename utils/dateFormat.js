let startDate = new Date();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const day = startDate.getDate();
const month = months[startDate.getMonth()]; // 0 to 11 index
const month1 = startDate.getMonth();
const year = startDate.getFullYear();
const fullDate = day + " " + month + " " + year;
let nextDay = startDate.setDate(startDate.getDate() + 1);
nextDay = startDate.getDate();
const nextDate = year + "/" + (month1 + 1) + "/" + nextDay;
const currentDate = year + "/" + (month1 + 1) + "/" + day;

export { nextDate, currentDate };
