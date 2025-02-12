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
    <div className={twMerge("flex flex-col mx-auto relative", gap)} key={0}>
      {new Array(rows).fill(null).map((_, rowIndex) => {
        return (
          <div key={rowIndex} className={twMerge("flex", gap)}>
            {new Array(columns).fill(null).map((_, boxIndex) => {
              const generalBoxNumber = rowIndex * columns + boxIndex;

              return (
                <div
                  className={twMerge(
                    "w-2 h-2 border-solid border-accent border-[1px] box",
                    generalBoxNumber < livedBoxesAmount && "bg-accent",
                    generalBoxNumber === livedBoxesAmount &&
                      "bg-primary animate-pulse",
                    boxSize
                  )}
                  key={boxIndex}
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
