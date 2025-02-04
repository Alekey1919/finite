import React from "react";
import { twMerge } from "tailwind-merge";

const CalendarGrid = ({
  boxesAmount,
  livedBoxesAmount,
  columns,
  gap,
  boxSize,
}: {
  boxesAmount: number;
  livedBoxesAmount: number;
  columns: string;
  gap: string;
  boxSize: string;
}) => {
  return (
    <div
      className={twMerge("grid mx-auto relative", columns, gap)}
      id="calendar"
      key={0}
    >
      {new Array(boxesAmount).fill(null).map((_, index) => {
        return (
          <div
            className={twMerge(
              "w-2 h-2 border-solid border-accent border-[1px] box",
              index < livedBoxesAmount && "bg-accent",
              boxSize
            )}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default CalendarGrid;
