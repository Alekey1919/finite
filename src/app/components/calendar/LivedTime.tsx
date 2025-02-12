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
        "flex flex-col justify-center text-center text-accent aspect-square w-20",
        zeroRedundant && time < 1 && "hidden"
      )}
    >
      <span className="font-bold text-2xl">
        {zeroRedundant ? time : `${time}`.padStart(2, "0")}
      </span>
      <span className="capitalize font-medium text-sm">{text}</span>
    </div>
  );
};

const LivedTime = ({ birthDate }: { birthDate: number }) => {
  const livedTime = useLivedTime(birthDate);

  return (
    <div className="flex flex-col space-y-4">
      <span className="title text-center text-accent">You have lived:</span>

      <div className="flex space-x-4 justify-center">
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
