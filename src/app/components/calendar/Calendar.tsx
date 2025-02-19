"use client";

import { twMerge } from "tailwind-merge";
import { useMemo, useState } from "react";
import {
  LIFE_EXPECTANCY,
  MONTHS_IN_LIFE,
  WEEKS_IN_LIFE,
} from "../../helper/unitAmounts";
import { DateTime } from "luxon";
import CalendarMarks from "./CalendarMarks";
import CalendarGrid from "./CalendarGrid";
import useMediaQueryState, {
  DefaultBreakpoints,
} from "../../hooks/useMediaQueryState";
import TimeMeasurementSelector from "./TimeMeasurementSelector";

export enum TimeMeasurementsEnum {
  Weeks = "weeks",
  Months = "months",
  Years = "years",
}
const Calendar = ({ birthDate }: { birthDate: number }) => {
  const [timeMeasurement, setTimeMeasurement] = useState(
    TimeMeasurementsEnum.Years
  );

  const livedBoxesAmount = useMemo(() => {
    const _birthDate = DateTime.fromMillis(birthDate);
    const currentDate = DateTime.now();

    switch (timeMeasurement) {
      case TimeMeasurementsEnum.Years:
        return Math.floor(currentDate.diff(_birthDate, "years").years);
      case TimeMeasurementsEnum.Months:
        return Math.floor(currentDate.diff(_birthDate, "months").months);
      default:
        return Math.floor(currentDate.diff(_birthDate, "weeks").weeks);
    }
  }, [birthDate, timeMeasurement]);

  const lgScreen = useMediaQueryState({ breakpoint: DefaultBreakpoints.lg });
  const threeXlScreen = useMediaQueryState({ breakpoint: "1920px" });

  const gridData = useMemo(() => {
    if (timeMeasurement === TimeMeasurementsEnum.Weeks) {
      return {
        colums: lgScreen ? 52 : 26,
        boxes: WEEKS_IN_LIFE,
        boxSize: "w-2 h-2 xl:w-3 xl:h-3 3xl:w-[18px] 3xl:h-[18px]",
        gap: "gap-1 xl:gap-[5px] 3xl:gap-1.5",
      };
    } else if (timeMeasurement === TimeMeasurementsEnum.Months) {
      return {
        colums: threeXlScreen ? 30 : 24,
        boxes: MONTHS_IN_LIFE,
        boxSize: "w-2 h-2 sm:w-4 sm:h-4",
        gap: "gap-[4px] lg:gap-[7px]",
      };
    } else {
      return {
        colums: 10,
        boxes: LIFE_EXPECTANCY,
        boxSize: "w-5 h-5 sm:w-7 sm:h-7",
        gap: "gap-[8px] lg:gap-[10px]",
      };
    }
  }, [lgScreen, timeMeasurement]);

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
          boxSize={gridData.boxSize}
          boxesAmount={gridData.boxes}
          gap={gridData.gap}
          columns={gridData.colums}
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
