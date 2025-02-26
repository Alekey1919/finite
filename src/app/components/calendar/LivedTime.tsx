"use client";

import useLivedTime from "@/app/hooks/useLivedTime";
import useUserDataStore from "@/app/stores/userDataStore";
import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";

const PeriodDisplay = ({
  pluralText,
  singularText,
  time,
  zeroRedundant,
}: {
  pluralText: string;
  singularText: string;
  time: number;
  zeroRedundant?: boolean;
}) => {
  const t = useTranslations();

  return (
    <div
      className={twMerge(
        "flex flex-col justify-center text-center text-accent aspect-square items-center",
        zeroRedundant && time < 1 && "hidden"
      )}
    >
      <span className="font-bold text-xl lg:text-2xl 2xl:text-3xl">
        {zeroRedundant ? time : `${time}`.padStart(2, "0")}
      </span>
      <span className="capitalize font-medium text-[10px] sm:text-xs lg:text-sm 2xl:text-lg">
        {t(time === 1 ? singularText : pluralText)}
      </span>
    </div>
  );
};

const LivedTime = () => {
  const { birthDate } = useUserDataStore();

  const livedTime = useLivedTime(birthDate);

  const t = useTranslations();

  return (
    <div className="flex flex-col space-y-4 2xl:space-y-8 max-w-96 lg:max-w-[500px] 2xl:max-w-[600px] mx-auto">
      <span className="title text-center text-accent">{t("youHaveLived")}</span>

      <div className="grid grid-cols-6 gap-x-4 justify-center px-6">
        <PeriodDisplay
          time={livedTime.years}
          pluralText="years"
          singularText="year"
          zeroRedundant
        />
        <PeriodDisplay
          time={livedTime.months}
          pluralText="months"
          singularText="month"
          zeroRedundant
        />
        <PeriodDisplay
          time={livedTime.days}
          pluralText="days"
          singularText="day"
          zeroRedundant
        />
        <PeriodDisplay
          time={livedTime.hours}
          pluralText="hours"
          singularText="hour"
        />
        <PeriodDisplay
          time={livedTime.minutes}
          pluralText="minutes"
          singularText="minute"
        />
        <PeriodDisplay
          time={livedTime.seconds}
          pluralText="seconds"
          singularText="second"
        />
      </div>
    </div>
  );
};

export default LivedTime;
