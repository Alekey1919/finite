"use client";

import useLivedTime from "@/app/hooks/useLivedTime";
import { twMerge } from "tailwind-merge";

const PeriodDisplay = ({
  text,
  time,
  zeroRedundant,
}: {
  text: string;
  time: number;
  zeroRedundant?: boolean;
}) => {
  return (
    <div
      className={twMerge(
        "flex flex-col justify-center text-center text-accent aspect-square",
        zeroRedundant && time < 1 && "hidden"
      )}
    >
      <span className="font-bold text-xl lg:text-2xl 2xl:text-3xl">
        {zeroRedundant ? time : `${time}`.padStart(2, "0")}
      </span>
      <span className="capitalize font-medium text-xs lg:text-sm 2xl:text-lg">
        {text}
      </span>
    </div>
  );
};

const LivedTime = ({ birthDate }: { birthDate: number }) => {
  const livedTime = useLivedTime(birthDate);

  return (
    <div className="flex flex-col space-y-4 2xl:space-y-8 max-w-96 2xl:max-w-[600px] mx-auto">
      <span className="title text-center text-accent">You have lived:</span>

      <div className="grid grid-cols-6 gap-x-4 justify-center px-6">
        <PeriodDisplay time={livedTime.years} text="years" zeroRedundant />
        <PeriodDisplay time={livedTime.months} text="months" zeroRedundant />
        <PeriodDisplay time={livedTime.days} text="days" zeroRedundant />
        <PeriodDisplay time={livedTime.hours} text="hours" />
        <PeriodDisplay time={livedTime.minutes} text="minutes" />
        <PeriodDisplay time={livedTime.seconds} text="seconds" />
      </div>
    </div>
  );
};

export default LivedTime;
