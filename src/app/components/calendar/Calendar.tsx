"use client";

import { twMerge } from "tailwind-merge";
import { useMemo, useState } from "react";
import { DateTime } from "luxon";
import CalendarMarks from "./CalendarMarks";
import CalendarGrid from "./CalendarGrid";
import TimeMeasurementSelector from "./TimeMeasurementSelector";
import useMediaQueryState, {
  DefaultBreakpoints,
} from "@/app/hooks/useMediaQueryState";
import {
  LIFE_EXPECTANCY,
  MONTHS_IN_LIFE,
  WEEKS_IN_LIFE,
} from "@/app/helper/unitAmounts";
import { deathPeople } from "@/app/data/famousDeaths.json";

export enum TimeMeasurementsEnum {
  Weeks = "weeks",
  Months = "months",
  Years = "years",
}
const Calendar = ({ birthDate }: { birthDate?: number }) => {
  const [timeMeasurement, setTimeMeasurement] = useState(
    TimeMeasurementsEnum.Years
  );

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

  const livedBoxesAmount = useMemo(() => {
    if (!birthDate) return null;

    return getBoxNumber({
      startDate: birthDate,
      endDate: DateTime.now().toMillis(),
      timeMeasurement,
    });
  }, [birthDate, timeMeasurement]);

  // This gets the box number based on a date and a timeMeasurement (years, months, weeks)

  const lgScreen = useMediaQueryState({ breakpoint: DefaultBreakpoints.lg });
  const threeXlScreen = useMediaQueryState({ breakpoint: "1920px" });

  const gridData = useMemo(() => {
    if (timeMeasurement === TimeMeasurementsEnum.Weeks) {
      return {
        columns: lgScreen ? 52 : 26,
        boxesAmount: WEEKS_IN_LIFE,
        boxSize: "w-2 h-2 xl:w-3 xl:h-3 3xl:w-[18px] 3xl:h-[18px]",
        gap: "gap-1 xl:gap-[5px] 3xl:gap-1.5",
      };
    } else if (timeMeasurement === TimeMeasurementsEnum.Months) {
      return {
        columns: threeXlScreen ? 30 : 24,
        boxesAmount: MONTHS_IN_LIFE,
        boxSize: "w-2 h-2 sm:w-4 sm:h-4",
        gap: "gap-[4px] lg:gap-[7px]",
      };
    } else {
      return {
        columns: 10,
        boxesAmount: LIFE_EXPECTANCY,
        boxSize: "w-5 h-5 sm:w-7 sm:h-7",
        gap: "gap-[8px] lg:gap-[10px]",
      };
    }
  }, [lgScreen, threeXlScreen, timeMeasurement]);

  const famousDeaths = useMemo(() => {
    if (birthDate) return null;

    const dates: { [key: number]: string[] } = {};

    deathPeople.forEach((person) => {
      const calendarMark = getBoxNumber({
        startDate: DateTime.fromISO(person.birthDate).toMillis(),
        endDate: DateTime.fromISO(person.deathDate).toMillis(),
        timeMeasurement,
      });

      dates[calendarMark] ??= []; // Ensures dates[calendarMark] is an empty array if undefined
      dates[calendarMark].push(person.name);
    });

    return dates;
  }, [birthDate, timeMeasurement]);

  return (
    <div className="flex flex-col space-y-10 relative w-fit mx-auto overflow-visible">
      <TimeMeasurementSelector
        timeMeasurement={timeMeasurement}
        setTimeMeasurement={setTimeMeasurement}
      />
      <div
        className="relative appear-fade-in"
        id="calendar"
        key={timeMeasurement}
      >
        <CalendarGrid
          {...gridData}
          famousDeaths={famousDeaths}
          livedBoxesAmount={livedBoxesAmount}
        />
        <CalendarMarks
          containerStyles={twMerge(
            gridData.gap,
            timeMeasurement !== TimeMeasurementsEnum.Years &&
              "[@media(max-width:400px)]:-right-5"
          )}
          boxStyles={gridData.boxSize}
        />
      </div>
    </div>
  );
};

export default Calendar;
