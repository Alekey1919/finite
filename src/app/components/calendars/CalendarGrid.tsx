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
  columns: number;
  gap: string;
  boxSize: string;
}) => {
  const rows = boxesAmount / columns;

  return (
    <div
      className={twMerge("flex flex-col mx-auto relative", gap)}
      id="calendar"
      key={0}
    >
      {new Array(rows).fill(null).map((_, index) => {
        return (
          <div key={index} className={twMerge("flex", gap)}>
            {new Array(columns).fill(null).map((_, index) => {
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
      })}
    </div>
  );
};

export default CalendarGrid;
