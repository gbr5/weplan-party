export default function dateToFormattedDate(date: string): string {
  const newDate = new Date(date);
  let year = newDate.getFullYear();
  let month;
  month =
    newDate.getMonth() < 9
      ? `0${newDate.getMonth() + 1}`
      : newDate.getMonth() + 1;

  let day;
  if (newDate.getDate() === 31) {
    day = '01';
    month === 12 && (year = newDate.getFullYear() + 1);
    month === 12 ? (month = '01') : (month = newDate.getMonth() + 2);
  } else {
    day = newDate.getDate() < 9 ? `0${newDate.getDate()}` : newDate.getDate();
  }

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}
