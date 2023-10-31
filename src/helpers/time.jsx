export const hari = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const bulan = [
  "January",
  "Feburay",
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

export const month = (timeStamp) => {
  return bulan[timeStamp?.toDate().getMonth()];
};
export const year = (timeStamp) => {
  return timeStamp?.toDate().getFullYear();
};
export const date = (timeStamp) => {
  return timeStamp?.toDate().getDate();
};
export const hour = (timeStamp) => {
  return timeStamp?.toDate().getHours();
};
export const minute = (timeStamp) => {
  let minute = timeStamp?.toDate().getMinutes();
  if (minute < 10) {
    return `0${minute}`;
  } else {
    return minute;
  }
};
