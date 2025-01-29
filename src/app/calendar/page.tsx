"use client";

import LivedTime from "./LivedTime";
import BirthDateInput from "./BirthDateInput";
import { twMerge } from "tailwind-merge";
import { useMemo, useState } from "react";
import {
  LIFE_EXPECTANCY,
  MONTHS_IN_LIFE,
  WEEKS_IN_LIFE,
} from "../helper/unitAmounts";
import useUserDataStore from "../stores/userDataStore";

enum TimeMeasurements {
  Weeks = "weeks",
  Months = "months",
  Years = "years",
}

const Calendar = () => {
  const [timeMeasurement, setTimeMeasurement] = useState(
    TimeMeasurements.Weeks
  );

  const { birthDate } = useUserDataStore();

  const gridData = useMemo(() => {
    if (timeMeasurement === TimeMeasurements.Weeks) {
      return { colums: "52", boxes: WEEKS_IN_LIFE };
    } else if (timeMeasurement === TimeMeasurements.Months) {
      return { colums: "12", boxes: MONTHS_IN_LIFE };
    } else {
      return { colums: "10", boxes: LIFE_EXPECTANCY };
    }
  }, [timeMeasurement]);

  if (!birthDate) {
    return <BirthDateInput />;
  }

  return (
    <div className="flex flex-col space-y-10">
      <span className="title text-center text-accent">You have lived</span>
      <LivedTime birthDate={birthDate} />

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
      <div
        className="grid gap-2 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${gridData.colums}, minmax(0, 1fr))`,
        }}
        key={0}
      >
        {new Array(WEEKS_IN_LIFE).fill(null).map((_, index) => {
          return (
            <div
              className={twMerge(
                "w-3 h-3 border-solid border-accent border-[1px]",
                index > gridData.boxes && "hidden"
              )}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
