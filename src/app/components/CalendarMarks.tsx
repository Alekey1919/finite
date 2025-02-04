import React from "react";
import { TimeMeasurements } from "./Calendar";

const CalendarMarks = ({
  timeMeasurement,
}: {
  timeMeasurement: TimeMeasurements;
}) => {
  return (
    <div className="absolute -right-8 top-0 bottom-0 grid grid-rows-9 gap-1">
      {Array.from({ length: 9 }).map((_, index) => {
        return (
          <div
            key={index}
            className="flex justify-center items-center text-sm text-accent "
          >
            {10 * (index + 1)}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarMarks;
