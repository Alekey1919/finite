"use client";

import { twMerge } from "tailwind-merge";
import { useState } from "react";
import CalendarMarks from "./CalendarMarks";
import CalendarGrid from "./CalendarGrid";
import TimeMeasurementSelector from "./TimeMeasurementSelector";
import useCalendarData from "@/app/hooks/useCalendarData";

export enum TimeMeasurementsEnum {
  Weeks = "weeks",
  Months = "months",
  Years = "years",
}

export enum CalendarTypesEnum {
  Personal,
  LifeMilestones,
  FamousDeaths,
}

const Calendar = ({ calendarType }: { calendarType: CalendarTypesEnum }) => {
  const [timeMeasurement, setTimeMeasurement] = useState(
    TimeMeasurementsEnum.Years
  );

  const { calendarData } = useCalendarData({ calendarType, timeMeasurement });

  return (
    <div className="flex flex-col space-y-10 relative w-fit mx-auto overflow-visible">
      <TimeMeasurementSelector
        timeMeasurement={timeMeasurement}
        setTimeMeasurement={setTimeMeasurement}
      />
      <div
        className="relative appear-fade-in fade-with-theme-change"
        key={timeMeasurement}
      >
        <CalendarGrid {...calendarData} />
        <CalendarMarks
          containerStyles={twMerge(
            calendarData.gap,
            timeMeasurement !== TimeMeasurementsEnum.Years &&
              "[@media(max-width:400px)]:-right-5"
          )}
          boxStyles={calendarData.boxSize}
        />
      </div>
    </div>
  );
};

export default Calendar;
