import { DateTime } from "luxon";
import { TimeMeasurementsEnum } from "../components/calendar/Calendar";

// This is the number of the box that represents the date. If I'm 30 years old and the calendar is in years, the box number will be 30
// But the same date with the calendar in months will be 360 (30 * 12)
const getBoxNumber = ({
  startDate,
  endDate,
  timeMeasurement,
}: {
  startDate: number;
  endDate: number;
  timeMeasurement: TimeMeasurementsEnum;
}) => {
  const _startDate = DateTime.fromMillis(startDate);
  const _endDate = DateTime.fromMillis(endDate);

  return Math.floor(
    _endDate.diff(_startDate, timeMeasurement)[timeMeasurement]
  );
};

export default getBoxNumber;
