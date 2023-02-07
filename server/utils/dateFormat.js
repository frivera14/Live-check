const addDateSuffix = date => {
  let dateStr = date.toString();

  return dateStr;
};

module.exports = (
  timestamp,
  { monthLength = 'short', dateSuffix = true } = {}
) => {
  const months = {
    0: monthLength === 'short' ? 'Enero' : 'January',
    1: monthLength === 'short' ? 'Febrero' : 'February',
    2: monthLength === 'short' ? 'Marzo' : 'March',
    3: monthLength === 'short' ? 'Abril' : 'April',
    4: monthLength === 'short' ? 'Mayo' : 'May',
    5: monthLength === 'short' ? 'Junio' : 'June',
    6: monthLength === 'short' ? 'Julio' : 'July',
    7: monthLength === 'short' ? 'Agosto' : 'August',
    8: monthLength === 'short' ? 'Sep' : 'September',
    9: monthLength === 'short' ? 'Oct' : 'October',
    10: monthLength === 'short' ? 'Nov' : 'November',
    11: monthLength === 'short' ? 'Dic' : 'December'
  };

  const dateObj = new Date(timestamp);
  const formattedMonth = months[dateObj.getMonth()];

  const dayOfMonth = dateSuffix
    ? addDateSuffix(dateObj.getDate())
    : dateObj.getDate();

  const year = dateObj.getFullYear();
  let hour =
    dateObj.getHours() > 12
      ? Math.floor(dateObj.getHours() / 2)
      : dateObj.getHours();

  if (hour === 0) {
    hour = 12;
  }


  const formattedTimeStamp = ` ${dayOfMonth} de ${formattedMonth} ${year}`;

  return formattedTimeStamp;
};
