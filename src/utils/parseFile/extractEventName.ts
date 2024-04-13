import dayjs from "dayjs";

export default function extractEventName({ fileName }: { fileName: string }) {
  try {
    const [name, extension] = fileName.split(".");
    const [date, _, sessionType] = name.split("_");
    const year = "20" + date.substring(0, 2);
    const month = date.substring(2, 4);
    const day = date.substring(4, 6);
    const formattedDate = dayjs(`${year}-${month}-${day}`).toDate();

    return [formattedDate, sessionType];
  } catch (error) {
    throw new Error("Error extracting event name");
  }
}
