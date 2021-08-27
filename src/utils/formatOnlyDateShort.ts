export default function formatOnlyDateShort(date: string): string {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month =
    newDate.getMonth() < 9
      ? `0${newDate.getMonth() + 1}`
      : newDate.getMonth() + 1;
  const day =
    newDate.getDate() < 9 ? `0${newDate.getDate()}` : newDate.getDate();

  const formattedDate = `${day}/${month}/${String(year)[2]}${String(year)[3]}`;
  return formattedDate;
}