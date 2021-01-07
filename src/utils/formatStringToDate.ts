export default function formatStringToDate(date: string): Date {
  const dateArray = date.split('/');
  const day = dateArray[0];
  const month = dateArray[1];
  const unformattedYear = dateArray[2];
  let year: string;
  if (unformattedYear.length < 3) {
    year = `20${unformattedYear}`;
  } else {
    year = unformattedYear;
  }

  const formattedDate = new Date(`${month}/${day}/${year}`);
  return formattedDate;
}
