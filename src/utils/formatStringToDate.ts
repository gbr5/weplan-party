export default function formatStringToDate(date: string): string {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month =
    newDate.getMonth() < 10 ? `0${newDate.getMonth()}` : newDate.getMonth();
  const day =
    newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}
