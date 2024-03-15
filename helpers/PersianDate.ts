export function now() {
  const dateTime = new Date()
    .toLocaleString("fa-IR-u-nu-latn", { hour12: false })
    .replace(",", "")
    .split(" ");
  const time = dateTime[1];
  const date = dateTime[0];

  const dateParts = date.split("/");
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]);
  const day = parseInt(dateParts[2]);

  const timeParts = time.split(":");
  const hour = parseInt(timeParts[0]);
  const minute = parseInt(timeParts[1]);

  const formattedDate =
    year +
    "/" +
    (month < 10 ? "0" : "") +
    month +
    "/" +
    (day < 10 ? "0" : "") +
    day +
    " " +
    (hour < 10 ? "0" : "") +
    hour +
    ":" +
    (minute < 10 ? "0" : "") +
    minute;

  return formattedDate;
}
