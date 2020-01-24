
export const weekDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


export const pad = (number) => {
  return number < 10 ? '0' + number : number;
};

export const isTimezoneOffsetPresent = (dateString) => {
  return Boolean(/(Z|[+-]\d{2}:?\d{2})/.exec(dateString));
};

export const getTimezoneOffset = (dateString) => {
  if (/Z/.exec(dateString)) {
    return 0;
  }

  if (/([+-])(\d{2}):?(\d{2})/.exec(dateString)) {
    return (RegExp.$1 === '-' ? 1 : -1) * (RegExp.$2 * 60 + RegExp.$3 * 1);
  }

  return 0;
};
