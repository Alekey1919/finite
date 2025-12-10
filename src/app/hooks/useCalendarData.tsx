import deathPeople from "@/app/data/famousDeaths.json";
import lifeMilestones from "@/app/data/lifeMilestones.json";
import useMediaQueryState, {
  DefaultBreakpoints,
} from "@/app/hooks/useMediaQueryState";
import { DateTime } from "luxon";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import {
  CalendarTypesEnum,
  TimeMeasurementsEnum,
} from "../components/calendar/Calendar";
import { ICalendarGridProps } from "../components/calendar/CalendarGrid";
import getBoxNumber from "../helper/getBoxNumber";
import {
  LIFE_EXPECTANCY,
  MONTHS_IN_LIFE,
  WEEKS_IN_LIFE,
} from "../helper/unitAmounts";
import useRegionStore from "../stores/regionStore";
import useUserDataStore from "../stores/userDataStore";

const useCalendarData = ({
  calendarType,
  timeMeasurement,
}: {
  calendarType: CalendarTypesEnum;
  timeMeasurement: TimeMeasurementsEnum;
}) => {
  const lgScreen = useMediaQueryState({ breakpoint: DefaultBreakpoints.lg });
  const threeXlScreen = useMediaQueryState({ breakpoint: "1920px" });
  const { birthDate } = useUserDataStore();
  const { region } = useRegionStore();

  const t = useTranslations();

  const getFamousDeaths = useCallback(() => {
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
  }, [timeMeasurement]);

  const getLifeMilestones = useCallback(() => {
    const dates: { [key: number]: string[] } = {};

    lifeMilestones[region].forEach((milestone) => {
      const calendarMark = getBoxNumber({
        startDate: DateTime.now().minus({ years: milestone.age }).toMillis(),
        endDate: DateTime.now().toMillis(),
        timeMeasurement,
      });

      dates[calendarMark] ??= []; // Ensures dates[calendarMark] is an empty array if undefined
      dates[calendarMark].push(t(`lifeMilestones.${milestone.milestone}`));
    });

    return dates;
  }, [timeMeasurement, region, t]);

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

  const calendarData = useMemo(() => {
    const data: ICalendarGridProps = gridData;
    if (calendarType === CalendarTypesEnum.Personal) {
      data["livedBoxesAmount"] = getBoxNumber({
        startDate: birthDate,
        endDate: DateTime.now().toMillis(),
        timeMeasurement,
      });
    } else if (calendarType === CalendarTypesEnum.FamousDeaths) {
      data["calendarMarks"] = getFamousDeaths();
    } else if (calendarType === CalendarTypesEnum.LifeMilestones) {
      data["calendarMarks"] = getLifeMilestones();
    }

    return data;
  }, [
    birthDate,
    calendarType,
    getFamousDeaths,
    getLifeMilestones,
    gridData,
    timeMeasurement,
  ]);

  return { calendarData };
};

export default useCalendarData;
