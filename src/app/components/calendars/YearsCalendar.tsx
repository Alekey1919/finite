import { LIFE_EXPECTANCY } from "@/app/helper/unitAmounts";
import React from "react";
import { twMerge } from "tailwind-merge";

const YearsCalendar = ({ livedBoxesAmount }: { livedBoxesAmount: number }) => {
  const gap = "gap-[8px] lg:gap-[10px]";
  const boxSize = "w-5 h-5 sm:w-7 sm:h-7";

  return (
    <div
      className={twMerge("grid mx-auto relative grid-cols-10", gap)}
      id="calendar"
      key={0}
    >
      {new Array(LIFE_EXPECTANCY).fill(null).map((_, index) => {
        return (
          <div
            className={twMerge(
              "border-solidd grid-cols-12 border-accent border-[1px] box",
              boxSize,
              index < livedBoxesAmount && "bg-accent"
            )}
            style={{ animationDelay: `${index * 0.01}s` }}
            key={index}
          />
        );
      })}

      {/* <CalendarMarks timeMeasurement={timeMeasurement} /> */}
      <div
        className={twMerge(
          "absolute -right-8 top-0 bottom-0 grid grid-rows-9",
          gap
        )}
      >
        {Array.from({ length: 9 }).map((_, index) => {
          return (
            <div
              key={index}
              className={twMerge(
                "flex justify-center items-center text-sm text-accent",
                boxSize
              )}
            >
              {10 * (index + 1)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YearsCalendar;
