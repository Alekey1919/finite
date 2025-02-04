"use client";

import { twMerge } from "tailwind-merge";
import { useMemo, useState } from "react";
import {
  LIFE_EXPECTANCY,
  MONTHS_IN_LIFE,
  WEEKS_IN_LIFE,
} from "../helper/unitAmounts";
import { DateTime } from "luxon";
import CalendarMarks from "./CalendarMarks";
import WeekMarks from "./calendars/WeekMarks";

export enum TimeMeasurements {
  Weeks = "weeks",
  Months = "months",
  Years = "years",
}
const Calendar = ({ birthDate }: { birthDate: number }) => {
  const [timeMeasurement, setTimeMeasurement] = useState(
    TimeMeasurements.Weeks
  );

  const livedBoxesAmount = useMemo(() => {
    const _birthDate = DateTime.fromMillis(birthDate);
    const currentDate = DateTime.now();

    switch (timeMeasurement) {
      case TimeMeasurements.Years:
        return Math.floor(currentDate.diff(_birthDate, "years").years);
      case TimeMeasurements.Months:
        return Math.floor(currentDate.diff(_birthDate, "months").months);
      default:
        return Math.floor(currentDate.diff(_birthDate, "weeks").weeks);
    }
  }, [birthDate, timeMeasurement]);

  const gridData = useMemo(() => {
    if (timeMeasurement === TimeMeasurements.Weeks) {
      return {
        colums:
          "grid-cols-[repeat(26,minmax(0,1fr))] lg:grid-cols-[repeat(52,minmax(0,1fr))]",
        boxes: WEEKS_IN_LIFE,
        boxSize: "w-2 h-2 xl:w-3 xl:h-3 3xl:w-[18px] 3xl:h-[18px]",
        gap: "gap-1 xl:gap-[5px] 3xl:gap-1.5",
      };
    } else if (timeMeasurement === TimeMeasurements.Months) {
      return {
        colums:
          "grid-cols-[repeat(24,minmax(0,1fr))] lg:grid-cols-[repeat(24,minmax(0,1fr))]",
        boxes: MONTHS_IN_LIFE,
        boxSize: "w-2 h-2 sm:w-4 sm:h-4",
        gap: "gap-[4px] lg:gap-[7px]",
      };
    } else {
      return {
        colums: "grid-cols-10",
        boxes: LIFE_EXPECTANCY,
        boxSize: "w-5 h-5 sm:w-7 sm:h-7",
        gap: "gap-[8px] lg:gap-[10px]",
      };
    }
  }, [timeMeasurement]);

  return (
    <div className="flex flex-col space-y-10 relative w-fit mx-auto">
      <div className="flex space-x-8 justify-center text-[#a37a5c]">
        <button onClick={() => setTimeMeasurement(TimeMeasurements.Weeks)}>
          Weeks
        </button>
        <button onClick={() => setTimeMeasurement(TimeMeasurements.Months)}>
          Months
        </button>
        <button onClick={() => setTimeMeasurement(TimeMeasurements.Years)}>
          Years
        </button>
      </div>

      <div className="relative">
        <div
          className={twMerge("grid mx-auto", gridData.colums, gridData.gap)}
          id="calendar"
          key={0}
        >
          {new Array(gridData.boxes).fill(null).map((_, index) => {
            return (
              <div
                className={twMerge(
                  "w-2 h-2 border-solid border-accent border-[1px] box",
                  index < livedBoxesAmount && "bg-accent",
                  gridData.boxSize
                )}
                key={index}
              />
            );
          })}

          {/* <CalendarMarks timeMeasurement={timeMeasurement} /> */}
          {/* <div
          className="absolute -right-8 top-0 bottom-0 grid grid-rows-9"
          style={{ gap: gridData.gap }}
        >
          {Array.from({ length: 9 }).map((_, index) => {
            return (
              <div
                key={index}
                className={twMerge(
                  "flex justify-center items-center text-sm text-accent",
                  gridData.boxSize
                )}
              >
                {10 * (index + 1)}
              </div>
            );
          })}
        </div> */}
        </div>
        <WeekMarks
          containerStyles={twMerge(gridData.gap)}
          boxStyles={gridData.boxSize}
        />
      </div>
    </div>
  );
};

export default Calendar;
