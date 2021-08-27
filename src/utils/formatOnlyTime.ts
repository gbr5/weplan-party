export default function formatOnlyTime(date: string): string {
  const newDate = new Date(date);
  const hours =
    String(newDate.getHours()).length === 1
      ? `0${newDate.getHours()}`
      : String(newDate.getHours());
  const minutes =
    String(newDate.getMinutes()).length === 1
      ? `0${newDate.getMinutes()}`
      : String(newDate.getMinutes());

  const formattedDate = `${hours}:${minutes}`;
  return formattedDate;
}
