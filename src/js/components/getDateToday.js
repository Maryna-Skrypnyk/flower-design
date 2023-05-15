export const getDateToday = () => {
  const date = new Date();
  const formatDay =
    date.getDate() < 10 ? `0${String(date.getDate())}` : String(date.getDate());
  const formatMonth =
    date.getMonth() < 9
      ? `0${String(date.getMonth() + 1)}`
      : String(date.getMonth() + 1);
  const formatYear = String(date.getFullYear()).slice(-2);

  return `${formatDay}.${formatMonth}.${formatYear}`;
};

export const getDateISO = () => {
  return new Date().toISOString();
};
