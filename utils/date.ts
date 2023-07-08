const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const days = [...weekdays, 'Saturday', 'Sunday'];
const calendarDays = ['Sunday', ...weekdays, 'Saturday'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Augustus',
  'September',
  'October',
  'November',
  'December',
];

const date = new Date();

const month = date.getMonth();
const monthMM = months[month];

const year = date.getFullYear();

const firstDay = new Date(year, month, 1);
const previousMonthLastDay = new Date(year, month, 0);
const lastDay = new Date(year, month + 1, 0);
const previousMonthDay = new Date(year, month, 0);
const firstDayWeek = firstDay.getDay();

const getDatePostFix = (date: number) => {
  switch (date) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

const getRandomColor = () => {
  var letters = 'BCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

const convertTo12Hour = (dateStr: string) => {
  const [hourStr, minute] = dateStr.split(':');
  const hour = Number(hourStr);
  return `${hour}:${minute} ${hour > 12 ? 'PM' : 'AM'}`;
};

export {
  weekdays,
  days,
  calendarDays,
  date,
  month,
  monthMM,
  year,
  firstDay,
  lastDay,
  firstDayWeek,
  previousMonthLastDay,
  previousMonthDay,
  getDatePostFix,
  getRandomColor,
  convertTo12Hour,
};
